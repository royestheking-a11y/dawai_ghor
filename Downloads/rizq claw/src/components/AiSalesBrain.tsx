import React, { useState } from 'react';
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
  Sliders
} from 'lucide-react';

interface AiSalesBrainProps {
  leads: Lead[];
  onApproveMessage: (leadId: string, updatedMessage: string) => void;
  selectedLeadId?: string;
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
  const [selectedTone, setSelectedTone] = useState<'professional' | 'direct' | 'sympathetic'>('professional');
  const [selectedChannel, setSelectedChannel] = useState<'whatsapp' | 'email'>('whatsapp');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const selectedLead = leads.find(l => l.id === currentLeadId) || leads[0];

  React.useEffect(() => {
    if (selectedLead) {
      setEditableDraft(selectedLead.aiMessageDraft);
    }
  }, [selectedLead]);

  if (!selectedLead) {
    return <div className="p-8 text-center text-gray-500">No leads available for AI copy generation.</div>;
  }

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      let newCopy = '';
      if (selectedTone === 'direct') {
        newCopy = `Hi ${selectedLead.decisionMaker || 'team'},\n\nYour ${selectedLead.category} in ${selectedLead.location} has ${selectedLead.reviewCount} Google reviews, but your customers are forced to call in manually to place orders or book.\n\nWe build high-converting QR systems & portals at RizQara Tech.\n\nCan I send over our 2-minute video demo?`;
      } else if (selectedTone === 'sympathetic') {
        newCopy = `Assalamu Alaikum ${selectedLead.businessName} management,\n\nI was looking at your Google profile in ${selectedLead.location} and noticed your stellar ${selectedLead.rating} rating. I know during rush hours your staff gets overwhelmed answering phone calls for orders.\n\nRizQara Tech can set up an instant QR menu & WhatsApp ordering system to take the load off your staff.\n\nWould you be open to a quick 2-minute demo?`;
      } else {
        newCopy = `Assalamu Alaikum ${selectedLead.businessName} management,\n\nI reviewed your Google Maps profile and noticed your excellent ${selectedLead.rating} star rating with over ${selectedLead.reviewCount} reviews. However, I noticed you do not currently have an automated digital ordering system.\n\nRizQara Tech can deploy an instant mobile-optimized booking and order dashboard to streamline your customer flow.\n\nCould I share a 2-minute free demo video?`;
      }
      setEditableDraft(newCopy);
    }, 1200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editableDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApprove = () => {
    onApproveMessage(selectedLead.id, editableDraft);
    setSuccessMsg(`🎉 Approved! Outreach message locked & queued for dispatch to ${selectedLead.phone} via ${selectedLead.outreachChannel}. Status shifted to 'Contacted'.`);
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  // Bad spam comparison example
  const badSpamCopy = `HELLO DEAR SIR/MADAM,\nWE ARE BEST WEBSITE AND SOFTWARE COMPANY. WE CAN MAKE ANY WEBSITE RESTAURANT POS ECOMMERCE APP AT VERY CHEAP PRICE 100% QUALITY GUARANTEE. PLEASE REPLY ME OR CALL MY NUMBER NOW!!!`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header & Controls */}
      <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-purple-50 text-purple-800 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-purple-200">
            <Bot className="w-3.5 h-3.5 text-purple-600" />
            <span>OpenAI / Gemini Sales Copy Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-maroon-950 font-['Outfit']">
            AI Sales Brain (Human Approval)
          </h1>
          <p className="text-gray-600 text-sm mt-1 max-w-2xl">
            Never send generic spam. RizQ Claw AI drafts highly personalized outreach mentioning specific Google review counts, star ratings, and verified operational gaps. Review and edit before dispatch.
          </p>
        </div>

        {/* Lead Selector Dropdown */}
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
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-800 text-white font-semibold text-sm shadow-xl flex items-center space-x-3 animate-bounce">
          <CheckCircle2 className="w-6 h-6 text-yellow-300 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Side-by-Side Comparison: Bad Spam vs AI Hyper-Personalized */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Bad Spam Example */}
        <div className="bg-red-50/60 rounded-3xl p-8 border border-red-200 space-y-4 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-red-200/80">
            <div className="flex items-center space-x-2 text-red-900 font-extrabold font-['Outfit']">
              <XCircle className="w-5 h-5 text-red-600" />
              <span>Generic Spam (98% Ignore Rate)</span>
            </div>
            <span className="bg-red-200 text-red-800 text-[10px] font-extrabold px-2 py-0.5 rounded font-mono uppercase">
              Standard Agency Pitch
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-red-200 font-mono text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
            {badSpamCopy}
          </div>

          <div className="space-y-2 text-xs text-red-950">
            <div className="flex items-center space-x-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span>Does not mention business name or owner name</span>
            </div>
            <div className="flex items-center space-x-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span>Does not mention specific location or customer reviews</span>
            </div>
            <div className="flex items-center space-x-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span>Looks like an automated blast sent to 10,000 random emails</span>
            </div>
          </div>
        </div>

        {/* Right: RizQ Claw AI Pitch */}
        <div className="bg-gradient-to-br from-maroon-950 via-maroon-900 to-maroon-800 rounded-3xl p-8 text-white shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center justify-between pb-3 border-b border-white/20">
            <div className="flex items-center space-x-2 font-extrabold text-lg font-['Outfit'] text-white">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span>RizQ Claw AI Draft (84% Response Rate)</span>
            </div>
            <span className="bg-emerald-500 text-maroon-950 text-[10px] font-extrabold px-2.5 py-1 rounded-full font-mono uppercase shadow-md">
              Hyper-Personalized
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-maroon-300 font-mono text-[10px] uppercase block">Target Entity:</span>
              <strong className="text-white font-bold text-sm">{selectedLead.businessName}</strong>
            </div>
            <div>
              <span className="text-maroon-300 font-mono text-[10px] uppercase block">Identified C-Level:</span>
              <strong className="text-yellow-300 font-bold text-sm">{selectedLead.decisionMaker || 'Operations Head'}</strong>
            </div>
            <div>
              <span className="text-maroon-300 font-mono text-[10px] uppercase block">Validation Anchors:</span>
              <span className="text-white font-semibold">⭐️ {selectedLead.rating} ({selectedLead.reviewCount} Reviews)</span>
            </div>
            <div>
              <span className="text-maroon-300 font-mono text-[10px] uppercase block">Specific Deficit:</span>
              <span className="text-red-300 font-semibold">{selectedLead.needDetected.slice(0, 38)}...</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-maroon-200">
              <label>Human Approval Edit Workspace:</label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSelectedTone(selectedTone === 'professional' ? 'direct' : 'professional')}
                  className="flex items-center space-x-1 hover:text-white transition-all bg-white/10 px-2.5 py-1 rounded-lg"
                >
                  <Sliders className="w-3 h-3 text-yellow-300" />
                  <span>Tone: <strong className="capitalize text-white">{selectedTone}</strong></span>
                </button>
                <button
                  onClick={handleRegenerate}
                  disabled={isRegenerating}
                  className="flex items-center space-x-1 text-yellow-300 hover:text-yellow-400 transition-all font-mono"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
                  <span>Regenerate Draft</span>
                </button>
              </div>
            </div>

            <textarea
              value={editableDraft}
              onChange={(e) => setEditableDraft(e.target.value)}
              rows={8}
              className="w-full p-4 rounded-2xl bg-white text-maroon-950 font-mono text-xs font-medium focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-inner border border-maroon-300 leading-relaxed resize-none"
              placeholder="AI generated message text..."
            />
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center space-x-3 text-xs w-full sm:w-auto">
              <span className="text-maroon-200 font-bold">Dispatch Via:</span>
              <button
                onClick={() => setSelectedChannel('whatsapp')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
                  selectedChannel === 'whatsapp' 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'bg-white/10 text-maroon-200 hover:bg-white/20'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={() => setSelectedChannel('email')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
                  selectedChannel === 'email' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white/10 text-maroon-200 hover:bg-white/20'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </button>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <button
                onClick={handleCopy}
                className="w-full sm:w-auto bg-white/15 hover:bg-white/25 text-white font-bold px-4 py-3 rounded-xl transition-all text-xs flex items-center justify-center space-x-1.5 border border-white/30"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Copy'}</span>
              </button>

              <button
                onClick={handleApprove}
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-300 to-amber-400 hover:from-yellow-400 hover:to-amber-500 text-maroon-950 font-extrabold px-6 py-3 rounded-xl transition-all shadow-xl flex items-center justify-center space-x-2 text-sm font-['Outfit']"
              >
                <Send className="w-4 h-4 text-maroon-900" />
                <span>Approve &amp; Queue Outreach</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
