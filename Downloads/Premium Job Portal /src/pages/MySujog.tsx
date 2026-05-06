import { useState } from 'react';
import { Icons } from '../components/Icons';
import { useLanguage } from '../lib/language';

export const MyChakriBazar = () => {
    const { language } = useLanguage();
    const [activeTab, setActiveTab] = useState<'my_stats' | 'pro_stats'>('my_stats');
    const [timeFilter, setTimeFilter] = useState<'this_month' | 'all_time'>('this_month');

    return (
        <div className="min-h-screen bg-white pb-24 font-sans text-gray-800">

            {/* Header */}
            <div className="bg-[#059669] px-4 py-3 flex items-center justify-between text-white sticky top-0 z-50">
                <h1 className="text-lg font-bold">
                    {language === 'bn' ? 'আমার চাকরি বাজার' : 'My Chakri Bazar'}
                </h1>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Icons.Bell className="w-5 h-5 text-white" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border border-[#059669]">2</span>
                    </div>
                    <Icons.Mail className="w-5 h-5 text-white" />
                    <Icons.Search className="w-5 h-5 text-white" />
                    <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                        {/* Placeholder User Image */}
                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            {/* Plan Info */}
            <div className="px-4 py-3 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm">
                <div>
                    <p className="text-xs font-bold text-gray-600">Current Plan</p>
                    <p className="text-lg font-black text-[#065f46]">Free</p>
                </div>
                <button className="text-[10px] font-bold text-[#059669] border border-[#059669] px-3 py-1.5 rounded-full hover:bg-emerald-50 transition-colors">
                    {language === 'bn' ? 'চাকরি বাজার প্রো নিন' : 'Get Chakri Bazar Pro'}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 bg-white sticky top-14 z-40 shadow-sm">
                <button
                    onClick={() => setActiveTab('my_stats')}
                    className={`flex-1 py-3 text-sm font-bold text-center relative ${activeTab === 'my_stats' ? 'text-[#059669]' : 'text-gray-500'}`}
                >
                    My Stats
                    {activeTab === 'my_stats' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#059669]"></div>}
                </button>
                <button
                    onClick={() => setActiveTab('pro_stats')}
                    className={`flex-1 py-3 text-sm font-bold text-center relative ${activeTab === 'pro_stats' ? 'text-[#059669]' : 'text-gray-500'}`}
                >
                    {language === 'bn' ? 'চাকরি বাজার Pro Stats' : 'Chakri Bazar Pro Stats'}
                    {activeTab === 'pro_stats' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#059669]"></div>}
                </button>
            </div>

            {/* Stats Content */}
            <div className="p-4 bg-[#f8f9fa] min-h-[calc(100vh-200px)]">

                {activeTab === 'my_stats' ? (
                    <>
                        {/* Time Filter Toggle */}
                        <div className="flex justify-center mb-6">
                            <div className="bg-white rounded-lg border border-[#059669] flex overflow-hidden shadow-sm">
                                <button
                                    onClick={() => setTimeFilter('this_month')}
                                    className={`px-6 py-2 text-xs font-bold transition-colors ${timeFilter === 'this_month' ? 'bg-[#059669] text-white' : 'text-[#059669] hover:bg-emerald-50'}`}
                                >
                                    This Month
                                </button>
                                <button
                                    onClick={() => setTimeFilter('all_time')}
                                    className={`px-6 py-2 text-xs font-bold transition-colors border-l border-[#059669] ${timeFilter === 'all_time' ? 'bg-[#059669] text-white' : 'text-[#059669] hover:bg-emerald-50'}`}
                                >
                                    All time
                                </button>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            <div className="bg-white p-3 rounded-xl border border-[#059669] shadow-sm relative group active:scale-95 transition-transform h-24 flex flex-col justify-between cursor-pointer hover:bg-emerald-50">
                                <span className="text-2xl font-light text-gray-800">0</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-gray-600 leading-tight">Applied Jobs</span>
                                    <Icons.FileText className="w-5 h-5 text-[#059669]" />
                                </div>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-[#059669] shadow-sm relative group active:scale-95 transition-transform h-24 flex flex-col justify-between cursor-pointer hover:bg-emerald-50">
                                <span className="text-2xl font-light text-gray-800">0</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-gray-600 leading-tight">Emailed Resume</span>
                                    <Icons.Send className="w-5 h-5 text-[#059669]" />
                                </div>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-[#059669] shadow-sm relative group active:scale-95 transition-transform h-24 flex flex-col justify-between cursor-pointer hover:bg-emerald-50">
                                <span className="text-2xl font-light text-gray-800">0</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-gray-600 leading-tight">Saved Jobs</span>
                                    <Icons.Star className="w-5 h-5 text-[#059669] fill-[#059669]" />
                                </div>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-[#059669] shadow-sm relative group active:scale-95 transition-transform h-24 flex flex-col justify-between cursor-pointer hover:bg-emerald-50">
                                <span className="text-2xl font-light text-gray-800">0</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-gray-600 leading-tight">Followed Employer(s)</span>
                                    <Icons.Plus className="w-5 h-5 text-[#059669]" />
                                </div>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-[#059669] shadow-sm relative group active:scale-95 transition-transform h-24 flex flex-col justify-between cursor-pointer hover:bg-emerald-50">
                                <span className="text-2xl font-light text-gray-800">0</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-gray-600 leading-tight">Favourite Search</span>
                                    <Icons.Heart className="w-5 h-5 text-[#059669] fill-[#059669]" />
                                </div>
                            </div>
                        </div>

                        {/* Employer Activities */}
                        <div className="mb-6">
                            <h3 className="text-sm font-bold text-gray-700 mb-3">Employer Activities</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm h-20 flex flex-col justify-between">
                                    <span className="text-2xl font-light text-gray-800">0</span>
                                    <div className="flex items-center justify-between text-[#065f46]">
                                        <span className="text-[10px] font-bold text-gray-600">Profile View</span>
                                        <Icons.Eye className="w-4 h-4" />
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm h-20 flex flex-col justify-between">
                                    <span className="text-2xl font-light text-gray-800">0</span>
                                    <div className="flex items-center justify-between text-[#065f46]">
                                        <span className="text-[10px] font-bold text-gray-600">Employer Message</span>
                                        <Icons.MessageSquare className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* My Test / Interviews */}
                        <div className="mb-20">
                            <h3 className="text-sm font-bold text-gray-700 mb-3">My Test / Interviews</h3>
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 grid grid-cols-2 gap-y-6 gap-x-4">
                                {/* Live */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0 text-[#059669]">
                                        <Icons.Video className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[#059669] text-xs font-bold">Live</p>
                                        <p className="text-xl font-bold text-[#059669]">0</p>
                                    </div>
                                </div>
                                {/* Video */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center shrink-0 text-[#00acc1]">
                                        <Icons.Video className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[#00acc1] text-xs font-bold">Video</p>
                                        <p className="text-xl font-bold text-[#00acc1]">0</p>
                                    </div>
                                </div>
                                {/* General */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 text-[#1e88e5]">
                                        <Icons.Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[#1e88e5] text-xs font-bold">General</p>
                                        <p className="text-xl font-bold text-[#1e88e5]">0</p>
                                    </div>
                                </div>
                                {/* Online Test */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 text-[#1e88e5]">
                                        <Icons.FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[#1e88e5] text-xs font-bold">Online Test</p>
                                        <p className="text-xl font-bold text-[#1e88e5]">0</p>
                                    </div>
                                </div>
                                {/* Personality Test (Full width) */}
                                <div className="col-span-2 flex items-start gap-3 border-t border-gray-100 pt-4 mt-2">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0 text-[#ad1457]">
                                        <Icons.Brain className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[#ad1457] text-xs font-bold">Personality Test By Voice</p>
                                        <p className="text-xl font-bold text-[#ad1457]">0</p>
                                    </div>
                                </div>
                            </div>

                            {/* Last Updated */}
                            <div className="mt-4 bg-gray-50 rounded-xl border border-gray-200 p-4 flex justify-between items-center text-xs text-gray-500">
                                <div className="flex gap-2">
                                    <Icons.FileText className="w-4 h-4" />
                                    <span>{language === 'bn' ? 'চাকরি বাজার Profile:' : 'Chakri Bazar Profile:'}</span>
                                </div>
                                <span>23 Oct 2025</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                            <Icons.Lock className="w-10 h-10 text-[#059669]" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Unlock Pro Insights</h2>
                        <p className="text-gray-500 text-sm max-w-xs mb-6">
                            See who viewed your profile, get validation scores, and access advanced analytics with {language === 'bn' ? 'চাকরি বাজার Pro' : 'Chakri Bazar Pro'}.
                        </p>
                        <button className="bg-[#059669] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-emerald-700 transition-colors">
                            Get Pro Now
                        </button>
                    </div>
                )}
            </div>

            {/* Floating Action Button */}
            <div className="fixed bottom-28 right-4 z-[60]">
                <button className="w-14 h-14 bg-[#2e7d32] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-green-700 transition-colors active:scale-95 border-2 border-white">
                    <Icons.Settings className="w-7 h-7" />
                </button>
            </div>

        </div>
    );
};
