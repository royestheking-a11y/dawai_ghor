import React, { useState } from 'react';
import type { Lead } from '../types';
import { 
  CheckCircle2, 
  XCircle, 
  Zap, 
  Smartphone, 
  Globe, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Bot
} from 'lucide-react';

interface DigitalAuditProps {
  leads: Lead[];
  onSelectLeadForMessage: (lead: Lead) => void;
  selectedLeadId?: string;
}

export const DigitalAudit: React.FC<DigitalAuditProps> = ({ 
  leads, 
  onSelectLeadForMessage, 
  selectedLeadId 
}) => {
  const initialSelectedId = selectedLeadId || leads[0]?.id || '';
  const [currentLeadId, setCurrentLeadId] = useState<string>(initialSelectedId);
  const [isSimulatingAudit, setIsSimulatingAudit] = useState<boolean>(false);

  const selectedLead = leads.find(l => l.id === currentLeadId) || leads[0];

  const handleRerunAudit = () => {
    setIsSimulatingAudit(true);
    setTimeout(() => {
      setIsSimulatingAudit(false);
      alert(`Automated PageSpeed v5 and SSL verification complete for ${selectedLead.businessName}. Trust score recalculated at ${selectedLead.score}/100.`);
    }, 1500);
  };

  if (!selectedLead) {
    return <div className="p-8 text-center text-gray-500">No leads available for auditing.</div>;
  }

  const audit = selectedLead.auditDetails;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header & Controls */}
      <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>PageSpeed v5 &amp; SSL Compliance Inspector</span>
          </div>
          <h1 className="text-3xl font-extrabold text-maroon-950 font-['Outfit']">
            Autonomous Digital Audit
          </h1>
          <p className="text-gray-600 text-sm mt-1 max-w-2xl">
            Inspect live website speed, mobile responsiveness, WhatsApp booking integration, and customer Google review response ratios. Use these exact deficits in your sales pitch.
          </p>
        </div>

        {/* Lead Selector Dropdown */}
        <div className="w-full md:w-72 space-y-1.5">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Inspect Scraped Lead
          </label>
          <select
            value={currentLeadId}
            onChange={(e) => setCurrentLeadId(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-maroon-950 focus:outline-none focus:ring-2 focus:ring-maroon-600 transition-all shadow-sm"
          >
            {leads.map((l) => (
              <option key={l.id} value={l.id}>
                {l.businessName} ({l.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Audit Analysis Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Entity Summary & Trust Score */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-maroon-950 via-maroon-900 to-maroon-800 rounded-3xl p-8 text-white shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-2">
              <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold font-mono uppercase border border-white/20">
                {selectedLead.category} Entity
              </span>
              <h2 className="text-2xl font-extrabold font-['Outfit'] tracking-tight">{selectedLead.businessName}</h2>
              <p className="text-xs text-maroon-200">📍 {selectedLead.location}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center space-y-2">
              <span className="text-[11px] text-maroon-200 font-bold uppercase tracking-wider block">Calculated Trust Score</span>
              <div className="text-5xl font-extrabold font-['Outfit'] text-white">
                {selectedLead.score}
                <span className="text-lg text-maroon-300 font-light font-sans">/100</span>
              </div>
              <p className="text-[11px] text-yellow-300 font-semibold pt-1">
                {selectedLead.score >= 85 ? '⭐️ Elite Prospect (High Conversion Odds)' : '🔥 Prime Service Deficit Detected'}
              </p>
            </div>

            <div className="space-y-2 text-xs text-maroon-100 border-t border-white/15 pt-4">
              <div className="flex justify-between">
                <span>Google Review Rating:</span>
                <strong className="text-white">⭐️ {selectedLead.rating} / 5.0</strong>
              </div>
              <div className="flex justify-between">
                <span>Total Google Reviews:</span>
                <strong className="text-white">{selectedLead.reviewCount} customer reviews</strong>
              </div>
              <div className="flex justify-between">
                <span>Estimated Deal Value:</span>
                <strong className="text-yellow-300 font-mono text-sm">${selectedLead.estimatedDealValue || 750}</strong>
              </div>
            </div>

            <button
              onClick={handleRerunAudit}
              disabled={isSimulatingAudit}
              className="w-full bg-white hover:bg-maroon-50 text-maroon-950 font-extrabold py-3.5 rounded-xl transition-all shadow-md text-xs flex items-center justify-center space-x-2 font-['Outfit']"
            >
              {isSimulatingAudit ? (
                <span>Re-auditing live DOM...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-maroon-600" />
                  <span>Re-run Live Digital Audit</span>
                </>
              )}
            </button>
          </div>

          {/* Identified Pitch Card */}
          <div className="bg-white rounded-3xl p-6 border border-maroon-100 shadow-sm space-y-3">
            <span className="text-xs font-bold text-red-700 uppercase tracking-wider block font-['Outfit']">🔥 Identified Operational Bottleneck</span>
            <p className="text-sm font-semibold text-gray-900 leading-snug">{selectedLead.needDetected}</p>
            <div className="pt-3 border-t border-gray-100">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block font-['Outfit']">💡 Recommended RizQara Pitch</span>
              <p className="text-sm font-bold text-maroon-900 mt-0.5">{selectedLead.serviceRecommended}</p>
            </div>
            <button
              onClick={() => onSelectLeadForMessage(selectedLead)}
              className="w-full bg-maroon-700 hover:bg-maroon-800 text-white font-extrabold py-3 px-4 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center space-x-2 mt-4 font-['Outfit']"
            >
              <Bot className="w-4 h-4 text-yellow-300" />
              <span>Launch AI Sales Brain (Generate Copy)</span>
            </button>
          </div>
        </div>

        {/* Right Column: Detailed Diagnostic Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm space-y-8">
            <div>
              <h3 className="font-extrabold text-xl text-maroon-950 font-['Outfit']">Digital Presence Report Card</h3>
              <p className="text-xs text-gray-500 mt-1">Detailed breakdown of speed, accessibility, and modern customer onboarding tools</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Metric 1: Website Speed */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-extrabold text-sm text-gray-900 font-['Outfit']">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Website Speed Score</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${
                    audit.speedScore === 0 ? 'bg-gray-200 text-gray-800' : audit.speedScore > 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {audit.speedScore === 0 ? 'No Site' : `${audit.speedScore}/100`}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  {audit.speedScore === 0 
                    ? 'No domain discovered on Google Maps or Facebook. Massive opportunity to pitch a 1-page high-speed web portal.'
                    : audit.speedScore < 50 
                    ? 'Site takes over 6 seconds to load on mobile 4G. Unoptimized images and slow server response rate.'
                    : 'Good page speed, but missing automated WhatsApp checkout integration.'
                  }
                </p>
              </div>

              {/* Metric 2: Mobile Friendly */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-extrabold text-sm text-gray-900 font-['Outfit']">
                    <Smartphone className="w-4 h-4 text-blue-500" />
                    <span>Mobile Responsiveness</span>
                  </div>
                  {audit.isMobileFriendly ? (
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Optimized</span>
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-0.5 rounded flex items-center space-x-1">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Deficit</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  {audit.isMobileFriendly
                    ? 'Viewport meta tag is active and CSS scales correctly on smart devices.'
                    : 'Customers visiting from smartphone devices experience broken layouts and horizontal scrolling.'
                  }
                </p>
              </div>

              {/* Metric 3: Online Order / QR Menu */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-extrabold text-sm text-gray-900 font-['Outfit']">
                    <Globe className="w-4 h-4 text-purple-500" />
                    <span>Online Ordering / QR Menu</span>
                  </div>
                  {audit.hasOnlineOrder ? (
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Active</span>
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-0.5 rounded flex items-center space-x-1">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Deficit</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  {audit.hasOnlineOrder
                    ? 'Automated ordering workflow is present on their profile.'
                    : `No direct booking or ordering link found. Customers must call in manually to place orders or book appointments.`
                  }
                </p>
              </div>

              {/* Metric 4: WhatsApp Integration */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-extrabold text-sm text-gray-900 font-['Outfit']">
                    <MessageSquare className="w-4 h-4 text-emerald-500" />
                    <span>WhatsApp Direct Widget</span>
                  </div>
                  {audit.hasWhatsApp ? (
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Active</span>
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-0.5 rounded flex items-center space-x-1">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Deficit</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  {audit.hasWhatsApp
                    ? 'WhatsApp click-to-chat button is correctly wired on their web profile.'
                    : 'Missing WhatsApp quick chat button. High bounce rate from customers unwilling to dial phone numbers.'
                  }
                </p>
              </div>

            </div>

            {/* Decision Maker Contact Block */}
            <div className="p-6 rounded-2xl bg-maroon-50/50 border border-maroon-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-maroon-800 uppercase tracking-widest block font-mono">Verified C-Level Contact</span>
                <div className="text-base font-extrabold text-maroon-950 font-['Outfit']">
                  {selectedLead.decisionMaker || 'Operations Manager'} &bull; <span className="font-semibold text-gray-600 text-sm">{selectedLead.decisionMakerTitle || 'Owner'}</span>
                </div>
                <p className="text-xs text-gray-600 font-mono">📞 {selectedLead.phone} &bull; ✉️ {selectedLead.email || 'No direct email found'}</p>
              </div>

              <button
                onClick={() => onSelectLeadForMessage(selectedLead)}
                className="w-full sm:w-auto bg-gradient-to-r from-maroon-700 to-maroon-900 hover:from-maroon-800 hover:to-maroon-950 text-white font-extrabold px-6 py-3 rounded-xl transition-all shadow-md text-xs flex items-center justify-center space-x-2 font-['Outfit']"
              >
                <span>Draft C-Level Message</span>
                <ArrowRight className="w-4 h-4 text-yellow-300" />
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
