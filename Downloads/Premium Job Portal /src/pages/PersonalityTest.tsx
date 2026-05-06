
import { Icons } from '../components/Icons';
import { useLanguage } from '../lib/language';
import { motion } from 'motion/react';
import { Link } from 'react-router';

export const PersonalityTest = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/me/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 mb-8 transition-colors">
          <Icons.ChevronLeft className="w-5 h-5" /> {language === 'bn' ? 'ড্যাশবোর্ডে ফিরুন' : 'Back to Dashboard'}
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-12 text-center bg-purple-600 text-white">
            <motion.div 
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md"
            >
              <Icons.Brain className="w-10 h-10" />
            </motion.div>
            <h1 className="text-3xl font-black mb-2">
              {language === 'bn' ? 'ব্যক্তিত্ব পরীক্ষা' : 'Personality Test'}
            </h1>
            <p className="text-purple-50 max-w-lg mx-auto opacity-80">
              {language === 'bn' ? 'আপনার পেশাদার আচরণ এবং কাজের ধরণ বুঝতে এই পরীক্ষাটি দিন।' : 'Understand your professional behavior and work style with our AI-driven personality assessment.'}
            </p>
          </div>

          <div className="p-12">
            <div className="bg-gray-50 dark:bg-gray-900/50 p-10 rounded-[32px] border border-gray-100 dark:border-gray-700 text-center">
               <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Ready to start?</h3>
                  <p className="text-sm text-gray-500 mt-2">The test takes approximately 15 minutes to complete.</p>
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  {[
                    { label: 'Questions', value: '45' },
                    { label: 'Time', value: '15m' },
                    { label: 'Language', value: 'EN/BN' },
                    { label: 'Accuracy', value: '98%' }
                  ].map((stat, i) => (
                    <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                       <p className="text-[10px] font-bold text-gray-400 uppercase">{stat.label}</p>
                       <p className="text-lg font-black text-purple-600">{stat.value}</p>
                    </div>
                  ))}
               </div>

               <button className="px-12 py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 transition-colors shadow-xl shadow-purple-200 dark:shadow-none">
                  Start Assessment
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
