import React from 'react';
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
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hotLeadsCount: number;
  pendingApprovals: number;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  hotLeadsCount,
  pendingApprovals 
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'hunter', label: 'Lead Hunter', icon: Search },
    { id: 'audit', label: 'Digital Audit', icon: CheckSquare },
    { id: 'sales-brain', label: 'AI Sales Brain', icon: Brain, badge: pendingApprovals > 0 ? pendingApprovals : undefined },
    { id: 'pipeline', label: 'CRM Pipeline', icon: KanbanSquare, badge: hotLeadsCount > 0 ? hotLeadsCount : undefined },
    { id: 'followup', label: 'Follow-ups', icon: Clock },
    { id: 'proposals', label: 'Proposals', icon: FileText },
    { id: 'extension', label: 'Extension Sim', icon: Compass },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-maroon-100 shadow-sm">
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3.5 cursor-pointer shrink-0" onClick={() => setActiveTab('dashboard')}>
            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-maroon-200 flex items-center justify-center p-1.5 shadow-lg shadow-maroon-950/10 hover:scale-105 transition-transform">
              <img src="/rizq claw.png" alt="RizQ Claw Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-2xl tracking-tight text-maroon-950 font-['Outfit'] whitespace-nowrap">RizQ Claw</span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-maroon-100 text-maroon-800 px-2.5 py-0.5 rounded-full border border-maroon-200 shrink-0 font-mono shadow-2xs">
                  v1 Hybrid AI
                </span>
              </div>
              <p className="text-xs text-maroon-700 font-extrabold hidden sm:block whitespace-nowrap tracking-wide">RizQara Tech Acquisition Agent</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1.5 overflow-visible">
            {tabs.map((tab) => {
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
          </nav>

          {/* Actions & Status */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="hidden md:flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-full border border-emerald-200 text-xs font-extrabold shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="whitespace-nowrap">Trust Scoring Active</span>
            </div>

            <button
              onClick={() => setActiveTab('settings')}
              className={`p-2.5 rounded-xl border transition-all shadow-2xs ${
                activeTab === 'settings'
                  ? 'bg-maroon-700 text-white border-maroon-700 shadow-md shadow-maroon-700/20'
                  : 'bg-white border-maroon-200 text-maroon-900 hover:bg-maroon-50'
              }`}
              title="System Settings & API Configuration"
            >
              <Settings className="w-5 h-5 shrink-0" />
            </button>
          </div>

        </div>

        {/* Mobile menu overflow navigation */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 space-x-2 border-t border-gray-100 scrollbar-none">
          {tabs.map((tab) => {
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
