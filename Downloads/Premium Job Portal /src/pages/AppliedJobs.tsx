
import { Icons } from '../components/Icons';
import { useLanguage } from '../lib/language';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { db } from '../lib/db';
import { useAuth } from '../lib/auth';
import { ApplicationTimeline } from '../components/ApplicationTimeline';

export const AppliedJobs = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  
  const allJobs = db.getJobs();
  const allCompanies = db.getCompanies();
  const applications = db.getApplications().filter(a => a.candidateId === user?.id).map(app => {
      const job = allJobs.find(j => j.id === app.jobId);
      const company = allCompanies.find(c => c.id === job?.companyId || c.recruiterId === job?.recruiterId);
      return { ...app, job, company };
  }).filter(a => a.job !== undefined);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/me/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 mb-8 transition-colors">
          <Icons.ChevronLeft className="w-5 h-5" /> {language === 'bn' ? 'ড্যাশবোর্ডে ফিরুন' : 'Back to Dashboard'}
        </Link>

        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-8">
          {language === 'bn' ? 'আবেদনকৃত চাকরি' : 'Applied Jobs'}
        </h1>

        <div className="space-y-6">
           {applications.length > 0 ? (
             applications.map(app => (
               <motion.div 
                 key={app.id}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="bg-white dark:bg-gray-800 p-8 rounded-[32px] shadow-sm border border-gray-100 dark:border-gray-700"
               >
                  <div className="flex justify-between items-start mb-6">
                     <div className="flex gap-4">
                        <div className="w-14 h-14 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center font-bold text-gray-400">
                           {app.company?.logo ? <img src={app.company.logo} alt="" className="w-full h-full object-contain" /> : app.job?.title[0]}
                        </div>
                        <div>
                           <h3 className="font-bold text-xl text-gray-900 dark:text-white">{app.job?.title}</h3>
                           <p className="text-gray-500">{app.company?.name} • Applied {new Date(app.appliedAt).toLocaleDateString()}</p>
                        </div>
                     </div>
                     <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase border ${
                       app.status === 'shortlisted' ? 'bg-green-50 text-green-600 border-green-100' :
                       app.status === 'interview' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                       'bg-gray-50 text-gray-500 border-gray-100'
                     }`}>
                        {app.status}
                     </span>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                     <ApplicationTimeline status={app.status as any} />
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-3">
                     <button className="px-6 py-2 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors">Withdraw</button>
                     <Link to="/messages" className="px-6 py-2 text-sm font-bold bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">Message Employer</Link>
                  </div>
               </motion.div>
             ))
           ) : (
             <div className="bg-white dark:bg-gray-800 p-20 rounded-[40px] text-center border border-gray-100 dark:border-gray-700">
                <Icons.FileText className="w-16 h-16 mx-auto mb-4 text-gray-200" />
                <p className="text-gray-500 font-bold">No applications yet.</p>
                <Link to="/jobs" className="mt-6 inline-block px-8 py-3 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-colors">Browse Jobs</Link>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
