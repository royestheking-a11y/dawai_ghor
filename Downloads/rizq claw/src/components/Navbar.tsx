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
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-maroon-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-maroon-600 to-maroon-900 flex items-center justify-center p-1.5 shadow-md shadow-maroon-600/20">
              <img src="/rizq claw.png" alt="RizQ Claw Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl tracking-tight text-maroon-950 font-['Outfit']">RizQ Claw</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-maroon-100 text-maroon-800 px-2 py-0.5 rounded-full border border-maroon-200">
                  v1 Hybrid AI
                </span>
              </div>
              <p className="text-[11px] text-maroon-600 font-medium">RizQara Tech Acquisition Agent</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isActive 
                      ? 'bg-maroon-600 text-white shadow-md shadow-maroon-600/20' 
                      : 'text-gray-600 hover:text-maroon-900 hover:bg-maroon-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white text-maroon-600' : 'bg-maroon-600 text-white'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions & Status */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Trust Scoring Active</span>
            </div>

            <button
              onClick={() => setActiveTab('settings')}
              className={`p-2 rounded-lg border transition-all ${
                activeTab === 'settings'
                  ? 'bg-maroon-600 text-white border-maroon-600'
                  : 'border-maroon-200 text-maroon-900 hover:bg-maroon-50'
              }`}
              title="System Settings & API Configuration"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Mobile menu overflow navigation */}
        <div className="flex xl:hidden overflow-x-auto py-2 space-x-1 border-t border-gray-100 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-maroon-600 text-white shadow-sm shadow-maroon-600/20' 
                    : 'text-gray-600 hover:bg-maroon-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className="bg-maroon-100 text-maroon-800 ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold">
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
