import { useState } from 'react';
import { Icons } from '../components/Icons';
import { useNavigate } from 'react-router';
import { useLanguage } from '../lib/language';

export const More = () => {
    const { language } = useLanguage();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Profile Activities');

    const tabs = ['Profile Activities', 'Jobs', 'Invitations', 'My Personal Hiring', 'Others Features', 'Support', 'About Us'];

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Adjust for header offset
            window.scrollBy(0, -150);
        }
        setActiveTab(tabs.find(t => t.toLowerCase().includes(sectionId.replace('-', ' '))) || 'Profile Activities');
    };

    // Icons mapping for visual consistency
    const CircleIcon = ({ icon: Icon, color, bgColor }: { icon: any, color: string, bgColor: string }) => (
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${bgColor}`}>
            <Icon className={`w-7 h-7 ${color}`} />
        </div>
    );

    const ServiceItem = ({ icon: Icon, label, color = "text-[#065f46]", bgColor = "bg-emerald-50", badge, onClick }: { icon: any, label: string, color?: string, bgColor?: string, badge?: string, onClick?: () => void }) => (
        <div
            onClick={onClick}
            className="flex flex-col items-center text-center w-full active:scale-95 transition-transform relative cursor-pointer"
        >
            {badge && (
                <span className="absolute -top-1 -right-0 bg-[#ffc107] text-[#4e342e] text-[8px] font-bold px-1.5 py-0.5 rounded-full z-10 shadow-sm border border-yellow-200">{badge}</span>
            )}
            <CircleIcon icon={Icon} color={color} bgColor={bgColor} />
            <span className="text-[10px] text-gray-700 font-medium leading-tight h-8 flex items-center justify-center max-w-[80px]">{label}</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans">

            {/* Header */}
            <div className="bg-[#059669] px-4 py-3 flex items-center justify-between text-white sticky top-0 z-50 shadow-md">
                <h1 className="text-xl font-bold">More</h1>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Icons.Bell className="w-5 h-5 text-white" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border border-[#059669]">2</span>
                    </div>
                    <Icons.Mail className="w-5 h-5 text-white" />
                    <Icons.Search className="w-5 h-5 text-white" />
                    <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200" onClick={() => navigate('/me/profile')}>
                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-4">

                {/* Top 3 Cards */}
                <div className="grid grid-cols-3 gap-3">
                    <div
                        onClick={() => navigate('/me/profile')}
                        className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm flex flex-col items-center text-center active:scale-95 transition-transform cursor-pointer"
                    >
                        <CircleIcon icon={Icons.UserCog} color="text-[#1976d2]" bgColor="bg-blue-50" />
                        <span className="text-[10px] font-bold text-gray-700">Manage Profile</span>
                    </div>
                    <div
                        onClick={() => navigate('/me/applied-jobs')}
                        className="bg-white p-3 rounded-lg border-gray-100 shadow-sm flex flex-col items-center text-center active:scale-95 transition-transform border cursor-pointer"
                    >
                        <CircleIcon icon={Icons.FileText} color="text-[#059669]" bgColor="bg-emerald-50" />
                        <span className="text-[10px] font-bold text-gray-700">Applied Jobs</span>
                    </div>
                    <div
                        onClick={() => navigate('/me/followed-employers')}
                        className="bg-white p-3 rounded-lg border-gray-100 shadow-sm flex flex-col items-center text-center active:scale-95 transition-transform border cursor-pointer"
                    >
                        <CircleIcon icon={Icons.Building} color="text-[#059669]" bgColor="bg-emerald-50" />
                        <span className="text-[10px] font-bold text-gray-700">Followed Employers</span>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Search Features" className="w-full pl-9 pr-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]" />
                </div>

                {/* Navigation Tabs (Scrollable) */}
                <div className="flex overflow-x-auto no-scrollbar gap-6 pb-2 border-b border-gray-200 sticky top-14 bg-gray-50 z-40 -mx-4 px-4 bg-gray-50/95 backdrop-blur-sm">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab);
                                let targetId = '';
                                if (tab === 'Profile Activities') targetId = 'profile-activities';
                                else if (tab === 'Jobs') targetId = 'jobs';
                                else if (tab === 'Invitations') targetId = 'invitations';
                                else if (tab === 'My Personal Hiring') targetId = 'hiring';
                                else if (tab === 'Others Features') targetId = 'others';
                                else if (tab === 'Support') targetId = 'support';
                                else if (tab === 'About Us') targetId = 'about';

                                if (targetId) scrollToSection(targetId);
                            }}
                            className={`text-sm font-bold whitespace-nowrap pb-1 relative transition-colors ${activeTab === tab ? 'text-[#059669]' : 'text-gray-500'}`}
                        >
                            {tab}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#059669] rounded-full"></div>}
                        </button>
                    ))}
                </div>

                {/* Profile Activities */}
                <div id="profile-activities" className="space-y-4 pt-4 -mt-20">
                    <h3 className="text-sm font-bold text-[#065f46]">Profile Activities</h3>
                    <div className="grid grid-cols-4 gap-y-6">
                        <ServiceItem 
                            onClick={() => navigate('/me/profile')} 
                            icon={Icons.User} 
                            label={language === 'bn' ? 'চাকরি বাজার প্রোফাইল' : 'Chakri Bazar Profile'} 
                            color="text-[#1976d2]" 
                            bgColor="bg-blue-50" 
                        />
                        <ServiceItem onClick={() => navigate('/me/video-cv')} icon={Icons.Video} label="Video CV" color="text-[#059669]" bgColor="bg-emerald-50" />
                        <ServiceItem onClick={() => navigate('/cv-builder')} icon={Icons.FileSignature} label="Premium CV Builder" color="text-[#059669]" bgColor="bg-emerald-50" badge="New" />
                        <ServiceItem onClick={() => navigate('/me/email-cv')} icon={Icons.Mail} label="Emailed CV" color="text-[#1976d2]" bgColor="bg-blue-50" />

                        <ServiceItem onClick={() => navigate('/me/profile-viewed')} icon={Icons.Eye} label="Profile Viewed" color="text-[#1976d2]" bgColor="bg-blue-50" />
                        <ServiceItem onClick={() => navigate('/me/employer-interested')} icon={Icons.Star} label="Employer Interested" color="text-[#1976d2]" bgColor="bg-blue-50" badge="New" />
                        <ServiceItem onClick={() => navigate('/me/preferences')} icon={Icons.UserCheck} label="Profile Preference" color="text-[#1976d2]" bgColor="bg-blue-50" />
                    </div>
                </div>

                <hr className="border-gray-200" />

                {/* Jobs */}
                <div id="jobs" className="space-y-4 pt-4 -mt-4">
                    <h3 className="text-sm font-bold text-[#065f46]">Jobs</h3>
                    <div className="grid grid-cols-4 gap-y-6">
                        <ServiceItem onClick={() => navigate('/jobs')} icon={Icons.Search} label="General Search" color="text-[#059669]" bgColor="bg-emerald-50" />
                        <ServiceItem onClick={() => navigate('/jobs/early-access')} icon={Icons.Clock} label="Early Access Jobs" color="text-[#1976d2]" bgColor="bg-blue-50" badge="PRO" />
                        <ServiceItem onClick={() => navigate('/jobs/new-jobs')} icon={Icons.Briefcase} label="New Jobs" color="text-[#1976d2]" bgColor="bg-blue-50" />
                        <ServiceItem onClick={() => navigate('/jobs/deadline-tomorrow')} icon={Icons.CalendarDays} label="Deadline Tomorrow" color="text-[#059669]" bgColor="bg-emerald-50" />

                        <ServiceItem onClick={() => navigate('/jobs/part-time')} icon={Icons.Briefcase} label="Part Time Jobs" color="text-[#1976d2]" bgColor="bg-blue-50" />
                        <ServiceItem onClick={() => navigate('/jobs/contractual')} icon={Icons.FileText} label="Contractual Jobs" color="text-[#1976d2]" bgColor="bg-blue-50" />
                        <ServiceItem onClick={() => navigate('/jobs/government')} icon={Icons.Building} label="Government Jobs" color="text-[#059669]" bgColor="bg-emerald-50" />
                        <ServiceItem onClick={() => navigate('/jobs/intern')} icon={Icons.GraduationCap} label="Intern Jobs" color="text-[#059669]" bgColor="bg-emerald-50" badge="New" />
                    </div>
                </div>

                <hr className="border-gray-200" />

                {/* Invitations */}
                <div id="invitations" className="space-y-4 pt-4 -mt-4">
                    <h3 className="text-sm font-bold text-[#065f46]">Invitations</h3>
                    <div className="grid grid-cols-4 gap-y-6">
                        <ServiceItem onClick={() => navigate('/invitations/interview')} icon={Icons.Users} label="Interview Invitation" color="text-[#1976d2]" bgColor="bg-blue-50" />
                        <ServiceItem onClick={() => navigate('/invitations/video')} icon={Icons.Video} label="Video Interview" color="text-[#059669]" bgColor="bg-emerald-50" />
                        <ServiceItem onClick={() => navigate('/invitations/chat')} icon={Icons.MessageSquare} label="Live Chat" color="text-[#1976d2]" bgColor="bg-blue-50" />
                    </div>
                </div>

                <hr className="border-gray-200" />

                {/* My Personal Hiring */}
                <div id="hiring" className="space-y-4 pt-4 -mt-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-[#065f46]">My Personal Hiring</h3>
                        <span className="bg-[#fff9c4] text-[#fbc02d] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#fff59d]">New</span>
                    </div>
                    <div className="grid grid-cols-4 gap-y-6">
                        <ServiceItem onClick={() => navigate('/my-hiring/post')} icon={Icons.Plus} label="Post New Job" color="text-[#059669]" bgColor="bg-emerald-50" />
                        <ServiceItem onClick={() => navigate('/my-hiring')} icon={Icons.LayoutDashboard} label="Dashboard" color="text-[#065f46]" bgColor="bg-[#ecfdf5]" />
                        <ServiceItem onClick={() => navigate('/my-hiring/help')} icon={Icons.HelpCircle} label="Help" color="text-[#0288d1]" bgColor="bg-[#e1f5fe]" />
                    </div>
                </div>

                <hr className="border-gray-200" />

                {/* Others Features */}
                <div id="others" className="space-y-4 pt-4 -mt-4">
                    <h3 className="text-sm font-bold text-[#065f46]">Others Features</h3>
                    <div className="grid grid-cols-4 gap-y-6">
                        <ServiceItem onClick={() => navigate('/talent-search')} icon={Icons.Search} label="Talent Search" color="text-[#059669]" bgColor="bg-emerald-50" />
                        <ServiceItem onClick={() => navigate('/get-verified')} icon={Icons.ShieldCheck} label="Get Verified" color="text-[#1976d2]" bgColor="bg-blue-50" badge="New" />
                        <ServiceItem onClick={() => navigate('/skills')} icon={Icons.Zap} label="Skill Tests" color="text-[#059669]" bgColor="bg-emerald-50" badge="New" />
                        <ServiceItem onClick={() => navigate('/services/sms-alert')} icon={Icons.MessageSquare} label="SMS Job Alert" color="text-[#1976d2]" bgColor="bg-blue-50" />
                        <ServiceItem onClick={() => navigate('/services/career-counseling')} icon={Icons.BookOpen} label="Career Counseling" color="text-[#059669]" bgColor="bg-emerald-50" badge="New" />
                        <ServiceItem onClick={() => navigate('/services/qr-scanner')} icon={Icons.QrCode} label="QR Code Scanner" color="text-[#1976d2]" bgColor="bg-blue-50" badge="New" />
                        <ServiceItem onClick={() => navigate('/services/whats-new')} icon={Icons.Megaphone} label="What's New" color="text-[#1976d2]" bgColor="bg-blue-50" badge="New" />
                    </div>
                </div>

                <hr className="border-gray-200" />

                {/* Support */}
                <div id="support" className="space-y-4 pt-4 -mt-4">
                    <h3 className="text-sm font-bold text-[#065f46]">Support</h3>
                    <div className="grid grid-cols-4 gap-y-6">
                        <ServiceItem onClick={() => navigate('/settings')} icon={Icons.Settings} label="Settings" color="text-[#059669]" bgColor="bg-emerald-50" />
                        <ServiceItem onClick={() => navigate('/transactions')} icon={Icons.Coins} label="Transaction Overview" color="text-[#059669]" bgColor="bg-emerald-50" />
                        <ServiceItem onClick={() => navigate('/guide/app-guides')} icon={Icons.BookOpen} label="App Guides" color="text-[#1976d2]" bgColor="bg-blue-50" />
                        <ServiceItem onClick={() => navigate('/contact')} icon={Icons.Phone} label="Contact Us" color="text-[#1976d2]" bgColor="bg-blue-50" />
                    </div>
                </div>

                <hr className="border-gray-200" />

                {/* About Us */}
                <div id="about" className="space-y-4 pt-4 -mt-4">
                    <h3 className="text-sm font-bold text-[#065f46]">About Us</h3>
                    <div className="grid grid-cols-4 gap-y-6">
                        <ServiceItem onClick={() => navigate('/feedback')} icon={Icons.Headphones} label="Feedback and Support" color="text-[#059669]" bgColor="bg-emerald-50" />
                        <ServiceItem onClick={() => navigate('/privacy')} icon={Icons.ShieldCheck} label="Privacy Policy" color="text-[#1976d2]" bgColor="bg-blue-50" />
                        <ServiceItem onClick={() => navigate('/terms')} icon={Icons.FileText} label="Terms and Policies" color="text-[#1976d2]" bgColor="bg-blue-50" />
                    </div>
                </div>

            </div>

        </div>
    );
};
