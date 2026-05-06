
import { Icons } from '../components/Icons';
import { useLanguage } from '../lib/language';
import { motion } from 'motion/react';
import { Link } from 'react-router';

export const CustomizedCV = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/me/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 mb-8 transition-colors">
          <Icons.ChevronLeft className="w-5 h-5" /> {language === 'bn' ? 'ড্যাশবোর্ডে ফিরুন' : 'Back to Dashboard'}
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-12 border-b border-gray-100 dark:border-gray-700">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
              {language === 'bn' ? 'কাস্টমাইজড সিভি' : 'Customized CV'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {language === 'bn' ? 'আপনার পদের জন্য বিশেষভাবে তৈরি সিভিগুলো এখানে দেখুন।' : 'Manage your position-specific customized resumes here.'}
            </p>
          </div>

          <div className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {[1, 2].map(i => (
                 <motion.div 
                   key={i}
                   whileHover={{ y: -5 }}
                   className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 relative group"
                 >
                    <div className="flex items-start justify-between mb-6">
                       <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center">
                          <Icons.FileText className="w-6 h-6 text-emerald-600" />
                       </div>
                       <button className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors">
                          <Icons.MoreVertical className="w-5 h-5 text-gray-400" />
                       </button>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                       {i === 1 ? 'Frontend Developer Resume' : 'UX Design Portfolio CV'}
                    </h3>
                    <p className="text-xs text-gray-500 mb-6">Updated 2 days ago</p>
                    <div className="flex items-center gap-3">
                       <button className="flex-1 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors">
                          View
                       </button>
                       <button className="flex-1 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          Download
                       </button>
                    </div>
                 </motion.div>
               ))}

               <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:border-emerald-300 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                     <Icons.Plus className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">Create New Version</p>
                  <p className="text-[10px] text-gray-500 mt-1">Based on specific job requirement</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
