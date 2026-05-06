
import { Icons } from './Icons';
import { Link, useLocation } from 'react-router';
import { useLanguage } from '../lib/language';

export const MobileBottomNav = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const path = location.pathname;

  const NavItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active?: boolean }) => (
    <Link to={to} className="flex flex-col items-center justify-end pb-3 gap-1 flex-1 relative z-10 h-full group">
      <div className={`transition-colors duration-200 ${active ? 'text-[#059669]' : 'text-gray-500 group-hover:text-gray-700'}`}>
        <Icon className={active ? "w-6 h-6 fill-current" : "w-6 h-6"} strokeWidth={active ? 0 : 2} />
      </div>
      <span className={`text-[10px] font-bold ${active ? 'text-[#059669]' : 'text-gray-500 group-hover:text-gray-700'}`}>{label}</span>
    </Link>
  );

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 filter drop-shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
      {/* 
         SVG Background with Smooth Dip 
         Height of SVG area: 70px.
         Curve depth: 35px from top.
       */}
      <div className="absolute inset-0 bottom-0 pointer-events-none text-white h-[80px] -top-[10px]">
        <svg className="w-full h-full fill-white" viewBox="0 0 375 80" preserveAspectRatio="none">
          <path d="M 0 10 L 138 10 C 138 10, 158 10, 163 25 Q 187.5 55 212 25 C 217 10, 237 10, 237 10 L 375 10 L 375 80 L 0 80 Z" />
        </svg>
      </div>

      <div className="relative h-[70px] flex justify-between items-end pb-1 px-2">
        <NavItem
          to="/"
          icon={Icons.Home}
          label="Home"
          active={path === '/'}
        />

        <NavItem
          to="/my-hiring"
          icon={Icons.Search}
          label="My Hiring"
          active={path.includes('/my-hiring')}
        />

        {/* Floating Question Button - Perfectly centered in the dip */}
        <div className="w-20 h-full flex flex-col items-center justify-end pb-2 relative z-50 -mt-10 pointer-events-none">
          <button className="pointer-events-auto w-14 h-14 bg-white rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.15)] flex items-center justify-center mb-1 group relative active:scale-95 transition-transform border border-gray-100">
            <div className="w-[50px] h-[50px] bg-white rounded-full border-2 border-emerald-50 flex items-center justify-center text-[#059669]">
              <span className="font-serif text-2xl font-bold italic">?</span>
              {/* "Question" Text Ring Effect */}
              <div className="absolute inset-0 animate-spin-slow opacity-20">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path id="textCurve" d="M 25 50 A 25 25 0 1 1 75 50" fill="none" />
                </svg>
              </div>
            </div>
          </button>
          <span className="text-[10px] font-bold text-gray-500">Question</span>
        </div>

        <NavItem
          to="/me/profile"
          icon={Icons.User}
          label={language === 'bn' ? 'চাকরি বাজার' : 'Chakri Bazar'}
          active={path === '/me/profile'}
        />

        <NavItem
          to="/more"
          icon={Icons.LayoutGrid}
          label="More"
          active={path === '/more'}
        />
      </div>

      {/* Safe Area Fill */}
      <div className="h-safe bg-white w-full absolute bottom-0 -z-10" />
    </div>
  );
};
