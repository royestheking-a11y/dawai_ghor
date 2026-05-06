
import { Icons } from '../components/Icons';
import { useLanguage } from '../lib/language';
import { motion } from 'motion/react';

export const Education = () => {
  const { language } = useLanguage();

  const categories = [
    { name: language === 'bn' ? 'ইউজিসি বিশ্ববিদ্যালয়' : 'UGC Universities', icon: Icons.Building, count: 120 },
    { name: language === 'bn' ? 'টেকনিক্যাল ইনস্টিটিউট' : 'Technical Institutes', icon: Icons.Monitor, count: 45 },
    { name: language === 'bn' ? 'অনলাইন কোর্স' : 'Online Courses', icon: Icons.Zap, count: 300 },
    { name: language === 'bn' ? 'স্কলারশিপ' : 'Scholarships', icon: Icons.GraduationCap, count: 85 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="bg-emerald-900 py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              {language === 'bn' ? 'শিক্ষা নির্দেশিকা' : 'Education Guide'}
            </h1>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto opacity-80">
              {language === 'bn' ? 'আপনার ক্যারিয়ারের পরবর্তী ধাপের জন্য সঠিক শিক্ষা প্রতিষ্ঠান এবং কোর্স খুঁজে নিন।' : 'Find the right educational institutions and courses for your next career step.'}
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.3),transparent)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-[32px] shadow-xl border border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                  <cat.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{cat.name}</h3>
                <p className="text-xs text-gray-500">{cat.count}+ {language === 'bn' ? 'অপশন' : 'Options'}</p>
              </motion.div>
            ))}
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24">
         <div className="bg-white dark:bg-gray-800 rounded-[40px] p-8 md:p-16 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
              {language === 'bn' ? 'জনপ্রিয় কোর্সসমূহ' : 'Popular Courses'}
            </h2>
            <div className="space-y-4">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="flex flex-wrap items-center justify-between p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-transparent hover:border-emerald-200 transition-all group">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-sm">
                          <Icons.Monitor className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                       </div>
                       <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">Full Stack Web Development</h4>
                          <p className="text-xs text-gray-500">6 Months • Online • Certificate Included</p>
                       </div>
                    </div>
                    <button className="px-6 py-2 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-colors">
                       View Details
                    </button>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};
