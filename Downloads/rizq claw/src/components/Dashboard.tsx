import React from 'react';
import type { Lead, ActivityLog } from '../types';
import { 
  Users, 
  TrendingUp, 
  Sparkles, 
  Bot, 
  ExternalLink,
  Building2,
  PhoneCall,
  CheckCircle2,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';

interface DashboardProps {
  leads: Lead[];
  logs: ActivityLog[];
  setActiveTab: (tab: string) => void;
  onSelectLeadForAudit: (lead: Lead) => void;
  onSelectLeadForMessage: (lead: Lead) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  leads,
  logs,
  setActiveTab,
  onSelectLeadForAudit,
  onSelectLeadForMessage
}) => {
  const totalLeads = leads.length;
  const hotLeads = leads.filter(l => l.score >= 80);
  const contactedLeads = leads.filter(l => ['Contacted', 'Replied', 'Interested', 'Demo Sent', 'Meeting Booked', 'Proposal Sent', 'Converted'].includes(l.status));
  const convertedLeads = leads.filter(l => l.status === 'Converted');
  
  const estimatedPipeline = leads
    .filter(l => ['Interested', 'Demo Sent', 'Meeting Booked', 'Proposal Sent', 'Converted'].includes(l.status))
    .reduce((sum, l) => sum + (l.estimatedDealValue || 650), 0);

  const conversionRate = totalLeads > 0 ? ((convertedLeads.length / totalLeads) * 100).toFixed(1) : '0';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Welcome & System Status Banner */}
      <div className="bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="space-y-3 z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>RizQ Claw Pipeline V1.2 &bull; Authenticated</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-['Outfit'] leading-tight">
            Autonomous Client Generation Engine
          </h1>
          <p className="text-maroon-100 text-sm md:text-base leading-relaxed font-light">
            Harvest real businesses across Bangladesh, verify decision makers, analyze digital service deficits, generate AI outreach, and close premium contracts.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 flex flex-col space-y-3 z-10 w-full md:w-80">
          <span className="text-xs text-maroon-200 uppercase tracking-widest font-bold font-mono">Quick Actions</span>
          <button
            onClick={() => setActiveTab('hunter')}
            className="w-full bg-yellow-300 hover:bg-yellow-400 text-maroon-950 font-extrabold py-3 px-4 rounded-xl shadow-lg transition-all text-sm flex items-center justify-center space-x-2 font-['Outfit']"
          >
            <Sparkles className="w-4 h-4 text-maroon-800" />
            <span>Harvest New Prospects</span>
          </button>
          <button
            onClick={() => setActiveTab('sales-brain')}
            className="w-full bg-white/20 hover:bg-white/30 text-white font-extrabold py-3 px-4 rounded-xl transition-all text-sm flex items-center justify-center space-x-2 font-['Outfit']"
          >
            <Bot className="w-4 h-4 text-yellow-300" />
            <span>Launch AI Sales Brain</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white rounded-3xl p-6 border border-maroon-100 shadow-sm flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block font-['Outfit']">Total Harvested Prospects</span>
            <div className="text-3xl font-extrabold text-maroon-950 font-['Outfit']">{totalLeads}</div>
            <p className="text-xs text-emerald-600 font-semibold flex items-center space-x-1 pt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+12 this week</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-maroon-50 text-maroon-700 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-maroon-100 shadow-sm flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block font-['Outfit']">Prime Hot Leads (&gt;80 Pts)</span>
            <div className="text-3xl font-extrabold text-orange-600 font-['Outfit']">{hotLeads.length}</div>
            <p className="text-xs text-orange-600 font-semibold flex items-center space-x-1 pt-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Severe digital deficit</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-maroon-100 shadow-sm flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block font-['Outfit']">Active Pipeline Value</span>
            <div className="text-3xl font-extrabold text-maroon-900 font-['Outfit']">${estimatedPipeline.toLocaleString()}</div>
            <p className="text-xs text-emerald-600 font-semibold flex items-center space-x-1 pt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>High closing odds</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-maroon-100 shadow-sm flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block font-['Outfit']">Outreach &amp; Conversion</span>
            <div className="text-3xl font-extrabold text-blue-900 font-['Outfit']">{contactedLeads.length} <span className="text-sm font-normal text-gray-500 font-sans">({conversionRate}% won)</span></div>
            <p className="text-xs text-blue-600 font-semibold flex items-center space-x-1 pt-1">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Multi-channel active</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Main Grid: Hot Prospects & Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Hot Leads Queue */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h3 className="font-extrabold text-xl text-maroon-950 font-['Outfit'] flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Urgent Priority Prospects (Trust Score &gt; 80)</span>
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">High probability prospects with major website/order system deficits</p>
            </div>
            <button
              onClick={() => setActiveTab('pipeline')}
              className="text-xs font-extrabold text-maroon-700 hover:text-maroon-900 flex items-center space-x-1 font-['Outfit']"
            >
              <span>View Full CRM Pipeline</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {hotLeads.map((lead) => (
              <div 
                key={lead.id} 
                className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200 hover:border-maroon-300 hover:bg-maroon-50/20 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="space-y-1.5 max-w-lg">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
                    <h4 className="font-extrabold text-base text-maroon-950">{lead.businessName}</h4>
                    <span className="bg-white text-maroon-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase border border-gray-200 shadow-2xs">
                      {lead.category}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 font-mono">
                    📍 {lead.location} &bull; ⭐️ {lead.rating} ({lead.reviewCount} Reviews) &bull; 📞 {lead.phone}
                  </p>

                  <div className="text-xs font-semibold text-gray-700 bg-white p-2.5 rounded-xl border border-gray-200">
                    🔥 Gap: <strong className="text-red-700">{lead.needDetected}</strong> &rarr; Pitch: <strong className="text-maroon-900">{lead.serviceRecommended}</strong>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end justify-between space-y-3 w-full sm:w-auto">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-extrabold bg-maroon-100 text-maroon-950 px-2.5 py-1 rounded-lg">
                      {lead.score} Pts
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      ${lead.estimatedDealValue || 750}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onSelectLeadForAudit(lead)}
                      className="bg-white hover:bg-gray-100 text-gray-800 font-bold px-3 py-1.5 rounded-lg text-xs transition-all border border-gray-300 shadow-2xs"
                    >
                      Audit
                    </button>
                    <button
                      onClick={() => onSelectLeadForMessage(lead)}
                      className="bg-maroon-700 hover:bg-maroon-800 text-white font-extrabold px-3.5 py-1.5 rounded-lg text-xs transition-all shadow-md font-['Outfit']"
                    >
                      Draft Copy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time System Execution Stream */}
        <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm space-y-6 flex flex-col">
          <div className="pb-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-xl text-maroon-950 font-['Outfit']">Execution Stream</h3>
              <p className="text-xs text-gray-500 mt-0.5">Live events from Harvester &amp; Follow-up bots</p>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto max-h-[550px] pr-2 scrollbar-none font-mono text-xs">
            {logs.map((log) => (
              <div key={log.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1.5 hover:border-maroon-300 transition-all">
                <div className="flex items-center justify-between text-gray-400 text-[10px]">
                  <span className="font-bold uppercase text-maroon-800 flex items-center space-x-1 font-sans">
                    <Building2 className="w-3 h-3" />
                    <span>{log.leadName}</span>
                  </span>
                  <span>{log.timestamp}</span>
                </div>
                <p className="text-gray-800 leading-relaxed font-sans font-medium text-xs">
                  {log.action}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveTab('extension')}
            className="w-full bg-gray-100 hover:bg-maroon-50 hover:text-maroon-950 font-extrabold py-3 rounded-xl transition-all text-xs text-gray-700 flex items-center justify-center space-x-2 font-['Outfit']"
          >
            <span>Launch Chrome Companion Sim</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
