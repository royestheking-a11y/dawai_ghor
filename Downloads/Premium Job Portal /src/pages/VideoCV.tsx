
import { Icons } from '../components/Icons';
import { useLanguage } from '../lib/language';
import { motion } from 'motion/react';
import { Link } from 'react-router';

export const VideoCV = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/me/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 mb-8 transition-colors">
          <Icons.ChevronLeft className="w-5 h-5" /> {language === 'bn' ? 'ড্যাশবোর্ডে ফিরুন' : 'Back to Dashboard'}
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="bg-emerald-600 p-12 text-white text-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md"
            >
              <Icons.Video className="w-10 h-10" />
            </motion.div>
            <h1 className="text-3xl font-black mb-4">
              {language === 'bn' ? 'ভিডিও সিভি' : 'Video CV'}
            </h1>
            <p className="text-emerald-50 max-w-lg mx-auto opacity-80">
              {language === 'bn' ? 'আপনার ব্যক্তিত্ব এবং দক্ষতা প্রদর্শনের জন্য একটি সংক্ষিপ্ত ভিডিও আপলোড করুন।' : 'Upload a short video to showcase your personality, communication skills, and professional background.'}
            </p>
          </div>

          <div className="p-12 text-center">
            <div className="border-4 border-dashed border-gray-100 dark:border-gray-700 rounded-[32px] p-20 flex flex-col items-center justify-center group hover:border-emerald-200 dark:hover:border-emerald-600 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icons.Plus className="w-8 h-8 text-gray-400 group-hover:text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'bn' ? 'ভিডিও ফাইল নির্বাচন করুন' : 'Select Video File'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                MP4, MOV up to 50MB (Max 2 minutes)
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
               {[
                 { title: language === 'bn' ? 'ভালো আলো' : 'Good Lighting', desc: language === 'bn' ? 'একটি উজ্জ্বল ঘরে ভিডিও করুন।' : 'Record in a well-lit room for clarity.', icon: Icons.Sun },
                 { title: language === 'bn' ? 'পেশাদার পোশাক' : 'Professional Attire', desc: language === 'bn' ? 'মার্জিত পোশাক পরিধান করুন।' : 'Wear professional or smart-casual clothing.', icon: Icons.User },
                 { title: language === 'bn' ? 'পরিষ্কার শব্দ' : 'Clear Audio', desc: language === 'bn' ? 'শব্দহীন পরিবেশে কথা বলুন।' : 'Minimize background noise for clear audio.', icon: Icons.Mic }
               ].map((tip, i) => (
                 <div key={i} className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-transparent hover:border-emerald-100 transition-all">
                    <tip.icon className="w-5 h-5 text-emerald-600 mb-3" />
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{tip.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{tip.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
