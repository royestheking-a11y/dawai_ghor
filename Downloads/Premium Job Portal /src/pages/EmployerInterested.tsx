
import { Icons } from '../components/Icons';
import { useLanguage } from '../lib/language';
import { Link } from 'react-router';

export const EmployerInterested = () => {
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
              {language === 'bn' ? 'নিয়োগকারীর আগ্রহ' : 'Employer Interested'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {language === 'bn' ? 'যে সকল কোম্পানি আপনার প্রোফাইলে সরাসরি আগ্রহ প্রকাশ করেছে।' : 'Companies that have expressed direct interest in your profile.'}
            </p>
          </div>

          <div className="p-12">
            <div className="space-y-6">
               {[
                 { name: 'Enosis Solutions', role: 'Software Engineer', date: '3 days ago' },
                 { name: 'Brain Station 23', role: 'React Developer', date: '1 week ago' }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-[32px] border border-emerald-100 dark:border-emerald-900/30">
                    <div className="flex items-center gap-5 mb-6 md:mb-0">
                       <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-3xl shadow-sm flex items-center justify-center">
                          <Icons.Building className="w-8 h-8 text-emerald-600" />
                       </div>
                       <div>
                          <h4 className="font-bold text-xl text-gray-900 dark:text-white">{item.name}</h4>
                          <p className="text-sm text-gray-500">Interested in you for <span className="text-emerald-600 font-bold">{item.role}</span></p>
                          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">{item.date}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <button className="flex-1 md:flex-none px-8 py-3 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-colors">
                          Message
                       </button>
                       <button className="flex-1 md:flex-none px-8 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          View Job
                       </button>
                    </div>
                 </div>
               ))}

               {/* Empty State if needed */}
               {/* <div className="text-center py-20 opacity-30">
                  <Icons.Star className="w-20 h-20 mx-auto mb-4" />
                  <p className="font-bold">No direct interest yet. Keep improving your profile!</p>
               </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
