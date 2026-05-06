
import { Icons } from '../components/Icons';
import { useLanguage } from '../lib/language';
import { Link } from 'react-router';

export const ProfileViewed = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/me/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 mb-8 transition-colors">
          <Icons.ChevronLeft className="w-5 h-5" /> {language === 'bn' ? 'ড্যাশবোর্ডে ফিরুন' : 'Back to Dashboard'}
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-12 border-b border-gray-100 dark:border-gray-700 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                {language === 'bn' ? 'প্রোফাইল ভিউ' : 'Profile Viewed'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {language === 'bn' ? 'গত ৩০ দিনে আপনার প্রোফাইল যতবার দেখা হয়েছে।' : 'How many times your profile was viewed in the last 30 days.'}
              </p>
            </div>
            <div className="text-right">
               <span className="text-4xl font-black text-emerald-600">124</span>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Views</p>
            </div>
          </div>

          <div className="p-12">
            <div className="space-y-6">
               {[
                 { name: 'Google', time: '2 hours ago', industry: 'Technology' },
                 { name: 'Pathao', time: 'Yesterday', industry: 'Logistics' },
                 { name: 'TigerIT', time: '2 days ago', industry: 'Software' },
                 { name: 'Unknown Employer', time: '3 days ago', industry: 'Confidential' }
               ].map((viewer, i) => (
                 <div key={i} className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 hover:border-emerald-200 transition-all group">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center text-gray-400 font-bold text-xl group-hover:text-emerald-500 transition-colors">
                          {viewer.name[0]}
                       </div>
                       <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">{viewer.name}</h4>
                          <p className="text-xs text-gray-500">{viewer.industry} • Viewed {viewer.time}</p>
                       </div>
                    </div>
                    <button className="px-4 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors">
                       View Company
                    </button>
                 </div>
               ))}
            </div>

            <div className="mt-12 bg-emerald-900 rounded-[40px] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Get 5x more views!</h3>
                  <p className="text-emerald-100 text-sm opacity-80">Verified profiles appear higher in search results for recruiters.</p>
               </div>
               <Link to="/get-verified" className="px-8 py-3 bg-white text-emerald-900 font-bold rounded-2xl hover:bg-emerald-50 transition-colors whitespace-nowrap">
                  Get Verified Now
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
