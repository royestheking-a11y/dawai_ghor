
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../lib/auth';
import { useLanguage } from '../lib/language';
import { Icons } from './Icons';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const toggleLang = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Close user menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Safe access helpers
  const userName = user?.name || 'User';
  const userInitial = userName.charAt(0).toUpperCase();
  const userEmail = user?.email || '';
  const userRole = user?.role || 'Member';

  return (
    <div className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 font-sans">

      {/* Top Bar - Subtle Emerald Tint */}
      <div className="hidden md:block bg-emerald-50 dark:bg-gray-800 border-b border-emerald-100 dark:border-gray-700 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">

          {/* Left Links */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 font-medium text-gray-600 dark:text-gray-300">
            <Link to="#" className="hover:text-emerald-600 transition-colors">{t.topbar.elearning}</Link>
            <span className="text-gray-300">|</span>
            <Link to="#" className="hover:text-emerald-600 transition-colors">{t.topbar.tender}</Link>
            <span className="text-gray-300">|</span>
            <Link to="#" className="hover:text-emerald-600 transition-colors">{t.topbar.expert}</Link>
            <span className="text-gray-300">|</span>
            <Link to="/recruiter/dashboard" className="hover:text-emerald-600 transition-colors">{t.topbar.recruiter}</Link>
            <span className="text-gray-300">|</span>
            <Link to="/pricing" className="hover:text-emerald-600 transition-colors">{t.topbar.postJob}</Link>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="flex items-center bg-white border border-emerald-200 rounded-full px-1 py-0.5 shadow-sm"
            >
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${language === 'en' ? 'bg-emerald-600 text-white' : 'text-gray-500 hover:text-emerald-600'}`}>ENG</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${language === 'bn' ? 'bg-emerald-600 text-white' : 'text-gray-500 hover:text-emerald-600'}`}>বাংলা</span>
            </button>

            <Link to="/contact" className="flex items-center gap-1 text-gray-600 hover:text-emerald-600 transition-colors font-semibold">
              <Icons.Phone className="w-3 h-3" />
              {t.topbar.contact}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">

            {/* Left Side: Logo & Main Menu */}
            <div className="flex items-center gap-8">
              {/* Logo - Removed the Box, used clean text + Icon */}
              <Link to="/" className="flex items-center gap-2 group">
                <div className="flex flex-col">
                  <span className="font-bold text-3xl text-emerald-600 leading-none tracking-tight font-sans">
                    {language === 'bn' ? 'চাকরি বাজার' : 'Chakri Bazar'}
                  </span>
                </div>
              </Link>

              {/* Desktop Menu Items */}
              <div className="hidden lg:flex items-center gap-6">

                {/* My চাকরি বাজার Dropdown (Mega Menu) */}
                <div className="relative group cursor-pointer">
                  <div className="flex items-center gap-1 text-gray-700 dark:text-gray-200 font-bold text-sm hover:text-emerald-600 transition-colors py-4">
                    {t.nav.myChakriBazar} <Icons.ChevronDown className="w-4 h-4" />
                  </div>

                  {/* Mega Menu Content */}
                  <div className="absolute top-full left-0 w-[600px] bg-white dark:bg-gray-800 shadow-2xl rounded-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 p-6 flex gap-8">

                    {/* Column 1: Profile Activities */}
                    <div className="flex-1">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                        {t.nav.myChakriBazarItems.activities}
                      </h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        <Link to="/me/dashboard" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 font-medium">
                          <div className="p-1.5 bg-emerald-50 text-emerald-500 rounded"><Icons.User className="w-4 h-4" /></div> {t.nav.myChakriBazarItems.profile}
                        </Link>
                        <Link to="/me/video-cv" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 font-medium">
                          <div className="p-1.5 bg-emerald-50 text-emerald-500 rounded"><Icons.Video className="w-4 h-4" /></div> {t.nav.myChakriBazarItems.videoCv}
                        </Link>
                        <Link to="/me/customized-cv" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 font-medium">
                          <div className="p-1.5 bg-emerald-50 text-emerald-500 rounded"><Icons.FileText className="w-4 h-4" /></div> {t.nav.myChakriBazarItems.customized}
                        </Link>
                        <Link to="/me/email-cv" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 font-medium">
                          <div className="p-1.5 bg-emerald-50 text-emerald-500 rounded"><Icons.Mail className="w-4 h-4" /></div> {t.nav.myChakriBazarItems.emailCv}
                        </Link>
                        <Link to="/me/profile-viewed" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 font-medium">
                          <div className="p-1.5 bg-emerald-50 text-emerald-500 rounded"><Icons.Eye className="w-4 h-4" /></div> {t.nav.myChakriBazarItems.viewed}
                        </Link>
                        <Link to="/me/employer-interested" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 font-medium">
                          <div className="p-1.5 bg-emerald-50 text-emerald-500 rounded"><Icons.Star className="w-4 h-4" /></div> {t.nav.myChakriBazarItems.interested}
                        </Link>
                        <Link to="/me/preferences" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 font-medium">
                          <div className="p-1.5 bg-emerald-50 text-emerald-500 rounded"><Icons.Settings className="w-4 h-4" /></div> {t.nav.myChakriBazarItems.preferences}
                        </Link>
                        <Link to="/me/applied-jobs" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 font-medium">
                          <div className="p-1.5 bg-emerald-50 text-emerald-500 rounded"><Icons.FileCheck className="w-4 h-4" /></div> {t.nav.myChakriBazarItems.applied}
                        </Link>
                      </div>
                    </div>

                    {/* Column 2: Invitations */}
                    <div className="w-48 shrink-0 border-l border-gray-100 pl-6">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                        {t.nav.myChakriBazarItems.invitations}
                      </h3>
                      <div className="space-y-3">
                        <Link to="/invitations/online-test" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 font-medium">
                          <div className="p-1.5 bg-blue-50 text-blue-500 rounded"><Icons.Monitor className="w-4 h-4" /></div> {t.nav.myChakriBazarItems.onlineTest}
                        </Link>
                        <Link to="/invitations/video-interview" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 font-medium">
                          <div className="p-1.5 bg-blue-50 text-blue-500 rounded"><Icons.Video className="w-4 h-4" /></div> {t.nav.myChakriBazarItems.videoInterview}
                        </Link>
                        <Link to="/invitations/general-interview" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 font-medium">
                          <div className="p-1.5 bg-blue-50 text-blue-500 rounded"><Icons.Users className="w-4 h-4" /></div> {t.nav.myChakriBazarItems.generalInterview}
                        </Link>
                        <Link to="/invitations/personality-test" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 font-medium">
                          <div className="p-1.5 bg-purple-50 text-purple-500 rounded"><Icons.Brain className="w-4 h-4" /></div> {t.nav.myChakriBazarItems.personality}
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Jobs Dropdown */}
                <div className="relative group cursor-pointer">
                  <div className="flex items-center gap-1 text-gray-700 dark:text-gray-200 font-bold text-sm hover:text-emerald-600 transition-colors py-4">
                    {t.nav.jobs} <Icons.ChevronDown className="w-4 h-4" />
                  </div>
                  <div className="absolute top-full left-0 w-[500px] bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Link to="/jobs" className="flex items-center gap-3 p-2 hover:bg-emerald-50 rounded-lg transition-colors">
                        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-full"><Icons.Search className="w-5 h-5" /></div>
                        <div>
                          <div className="font-bold text-gray-800 text-sm">{t.nav.jobsItems.general}</div>
                        </div>
                      </Link>
                      <Link to="/jobs?sort=new" className="flex items-center gap-3 p-2 hover:bg-emerald-50 rounded-lg transition-colors">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-full"><Icons.Briefcase className="w-5 h-5" /></div>
                        <div>
                          <div className="font-bold text-gray-800 text-sm">{t.nav.jobsItems.new}</div>
                        </div>
                      </Link>
                      <Link to="/jobs?type=deadline" className="flex items-center gap-3 p-2 hover:bg-emerald-50 rounded-lg transition-colors">
                        <div className="p-2 bg-red-100 text-red-600 rounded-full"><Icons.CalendarDays className="w-5 h-5" /></div>
                        <div>
                          <div className="font-bold text-gray-800 text-sm">{t.nav.jobsItems.deadline}</div>
                        </div>
                      </Link>
                      <Link to="/jobs?type=govt" className="flex items-center gap-3 p-2 hover:bg-emerald-50 rounded-lg transition-colors">
                        <div className="p-2 bg-green-100 text-green-600 rounded-full"><Icons.Building className="w-5 h-5" /></div>
                        <div>
                          <div className="font-bold text-gray-800 text-sm">{t.nav.jobsItems.govt}</div>
                        </div>
                      </Link>
                      <Link to="/jobs?type=parttime" className="flex items-center gap-3 p-2 hover:bg-emerald-50 rounded-lg transition-colors">
                        <div className="p-2 bg-orange-100 text-orange-600 rounded-full"><Icons.Clock className="w-5 h-5" /></div>
                        <div>
                          <div className="font-bold text-gray-800 text-sm">{t.nav.jobsItems.partTime}</div>
                        </div>
                      </Link>
                      <Link to="/jobs?type=contract" className="flex items-center gap-3 p-2 hover:bg-emerald-50 rounded-lg transition-colors">
                        <div className="p-2 bg-teal-100 text-teal-600 rounded-full"><Icons.FileText className="w-5 h-5" /></div>
                        <div>
                          <div className="font-bold text-gray-800 text-sm">{t.nav.jobsItems.contractual}</div>
                        </div>
                      </Link>
                      <Link to="/jobs?type=intern" className="flex items-center gap-3 p-2 hover:bg-emerald-50 rounded-lg transition-colors">
                        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full"><Icons.GraduationCap className="w-5 h-5" /></div>
                        <div>
                          <div className="font-bold text-gray-800 text-sm">{t.nav.jobsItems.intern}</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Career Resources Dropdown */}
                <div className="relative group cursor-pointer">
                  <div className="flex items-center gap-1 text-gray-700 dark:text-gray-200 font-bold text-sm hover:text-emerald-600 transition-colors py-4">
                    {t.nav.careerResources} <Icons.ChevronDown className="w-4 h-4" />
                  </div>
                  <div className="absolute top-full left-0 w-64 bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 p-2">
                    <div className="space-y-1">
                      <Link to="/blog" className="block px-4 py-2 hover:bg-emerald-50 rounded-lg text-sm text-gray-700 font-medium">{t.nav.resourcesItems.guide}</Link>
                      <Link to="/blog/interview" className="block px-4 py-2 hover:bg-emerald-50 rounded-lg text-sm text-gray-700 font-medium">{t.nav.resourcesItems.interview}</Link>
                      <Link to="/blog/resume" className="block px-4 py-2 hover:bg-emerald-50 rounded-lg text-sm text-gray-700 font-medium">{t.nav.resourcesItems.resume}</Link>
                      <Link to="/cover-letter" className="block px-4 py-2 hover:bg-emerald-50 rounded-lg text-sm text-gray-700 font-medium">{t.nav.resourcesItems.coverLetter}</Link>
                      <Link to="/articles" className="block px-4 py-2 hover:bg-emerald-50 rounded-lg text-sm text-gray-700 font-medium">{t.nav.resourcesItems.articles}</Link>
                      <Link to="/education" className="block px-4 py-2 hover:bg-emerald-50 rounded-lg text-sm text-gray-700 font-medium">{t.nav.resourcesItems.education}</Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Side: Auth & Employer Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {!user ? (
                <>
                  <Link
                    to="/signup"
                    className="px-6 py-2 rounded-lg border-2 border-emerald-100 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200 font-bold text-sm transition-all"
                  >
                    {t.nav.createAccount}
                  </Link>
                  <Link
                    to="/login"
                    className="px-6 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-sm shadow-lg shadow-emerald-200 transition-all"
                  >
                    {t.nav.signIn}
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-6">
                  {/* Notification Icon */}
                  <Link to="/notifications" className="relative p-2 text-gray-500 hover:text-emerald-600 transition-colors">
                    <Icons.Bell className="w-6 h-6" />
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></span>
                  </Link>

                  {/* User Dropdown - Click Activated */}
                  <div className="relative z-50" ref={userMenuRef}>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-3 py-2 focus:outline-none"
                    >
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center border-2 border-emerald-200 text-emerald-700 font-bold text-lg shadow-sm">
                        {userInitial}
                      </div>
                      <div className="hidden xl:block text-left">
                        <div className="text-sm font-bold text-gray-800 leading-none">{userName}</div>
                        <div className="text-[10px] text-gray-500 font-medium uppercase mt-1">{userRole}</div>
                      </div>
                      <Icons.ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isUserMenuOpen && (
                      <div className="absolute top-full right-0 w-64 bg-white shadow-2xl rounded-xl border border-gray-100 z-50 overflow-hidden mt-1 animate-in fade-in zoom-in-95 duration-100">
                        <div className="p-4 bg-gray-50 border-b border-gray-100">
                          <p className="font-bold text-gray-800 truncate">{userName}</p>
                          <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                        </div>
                        <div className="p-2">
                          {user?.role === 'admin' ? (
                            <>
                              <Link
                                to="/admin/dashboard"
                                className="flex items-center gap-3 px-4 py-2 hover:bg-emerald-50 rounded-lg text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <Icons.ShieldCheck className="w-4 h-4" /> Admin Panel
                              </Link>
                            </>
                          ) : user?.role === 'recruiter' ? (
                            <>
                              <Link
                                to="/recruiter/dashboard"
                                className="flex items-center gap-3 px-4 py-2 hover:bg-emerald-50 rounded-lg text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <Icons.LayoutDashboard className="w-4 h-4" /> Dashboard
                              </Link>
                              <Link
                                to="/recruiter/post-job"
                                className="flex items-center gap-3 px-4 py-2 hover:bg-emerald-50 rounded-lg text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <Icons.Plus className="w-4 h-4" /> Post a Job
                              </Link>
                              <Link
                                to="/recruiter/company"
                                className="flex items-center gap-3 px-4 py-2 hover:bg-emerald-50 rounded-lg text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <Icons.Building className="w-4 h-4" /> Company Profile
                              </Link>
                            </>
                          ) : (
                            <>
                              <Link
                                to="/me/dashboard"
                                className="flex items-center gap-3 px-4 py-2 hover:bg-emerald-50 rounded-lg text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <Icons.LayoutDashboard className="w-4 h-4" /> Dashboard
                              </Link>
                              <Link
                                to="/me/profile"
                                className="flex items-center gap-3 px-4 py-2 hover:bg-emerald-50 rounded-lg text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <Icons.User className="w-4 h-4" /> My Profile
                              </Link>
                              <Link
                                to="/me/applications"
                                className="flex items-center gap-3 px-4 py-2 hover:bg-emerald-50 rounded-lg text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <Icons.FileCheck className="w-4 h-4" /> Applications
                              </Link>
                            </>
                          )}
                          <div className="h-px bg-gray-100 my-2"></div>
                          <button
                            onClick={() => {
                              handleLogout();
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 rounded-lg text-sm text-gray-600 hover:text-red-600 transition-colors text-left"
                          >
                            <Icons.LogOut className="w-4 h-4" /> Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <Icons.X /> : <Icons.Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 p-4 space-y-4">
            {/* Mobile Language Toggle */}
            <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
              <span className="text-sm font-bold text-gray-600">{language === 'en' ? 'Language' : 'ভাষা'}</span>
              <button
                onClick={toggleLang}
                className="flex items-center bg-white border border-emerald-200 rounded-full px-1 py-0.5 shadow-sm"
              >
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${language === 'en' ? 'bg-emerald-600 text-white' : 'text-gray-500 hover:text-emerald-600'}`}>ENG</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${language === 'bn' ? 'bg-emerald-600 text-white' : 'text-gray-500 hover:text-emerald-600'}`}>বাংলা</span>
              </button>
            </div>

            <Link to="/jobs" className="block font-semibold text-gray-700">{t.nav.jobs}</Link>
            <Link to="/companies" className="block font-semibold text-gray-700">{t.nav.careerResources}</Link>
            <div className="border-t border-gray-100 pt-4 space-y-3">
              {!user ? (
                <>
                  <Link to="/signup" className="block w-full text-center py-2 border border-emerald-200 text-emerald-600 rounded-md font-bold">{t.nav.createAccount}</Link>
                  <Link to="/login" className="block w-full text-center py-2 bg-emerald-600 text-white rounded-md font-bold">{t.nav.signIn}</Link>
                </>
              ) : (
                <button onClick={handleLogout} className="block w-full text-center py-2 bg-gray-100 text-gray-700 rounded-md font-bold">Logout</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
