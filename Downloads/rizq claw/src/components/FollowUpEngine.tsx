import React, { useState } from 'react';
import type { Lead, FollowUpStage, LeadStatus } from '../types';
import { 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  ChevronRight,
  Building2,
  Calendar,
  RefreshCw,
  Zap,
  Mail,
  MapPin
} from 'lucide-react';

interface FollowUpEngineProps {
  leads: Lead[];
  onUpdateFollowUp: (leadId: string, stage: FollowUpStage, newStatus?: LeadStatus) => void;
}

const STAGE_CONFIG = [
  {
    stage: 'Day 1' as FollowUpStage,
    title: 'Initial Outreach Sent',
    desc: 'First personalized message delivered. System is waiting for prospect response signal.',
    delay: '24 hrs',
    color: 'blue',
    nextStage: 'Day 3' as FollowUpStage,
    nextStatus: 'Contacted' as LeadStatus,
  },
  {
    stage: 'Day 3' as FollowUpStage,
    title: 'Soft Follow-Up Reminder',
    desc: 'Gentle check-in. Keeps conversation at the top of their inbox without pressure.',
    delay: '3 Days',
    color: 'amber',
    nextStage: 'Day 7' as FollowUpStage,
    nextStatus: 'Replied' as LeadStatus,
  },
  {
    stage: 'Day 7' as FollowUpStage,
    title: 'Free Demo / Mock-Up Offer',
    desc: 'High-value offer. Custom interactive demo or live walkthrough to eliminate risk.',
    delay: '7 Days',
    color: 'purple',
    nextStage: 'Day 14' as FollowUpStage,
    nextStatus: 'Demo Sent' as LeadStatus,
  },
  {
    stage: 'Day 14' as FollowUpStage,
    title: 'Final ROI Value Close',
    desc: 'Closing sequence. Highlight ROI case study or limited promotional offer.',
    delay: '14 Days',
    color: 'maroon',
    nextStage: 'Day 14' as FollowUpStage,
    nextStatus: 'Meeting Booked' as LeadStatus,
  },
];

const TEMPLATES: Record<FollowUpStage, (lead: Lead) => string> = {
  'Day 1': (lead) => `Assalamu Alaikum ${lead.decisionMaker || 'Management Team'},\n\nI reviewed ${lead.businessName}'s digital profile in ${lead.location} and identified a key growth bottleneck: ${lead.needDetected.toLowerCase()}.\n\nRizQara Tech builds exactly what closes this gap: ${lead.serviceRecommended}.\n\nCould I share a 2-minute demo video with you today?`,
  'Day 3': (lead) => `Hi ${lead.decisionMaker || 'team'},\n\nJust following up on my message from a few days ago regarding ${lead.businessName} in ${lead.location}.\n\nI noticed businesses similar to yours in ${lead.category} who solved ${lead.needDetected.toLowerCase()} saw an average 3× increase in direct orders within 90 days.\n\nAre you available for a quick 2-minute walkthrough this week?`,
  'Day 7': (lead) => `Assalamu Alaikum ${lead.decisionMaker || 'team'},\n\nTo make this completely risk-free, our engineers at RizQara Tech prepared a live interactive demo of ${lead.serviceRecommended} specifically designed for a ${lead.category.toLowerCase()} like ${lead.businessName}.\n\nNo commitment required — just 2 minutes to see the exact system live.\n\nCan I send the secure demo link to your WhatsApp or email?`,
  'Day 14': (lead) => `Hello ${lead.decisionMaker || 'team'},\n\nThis is my final follow-up regarding the ${lead.needDetected.toLowerCase()} challenge at ${lead.businessName}.\n\nThis month, RizQara Tech is offering free POS hardware integration for ${lead.category} businesses in ${lead.location.split(',')[0]}. We have 2 spots remaining for this quarter.\n\nIf you'd like to secure one, please reply and I'll send the full proposal within 24 hours.`,
  'None': (lead) => `Assalamu Alaikum ${lead.decisionMaker || 'team'}, we noticed your business ${lead.businessName} may benefit from ${lead.serviceRecommended}.`,
};

