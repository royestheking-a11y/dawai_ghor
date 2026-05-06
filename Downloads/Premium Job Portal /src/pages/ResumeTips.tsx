
import { Icons } from '../components/Icons';
import { useLanguage } from '../lib/language';
import { motion } from 'motion/react';

export const ResumeTips = () => {
  const { language } = useLanguage();

  const tips = [
    {
      title: language === 'bn' ? 'পরিষ্কার লেআউট' : 'Clean Layout',
      desc: language === 'bn' ? 'একটি সহজ এবং পেশাদার ডিজাইন ব্যবহার করুন।' : 'Use a simple and professional design that is easy to read.',
      icon: Icons.FileText,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: language === 'bn' ? 'কিওয়ার্ড ব্যবহার' : 'Use Keywords',
      desc: language === 'bn' ? 'জব ডেসক্রিপশন থেকে প্রাসঙ্গিক কিওয়ার্ড যুক্ত করুন।' : 'Include relevant keywords from the job description to pass ATS.',
      icon: Icons.Search,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: language === 'bn' ? 'সাফল্য হাইলাইট করুন' : 'Highlight Achievements',
      desc: language === 'bn' ? 'শুধুমাত্র দায়িত্ব নয়, আপনার অর্জনগুলো তুলে ধরুন।' : 'Focus on your achievements and impact, not just your responsibilities.',
      icon: Icons.Star,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: language === 'bn' ? 'ভুল সংশোধন' : 'Proofread Carefully',
      desc: language === 'bn' ? 'বানান এবং গ্রামার চেক করতে ভুলবেন না।' : 'Check for spelling and grammar errors before sending your resume.',
      icon: Icons.CheckCircle,
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
              {language === 'bn' ? 'রেজ্যুমে রাইটিং টিপস' : 'Resume Writing Tips'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {language === 'bn' ? 'একটি দুর্দান্ত রেজ্যুমে আপনাকে ইন্টারভিউ পর্যন্ত পৌঁছে দিতে পারে। আমাদের গাইড অনুসরণ করুন।' : 'A great resume is your ticket to an interview. Follow our guide to build a professional resume.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tips.map((tip, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all"
            >
              <div className={`w-14 h-14 ${tip.color} rounded-2xl flex items-center justify-center mb-6`}>
                <tip.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{tip.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{tip.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[40px] p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">
            {language === 'bn' ? 'সহজেই রেজ্যুমে তৈরি করুন' : 'Build Your Resume in Minutes'}
          </h2>
          <p className="text-emerald-50 mb-8 max-w-xl mx-auto">
            {language === 'bn' ? 'আমাদের স্মার্ট রেজ্যুমে বিল্ডার ব্যবহার করে প্রফেশনাল রেজ্যুমে তৈরি করুন।' : 'Use our smart CV Builder to create a professional resume that gets noticed.'}
          </p>
          <button className="px-10 py-4 bg-white text-emerald-600 font-bold rounded-2xl hover:bg-emerald-50 transition-all shadow-lg">
            {language === 'bn' ? 'রেজ্যুমে বিল্ডার ব্যবহার করুন' : 'Try CV Builder'}
          </button>
        </div>
      </div>
    </div>
  );
};
