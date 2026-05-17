import React, { useState } from 'react';
import type { Lead, FollowUpStage, LeadStatus } from '../types';
import { 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ChevronRight
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Multi-Touch Follow-Up Automation</span>
          </div>
          <h1 className="text-3xl font-extrabold text-maroon-950 font-['Outfit']">
            Follow-Up Engine
          </h1>
          <p className="text-gray-600 text-sm mt-1 max-w-2xl">
            80% of local business owners do not reply on the first attempt due to daily operations. RizQ Claw automatically schedules and triggers Day 3, Day 7, and Day 14 follow-up sequences.
          </p>
        </div>

        <div className="bg-maroon-900 text-white p-4 rounded-2xl shadow-md space-y-1 w-full md:w-auto">
          <div className="text-xs text-maroon-200">Active Sequences</div>
          <div className="text-2xl font-extrabold font-['Outfit']">
            {leads.filter(l => l.approved).length} Prospects
          </div>
        </div>
      </div>

      {/* Simulated Alert Notification */}
      {simulatedLog && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white font-semibold text-sm shadow-xl flex items-center space-x-3 animate-bounce">
          <CheckCircle2 className="w-6 h-6 text-yellow-300 shrink-0" />
          <span>{simulatedLog}</span>
        </div>
      )}

      {/* Follow-up Sequence Stages Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {followUpStages.map((st) => {
          const isActive = activeTab === st.stage;
          const stageLeadsCount = leads.filter(l => l.followUpStage === st.stage || (st.stage === 'Day 3' && l.followUpStage === 'None' && l.approved)).length;

          return (
            <button
              key={st.stage}
              onClick={() => setActiveTab(st.stage)}
              className={`p-6 rounded-3xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-44 ${
                isActive 
                  ? 'bg-maroon-900 text-white border-maroon-900 shadow-xl shadow-maroon-900/20' 
                  : 'bg-white text-gray-800 border-gray-200 hover:border-maroon-300 hover:bg-maroon-50/20 shadow-sm'
              }`}
            >
              <div className="absolute top-0 right-0 bg-maroon-600/20 text-maroon-400 text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                {st.delay}
              </div>

              <div>
                <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-yellow-300' : 'text-maroon-700'}`}>
                  {st.stage} Sequence
                </span>
                <h3 className={`font-extrabold text-lg mt-1 font-['Outfit'] ${isActive ? 'text-white' : 'text-maroon-950'}`}>
                  {st.title}
                </h3>
                <p className={`text-xs mt-1 leading-relaxed ${isActive ? 'text-maroon-100' : 'text-gray-600'}`}>
                  {st.desc}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs font-bold border-t border-white/10">
                <span>{stageLeadsCount} Prospects queued</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Leads list for selected stage */}
      <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h3 className="font-extrabold text-xl text-maroon-950 font-['Outfit']">
              Prospects Ready For {activeTab} Sequence
            </h3>
            <p className="text-xs text-gray-500">Click &apos;Trigger Follow-Up&apos; to execute automated SMS/Email sequence</p>
          </div>
          <span className="bg-maroon-100 text-maroon-900 px-3 py-1 rounded-full text-xs font-extrabold">
            {activeTab} Template active
          </span>
        </div>

        {/* Template Sample Preview */}
        <div className="p-4 rounded-2xl bg-maroon-50/60 border border-maroon-200 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-maroon-900">
            <MessageSquare className="w-4 h-4 text-maroon-600" />
            <span>Automated AI Copy Template ({activeTab}):</span>
          </div>
          <p className="text-xs text-gray-800 font-mono italic leading-relaxed">
            &ldquo;{followUpStages.find(s => s.stage === activeTab)?.template}&rdquo;
          </p>
        </div>

        {/* Lead Rows */}
        <div className="space-y-4">
          {leads.map((lead) => (
            <div key={lead.id} className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200 hover:border-maroon-300 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-maroon-950 text-base">{lead.businessName}</span>
                  <span className="bg-white text-maroon-800 px-2 py-0.5 rounded text-[10px] font-bold border border-gray-200 uppercase">
                    {lead.category}
                  </span>
                </div>
                <p className="text-xs text-gray-600">📍 {lead.location} &bull; 📞 {lead.phone} &bull; ✉️ {lead.email || 'No email'}</p>
                <div className="flex items-center space-x-3 pt-1 text-xs">
                  <span className="text-gray-500">Current CRM Status: <strong className="text-gray-900">{lead.status}</strong></span>
                  <span className="text-gray-500">Last Touch: <strong className="text-maroon-700">{lead.lastContactDate || 'Yesterday'}</strong></span>
                </div>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                <span className="text-xs font-semibold text-gray-500 bg-white px-3 py-1.5 rounded-xl border border-gray-200">
                  Stage: <strong>{lead.followUpStage}</strong>
                </span>

                <button
                  onClick={() => handleTriggerFollowUp(lead, activeTab)}
                  className="w-full sm:w-auto bg-gradient-to-r from-maroon-700 to-maroon-900 hover:from-maroon-800 hover:to-maroon-950 text-white font-extrabold px-6 py-3 rounded-xl transition-all shadow-md shadow-maroon-900/20 flex items-center justify-center space-x-2 text-xs font-['Outfit']"
                >
                  <Send className="w-3.5 h-3.5 text-yellow-300" />
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
