import { Link } from 'react-router';
import { Icons } from '../components/Icons';
import { useLanguage } from '../lib/language';

export const GetVerified = () => {
  const { language } = useLanguage();

  const benefits = [
    {
      title: language === 'bn' ? 'বিশ্বাসযোগ্যতা বৃদ্ধি' : 'Boost Credibility',
      desc: language === 'bn' ? 'ভেরিফাইড প্রোফাইল নিয়োগকারীদের কাছে অধিক বিশ্বস্ত।' : 'Verified profiles are trusted more by top employers and recruiters.',
      icon: Icons.ShieldCheck,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      title: language === 'bn' ? '৫ গুণ বেশি ইন্টারভিউ' : '5x More Interviews',
      desc: language === 'bn' ? 'ভেরিফাইড প্রার্থীরা সাধারণ প্রার্থীদের তুলনায় ৫ গুণ বেশি ইন্টারভিউ ডাক পান।' : 'Verified candidates receive up to 5x more interview invitations.',
      icon: Icons.Zap,
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      title: language === 'bn' ? 'সেরা চাকরিগুলো আগে' : 'Priority Access',
      desc: language === 'bn' ? 'ভেরিফাইড প্রার্থীরা অনেক সময় সেরা কোম্পানিগুলোর চাকরি আগে দেখতে পান।' : 'Get priority access to exclusive job listings from premium companies.',
      icon: Icons.Star,
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 py-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Icons.ShieldCheck className="w-4 h-4" />
              {language === 'bn' ? 'প্রোফাইল ভেরিফিকেশন' : 'Profile Verification'}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              {language === 'bn' ? 'একটি ভেরিফাইড প্রোফাইল দিয়ে আপনার ক্যারিয়ার শুরু করুন' : 'Stand Out with a Verified Profile Badge'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
              {language === 'bn' ? 'আমাদের ভেরিফিকেশন প্রসেস আপনার প্রোফাইলকে আরও প্রফেশনাল করে তোলে এবং নিয়োগকারীদের দৃষ্টি আকর্ষণ করে।' : 'Our verification process validates your identity and skills, making your profile more attractive to hiring managers.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/signup" className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all text-center">
                {language === 'bn' ? 'এখনই শুরু করুন' : 'Get Started Now'}
              </Link>
              <Link to="/contact" className="px-8 py-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all text-center">
                {language === 'bn' ? 'আরও জানুন' : 'Learn More'}
              </Link>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-emerald-600 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-20 animate-pulse"></div>
            <div className="relative bg-white dark:bg-gray-700 p-8 rounded-[40px] shadow-2xl border border-emerald-100 dark:border-emerald-800 transform rotate-3">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-full"></div>
                 <div className="space-y-2">
                   <div className="w-32 h-4 bg-gray-100 dark:bg-gray-600 rounded-full"></div>
                   <div className="w-20 h-3 bg-gray-50 dark:bg-gray-600/50 rounded-full"></div>
                 </div>
                 <Icons.ShieldCheck className="w-8 h-8 text-emerald-500 ml-auto" />
               </div>
               <div className="space-y-3">
                 <div className="w-full h-3 bg-gray-50 dark:bg-gray-600/50 rounded-full"></div>
                 <div className="w-full h-3 bg-gray-50 dark:bg-gray-600/50 rounded-full"></div>
                 <div className="w-2/3 h-3 bg-gray-50 dark:bg-gray-600/50 rounded-full"></div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
          {language === 'bn' ? 'কেন ভেরিফিকেশন প্রয়োজন?' : 'Why Get Verified?'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {benefits.map((benefit, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-10 rounded-[32px] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all text-center">
              <div className={`w-20 h-20 ${benefit.color} rounded-3xl flex items-center justify-center mx-auto mb-8 transform group-hover:rotate-6 transition-transform`}>
                <benefit.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{benefit.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="bg-emerald-900 py-24 text-white overflow-hidden relative">
         <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
            <h2 className="text-3xl font-bold mb-16">{language === 'bn' ? 'ভেরিফিকেশনের ৩টি সহজ ধাপ' : '3 Simple Steps to Get Verified'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               <div className="space-y-4">
                  <div className="text-5xl font-black text-emerald-500/30">01</div>
                  <h3 className="text-xl font-bold">{language === 'bn' ? 'প্রোফাইল পূর্ণ করুন' : 'Complete Profile'}</h3>
                  <p className="text-emerald-100/70">{language === 'bn' ? 'আপনার ব্যক্তিগত ও পেশাগত তথ্য দিয়ে প্রোফাইল আপডেট করুন।' : 'Fill in your professional details and upload a clean photo.'}</p>
               </div>
               <div className="space-y-4">
                  <div className="text-5xl font-black text-emerald-500/30">02</div>
                  <h3 className="text-xl font-bold">{language === 'bn' ? 'ডকুমেন্ট আপলোড' : 'Verify Identity'}</h3>
                  <p className="text-emerald-100/70">{language === 'bn' ? 'আপনার এনআইডি বা পাসপোর্ট আপলোড করে পরিচয় নিশ্চিত করুন।' : 'Upload a valid NID or Passport to confirm your identity.'}</p>
               </div>
               <div className="space-y-4">
                  <div className="text-5xl font-black text-emerald-500/30">03</div>
                  <h3 className="text-xl font-bold">{language === 'bn' ? 'স্কিল টেস্ট দিন' : 'Take Skill Tests'}</h3>
                  <p className="text-emerald-100/70">{language === 'bn' ? 'অন্তত ১টি স্কিল টেস্টে পাস করে আপনার দক্ষতা প্রমাণ করুন।' : 'Pass at least one skill assessment to prove your expertise.'}</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
