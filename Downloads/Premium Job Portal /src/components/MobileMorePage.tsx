import { Link } from 'react-router';
import { Icons } from './Icons';
import { useLanguage } from '../lib/language';

export const MobileMorePage = () => {
  const { language } = useLanguage();
  const menuGroups = [
    {
      title: "PROFILE ACTIVITIES",
      items: [
        { label: language === 'bn' ? "চাকরি বাজার Profile" : "Chakri Bazar Profile", icon: Icons.User, path: "/me/profile" },
        { label: "Video CV", icon: Icons.Video, path: "/me/video-cv" },
        { label: "Customized CV", icon: Icons.FileText, path: "/me/customized-cv" },
        { label: "Email CV", icon: Icons.Mail, path: "/me/email-cv" },
        { label: "Profile Viewed", icon: Icons.Eye, path: "/me/profile-viewed" },
        { label: "Employer Interested", icon: Icons.Briefcase, path: "/me/employer-interested" },
        { label: "Profile Preference", icon: Icons.Settings, path: "/me/preferences" },
        { label: "Applied Jobs", icon: Icons.FileCheck, path: "/me/applied-jobs" },
      ]
    },
    {
      title: "INVITATIONS",
      items: [
        { label: "Online Test", icon: Icons.Monitor, path: "/invitations/online-test" },
        { label: "Video Interview", icon: Icons.Video, path: "/invitations/video-interview" },
        { label: "General Interview", icon: Icons.Users, path: "/invitations/general-interview" },
        { label: "Personality Test", icon: Icons.Brain, path: "/invitations/personality-test" },
      ]
    },
    {
      title: "General Search",
      items: [
        { label: "New Jobs", icon: Icons.Zap, path: "/jobs/new" },
        { label: "Deadline Tomorrow", icon: Icons.Clock, path: "/jobs/deadline-tomorrow" },
        { label: "Government Jobs", icon: Icons.Building, path: "/jobs/government" },
        { label: "Part Time Jobs", icon: Icons.Clock, path: "/jobs/part-time" },
        { label: "Contractual Jobs", icon: Icons.FileText, path: "/jobs/contractual" },
        { label: "Intern Jobs", icon: Icons.GraduationCap, path: "/jobs/internship" },
      ]
    },
    {
      title: "Career Guide",
      items: [
        { label: "Interview Tips", icon: Icons.Lightbulb, path: "/guide/interview-tips" },
        { label: "Resume Writing Tips", icon: Icons.PenTool, path: "/guide/resume-tips" },
        { label: "Cover Letter", icon: Icons.FileText, path: "/guide/cover-letter" },
        { label: "Articles", icon: Icons.Newspaper, path: "/guide/articles" },
      ]
    },
    {
      title: "Education Guide",
      items: [
        { label: "Education Resources", icon: Icons.BookOpen, path: "/education/resources" },
        { label: "Training Courses", icon: Icons.GraduationCap, path: "/education/training" },
        { label: "Scholarships", icon: Icons.Star, path: "/education/scholarships" },
      ]
    },
    {
      title: "CAREER TOOLS",
      items: [
        { label: "CV Builder", icon: Icons.FileSignature, path: "/cv-builder" },
        { label: "Skill Tests", icon: Icons.Zap, path: "/skills" },
        { label: "Talent Search", icon: Icons.Search, path: "/talent-search" },
        { label: "Get Verified", icon: Icons.ShieldCheck, path: "/get-verified" },
      ]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24 md:hidden">
      <div className="bg-[#059669] text-white p-4 pt-10 sticky top-0 z-10 shadow-md">
         <h1 className="text-xl font-bold">More</h1>
      </div>

      <div className="p-4 space-y-6">
        {menuGroups.map((group, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-50/50 px-4 py-3 border-b border-gray-100">
               <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{group.title}</h2>
            </div>
            <div className="divide-y divide-gray-50">
               {group.items.map((item, itemIndex) => (
                 <Link 
                   key={itemIndex} 
                   to={item.path}
                   className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors active:bg-gray-100"
                 >
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-[#059669]">
                       <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 flex-1">{item.label}</span>
                    <Icons.ChevronRight className="w-4 h-4 text-gray-300" />
                 </Link>
               ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
