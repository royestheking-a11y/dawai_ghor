import React, { useState, useEffect } from 'react';
import type { Lead } from '../types';
import { 
  Bot, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  XCircle, 
  Copy, 
  Check, 
  MessageSquare, 
  Mail, 
  RefreshCw,
  Sliders,
  Cpu,
  Zap,
  ArrowRight
} from 'lucide-react';

interface AiSalesBrainProps {
  leads: Lead[];
  onApproveMessage: (leadId: string, updatedMessage: string) => void;
  selectedLeadId?: string;
}

const TONES = ['professional', 'direct', 'sympathetic', 'urgent'] as const;
type Tone = typeof TONES[number];

// Generate a fresh copy based on lead data + tone (simulates Groq Llama 3 response)
function generateCopy(lead: Lead, tone: Tone, channel: 'email' | 'whatsapp'): string {
  const name = lead.decisionMaker || 'Management Team';
  const biz = lead.businessName;
  const loc = lead.location;
  const rating = lead.rating;
  const reviews = lead.reviewCount;
  const need = lead.needDetected;
  const service = lead.serviceRecommended;
  const value = lead.estimatedDealValue || 750;
  const greeting = channel === 'whatsapp' ? 'Assalamu Alaikum' : 'Dear';

  const copies: Record<Tone, string> = {
    professional: `${greeting} ${name},\n\nI hope this message finds you well. I was reviewing ${biz}'s digital presence in ${loc} and noticed your impressive ${rating}⭐ Google rating with ${reviews} verified reviews.\n\nHowever, our analysis identified a critical bottleneck: ${need.toLowerCase()}.\n\nAt RizQara Tech, we specialize in solving exactly this — specifically, we would deploy: ${service}.\n\nThe average ROI for similar ${lead.category} clients in our portfolio has been 3× revenue growth within 90 days, with deals starting from USD ${value}.\n\nWould you be available for a free 2-minute video walkthrough this week?`,
    
    direct: `Hi ${name},\n\n${biz} has ${reviews} Google reviews and a ${rating}⭐ rating — clearly a strong brand. But one thing is holding you back:\n\n❌ ${need}\n\nWe fix this with: ${service}.\n\nStarting investment: USD ${value}. No long contracts. Lifetime updates.\n\nCan I send our 2-minute demo video now?`,
    
    sympathetic: `${greeting} ${name},\n\nRunning a ${lead.category.toLowerCase()} in ${loc} is not easy — especially when you're managing everything manually on top of serving customers every day.\n\nI noticed that ${need.toLowerCase()}. I can imagine how much time and potential revenue this friction costs your team daily.\n\nRizQara Tech can take that exact burden away with: ${service}.\n\nWe've already helped similar businesses like yours — would you be open to a short 2-minute screen share where I show you the exact system?`,
    
    urgent: `Hi ${name},\n\n⚠️ IMPORTANT: We analyzed ${biz}'s digital presence today.\n\nFinding: ${need}\n\nRight now, your competitors in ${loc} are investing in digital customer onboarding systems. Every week without this costs you an estimated BDT ${Math.floor(value * 100)} in lost orders.\n\nWe can deploy: ${service}\n\n→ Timeline: 7-10 working days\n→ Investment: USD ${value}\n→ Free demo available TODAY\n\nShall I block a slot for you this week?`,
  };

  return copies[tone];
}

