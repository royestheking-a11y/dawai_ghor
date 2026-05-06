
import { useLanguage } from '../lib/language';
import { motion } from 'motion/react';

export const Blog = () => {
    const { language } = useLanguage();
    
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                        {language === 'bn' ? 'ক্যারিয়ার গাইড ও পরামর্শ' : 'Career Guide & Advice'}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                        {language === 'bn' ? 'সফল ক্যারিয়ার গড়ার জন্য আমাদের বিশেষজ্ঞ টিপস এবং গাইড পড়ুন।' : 'Read our expert tips and guides to build a successful career path.'}
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all group"
                        >
                            <div className="h-48 bg-gray-100 dark:bg-gray-700 group-hover:scale-105 transition-transform duration-500"></div>
                            <div className="p-8">
                                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Career Tips</span>
                                <h3 className="font-bold text-xl mt-3 mb-4 text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">How to Master Your Professional Networking</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">Build meaningful connections that last a lifetime and open doors to new opportunities in your career path...</p>
                                <button className="mt-6 text-sm font-bold text-gray-900 dark:text-white hover:text-emerald-600 flex items-center gap-2">
                                    Read More <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
};
