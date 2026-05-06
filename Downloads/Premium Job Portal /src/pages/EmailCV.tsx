
import { Icons } from '../components/Icons';
import { useLanguage } from '../lib/language';
import { Link } from 'react-router';

export const EmailCV = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/me/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 mb-8 transition-colors">
          <Icons.ChevronLeft className="w-5 h-5" /> {language === 'bn' ? 'ড্যাশবোর্ডে ফিরুন' : 'Back to Dashboard'}
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-12 border-b border-gray-100 dark:border-gray-700 bg-emerald-50/30 dark:bg-emerald-900/10">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
              {language === 'bn' ? 'ইমেইল সিভি ইতিহাস' : 'Emailed CV History'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {language === 'bn' ? 'আপনি যে সকল ইমেইলে আপনার সিভি পাঠিয়েছেন তার তালিকা।' : 'History of all resumes you have sent directly via email.'}
            </p>
          </div>

          <div className="p-12">
            <div className="space-y-4">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                          <Icons.Mail className="w-5 h-5 text-emerald-600" />
                       </div>
                       <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">hr@company{i}.com</h4>
                          <p className="text-xs text-gray-500">Sent on May {10 + i}, 2026 • CV_Main_v2.pdf</p>
                       </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase rounded-full">Delivered</span>
                 </div>
               ))}
            </div>

            <div className="mt-12 p-8 bg-gray-50 dark:bg-gray-900/50 rounded-[32px] border border-gray-100 dark:border-gray-700 text-center">
               <h3 className="font-bold text-gray-900 dark:text-white mb-4">Want to email your CV?</h3>
               <button className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 dark:shadow-none">
                  Compose Email with CV
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
