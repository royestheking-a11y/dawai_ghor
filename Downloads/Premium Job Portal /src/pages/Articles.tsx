
import { Icons } from '../components/Icons';
import { useLanguage } from '../lib/language';
import { motion } from 'motion/react';

export const Articles = () => {
  const { language } = useLanguage();

  const posts = [
    {
      title: language === 'bn' ? '২০২৬ সালের সেরা ১০টি স্কিল' : 'Top 10 Skills for 2026',
      excerpt: language === 'bn' ? 'ভবিষ্যতের জব মার্কেটে টিকে থাকতে হলে আপনাকে কোন কোন স্কিল শিখতে হবে?' : 'Which skills will be most in demand in the future job market?',
      category: 'Market Trends',
      image: 'bg-emerald-100'
    },
    {
      title: language === 'bn' ? 'রিমোট জবে সফল হওয়ার কৌশল' : 'Strategies for Remote Success',
      excerpt: language === 'bn' ? 'বাসা থেকে কাজ করার সময় প্রোডাক্টিভিটি ঠিক রাখার সেরা টিপস।' : 'Best tips for maintaining productivity while working from home.',
      category: 'Remote Work',
      image: 'bg-blue-100'
    },
    {
      title: language === 'bn' ? 'চাকরি পরিবর্তনের সঠিক সময়' : 'When to Switch Your Job',
      excerpt: language === 'bn' ? 'কিভাবে বুঝবেন আপনার এখন চাকরি পরিবর্তন করা উচিত?' : 'How to know if it is the right time to move on to a new opportunity.',
      category: 'Career Growth',
      image: 'bg-purple-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
              {language === 'bn' ? 'ক্যারিয়ার আর্টিকেল ও সংবাদ' : 'Career Articles & Insights'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {language === 'bn' ? 'আপনার ক্যারিয়ার গড়তে সাহায্য করার জন্য বিশেষজ্ঞ পরামর্শ এবং লেটেস্ট ট্রেন্ড নিয়ে আমাদের আর্টিকেল পড়ুন।' : 'Stay updated with the latest trends and expert advice to accelerate your career journey.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl transition-all overflow-hidden"
            >
              <div className={`h-48 ${post.image} group-hover:scale-105 transition-transform duration-500`}></div>
              <div className="p-8">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-3 group-hover:text-emerald-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
                   {language === 'bn' ? 'আরও পড়ুন' : 'Read More'} <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
