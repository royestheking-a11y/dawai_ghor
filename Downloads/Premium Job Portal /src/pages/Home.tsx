
import React, { useState } from 'react';
import { Icons } from '../components/Icons';
import { Link, useNavigate } from 'react-router';
import { useLanguage } from '../lib/language';
import heroBg from '../assets/b80ecdd2cc8e6018baee447f2017df9de87fa021.png';

export const Home = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [jobQuery, setJobQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'category' | 'industry'>('category');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/jobs?q=${encodeURIComponent(jobQuery)}`);
  };

  const categories = [
    { name: t.categories.items.accounting, count: 377 },
    { name: t.categories.items.bank, count: 119 },
    { name: t.categories.items.supplyChain, count: 127 },
    { name: t.categories.items.education, count: 284 },
    { name: t.categories.items.engineer, count: 343 },
    { name: t.categories.items.garments, count: 512 },
    { name: t.categories.items.hr, count: 172 },
    { name: t.categories.items.management, count: 146 },
    { name: t.categories.items.medical, count: 208 },
    { name: t.categories.items.it, count: 22 },
    { name: t.categories.items.marketing, count: 46 },
    { name: t.categories.items.customerSupport, count: 35 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">

      {/* Hero Section */}
      <div className="relative bg-emerald-50 dark:bg-gray-800 pb-32">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Hero Background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/95 via-white/80 to-emerald-50/50 dark:from-gray-900 dark:to-gray-800/80 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Left Content */}
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                {t.hero.title}
                <span className="text-emerald-600">.</span>
              </h1>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 p-2 rounded-lg border border-emerald-100 dark:border-gray-700 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-200/50">
                    <Icons.BarChart className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide leading-none mb-1">{t.hero.stats.liveJobs}</div>
                    <div className="text-lg font-bold text-gray-800 dark:text-white leading-none">5,015</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 p-2 rounded-lg border border-emerald-100 dark:border-gray-700 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-200/50">
                    <Icons.Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide leading-none mb-1">{t.hero.stats.vacancies}</div>
                    <div className="text-lg font-bold text-gray-800 dark:text-white leading-none">19k+</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 p-2 rounded-lg border border-emerald-100 dark:border-gray-700 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-full bg-emerald-400 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-200/50">
                    <Icons.Building className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide leading-none mb-1">{t.hero.stats.companies}</div>
                    <div className="text-lg font-bold text-gray-800 dark:text-white leading-none">2,954</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 p-2 rounded-lg border border-emerald-100 dark:border-gray-700 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-full bg-emerald-300 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-200/50">
                    <Icons.Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide leading-none mb-1">{t.hero.stats.newJobs}</div>
                    <div className="text-lg font-bold text-gray-800 dark:text-white leading-none">280</div>
                  </div>
                </div>
              </div>

              {/* Compact Search Box - Moved UP via negative margin in main area, but spacing adjusted here */}
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 relative z-20">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
                  <div className="flex-[2] bg-gray-50 dark:bg-gray-700 rounded flex items-center border border-gray-200 dark:border-gray-600 focus-within:border-emerald-400 transition-colors h-12">
                    <Icons.Briefcase className="ml-3 text-gray-400 w-5 h-5 shrink-0" />
                    <input
                      type="text"
                      placeholder={t.hero.search.keywordPlaceholder}
                      className="w-full h-full px-3 bg-transparent outline-none text-gray-700 dark:text-gray-200 text-sm font-medium placeholder-gray-400"
                      value={jobQuery}
                      onChange={(e) => setJobQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded flex items-center border border-gray-200 dark:border-gray-600 focus-within:border-emerald-400 transition-colors h-12 relative">
                    <Icons.Building className="ml-3 text-gray-400 w-5 h-5 shrink-0" />
                    <select className="w-full h-full px-3 bg-transparent outline-none text-gray-700 dark:text-gray-200 text-sm font-medium appearance-none cursor-pointer z-10">
                      <option>{t.hero.search.orgTypePlaceholder}</option>
                      <option value="govt">{t.hero.search.orgType.govt}</option>
                      <option value="private">{t.hero.search.orgType.private}</option>
                      <option value="ngo">{t.hero.search.orgType.ngo}</option>
                    </select>
                    <Icons.ChevronDown className="absolute right-3 text-gray-400 w-4 h-4 pointer-events-none" />
                  </div>
                  <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 px-8 rounded shadow-md transition-all uppercase tracking-wide text-sm flex items-center justify-center gap-2 shrink-0">
                    {t.hero.search.searchBtn} <Icons.Search className="w-4 h-4" />
                  </button>
                </form>

                {/* Filter Tags */}
                <div className="flex flex-wrap gap-2 mt-3 px-1">
                  <Link to="/jobs?loc=dhaka" className="text-gray-600 hover:text-emerald-600 text-[11px] font-bold bg-gray-100 hover:bg-emerald-50 px-3 py-1.5 rounded transition-colors border border-gray-200 hover:border-emerald-200 shadow-sm">Dhaka (3556)</Link>
                  <Link to="/jobs?loc=chittagong" className="text-gray-600 hover:text-emerald-600 text-[11px] font-bold bg-gray-100 hover:bg-emerald-50 px-3 py-1.5 rounded transition-colors border border-gray-200 hover:border-emerald-200 shadow-sm">Chattogram (406)</Link>
                  <Link to="/jobs?loc=sylhet" className="text-gray-600 hover:text-emerald-600 text-[11px] font-bold bg-gray-100 hover:bg-emerald-50 px-3 py-1.5 rounded transition-colors border border-gray-200 hover:border-emerald-200 shadow-sm">Sylhet (114)</Link>
                  <Link to="/jobs?loc=khulna" className="text-gray-600 hover:text-emerald-600 text-[11px] font-bold bg-gray-100 hover:bg-emerald-50 px-3 py-1.5 rounded transition-colors border border-gray-200 hover:border-emerald-200 shadow-sm">Khulna (123)</Link>
                </div>
              </div>
            </div>

            {/* Right Sidebar: Quick Links */}
            <div className="w-full lg:w-72 shrink-0 hidden lg:block">
              <div className="bg-[#064e3b] text-white rounded-lg shadow-xl overflow-hidden border border-emerald-800">
                <div className="p-3 font-bold border-b border-emerald-800 text-sm flex items-center gap-2 bg-[#065f46]">
                  <Icons.Link className="w-4 h-4" />
                  {t.hero.search.quickLinksTitle}
                </div>
                <div className="text-xs divide-y divide-emerald-800/50">
                  {[
                    { label: t.hero.search.employerList, count: 2955 },
                    { label: t.hero.search.newJobs, count: 281 },
                    { label: t.hero.search.deadlineTomorrow, count: 421 },
                    { label: t.hero.search.internship, count: 55, new: true },
                    { label: t.hero.search.contractual, count: 173 },
                    { label: t.hero.search.partTime, count: 32 },
                    { label: t.hero.search.overseas, count: 52 },
                    { label: t.hero.search.workFromHome, count: 80 },
                    { label: t.hero.search.fresher, count: 1357 },
                  ].map((item, i) => (
                    <Link key={i} to="#" className="block px-4 py-2.5 hover:bg-[#065f46] transition-colors flex items-center gap-2 relative group">
                      <Icons.ChevronRight className="w-3 h-3 text-emerald-300 group-hover:text-white transition-colors" />
                      <span className="truncate">{item.label}</span>
                      <span className="opacity-70 ml-1">({item.count})</span>
                      {item.new && <span className="bg-yellow-400 text-black text-[9px] font-bold px-1.5 py-0.5 rounded ml-auto shadow-sm">NEW</span>}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Overlapping Margin to reduce Gap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 pb-12">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Categories - Tighter spacing */}
          <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3 border-b border-gray-100 pb-3">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Icons.Grid className="w-5 h-5 text-emerald-600" />
                {t.categories.title}
              </h2>
              <div className="flex p-1 bg-gray-100 dark:bg-gray-700 rounded-lg shrink-0">
                <button
                  onClick={() => setActiveTab('category')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${activeTab === 'category' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {t.categories.tabCategory}
                </button>
                <button
                  onClick={() => setActiveTab('industry')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${activeTab === 'industry' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {t.categories.tabIndustry}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 text-sm">
              {categories.map((cat, idx) => (
                <Link key={idx} to={`/jobs?cat=${cat.name}`} className="group flex items-center p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-gray-700 transition-all border border-transparent hover:border-emerald-100">
                  <div className="w-1.5 h-1.5 bg-gray-300 group-hover:bg-emerald-600 rounded-full mr-2 transition-colors"></div>
                  <span className="text-gray-600 dark:text-gray-300 group-hover:text-emerald-700 font-semibold text-[13px] truncate">{cat.name}</span>
                  <span className="ml-auto text-gray-400 text-[10px] font-bold bg-gray-100 px-1.5 py-0.5 rounded-full group-hover:bg-emerald-200 group-hover:text-emerald-700">{cat.count}</span>
                </Link>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 text-right">
              <Link to="/jobs" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
                {t.categories.viewAll} <Icons.ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Right Column: Govt & Featured */}
          <div className="w-full lg:w-80 shrink-0 space-y-4 pt-2">

            {/* Govt Jobs Box - Style matched to screenshot */}
            <div className="bg-white dark:bg-gray-800 border border-green-200 dark:border-green-900/30 p-4 rounded-xl shadow-sm relative overflow-hidden group hover:border-green-300 transition-colors">
              {/* Watermark Icon */}
              <div className="absolute top-0 right-0 p-2 opacity-[0.05] group-hover:opacity-10 transition-opacity">
                <Icons.Building className="w-24 h-24 text-green-700" />
              </div>

              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2 relative z-10 text-sm">
                <div className="p-1.5 bg-green-100 rounded text-green-700"><Icons.Building className="w-4 h-4" /></div>
                {t.categories.govtJobs}
              </h3>

              <ul className="space-y-3 text-sm relative z-10">
                <li className="bg-green-50/50 dark:bg-gray-700/50 p-3 rounded-lg border border-green-100/50 hover:border-green-400 transition-colors cursor-pointer">
                  <div className="font-bold text-gray-800 dark:text-gray-300 text-xs mb-1">বাংলাদেশ বিমান বাহিনী</div>
                  <div className="text-gray-500 text-[10px] flex items-center gap-1"><Icons.User className="w-3 h-3" /> অফিসার ক্যাডেট</div>
                </li>
                <li className="bg-green-50/50 dark:bg-gray-700/50 p-3 rounded-lg border border-green-100/50 hover:border-green-400 transition-colors cursor-pointer">
                  <div className="font-bold text-gray-800 dark:text-gray-300 text-xs mb-1">বাংলাদেশ সেনাবাহিনী</div>
                  <div className="text-gray-500 text-[10px] flex items-center gap-1"><Icons.User className="w-3 h-3" /> সৈনিক পদে নিয়োগ</div>
                </li>
              </ul>

              <div className="mt-4 flex justify-between items-center text-[10px] font-bold text-green-700 relative z-10">
                <Link to="/jobs?type=govt" className="hover:underline bg-green-50 px-3 py-1 rounded-full">{t.categories.viewAll} (3)</Link>
              </div>
            </div>

            {/* Featured Job Box */}
            <div className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-blue-900/30 p-4 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-blue-200">
              <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold text-sm border-b border-gray-100 pb-2">
                <Icons.Globe className="w-4 h-4" />
                বিদেশের চাকরি
              </div>
              <div className="space-y-3">
                <div className="flex gap-3 group cursor-pointer hover:bg-blue-50/50 p-1 rounded transition-colors">
                  <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center text-[10px] font-bold text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">EF</div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white text-xs group-hover:text-blue-600 transition-colors">Euro Foods Group</h4>
                    <p className="text-[10px] text-gray-500">Head of Finance</p>
                  </div>
                </div>
                <div className="flex gap-3 group cursor-pointer hover:bg-blue-50/50 p-1 rounded transition-colors">
                  <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center text-[10px] font-bold text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">EF</div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white text-xs group-hover:text-blue-600 transition-colors">Euro Foods Group</h4>
                    <p className="text-[10px] text-gray-500">Sales Analyst</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Hot Jobs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <div className="p-1 bg-red-100 rounded text-red-600"><Icons.Zap className="w-4 h-4" /></div>
          {t.categories.hotJobs}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-emerald-300 transition-all flex items-start gap-3 group cursor-pointer h-full">
              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 border border-gray-100 group-hover:border-emerald-200 transition-colors">
                <Icons.Building className="text-gray-300 group-hover:text-emerald-400 w-5 h-5 transition-colors" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-gray-800 dark:text-gray-200 text-xs group-hover:text-emerald-600 transition-colors truncate">
                  Leading Company {item}
                </h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                  Senior Executive (Marketing)
                </p>
                <div className="mt-1.5 text-[10px] font-semibold bg-gray-50 text-gray-500 inline-block px-1.5 py-0.5 rounded border border-gray-100 group-hover:border-emerald-100 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  Dhaka
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Government Jobs (Unified UI) */}
      <div className="bg-white dark:bg-gray-900 py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <div className="p-1.5 bg-green-100 rounded text-green-700"><Icons.Building className="w-4 h-4" /></div>
              Government Jobs
            </h2>
            <Link to="/jobs?type=govt" className="text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-full transition-colors">View All <Icons.ArrowRight className="w-3 h-3" /></Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-green-300 transition-all group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm group-hover:text-green-700 transition-colors">Ministry of Public Admin</h3>
                  <span className="bg-green-50 text-green-700 border border-green-100 text-[10px] px-2 py-0.5 rounded-full font-bold">Active</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Assistant Director (General), 12th Grade</p>
                <div className="flex justify-between items-center text-[10px] text-gray-500 pt-3 border-t border-gray-50 mt-auto">
                  <span className="flex items-center gap-1"><Icons.CalendarDays className="w-3 h-3 text-gray-400" /> Deadline: 12 Oct</span>
                  <button className="text-green-600 font-bold hover:underline flex items-center gap-1">Details <Icons.ChevronRight className="w-3 h-3" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning & Tenders (Unified UI) */}
      <div className="bg-gray-50 dark:bg-gray-800 py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Learning */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="p-1.5 bg-blue-100 rounded text-blue-600"><Icons.BookOpen className="w-4 h-4" /></div>
                Skill Development
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all hover:border-blue-300 group cursor-pointer">
                    <div className={`h-20 ${i === 1 ? 'bg-blue-50' : 'bg-purple-50'} rounded-lg mb-3 flex items-center justify-center`}>
                      {i === 1 ? <Icons.Video className="w-8 h-8 text-blue-300 group-hover:text-blue-500 transition-colors" /> : <Icons.Brain className="w-8 h-8 text-purple-300 group-hover:text-purple-500 transition-colors" />}
                    </div>
                    <h3 className="font-bold text-gray-800 dark:text-white text-sm mb-1 group-hover:text-blue-600 truncate">{i === 1 ? 'Web Development' : 'Soft Skills Mastery'}</h3>
                    <p className="text-[10px] text-gray-500">Professional Certificate</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tenders */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="p-1.5 bg-orange-100 rounded text-orange-600"><Icons.Scroll className="w-4 h-4" /></div>
                Latest Tenders
              </h2>
              <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm divide-y divide-gray-100 dark:divide-gray-600">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 hover:bg-orange-50/30 dark:hover:bg-orange-900/10 transition-colors flex items-start gap-3 group cursor-pointer">
                    <div className="mt-1 p-1 bg-orange-50 rounded text-orange-500"><Icons.FileText className="w-3 h-3" /></div>
                    <div>
                      <h4 className="font-bold text-xs text-gray-800 dark:text-gray-200 group-hover:text-orange-600 transition-colors line-clamp-1">Supply of IT Equipment for Project X</h4>
                      <div className="flex gap-3 mt-1 text-[10px] text-gray-500">
                        <span>ID: 88472{i}</span>
                        <span className="text-orange-600 font-semibold">Closing: 2{i} Oct</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose চাকরি বাজার (Premium UI) */}
      <div className="bg-white dark:bg-gray-900 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { title: "Easy to Use", icon: Icons.CheckCircle, desc: "Streamlined user-interface to easily manage your jobs and candidates." },
              { title: "Cost Effective", icon: Icons.Handshake, desc: "Competitive pricing for posting jobs directly or indexing automatically." },
              { title: "Quality Candidate", icon: Icons.Users, desc: "Large pool of candidates with diverse skill sets and experience levels." }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center group p-6 rounded-2xl hover:bg-emerald-50/50 transition-colors border border-transparent hover:border-emerald-100">
                <div className="w-16 h-16 bg-white border border-gray-100 rounded-full shadow-lg shadow-emerald-100/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-emerald-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-emerald-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-emerald-200">
            <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-1/4 -translate-y-1/4">
              <Icons.Briefcase className="w-64 h-64" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to find the perfect candidate?</h2>
                <p className="text-emerald-100 text-sm max-w-md">Join thousands of companies growing their teams with {language === 'bn' ? 'চাকরি বাজার' : 'Chakri Bazar'}.</p>
              </div>
              <div className="flex gap-4">
                <Link to="/pricing" className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold py-3 px-8 rounded-lg shadow-lg transition-all text-sm">Post a Job</Link>
                <Link to="/contact" className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all text-sm border border-emerald-500">Contact Sales</Link>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