export const FollowUpEngine: React.FC<FollowUpEngineProps> = ({ 
  leads, 
  onUpdateFollowUp 
}) => {
  const [activeStage, setActiveStage] = useState<FollowUpStage>('Day 3');
  const [executingId, setExecutingId] = useState<string | null>(null);
  const [logs, setLogs] = useState<{ leadId: string; msg: string; timestamp: string }[]>([]);

  // Show all leads in the selected stage queue
  // Day 1 = newly approved, not yet contacted
  // Day 3 = contacted, not yet replied
  // Day 7 = replied, sent to demo
  // Day 14 = demo sent, need final push
  const stageLeads = leads.filter((l) => {
    if (activeStage === 'Day 1') return l.approved && (l.followUpStage === 'None' || l.followUpStage === 'Day 1') && l.status !== 'Contacted';
    if (activeStage === 'Day 3') return l.followUpStage === 'Day 3' || l.status === 'Contacted';
    if (activeStage === 'Day 7') return l.followUpStage === 'Day 7' || l.status === 'Replied' || l.status === 'Interested';
    if (activeStage === 'Day 14') return l.followUpStage === 'Day 14' || l.status === 'Demo Sent';
    return false;
  });

  // Fallback: if no leads match stage, show all approved leads for usability
  const displayLeads = stageLeads.length > 0 ? stageLeads : leads.filter(l => l.approved);

  const handleTriggerFollowUp = (lead: Lead, stage: FollowUpStage) => {
    setExecutingId(lead.id);
    const config = STAGE_CONFIG.find(s => s.stage === stage)!;
    setTimeout(() => {
      onUpdateFollowUp(lead.id, config.nextStage, config.nextStatus);
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-BD', { hour: '2-digit', minute: '2-digit' });
      setLogs(prev => [{
        leadId: lead.id,
        msg: `✅ ${stage} sequence dispatched to ${lead.businessName}. Status → "${config.nextStatus}". Next touch: ${config.nextStage}.`,
        timestamp: timeStr
      }, ...prev]);
      setExecutingId(null);
    }, 1400);
  };

  const activeConfig = STAGE_CONFIG.find(s => s.stage === activeStage)!;
  return (
    <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-amber-50 text-amber-800 px-3.5 py-1.5 rounded-full text-xs font-extrabold mb-2 border border-amber-200 shadow-2xs">
            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Multi-Touch Follow-Up Automation</span>
          </div>
          <h1 className="text-3xl font-extrabold text-maroon-950 font-['Outfit']">
            Follow-Up Engine
          </h1>
          <p className="text-gray-600 text-sm mt-1 max-w-2xl">
            80% of local business owners don't reply on the first attempt. RizQ Claw auto-schedules and triggers Day 3, Day 7, and Day 14 multi-channel sequences to maximize conversion.
          </p>
        </div>

        <div className="bg-gradient-to-br from-maroon-800 to-maroon-950 text-white p-5 rounded-2xl shadow-lg border border-maroon-700 space-y-1 w-full md:w-auto shrink-0">
          <div className="text-xs text-maroon-300 font-bold uppercase tracking-wider flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
            <span>Active Sequences</span>
          </div>
          <div className="text-3xl font-extrabold font-['Outfit'] text-white">
            {leads.filter(l => l.approved).length} <span className="text-sm font-bold text-maroon-200">Prospects</span>
          </div>
          <div className="text-xs text-maroon-300">
            {leads.filter(l => l.status === 'Meeting Booked' || l.status === 'Converted').length} meetings booked
          </div>
        </div>
      </div>

      {/* Stage Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAGE_CONFIG.map((st) => {
          const isActive = activeStage === st.stage;
          const count = leads.filter((l) => {
            if (st.stage === 'Day 1') return l.approved && (l.followUpStage === 'None' || l.followUpStage === 'Day 1') && l.status !== 'Contacted';
            if (st.stage === 'Day 3') return l.followUpStage === 'Day 3' || l.status === 'Contacted';
            if (st.stage === 'Day 7') return l.followUpStage === 'Day 7' || l.status === 'Replied' || l.status === 'Interested';
            if (st.stage === 'Day 14') return l.followUpStage === 'Day 14' || l.status === 'Demo Sent';
            return false;
          }).length;

          return (
            <button
              key={st.stage}
              onClick={() => setActiveStage(st.stage)}
              className={`p-5 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${
                isActive
                  ? 'bg-maroon-900 text-white border-maroon-900 shadow-xl shadow-maroon-900/25'
                  : 'bg-white text-gray-800 border-gray-200 hover:border-maroon-400 hover:bg-maroon-50/30'
              }`}
            >
              <div className={`text-[10px] font-extrabold px-2 py-0.5 rounded absolute top-0 right-0 rounded-bl-xl font-mono uppercase ${isActive ? 'bg-yellow-300 text-maroon-950' : 'bg-gray-100 text-gray-600'}`}>
                {st.delay}
              </div>
              <div className={`text-xs font-extrabold uppercase tracking-widest font-mono ${isActive ? 'text-yellow-300' : 'text-maroon-700'}`}>
                {st.stage}
              </div>
              <h3 className={`font-extrabold text-base mt-1 font-['Outfit'] leading-snug ${isActive ? 'text-white' : 'text-maroon-950'}`}>
                {st.title}
              </h3>
              <p className={`text-xs mt-1 line-clamp-2 ${isActive ? 'text-maroon-100' : 'text-gray-500'}`}>
                {st.desc}
              </p>
              <div className={`mt-3 pt-2 border-t flex items-center justify-between text-xs font-extrabold ${isActive ? 'border-white/15 text-white' : 'border-gray-200 text-maroon-900'}`}>
                <span>{count} queued</span>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Execution Log Toast */}
      {logs.length > 0 && (
        <div className="space-y-2">
          {logs.slice(0, 3).map((log, i) => (
            <div key={i} className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm font-semibold flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="flex-1">{log.msg}</span>
              <span className="text-xs text-emerald-600 font-mono shrink-0">{log.timestamp}</span>
            </div>
          ))}
        </div>
      )}

      {/* Template Preview + Lead Rows */}
      <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-gray-100 gap-4">
          <div>
            <h3 className="font-extrabold text-2xl text-maroon-950 font-['Outfit']">
              {activeConfig.title} Queue
            </h3>
            <p className="text-xs text-gray-500 mt-1">Click 'Execute Sequence' to dispatch automated outreach to each prospect</p>
          </div>
          <span className="bg-maroon-100 text-maroon-950 px-4 py-2 rounded-xl text-xs font-extrabold shrink-0 border border-maroon-200 font-mono">
            {activeStage} Template Active
          </span>
        </div>

        {/* Template Sample */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-maroon-50 to-amber-50 border border-maroon-200 space-y-2.5">
          <div className="flex items-center space-x-2 text-xs font-extrabold text-maroon-950 font-['Outfit']">
            <MessageSquare className="w-4 h-4 text-maroon-700 shrink-0" />
            <span>AI Template Preview ({activeStage}):</span>
          </div>
          <p className="text-xs text-maroon-950 font-mono italic leading-relaxed pl-6 border-l-2 border-maroon-600 line-clamp-3">
            &ldquo;{TEMPLATES[activeStage](leads[0] || { decisionMaker: '[Name]', businessName: '[Business]', location: '[Location]', needDetected: '[Need]', serviceRecommended: '[Service]' } as Lead)}&rdquo;
          </p>
        </div>

        {/* Lead Rows */}
        <div className="space-y-4">
          {displayLeads.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Clock className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="font-semibold">No prospects currently in this stage.</p>
              <p className="text-sm mt-1">Approve leads in the AI Sales Brain or advance them from earlier stages.</p>
            </div>
          ) : (
            displayLeads.map((lead) => (
              <div 
                key={lead.id}
                className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200 hover:border-maroon-400 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-2xs hover:shadow-md"
              >
                <div className="space-y-1.5 min-w-0 flex-1 pr-4">
                  <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                    <Building2 className="w-4 h-4 text-maroon-700 shrink-0" />
                    <span className="font-extrabold text-maroon-950 text-base">{lead.businessName}</span>
                    <span className="bg-white text-maroon-900 px-2 py-0.5 rounded text-[10px] font-extrabold border border-gray-200 uppercase font-mono shadow-2xs">
                      {lead.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold border font-mono ${lead.approved ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span>{lead.location} &bull; 📞 {lead.phone}</span>
                  </p>
                  <div className="flex items-center space-x-4 pt-1 text-xs">
                    <span className="text-gray-500">Contact: <strong className="text-maroon-800">{lead.decisionMaker || 'Owner'}</strong></span>
                    <span className="text-gray-500">Score: <strong className="text-maroon-950">{lead.score}/100</strong></span>
                    <span className="text-gray-500">Deal: <strong className="text-emerald-700">${lead.estimatedDealValue}</strong></span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
                  <div className="text-xs font-extrabold text-gray-600 bg-white px-4 py-2.5 rounded-xl border border-gray-200 text-center font-mono">
                    Stage: <strong className="text-maroon-900">{lead.followUpStage}</strong>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      title={`Send via Email to ${lead.email || lead.phone}`}
                      className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-all"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                    <button
                      title={`Send via Direct Message to ${lead.phone}`}
                      className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleTriggerFollowUp(lead, activeStage)}
                    disabled={executingId === lead.id}
                    className="w-full sm:w-auto bg-gradient-to-r from-maroon-700 to-maroon-900 hover:from-maroon-800 hover:to-maroon-950 text-white font-extrabold px-5 py-3 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 text-xs font-['Outfit'] disabled:opacity-75"
                  >
                    {executingId === lead.id ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-yellow-300 shrink-0" />
                        <span>Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
                        <span>Execute {activeStage}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
