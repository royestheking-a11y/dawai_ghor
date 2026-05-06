
import { Link } from 'react-router';
import { Icons } from '../components/Icons';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { useLanguage } from '../lib/language';

export const MyHiring = () => {
    const { language } = useLanguage();
    return (
        <div className="min-h-screen bg-white pb-24 font-sans md:hidden">
            {/* Header */}
            <div className="bg-[#1e5cba] text-white p-4 flex justify-between items-center shadow-md">
                <h1 className="text-xl font-bold">My Personal Hiring</h1>
                <button className="flex items-center gap-1 text-sm font-medium opacity-90">
                    <Icons.HelpCircle className="w-5 h-5" /> Help
                </button>
            </div>

            {/* Main Content */}
            <div className="p-5 flex flex-col items-center text-center">

                {/* Users Avatars - Mocked */}
                <div className="flex -space-x-3 mb-3">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                        </div>
                    ))}
                    <div className="w-auto pl-4 flex items-center text-xs text-gray-500 font-medium">
                        5M+ active job seekers available
                    </div>
                </div>

                <h2 className="text-lg font-bold text-gray-900 leading-tight">
                    My Personal Hiring Provides
                </h2>
                <h3 className="text-3xl font-bold text-[#0d47a1] mt-1 mb-8 leading-tight">
                    Smart Hiring<br />for Personal Needs
                </h3>

                {/* Arrow Decoration */}
                <div className="text-emerald-500 transform -rotate-12 translate-x-8 translate-y-4 z-0">
                    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M 30 10 Q 60 10 60 60" />
                        <path d="M 45 45 L 60 60 L 75 45" />
                    </svg>
                </div>

                {/* Central Action Area - Robust Layout */}
                <div className="relative w-full max-w-sm h-96 flex items-center justify-center my-8">

                    {/* Center Button - Highest Z-Index - PINK COLOR */}
                    <Link to="/my-hiring/post" className="relative z-50 block w-full max-w-[280px] bg-emerald-600 text-white font-bold py-4 rounded-lg shadow-xl hover:bg-emerald-700 transition-all transform hover:scale-105 active:scale-95 text-lg flex items-center justify-center gap-2 border-2 border-white/20">
                        Post Job for ৳100 <Icons.ArrowRight className="w-6 h-6" />
                    </Link>

                    {/* Orbiting Items - Positioned Absolute with safe padding */}

                    {/* Driver - Top Left */}
                    <div className="absolute left-2 top-4 flex flex-col items-center animate-bounce duration-[3000ms] z-10 transition-transform">
                        <div className="w-16 h-16 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                            <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=100&q=80" alt="Driver" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs font-bold text-gray-800 mt-1 bg-white/95 px-2 py-0.5 rounded shadow-sm border border-gray-100">Driver</span>
                        <span className="text-[10px] text-gray-500 font-medium">76k people</span>
                    </div>

                    {/* Nurse - Top Right */}
                    <div className="absolute right-2 top-4 flex flex-col items-center animate-bounce duration-[4000ms] z-10 transition-transform">
                        <div className="w-16 h-16 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=100&q=80" alt="Nurse" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs font-bold text-gray-800 mt-1 bg-white/95 px-2 py-0.5 rounded shadow-sm border border-gray-100">Nurse</span>
                        <span className="text-[10px] text-gray-500 font-medium">53k people</span>
                    </div>

                    {/* Chef - Bottom Left */}
                    <div className="absolute left-2 bottom-4 flex flex-col items-center animate-bounce duration-[3500ms] z-10 transition-transform">
                        <div className="w-14 h-14 rounded-full border-2 border-white shadow-lg overflow-hidden bg-gray-100">
                            <img src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=100&q=80" alt="Chef" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs font-bold text-gray-800 mt-1 bg-white/95 px-2 py-0.5 rounded shadow-sm border border-gray-100">Chef/Cook</span>
                        <span className="text-[10px] text-gray-500 font-medium">20k people</span>
                    </div>

                    {/* Tutor - Bottom Right */}
                    <div className="absolute right-2 bottom-4 flex flex-col items-center animate-bounce duration-[4500ms] z-10 transition-transform">
                        <div className="w-14 h-14 rounded-full border-2 border-white shadow-lg overflow-hidden bg-gray-100">
                            <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=100&q=80" alt="Tutor" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs font-bold text-gray-800 mt-1 bg-white/95 px-2 py-0.5 rounded shadow-sm border border-gray-100">Home Tutor</span>
                        <span className="text-[10px] text-gray-500 font-medium">100k people</span>
                    </div>
                </div>

                {/* Info Section - Added massive top margin just in case */}
                <div className="mt-24 text-left relative z-20 px-2">
                    <h3 className="text-xl font-bold text-[#0d47a1] mb-3">What is My Personal Hiring?</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        Looking for a home tutor, driver, security guard, or a trusted nurse for your household?
                        {language === 'bn' ? 'চাকরি বাজার' : 'Chakri Bazar'} brings you the My Personal Hiring feature — designed to match your personal needs.
                        Easily post your job ad, get applications from skilled candidates, and stay in full control
                        of your hiring. Enjoy simple job posting, shortlist applicants yourself, and hire with just one click from home.
                    </p>

                    {/* Bottom Promo Banner */}
                    <div className="bg-[#e3f2fd] p-5 rounded-xl border border-blue-100 relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="text-lg font-bold text-[#0d47a1] mb-1">Find skilled personnel</h4>
                            <h4 className="text-lg font-bold text-[#0d47a1] mb-2">easily on {language === 'bn' ? 'চাকরি বাজার' : 'Chakri Bazar'}</h4>
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-20">
                            <Icons.Users className="w-24 h-24 text-blue-900" />
                        </div>
                    </div>
                </div>

            </div>

            {/* Helper FAB */}
            <div className="fixed bottom-24 right-4 z-50">
                <button className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-[#1e5cba] hover:scale-110 transition-transform">
                    <Icons.MessageSquare className="w-6 h-6" />
                </button>
            </div>

            <MobileBottomNav />
        </div>
    );
};
