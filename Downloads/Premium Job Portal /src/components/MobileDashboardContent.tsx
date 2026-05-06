
import { Icons } from './Icons';
import { MobileDashboardGrid } from './MobileDashboardGrid';
import { useLanguage } from '../lib/language';

export const MobileDashboardContent = ({ role = 'candidate' }: { role?: 'candidate' | 'recruiter' }) => {
   const { language } = useLanguage();
   return (
      <div className="md:hidden pb-40 bg-[#f8f9fa] min-h-screen font-sans">

         {/* Top Cards Section */}
         <div className="bg-white px-3 py-4 grid grid-cols-10 gap-2 border-b border-gray-100 shadow-sm">
            {/* Profile Card */}
            <div className="col-span-4 bg-gray-50 rounded-lg p-3 border border-gray-100 flex flex-col justify-center shadow-sm relative overflow-hidden group">
               <div className="flex items-center gap-2 mb-3 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                     <Icons.User className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col leading-none">
                     <span className="text-[11px] text-gray-500 font-bold mb-0.5">Profile</span>
                     <span className="text-sm font-black text-green-600">100%</span>
                  </div>
               </div>
               <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden relative z-10">
                  <div className="h-full bg-green-600 w-full rounded-full"></div>
               </div>
            </div>

            {/* Video CV Card */}
            <div className="col-span-4 bg-gray-50 rounded-lg p-3 border border-gray-100 flex flex-col justify-center shadow-sm relative overflow-hidden">
               <div className="flex items-center gap-2 mb-3 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-purple-700 flex items-center justify-center text-white shrink-0 shadow-sm">
                     <Icons.Video className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col leading-none">
                     <span className="text-[11px] text-gray-500 font-bold mb-0.5 whitespace-nowrap">Video CV</span>
                     <span className="text-sm font-black text-purple-700">0%</span>
                  </div>
               </div>
               <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden relative z-10">
                  <div className="h-full bg-purple-700 w-0 rounded-full"></div>
               </div>
            </div>

            {/* Manage Card */}
            <div className="col-span-2 bg-gray-50 rounded-lg p-1 border border-gray-100 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 shadow-sm transition-colors">
               <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                  <Icons.FileText className="w-4 h-4" />
               </div>
               <span className="text-[10px] text-gray-600 font-bold">Manage</span>
            </div>
         </div>

         {/* Notification Strip */}
         <div className="mx-3 mt-4 mb-2 bg-[#ecfdf5] border border-emerald-100 rounded-lg py-3 px-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2.5">
               <div className="w-6 h-6 bg-[#059669] rounded flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Icons.Briefcase className="w-3.5 h-3.5" />
               </div>
               <span className="text-xs font-bold text-[#059669]">Employer interested in you</span>
            </div>
            <span className="text-sm font-black text-[#059669]">5</span>
         </div>

         {role === 'candidate' ? (
            <>
               {/* Grid of Icons */}
               <MobileDashboardGrid />

               {/* PRO Banner - EXACT Content */}
               <div className="mx-3 mt-4 mb-28">
                  <div className="bg-[#e8f5e9] rounded-2xl p-5 relative overflow-hidden border border-green-100 shadow-sm flex flex-col min-h-[180px]">

                     {/* Header */}
                     <div className="flex items-center gap-2 mb-3 relative z-10">
                        <span className="text-xl font-black text-gray-700 tracking-tighter">
                          {language === 'bn' ? 'চাকরি বাজার' : 'Chakri Bazar'}
                        </span>
                        <span className="bg-green-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm">PRO</span>
                        <span className="text-xs font-bold text-gray-600">
                          {language === 'bn' ? 'সাবস্ক্রিপশনে-' : 'Subscription-'}
                        </span>
                      </div>

                     <div className="flex relative z-10">
                        <div className="flex-1 pr-2">
                           <ul className="space-y-2 mb-4">
                              {(language === 'bn' 
                                 ? ['জব অ্যাপলিকেশন ট্র্যাক করুন', 'নিয়োগকর্তাকে সরাসরি মেসেজ করুন', 'ক্যারিয়ার সম্পর্কে যেকোন প্রশ্ন করুন', 'স্টার ক্যান্ডিডেড হিসেবে নিজেকে উপস্থাপন করুন']
                                 : ['Track Job Applications', 'Direct Message Employers', 'Ask Career Questions', 'Present Yourself as Star Candidate']
                              ).map((text, i) => (
                                 <li key={i} className="flex items-start gap-2 text-[10px] font-bold text-gray-700 leading-tight">
                                    <div className="mt-0.5 w-3 h-3 rounded-full bg-[#059669] flex items-center justify-center shrink-0">
                                       <Icons.Check className="w-2 h-2 text-white stroke-[4]" />
                                    </div>
                                    {text}
                                 </li>
                              ))}
                           </ul>
                           <button className="bg-[#059669] text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-lg hover:bg-emerald-800 transition-colors border border-emerald-700 active:scale-95">
                              {language === 'bn' ? 'চাকরি বাজার প্রো কিনুন' : 'Buy Chakri Bazar Pro'}
                           </button>
                        </div>

                        {/* Illustration - Person on Laptop */}
                        <div className="w-24 flex flex-col justify-end items-end relative shrink-0 -mb-2">
                           {/* Simple geometric person */}
                           <div className="relative w-24 h-24">
                              <Icons.User className="w-20 h-20 text-gray-800 absolute bottom-0 right-2 z-10" />
                              <div className="absolute bottom-4 right-6 bg-gray-200 w-12 h-10 rounded border border-gray-300 z-20 flex items-center justify-center transform -rotate-6">
                                 <Icons.Laptop className="w-6 h-6 text-gray-600" />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Pagination Dots */}
                  <div className="flex justify-center gap-2 mt-4">
                     <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                     <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                     <div className="w-2 h-2 bg-[#059669] rounded-full"></div>
                  </div>
               </div>

               {/* My Personal Hiring Section */}
               <div className="mx-3 mb-8">
                  <div className="flex items-center gap-2 mb-3">
                     <Icons.Search className="w-5 h-5 text-[#059669] stroke-[2.5]" />
                     <h3 className="text-sm font-bold text-[#059669]">My Personal Hiring</h3>
                     <span className="bg-[#fff9c4] text-[#fbc02d] text-[10px] font-black px-1.5 py-0.5 rounded border border-[#fff59d]">New</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                     <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2 h-24 active:scale-95 transition-transform">
                        <Icons.Plus className="w-6 h-6 text-[#1e88e5]" />
                        <span className="text-[11px] font-bold text-gray-600 text-center leading-tight">Post New Job</span>
                     </div>
                     <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2 h-24 active:scale-95 transition-transform">
                        <Icons.LayoutGrid className="w-6 h-6 text-[#5e35b1]" />
                        <span className="text-[11px] font-bold text-gray-600 text-center leading-tight">Dashboard</span>
                     </div>
                     <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2 h-24 active:scale-95 transition-transform">
                        <Icons.HelpCircle className="w-6 h-6 text-[#00897b]" />
                        <span className="text-[11px] font-bold text-gray-600 text-center leading-tight">Help</span>
                     </div>
                  </div>
               </div>

               {/* Develop Your Skills Section */}
               <div className="mb-8">
                  <div className="mx-3 flex justify-between items-center mb-3">
                     <div className="flex items-center gap-2">
                        <Icons.Brain className="w-5 h-5 text-[#065f46] stroke-[2.5]" />
                        <h3 className="text-sm font-bold text-[#065f46]">Develop Your Skills</h3>
                     </div>
                     <span className="text-xs font-bold text-[#059669] flex items-center gap-0.5">View All <Icons.ChevronRight className="w-3 h-3 stroke-[3]" /></span>
                  </div>

                  <div className="flex overflow-x-auto px-3 pb-4 gap-3 no-scrollbar snap-x">
                     {[1, 2].map(i => (
                        <div key={i} className="min-w-[280px] bg-white rounded-xl border border-gray-100 shadow-sm p-3 snap-center">
                           <div className="w-full h-24 bg-gray-50 rounded-lg mb-3 flex items-center justify-center border border-gray-50">
                              <div className="flex items-center gap-1">
                                 <Icons.GraduationCap className="w-6 h-6 text-[#065f46]" />
                                 <span className="text-lg font-bold text-[#065f46] tracking-tighter">chakri bazar</span>
                                 <span className="text-lg font-light text-[#065f46]">learning</span>
                              </div>
                           </div>
                           <h4 className="text-xs font-bold text-gray-700 line-clamp-2 leading-relaxed">
                              {i === 1 ? 'Costing, Sourcing & Negotiating for Import - Export Business' : 'Industrial Engineering Basics for Apparel Industry'}
                           </h4>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Hot Jobs Section */}
               <div className="mx-3 mb-28">
                  <div className="flex items-center gap-2 mb-3">
                     <Icons.Flame className="w-5 h-5 text-[#059669] fill-[#059669]" />
                     <h3 className="text-sm font-bold text-[#059669]">Hot Jobs</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                     {[
                        { name: 'Nuvista Pharma', img: 'https://logo.clearbit.com/nuvista.com.bd' },
                        { name: 'Dhrubotara Youth', img: 'https://logo.clearbit.com/dhrubotara.org' },
                        { name: 'The Aimz Ltd', img: 'https://logo.clearbit.com/aimz.com' },
                        { name: 'Beacon Pharma', img: 'https://logo.clearbit.com/beaconpharma.com.bd' }
                     ].map((job, i) => (
                        <div key={i} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3 active:scale-95 transition-transform">
                           <div className="w-10 h-10 bg-gray-50 rounded flex items-center justify-center shrink-0 p-1">
                              {/* Fallback Icon if image fails (using simple text for now to be safe) */}
                              <span className="text-[10px] font-bold text-gray-400">{job.name.substring(0, 2).toUpperCase()}</span>
                           </div>
                           <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold text-gray-800 truncate">{job.name}</span>
                              <span className="text-[9px] text-gray-500 truncate">Sourcing Executive</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </>
         ) : (
            <div className="p-4">Recruiter View</div>
         )}

         {/* Floating Bottom Elements - Exactly as per screenshot layout */}
         <div className="fixed bottom-[90px] left-0 right-0 px-4 z-40 flex justify-between items-end pointer-events-none">
            {/* Left Side: My Personal Hiring */}
            <div className="pointer-events-auto bg-white border border-gray-100 py-2.5 px-4 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center gap-2 cursor-pointer group hover:scale-105 transition-transform">
               <div className="relative">
                  <Icons.Search className="w-4 h-4 text-[#059669] stroke-[3]" />
               </div>
               <span className="text-[11px] font-bold text-[#059669]">My Personal Hiring</span>
               <span className="bg-[#fff9c4] text-[#fbc02d] text-[9px] font-black px-1.5 py-0.5 rounded border border-[#fff59d]">New</span>
            </div>

            {/* Right Side: All Jobs */}
            <button className="pointer-events-auto bg-[#2e7d32] text-white pl-5 pr-3 py-2.5 rounded-full font-bold shadow-[0_4px_12px_rgba(46,125,50,0.3)] flex items-center gap-1 hover:bg-green-700 transition-colors active:scale-95 text-xs tracking-wide">
               All Jobs <Icons.ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
         </div>

      </div>
   );
};
