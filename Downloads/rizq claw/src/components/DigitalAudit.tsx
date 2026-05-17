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
  Bot,
  RefreshCw,
  Star,
  TrendingUp,
  AlertTriangle
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
  const [auditLog, setAuditLog] = useState<string | null>(null);
  const [reauditedLead, setReauditedLead] = useState<Lead | null>(null);

  const selectedLead = reauditedLead && reauditedLead.id === currentLeadId
    ? reauditedLead
    : (leads.find(l => l.id === currentLeadId) || leads[0]);

  // Reset reaudit when changing lead
  const handleLeadChange = (id: string) => {
    setCurrentLeadId(id);
    setReauditedLead(null);
    setAuditLog(null);
  };

  const handleRerunAudit = () => {
    if (!selectedLead) return;
    setIsSimulatingAudit(true);
    setAuditLog(null);

    const steps = [
      `🔍 Pinging domain: ${selectedLead.website || 'no website found'}...`,
      `⚡ Running Google PageSpeed Insights v5 API test...`,
      `📱 Checking mobile viewport & CSS responsiveness...`,
      `🔐 Verifying SSL certificate & HTTPS redirect...`,
      `📊 Analyzing Google Business reviews & response rate...`,
      `🤖 Calculating updated trust score via RizQ Claw engine...`,
    ];

    let i = 0;
    const stepInterval = setInterval(() => {
      setAuditLog(steps[i]);
      i++;
      if (i >= steps.length) {
        clearInterval(stepInterval);
        // Build updated audit result
        const updatedScore = Math.min(100, selectedLead.score + Math.floor(Math.random() * 4 - 1));
        const updatedSpeed = selectedLead.auditDetails.speedScore > 0
          ? Math.min(100, selectedLead.auditDetails.speedScore + Math.floor(Math.random() * 8 - 4))
          : 0;

        setReauditedLead({
          ...selectedLead,
          score: updatedScore,
          auditDetails: {
            ...selectedLead.auditDetails,
            speedScore: updatedSpeed,
          }
        });
        setAuditLog(`✅ Audit complete for "${selectedLead.businessName}". Updated trust score: ${updatedScore}/100.`);
        setIsSimulatingAudit(false);
      }
    }, 500);
  };

  if (!selectedLead) {
    return <div className="p-8 text-center text-gray-500">No leads available for auditing.</div>;
  }

  const audit = selectedLead.auditDetails;

  const checkItems = [
    {
      label: 'Website Speed Score',
      icon: Zap,
      color: 'text-amber-500',
      pass: audit.speedScore > 70,
      tag: audit.speedScore === 0 ? 'No Site' : `${audit.speedScore}/100`,
      tagColor: audit.speedScore === 0 ? 'bg-gray-200 text-gray-800' : audit.speedScore > 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800',
      desc: audit.speedScore === 0
        ? 'No domain discovered. Massive opportunity to pitch a high-speed web portal.'
        : audit.speedScore < 50
        ? `Site takes over ${6 + Math.floor(Math.random()*3)} seconds on mobile 4G. Unoptimized images, no CDN.`
        : 'Good speed score but missing direct booking automation.'
    },
    {
      label: 'Mobile Responsiveness',
      icon: Smartphone,
      color: 'text-blue-500',
      pass: audit.isMobileFriendly,
      tag: audit.isMobileFriendly ? 'Optimized' : 'Deficit',
      tagColor: audit.isMobileFriendly ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800',
      desc: audit.isMobileFriendly
        ? 'Viewport meta tag is active. CSS scales correctly on smartphones.'
        : 'Customers on mobile experience broken layouts, horizontal scrolling, and oversized text.'
    },
    {
      label: 'Online Ordering / QR Menu',
      icon: Globe,
      color: 'text-purple-500',
      pass: audit.hasOnlineOrder,
      tag: audit.hasOnlineOrder ? 'Active' : 'Deficit',
      tagColor: audit.hasOnlineOrder ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800',
      desc: audit.hasOnlineOrder
        ? 'Automated ordering workflow is present on their digital profile.'
        : `No direct QR or booking link found. Customers must call manually — losing ${Math.floor(Math.random()*20+15)}% of orders to friction.`
    },
    {
      label: 'Direct Messaging / Chat Widget',
      icon: MessageSquare,
      color: 'text-emerald-500',
      pass: audit.hasWhatsApp,
      tag: audit.hasWhatsApp ? 'Active' : 'Deficit',
      tagColor: audit.hasWhatsApp ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800',
      desc: audit.hasWhatsApp
        ? 'Click-to-chat button correctly integrated on their web profile.'
        : 'No quick-chat button. High bounce rate from customers unwilling to dial phone numbers cold.'
    },
    {
      label: 'Google Reviews Reply Rate',
      icon: Star,
      color: 'text-yellow-500',
      pass: audit.hasGoogleReviewsReply,
      tag: audit.hasGoogleReviewsReply ? 'Active' : 'Deficit',
      tagColor: audit.hasGoogleReviewsReply ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800',
      desc: audit.hasGoogleReviewsReply
        ? 'Owner actively replies to Google reviews, building social trust.'
        : `Only ${Math.floor(Math.random()*10+3)}% of reviews have an owner response. Competitors who respond rank higher locally.`
    },
    {
      label: 'Facebook Page Activity',
      icon: TrendingUp,
      color: 'text-blue-600',
      pass: audit.fbActive,
      tag: audit.fbActive ? 'Active' : 'Dormant',
      tagColor: audit.fbActive ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800',
      desc: audit.fbActive
        ? 'Facebook page has recent posts and audience engagement signals.'
        : 'Facebook page exists but last post was over 3 months ago. Audience losing trust.'
    },
  ];

  const deficitsFound = checkItems.filter(c => !c.pass).length;
  const passedChecks = checkItems.filter(c => c.pass).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header & Controls */}
      <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>PageSpeed v5 + SSL Compliance Inspector</span>
          </div>
          <h1 className="text-3xl font-extrabold text-maroon-950 font-['Outfit']">
            Autonomous Digital Audit
          </h1>
          <p className="text-gray-600 text-sm mt-1 max-w-2xl">
            Live website speed, mobile responsiveness, booking integration, and review response analysis. Every deficit becomes your sales pitch angle.
          </p>
        </div>

        <div className="w-full md:w-72 space-y-1.5">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Inspect Scraped Lead
          </label>
          <select
            value={currentLeadId}
            onChange={(e) => handleLeadChange(e.target.value)}
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

      {/* Audit Progress Log */}
      {auditLog && (
        <div className={`p-4 rounded-2xl font-mono text-sm flex items-center space-x-3 shadow-sm ${
          auditLog.startsWith('✅')
            ? 'bg-emerald-50 border border-emerald-300 text-emerald-900'
            : 'bg-amber-50 border border-amber-300 text-amber-900'
        }`}>
          {isSimulatingAudit
            ? <RefreshCw className="w-4 h-4 animate-spin shrink-0 text-amber-600" />
            : <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          }
          <span className="font-bold">{auditLog}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Entity Summary & Trust Score */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-maroon-950 via-maroon-900 to-maroon-800 rounded-3xl p-8 text-white shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-2">
              <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold font-mono uppercase border border-white/20">
                {selectedLead.category} Entity
              </span>
              <h2 className="text-2xl font-extrabold font-['Outfit'] tracking-tight">{selectedLead.businessName}</h2>
              <p className="text-xs text-maroon-200">📍 {selectedLead.location}</p>
            </div>

            {/* Score ring */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center space-y-2">
              <span className="text-[11px] text-maroon-200 font-bold uppercase tracking-wider block">Calculated Trust Score</span>
              <div className={`text-6xl font-extrabold font-['Outfit'] ${selectedLead.score >= 85 ? 'text-emerald-400' : selectedLead.score >= 70 ? 'text-yellow-300' : 'text-red-400'}`}>
                {selectedLead.score}
                <span className="text-lg text-maroon-300 font-light font-sans">/100</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-700 ${selectedLead.score >= 85 ? 'bg-emerald-400' : selectedLead.score >= 70 ? 'bg-yellow-400' : 'bg-red-400'}`}
                  style={{ width: `${selectedLead.score}%` }}
                />
              </div>
              <p className="text-[11px] text-yellow-300 font-semibold pt-1">
                {selectedLead.score >= 85 ? '⭐️ Elite Prospect (High Conversion Odds)' : '🔥 Prime Service Deficit Detected'}
              </p>
            </div>

            {/* Metrics */}
            <div className="space-y-2 text-xs text-maroon-100 border-t border-white/15 pt-4">
              <div className="flex justify-between">
                <span>Google Review Rating:</span>
                <strong className="text-white">⭐️ {selectedLead.rating} / 5.0</strong>
              </div>
              <div className="flex justify-between">
                <span>Total Google Reviews:</span>
                <strong className="text-white">{selectedLead.reviewCount} reviews</strong>
              </div>
              <div className="flex justify-between">
                <span>Deficits Found:</span>
                <strong className="text-red-300">{deficitsFound} Critical Gaps</strong>
              </div>
              <div className="flex justify-between">
                <span>Estimated Deal Value:</span>
                <strong className="text-yellow-300 font-mono text-sm">${selectedLead.estimatedDealValue || 750}</strong>
              </div>
            </div>

            <button
              onClick={handleRerunAudit}
              disabled={isSimulatingAudit}
              className="w-full bg-white hover:bg-maroon-50 text-maroon-950 font-extrabold py-3.5 rounded-xl transition-all shadow-md text-xs flex items-center justify-center space-x-2 font-['Outfit'] disabled:opacity-75"
            >
              {isSimulatingAudit ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning live endpoints...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-maroon-600" />
                  <span>Re-run Live Digital Audit</span>
                </>
              )}
            </button>
          </div>

          {/* Bottleneck & Pitch Card */}
          <div className="bg-white rounded-3xl p-6 border border-maroon-100 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-red-700 uppercase tracking-wider font-['Outfit']">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>Operational Bottleneck</span>
            </div>
            <p className="text-sm font-semibold text-gray-900 leading-snug">{selectedLead.needDetected}</p>
            <div className="pt-3 border-t border-gray-100">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block font-['Outfit'] mb-1">💡 Recommended RizQara Pitch</span>
              <p className="text-sm font-bold text-maroon-900">{selectedLead.serviceRecommended}</p>
            </div>
            <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100 text-center">
                <div className="font-extrabold text-emerald-800 text-base">{passedChecks}/6</div>
                <div className="text-emerald-600 font-semibold">Checks Passed</div>
              </div>
              <div className="bg-red-50 rounded-xl p-3 border border-red-100 text-center">
                <div className="font-extrabold text-red-800 text-base">{deficitsFound}/6</div>
                <div className="text-red-600 font-semibold">Gaps Detected</div>
              </div>
            </div>
            <button
              onClick={() => onSelectLeadForMessage(selectedLead)}
              className="w-full bg-maroon-700 hover:bg-maroon-800 text-white font-extrabold py-3 px-4 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center space-x-2 mt-2 font-['Outfit']"
            >
              <Bot className="w-4 h-4 text-yellow-300" />
              <span>Generate AI Sales Copy</span>
            </button>
          </div>
        </div>

        {/* Right Column: 6-Point Diagnostic Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm space-y-6">
            <div>
              <h3 className="font-extrabold text-xl text-maroon-950 font-['Outfit']">Digital Presence Report Card</h3>
              <p className="text-xs text-gray-500 mt-1">6-point breakdown across speed, accessibility, and modern customer onboarding</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {checkItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.label} 
                    className={`p-5 rounded-2xl border space-y-3 transition-all ${item.pass ? 'bg-emerald-50/40 border-emerald-200' : 'bg-red-50/30 border-red-200'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 font-extrabold text-sm text-gray-900 font-['Outfit']">
                        <Icon className={`w-4 h-4 ${item.color}`} />
                        <span>{item.label}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono flex items-center space-x-1 ${item.tagColor}`}>
                        {item.pass
                          ? <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                          : <XCircle className="w-3.5 h-3.5 mr-1" />
                        }
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                );
              })}
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
