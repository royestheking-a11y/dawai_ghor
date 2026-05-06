
import { Icons } from '../components/Icons';
import { useLanguage } from '../lib/language';
import { motion } from 'motion/react';

export const CoverLetter = () => {
  const { language } = useLanguage();

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
              {language === 'bn' ? 'কভার লেটার গাইড' : 'Cover Letter Guide'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {language === 'bn' ? 'কিভাবে একটি আকর্ষণীয় কভার লেটার লিখবেন তা শিখুন এবং আপনার আবেদনের গুরুত্ব বাড়িয়ে তুলুন।' : 'Learn how to write a compelling cover letter that highlights your value and gets you hired.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-[32px] p-8 md:p-12 border border-gray-100 dark:border-gray-700 shadow-sm">
           <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                   {language === 'bn' ? 'কভার লেটারের মূল অংশসমূহ' : 'Key Elements of a Cover Letter'}
                 </h2>
                 <ul className="space-y-6">
                    {[
                      { t: 'Header', b: 'আপনার কন্টাক্ট ইনফরমেশন এবং ডেট।' },
                      { t: 'Salutation', b: 'নিয়োগকারীকে মার্জিতভাবে সম্বোধন করা।' },
                      { t: 'Introduction', b: 'আপনি কেন এই পজিশনে আগ্রহী তার সংক্ষিপ্ত বর্ণনা।' },
                      { t: 'Body Paragraphs', b: 'আপনার দক্ষতা এবং অর্জনের বিস্তারিত।' },
                      { t: 'Call to Action', b: 'ইন্টারভিউয়ের জন্য অনুরোধ এবং ধন্যবাদ জ্ঞাপন।' }
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4">
                         <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                            <Icons.Check className="w-4 h-4" />
                         </div>
                         <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">{language === 'bn' ? item.b.split(' ')[0] : item.t}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'bn' ? item.b : 'Detailed description of this section.'}</p>
                         </div>
                      </li>
                    ))}
                 </ul>
              </div>
              <div className="relative">
                 <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-600">
                    <div className="w-12 h-1 bg-emerald-500 mb-4 rounded-full"></div>
                    <div className="space-y-3">
                       <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                       <div className="w-3/4 h-2 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                       <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-6"></div>
                       <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                       <div className="w-1/2 h-2 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                    </div>
                    <div className="mt-8 flex justify-end">
                       <div className="w-24 h-8 bg-emerald-600 rounded-lg"></div>
                    </div>
                 </div>
                 <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 p-4 rounded-2xl shadow-xl font-bold text-xs transform rotate-6">
                    {language === 'bn' ? 'প্রফেশনাল টেমপ্লেট' : 'Professional Template'}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
