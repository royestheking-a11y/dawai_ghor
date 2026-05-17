import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Search, 
  CheckSquare, 
  Brain, 
  KanbanSquare, 
  Clock, 
  FileText, 
  Compass, 
  Settings,
  ShieldCheck,
  ChevronDown,
  LogOut
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hotLeadsCount: number;
  pendingApprovals: number;
  onLogout: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  hotLeadsCount,
  pendingApprovals,
  onLogout 
}) => {
  const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mainTabs: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'hunter', label: 'Lead Hunter', icon: Search },
    { id: 'audit', label: 'Digital Audit', icon: CheckSquare },
    { id: 'sales-brain', label: 'AI Sales Brain', icon: Brain, badge: pendingApprovals > 0 ? pendingApprovals : undefined },
    { id: 'pipeline', label: 'CRM Pipeline', icon: KanbanSquare, badge: hotLeadsCount > 0 ? hotLeadsCount : undefined },
  ];

  const moreTabs: NavItem[] = [
    { id: 'followup', label: 'Follow-ups', icon: Clock },
    { id: 'proposals', label: 'Proposals', icon: FileText },
    { id: 'extension', label: 'Extension Sim', icon: Compass },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isMoreActive = moreTabs.some(t => t.id === activeTab);
  const activeMoreTab = moreTabs.find(t => t.id === activeTab);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-maroon-100 shadow-sm">
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand (Bigger logo, no borders, clean title) */}
          <div 
            className="flex items-center space-x-3 cursor-pointer shrink-0 group" 
            onClick={() => setActiveTab('dashboard')}
          >
            <img 
              src="/rizq claw.png" 
              alt="RizQ Claw Brand Logo" 
              className="w-16 h-16 object-contain group-hover:scale-105 transition-transform filter drop-shadow-md shrink-0" 
            />
            <span className="font-extrabold text-2xl tracking-tight text-maroon-950 font-['Outfit'] whitespace-nowrap">
              RizQ Claw
            </span>
          </div>

          {/* Main Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1.5 overflow-visible">
            {mainTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs xl:text-sm font-extrabold transition-all duration-200 relative whitespace-nowrap ${
                    isActive 
                      ? 'bg-maroon-700 text-white shadow-md shadow-maroon-700/25 scale-102' 
                      : 'text-gray-600 hover:text-maroon-950 hover:bg-maroon-50/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span className="absolute -top-2.5 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-extrabold shadow-md border-2 border-white bg-red-600 text-white z-10 font-mono">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Overflow "More Sections" Dropdown with Arrow */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs xl:text-sm font-extrabold transition-all duration-200 whitespace-nowrap ${
                  isMoreActive 
                    ? 'bg-maroon-100 text-maroon-950 border border-maroon-200 shadow-2xs font-extrabold' 
                    : 'text-gray-600 hover:text-maroon-950 hover:bg-maroon-50/80'
                }`}
              >
                <span>{activeMoreTab ? activeMoreTab.label : 'More Sections'}</span>
                <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isMoreOpen ? 'rotate-180 text-maroon-700' : 'text-gray-500'}`} />
              </button>

              {isMoreOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-maroon-100 py-2 z-50 animate-scaleUp">
                  {moreTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setIsMoreOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-xs font-extrabold transition-colors text-left whitespace-nowrap ${
                          isActive 
                            ? 'bg-maroon-50 text-maroon-900 border-l-4 border-maroon-700 pl-3' 
                            : 'text-gray-700 hover:bg-gray-50 hover:text-maroon-950'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-maroon-700' : 'text-gray-500'}`} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Actions & Status */}
          <div className="flex items-center space-x-2.5 shrink-0">
            <div className="hidden md:flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-full border border-emerald-200 text-xs font-extrabold shadow-2xs shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="whitespace-nowrap">Trust Scoring Active</span>
            </div>

            <button
              onClick={() => setActiveTab('settings')}
              className={`p-2.5 rounded-xl border transition-all shadow-2xs shrink-0 ${
                activeTab === 'settings'
                  ? 'bg-maroon-700 text-white border-maroon-700 shadow-md shadow-maroon-700/20'
                  : 'bg-white border-maroon-200 text-maroon-900 hover:bg-maroon-50'
              }`}
              title="System Settings & API Configuration"
            >
              <Settings className="w-5 h-5 shrink-0" />
            </button>

            <button
              onClick={onLogout}
              className="p-2.5 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-900 transition-all shadow-2xs shrink-0"
              title="Secure System Logout"
            >
              <LogOut className="w-5 h-5 shrink-0" />
            </button>
          </div>

        </div>

        {/* Mobile menu overflow navigation */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 space-x-2 border-t border-gray-100 scrollbar-none">
          {[...mainTabs, ...moreTabs].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all relative shrink-0 ${
                  isActive 
                    ? 'bg-maroon-700 text-white shadow-sm shadow-maroon-700/20' 
                    : 'text-gray-600 bg-gray-50/80 hover:bg-maroon-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className="bg-red-600 text-white ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold font-mono border border-white/20">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
