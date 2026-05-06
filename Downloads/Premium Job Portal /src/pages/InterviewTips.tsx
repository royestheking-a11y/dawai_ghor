
import { Icons } from '../components/Icons';
import { useLanguage } from '../lib/language';
import { motion } from 'motion/react';

export const InterviewTips = () => {
  const { language } = useLanguage();

  const tips = [
    {
      title: language === 'bn' ? 'গবেষণা করুন' : 'Do Your Research',
      desc: language === 'bn' ? 'কোম্পানি এবং পজিশন সম্পর্কে বিস্তারিত জানুন।' : 'Understand the company culture, mission, and the specific role you are applying for.',
      icon: Icons.Search,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: language === 'bn' ? 'মক ইন্টারভিউ' : 'Practice Mock Interviews',
      desc: language === 'bn' ? 'বন্ধুদের সাথে বা আয়নার সামনে কথা বলার প্র্যাকটিস করুন।' : 'Practice common interview questions with a friend or in front of a mirror.',
      icon: Icons.Users,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: language === 'bn' ? 'পোশাক নির্বাচন' : 'Dress Professionally',
      desc: language === 'bn' ? 'কোম্পানির পরিবেশ অনুযায়ী মার্জিত পোশাক পরুন।' : 'Choose an outfit that is professional and fits the company culture.',
      icon: Icons.User,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: language === 'bn' ? 'বডি ল্যাঙ্গুয়েজ' : 'Mind Your Body Language',
      desc: language === 'bn' ? 'হাসিমুখে কথা বলুন এবং সরাসরি চোখের দিকে তাকিয়ে কথা বলুন।' : 'Maintain eye contact, offer a firm handshake, and sit up straight.',
      icon: Icons.Zap,
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
              {language === 'bn' ? 'ইন্টারভিউ টিপস: সফল হওয়ার উপায়' : 'Interview Tips: How to Succeed'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {language === 'bn' ? 'আপনার স্বপ্নের চাকরি পাওয়ার জন্য ইন্টারভিউতে ভালো করা অত্যন্ত জরুরি। আমাদের বিশেষজ্ঞ টিপস অনুসরণ করুন।' : 'Acing the interview is crucial for landing your dream job. Follow our expert tips to stand out from the competition.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tips.map((tip, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
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

        <div className="mt-16 bg-emerald-600 rounded-[40px] p-12 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'bn' ? 'আরও সাহায্য চান?' : 'Need More Help?'}
            </h2>
            <p className="text-emerald-50 mb-8">
              {language === 'bn' ? 'আমাদের ক্যারিয়ার কোচদের সাথে ওয়ান-অন-ওয়ান সেশন বুক করুন।' : 'Book a one-on-one session with our career coaches to refine your interview skills.'}
            </p>
            <button className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-2xl hover:bg-emerald-50 transition-colors">
              {language === 'bn' ? 'কোচিং শুরু করুন' : 'Get Coaching'}
            </button>
          </div>
          <Icons.Briefcase className="absolute -right-20 -bottom-20 w-80 h-80 text-emerald-500 opacity-20 transform rotate-12" />
        </div>
      </div>
    </div>
  );
};
