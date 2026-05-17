import React, { useState } from 'react';
import type { Lead, FollowUpStage, LeadStatus } from '../types';
import { 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ChevronRight,
  Building2,
  Calendar
} from 'lucide-react';

interface FollowUpEngineProps {
  leads: Lead[];
  onUpdateFollowUp: (leadId: string, stage: FollowUpStage, newStatus?: LeadStatus) => void;
}

export const FollowUpEngine: React.FC<FollowUpEngineProps> = ({ 
  leads, 
  onUpdateFollowUp 
}) => {
  const [activeTab, setActiveTab] = useState<FollowUpStage>('Day 3');
  const [simulatedLog, setSimulatedLog] = useState<string | null>(null);

  const followUpStages: { stage: FollowUpStage; title: string; desc: string; template: string; delay: string }[] = [
    {
      stage: 'Day 1',
      title: 'Initial Outreach Sent',
      desc: 'First personalized message sent. Waiting for prospect response.',
      template: 'Assalamu Alaikum, I reviewed your profile and noticed the gap in digital ordering...',
      delay: '24 hours'
    },
    {
      stage: 'Day 3',
      title: 'Soft Follow-Up Reminder',
      desc: 'Gentle check-in after initial delivery. Keeps conversation at the top of their WhatsApp/Email inbox.',
      template: 'Hi [Name], just checking if you had a moment to review my earlier note? We are assisting similar businesses in your area with automated customer onboarding.',
      delay: '3 Days'
    },
    {
      stage: 'Day 7',
      title: 'Free Mock-up / Demo Offer',
      desc: 'High-value value proposition. Proposing a custom interactive mock-up or live 2-minute video walkthrough.',
      template: 'Assalamu Alaikum, to make it completely risk-free, our engineers built a live interactive QR table menu demo specifically for your menu items. Can I share the secure link?',
      delay: '7 Days'
    },
    {
      stage: 'Day 14',
      title: 'Final ROI Value Message',
      desc: 'Closing multi-touch sequence. Highlight case study or special promotional discount before archiving.',
      template: 'Hello [Name], just following up one last time. We are offering free POS hardware integration for [Location] businesses this month. Let me know if you would like to secure a spot.',
      delay: '14 Days'
    }
  ];

  const handleTriggerFollowUp = (lead: Lead, stage: FollowUpStage) => {
    let nextStage: FollowUpStage = 'Day 3';
    let nextStatus: LeadStatus = 'Replied';
    if (stage === 'Day 3') {
      nextStage = 'Day 7';
      nextStatus = 'Interested';
    } else if (stage === 'Day 7') {
      nextStage = 'Day 14';
      nextStatus = 'Demo Sent';
    } else if (stage === 'Day 14') {
      nextStage = 'Day 14';
      nextStatus = 'Meeting Booked';
    }

    setSimulatedLog(`Executing automated ${stage} multi-channel sequence for ${lead.businessName}. Client responded favorably! Moving to CRM stage '${nextStatus}'.`);
    onUpdateFollowUp(lead.id, nextStage, nextStatus);

    setTimeout(() => {
      setSimulatedLog(null);
    }, 4500);
  };

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
            80% of local business owners do not reply on the first attempt due to daily operations. RizQ Claw automatically schedules and triggers Day 3, Day 7, and Day 14 follow-up sequences.
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
        </div>
      </div>

      {/* Simulated Alert Notification */}
      {simulatedLog && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-800 text-white font-semibold text-sm shadow-xl flex items-center space-x-3 animate-bounce">
          <CheckCircle2 className="w-6 h-6 text-yellow-300 shrink-0" />
          <span>{simulatedLog}</span>
        </div>
      )}

      {/* Follow-up Sequence Stages Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {followUpStages.map((st) => {
          const isActive = activeTab === st.stage;
          const stageLeadsCount = leads.filter(l => l.followUpStage === st.stage || (st.stage === 'Day 3' && l.followUpStage === 'None' && l.approved)).length;

          return (
            <button
              key={st.stage}
              onClick={() => setActiveTab(st.stage)}
              className={`p-6 rounded-3xl border text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[12rem] ${
                isActive 
                  ? 'bg-maroon-900 text-white border-maroon-900 shadow-xl shadow-maroon-900/25 scale-102' 
                  : 'bg-white text-gray-800 border-gray-200 hover:border-maroon-400 hover:bg-maroon-50/30 shadow-xs'
              }`}
            >
              <div className="absolute top-0 right-0 bg-maroon-600/25 text-maroon-300 text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-widest font-mono border-b border-l border-maroon-500/20">
                {st.delay}
              </div>

              <div className="pr-12">
                <span className={`text-xs font-extrabold uppercase tracking-widest block font-mono ${isActive ? 'text-yellow-300' : 'text-maroon-700'}`}>
                  {st.stage} Sequence
                </span>
                <h3 className={`font-extrabold text-lg mt-1.5 font-['Outfit'] leading-snug ${isActive ? 'text-white' : 'text-maroon-950'}`}>
                  {st.title}
                </h3>
                <p className={`text-xs mt-1.5 leading-relaxed line-clamp-2 ${isActive ? 'text-maroon-100' : 'text-gray-600'}`}>
                  {st.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 flex items-center justify-between text-xs font-extrabold border-t border-white/10">
                <span>{stageLeadsCount} Prospects queued</span>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Leads list for selected stage */}
      <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-gray-100 gap-4">
          <div>
            <h3 className="font-extrabold text-2xl text-maroon-950 font-['Outfit']">
              Prospects Ready For {activeTab} Sequence
            </h3>
            <p className="text-xs text-gray-500 mt-1">Click &apos;Execute Sequence&apos; to trigger automated WhatsApp/Email dispatch</p>
          </div>
          <span className="bg-maroon-100 text-maroon-950 px-4 py-2 rounded-xl text-xs font-extrabold shrink-0 border border-maroon-200 shadow-2xs font-mono">
            {activeTab} Template active
          </span>
        </div>

        {/* Template Sample Preview */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-maroon-50 to-amber-50 border border-maroon-200 space-y-2.5 shadow-2xs">
          <div className="flex items-center space-x-2 text-xs font-extrabold text-maroon-950 font-['Outfit']">
            <MessageSquare className="w-4 h-4 text-maroon-700 shrink-0" />
            <span>Automated AI Copy Template ({activeTab}):</span>
          </div>
          <p className="text-xs text-maroon-950 font-mono italic leading-relaxed pl-6 border-l-2 border-maroon-600">
            &ldquo;{followUpStages.find(s => s.stage === activeTab)?.template}&rdquo;
          </p>
        </div>

        {/* Lead Rows */}
        <div className="space-y-4">
          {leads.map((lead) => (
            <div 
              key={lead.id} 
              className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200 hover:border-maroon-400 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-2xs hover:shadow-md"
            >
              <div className="space-y-1.5 min-w-0 flex-1 pr-4">
                <div className="flex items-center space-x-2.5">
                  <Building2 className="w-4 h-4 text-maroon-700 shrink-0" />
                  <span className="font-extrabold text-maroon-950 text-lg truncate">{lead.businessName}</span>
                  <span className="bg-white text-maroon-900 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold border border-gray-200 uppercase font-mono shadow-2xs shrink-0">
                    {lead.category}
                  </span>
                </div>
                <p className="text-xs text-gray-600 truncate">📍 {lead.location} &bull; 📞 {lead.phone} &bull; ✉️ {lead.email || 'No email'}</p>
                <div className="flex items-center space-x-4 pt-1 text-xs">
                  <span className="text-gray-500 font-medium">CRM Status: <strong className="text-gray-900 font-extrabold">{lead.status}</strong></span>
                  <span className="text-gray-500 font-medium">Last Touch: <strong className="text-maroon-800 font-extrabold">{lead.lastContactDate || 'Yesterday'}</strong></span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0 justify-end">
                <div className="text-xs font-extrabold text-gray-600 bg-white px-4 py-2.5 rounded-xl border border-gray-200 text-center shadow-2xs font-mono">
                  Stage: <strong className="text-maroon-900">{lead.followUpStage}</strong>
                </div>

                <button
                  onClick={() => handleTriggerFollowUp(lead, activeTab)}
                  className="w-full sm:w-auto bg-gradient-to-r from-maroon-700 to-maroon-900 hover:from-maroon-800 hover:to-maroon-950 text-white font-extrabold px-6 py-3 rounded-xl transition-all shadow-md shadow-maroon-900/20 flex items-center justify-center space-x-2 text-xs font-['Outfit'] shrink-0"
                >
                  <Send className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
                  <span>Execute {activeTab} Sequence</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