export const AiSalesBrain: React.FC<AiSalesBrainProps> = ({ 
  leads, 
  onApproveMessage,
  selectedLeadId 
}) => {
  const initialSelectedId = selectedLeadId || leads[0]?.id || '';
  const [currentLeadId, setCurrentLeadId] = useState<string>(initialSelectedId);
  const [editableDraft, setEditableDraft] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [selectedTone, setSelectedTone] = useState<Tone>('professional');
  const [selectedChannel, setSelectedChannel] = useState<'whatsapp' | 'email'>('email');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [charCount, setCharCount] = useState<number>(0);

  const selectedLead = leads.find(l => l.id === currentLeadId) || leads[0];

  useEffect(() => {
    if (selectedLead) {
      const draft = selectedLead.aiMessageDraft || generateCopy(selectedLead, selectedTone, selectedChannel);
      setEditableDraft(draft);
      setCharCount(draft.length);
    }
  }, [selectedLead]);

  useEffect(() => {
    setCharCount(editableDraft.length);
  }, [editableDraft]);

  if (!selectedLead) {
    return <div className="p-8 text-center text-gray-500">No leads available for AI copy generation.</div>;
  }

  const handleRegenerate = () => {
    setIsRegenerating(true);
    // Simulate Groq inference latency (100-300ms typically)
    setTimeout(() => {
      const newCopy = generateCopy(selectedLead, selectedTone, selectedChannel);
      setEditableDraft(newCopy);
      setIsRegenerating(false);
    }, Math.floor(Math.random() * 600 + 400));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editableDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApprove = () => {
    onApproveMessage(selectedLead.id, editableDraft);
    setSuccessMsg(`🎉 Approved! Outreach queued for ${selectedLead.businessName} via ${selectedChannel === 'email' ? '📧 Email' : '💬 Direct Message'}. CRM status → 'Contacted'.`);
    setTimeout(() => setSuccessMsg(null), 6000);
  };

  const badSpamCopy = `HELLO DEAR SIR/MADAM,\nWE ARE BEST WEBSITE AND SOFTWARE COMPANY IN BANGLADESH. WE CAN MAKE ANY WEBSITE RESTAURANT POS ECOMMERCE APP AT VERY CHEAP PRICE. 100% QUALITY GUARANTEE BEST WORK. PLEASE REPLY ME OR CALL MY NUMBER NOW!!!`;

  const toneDescriptions: Record<Tone, { label: string; icon: React.ReactNode; color: string }> = {
    professional: { label: 'Professional', icon: <Sliders className="w-3.5 h-3.5" />, color: 'bg-blue-100 text-blue-800 border-blue-300' },
    direct: { label: 'Direct', icon: <Zap className="w-3.5 h-3.5" />, color: 'bg-amber-100 text-amber-800 border-amber-300' },
    sympathetic: { label: 'Sympathetic', icon: <Bot className="w-3.5 h-3.5" />, color: 'bg-purple-100 text-purple-800 border-purple-300' },
    urgent: { label: 'Urgent', icon: <Cpu className="w-3.5 h-3.5" />, color: 'bg-red-100 text-red-800 border-red-300' },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header & Controls */}
      <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-purple-50 text-purple-800 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-purple-200">
            <Cpu className="w-3.5 h-3.5 text-purple-600" />
            <span>Gemini + Groq Sales Copy Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-maroon-950 font-['Outfit']">
            AI Sales Brain
          </h1>
          <p className="text-gray-600 text-sm mt-1 max-w-2xl">
            Never send generic spam. RizQ Claw AI drafts hyper-personalized outreach mentioning specific review counts, star ratings, and verified operational gaps. Review, refine, then approve.
          </p>
        </div>

        <div className="w-full md:w-72 space-y-1.5">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Select Prospect for Outreach
          </label>
          <select
            value={currentLeadId}
            onChange={(e) => setCurrentLeadId(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-maroon-950 focus:outline-none focus:ring-2 focus:ring-maroon-600 transition-all shadow-sm"
          >
            {leads.map((l) => (
              <option key={l.id} value={l.id}>
                {l.approved ? '✅' : '⏳'} {l.businessName} ({l.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-800 text-white font-semibold text-sm shadow-xl flex items-center space-x-3">
          <CheckCircle2 className="w-6 h-6 text-yellow-300 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Bad Spam Example */}
        <div className="bg-red-50/60 rounded-3xl p-8 border border-red-200 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-red-200/80">
            <div className="flex items-center space-x-2 text-red-900 font-extrabold font-['Outfit']">
              <XCircle className="w-5 h-5 text-red-600" />
              <span>Generic Spam (98% Ignore Rate)</span>
            </div>
            <span className="bg-red-200 text-red-800 text-[10px] font-extrabold px-2 py-0.5 rounded font-mono uppercase">
              Typical Agency Blast
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-red-200 font-mono text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
            {badSpamCopy}
          </div>

          <div className="space-y-2 text-xs text-red-950">
            {['Does not mention business name, owner, or location', 'Ignores specific review count or Google rating', 'Clearly automated blast sent to thousands — feels like SPAM'].map(txt => (
              <div key={txt} className="flex items-start space-x-2 font-bold">
                <span className="w-2 h-2 rounded-full bg-red-600 mt-1 shrink-0" />
                <span>{txt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: RizQ Claw AI Pitch Workspace */}
        <div className="bg-gradient-to-br from-maroon-950 via-maroon-900 to-maroon-800 rounded-3xl p-8 text-white shadow-xl space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between pb-3 border-b border-white/20">
            <div className="flex items-center space-x-2 font-extrabold text-lg font-['Outfit'] text-white">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span>RizQ Claw AI Draft</span>
            </div>
            <span className="bg-emerald-500 text-maroon-950 text-[10px] font-extrabold px-2.5 py-1 rounded-full font-mono shadow-md">
              Hyper-Personalized
            </span>
          </div>

          {/* Prospect context block */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-maroon-300 font-mono text-[10px] uppercase block">Target Entity:</span>
              <strong className="text-white font-bold">{selectedLead.businessName}</strong>
            </div>
            <div>
              <span className="text-maroon-300 font-mono text-[10px] uppercase block">C-Level Contact:</span>
              <strong className="text-yellow-300 font-bold">{selectedLead.decisionMaker || 'Operations Head'}</strong>
            </div>
            <div>
              <span className="text-maroon-300 font-mono text-[10px] uppercase block">Validation Anchors:</span>
              <span className="text-white font-semibold">⭐ {selectedLead.rating} ({selectedLead.reviewCount} reviews)</span>
            </div>
            <div>
              <span className="text-maroon-300 font-mono text-[10px] uppercase block">Deficit Gap:</span>
              <span className="text-red-300 font-semibold line-clamp-1">{selectedLead.needDetected.slice(0, 40)}…</span>
            </div>
          </div>

          {/* Tone Selector */}
          <div>
            <div className="text-xs font-bold text-maroon-200 mb-2 uppercase tracking-wider">Copy Tone & Style:</div>
            <div className="flex flex-wrap gap-2">
              {TONES.map((tone) => {
                const td = toneDescriptions[tone];
                return (
                  <button
                    key={tone}
                    onClick={() => setSelectedTone(tone)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all ${
                      selectedTone === tone ? 'bg-white text-maroon-900 border-white shadow-md' : 'bg-white/10 text-maroon-200 border-white/20 hover:bg-white/20'
                    }`}
                  >
                    {td.icon}
                    <span>{td.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Channel Selector */}
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-maroon-200 font-bold">Dispatch Channel:</span>
            <button
              onClick={() => setSelectedChannel('email')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${selectedChannel === 'email' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-maroon-200 hover:bg-white/20'}`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </button>
            <button
              onClick={() => setSelectedChannel('whatsapp')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${selectedChannel === 'whatsapp' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white/10 text-maroon-200 hover:bg-white/20'}`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct</span>
            </button>
            <button
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="ml-auto flex items-center space-x-1.5 text-yellow-300 hover:text-yellow-400 transition-all font-mono text-xs font-bold"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
              <span>{isRegenerating ? 'Generating...' : 'Regenerate'}</span>
            </button>
          </div>

          {/* Editable Draft */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-maroon-200">Human Approval Workspace:</label>
              <span className={`text-[10px] font-mono ${charCount > 300 ? 'text-green-400' : 'text-amber-300'}`}>{charCount} chars</span>
            </div>
            <textarea
              value={editableDraft}
              onChange={(e) => setEditableDraft(e.target.value)}
              rows={9}
              className="w-full p-4 rounded-2xl bg-white text-maroon-950 font-mono text-xs font-medium focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-inner border border-maroon-300 leading-relaxed resize-none"
              placeholder="AI generated message text..."
            />
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              onClick={handleCopy}
              className="bg-white/15 hover:bg-white/25 text-white font-bold px-4 py-3 rounded-xl transition-all text-xs flex items-center space-x-1.5 border border-white/30"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              onClick={handleApprove}
              disabled={selectedLead.approved}
              className="flex-1 bg-gradient-to-r from-yellow-300 to-amber-400 hover:from-yellow-400 hover:to-amber-500 text-maroon-950 font-extrabold px-6 py-3 rounded-xl transition-all shadow-xl flex items-center justify-center space-x-2 text-sm font-['Outfit'] disabled:opacity-60"
            >
              {selectedLead.approved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Already Approved ✓</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-maroon-900" />
                  <span>Approve &amp; Queue</span>
                  <ArrowRight className="w-4 h-4 text-maroon-900" />
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
