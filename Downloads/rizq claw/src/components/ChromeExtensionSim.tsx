import React, { useState } from 'react';
import type { Lead, LeadCategory } from '../types';
import { 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  Monitor, 
  Camera, 
  Database, 
  Bot,
  Zap,
  Globe
} from 'lucide-react';

interface ChromeExtensionSimProps {
  onAddLeads: (newLeads: Lead[]) => void;
  onSelectLeadForAudit: (lead: Lead) => void;
}

export const ChromeExtensionSim: React.FC<ChromeExtensionSimProps> = ({ 
  onAddLeads,
  onSelectLeadForAudit 
}) => {
  const [targetUrl, setTargetUrl] = useState<string>('https://google.com/maps/place/Sultans+Dine+Mirpur');
  const [simCategory, setSimCategory] = useState<LeadCategory>('Restaurant');
  const [isSimulating, setIsSimulating] = useState(false);
  const [successLead, setSuccessLead] = useState<Lead | null>(null);

  const handleSimulateSave = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      const idSuffix = Date.now().toString().slice(-4);
      
      let businessName = "Sultan's Dine Mirpur Branch";
      let location = "Mirpur 10, Dhaka";
      if (targetUrl.includes('facebook.com')) {
        businessName = "Banani Dental & Orthodontics";
        location = "Banani 11, Dhaka";
      } else if (targetUrl.includes('linkedin.com')) {
        businessName = "Skyline Heights Real Estate";
        location = "Bashundhara R/A, Dhaka";
      }

      const newLead: Lead = {
        id: `extension-sim-${idSuffix}`,
        businessName: businessName,
        category: simCategory,
        location: location,
        phone: '+880 1711-8899' + idSuffix.slice(0, 2),
        email: `manager@${businessName.toLowerCase().replace(/[^a-z]/g, '')}.com`,
        website: simCategory === 'Restaurant' ? '' : 'https://skylinerealestate.bd',
        facebook: targetUrl.includes('facebook') ? targetUrl : `https://facebook.com/${businessName.toLowerCase().replace(/[^a-z]/g, '')}`,
        whatsapp: '+88017118899' + idSuffix.slice(0, 2),
        rating: 4.6,
        reviewCount: 420,
        score: simCategory === 'Restaurant' ? 92 : 86,
        status: 'Hot Lead',
        needDetected: simCategory === 'Restaurant' ? 'No automated QR table menu system, manual waiter taking orders' : 'Slow website loading speed on mobile, no automated CRM lead routing',
        serviceRecommended: simCategory === 'Restaurant' ? 'Restaurant QR Ordering + Kitchen POS System' : 'Real Estate Virtual Tour Showcase + WhatsApp Automation CRM',
        aiMessageDraft: `Assalamu Alaikum ${businessName} management,\n\nI visited your Google Maps profile and noticed your stellar 4.6 rating with 420 reviews. However, during rush hours, your waiters are currently taking orders manually.\n\nRizQara Tech can deploy an instant QR table ordering system where customers order from their phone and orders print instantly in the kitchen.\n\nCould I share a 2-minute demo video?`,
        outreachChannel: 'WhatsApp',
        approved: false,
        followUpStage: 'None',
        notes: [`Harvested live via Chrome Extension simulator from URL: ${targetUrl}`],
        auditDetails: {
          websiteExists: simCategory !== 'Restaurant',
          speedScore: simCategory === 'Restaurant' ? 0 : 58,
          isMobileFriendly: true,
          hasOnlineOrder: false,
          hasWhatsApp: false,
          hasBookingSystem: false,
          hasGoogleReviewsReply: false,
          fbActive: true,
          seoScore: 40
        },
        decisionMaker: 'Miraz Hossain',
        decisionMakerTitle: 'Branch Operations Head',
        estimatedDealValue: simCategory === 'Restaurant' ? 800 : 1500,
        createdVia: 'Chrome Extension'
      };

      setSuccessLead(newLead);
      onAddLeads([newLead]);
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-800 rounded-3xl p-8 md:p-12 text-white shadow-xl shadow-maroon-900/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-yellow-300 border border-white/20">
              <Compass className="w-3.5 h-3.5 text-yellow-300" />
              <span>Browser Companion &amp; Instant CRM Injector</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-['Outfit']">
              RizQ Claw Chrome Extension
            </h1>
            <p className="text-maroon-100 text-sm md:text-base leading-relaxed font-light">
              While browsing Google Maps, Facebook Pages or LinkedIn profiles, click <strong className="font-bold text-white">&apos;Save to RizQ Claw&apos;</strong> to instantly extract contact info, take page screenshots, and run autonomous digital gap audits.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 space-y-2 w-full md:w-auto text-center">
            <div className="text-xs text-maroon-200 uppercase tracking-wider font-bold">Extension Status</div>
            <div className="flex items-center justify-center space-x-2 text-emerald-400 font-extrabold text-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>v1.2 (Active &amp; Linked)</span>
            </div>
            <button className="w-full bg-white text-maroon-900 font-bold px-4 py-2 rounded-xl text-xs shadow hover:bg-maroon-50 transition-all flex items-center justify-center space-x-1.5 mt-2">
              <Download className="w-3.5 h-3.5" />
              <span>Download .ZIP Package</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Simulator Card */}
      <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-maroon-50 text-maroon-700 flex items-center justify-center font-bold">
              <Monitor className="w-5 h-5 text-maroon-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-xl text-maroon-950 font-['Outfit']">Live Extension Simulator</h3>
              <p className="text-xs text-gray-500 font-medium">Paste any Google Map, Facebook or website link below to test one-click extraction</p>
            </div>
          </div>
          <span className="text-xs text-gray-400 font-mono hidden sm:inline">Chromium MV3 API Sim</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          
          {/* Target URL Input */}
          <div className="col-span-1 md:col-span-2 space-y-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Simulated Browser URL
            </label>
            <div className="relative">
              <Globe className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://google.com/maps/place/..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-maroon-600 transition-all font-mono"
              />
            </div>
            <div className="flex flex-wrap gap-2 pt-1 text-xs text-gray-500">
              <span>Quick tests:</span>
              <button 
                onClick={() => { setTargetUrl('https://google.com/maps/place/Sultans+Dine+Mirpur'); setSimCategory('Restaurant'); }} 
                className="text-[11px] bg-white border border-gray-200 px-2 py-0.5 rounded hover:bg-gray-50 text-gray-700 font-medium"
              >
                Google Maps (Restaurant)
              </button>
              <button 
                onClick={() => { setTargetUrl('https://facebook.com/bananidentalclinic'); setSimCategory('Clinic'); }} 
                className="text-[11px] bg-white border border-gray-200 px-2 py-0.5 rounded hover:bg-gray-50 text-gray-700 font-medium"
              >
                Facebook Page (Clinic)
              </button>
              <button 
                onClick={() => { setTargetUrl('https://linkedin.com/company/skylinerealestate'); setSimCategory('Real Estate'); }} 
                className="text-[11px] bg-white border border-gray-200 px-2 py-0.5 rounded hover:bg-gray-50 text-gray-700 font-medium"
              >
                LinkedIn (Real Estate)
              </button>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Category Tag
            </label>
            <div className="flex space-x-2">
              <select
                value={simCategory}
                onChange={(e) => setSimCategory(e.target.value as LeadCategory)}
                className="w-1/3 px-3 py-3 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-maroon-600 transition-all"
              >
                <option value="Restaurant">Restaurant</option>
                <option value="Clinic">Clinic</option>
                <option value="Gym">Gym</option>
                <option value="Salon">Salon</option>
                <option value="Real Estate">Real Estate</option>
                <option value="School">School</option>
              </select>

              <button
                onClick={handleSimulateSave}
                disabled={isSimulating}
                className="flex-1 bg-gradient-to-r from-maroon-700 to-maroon-900 hover:from-maroon-800 hover:to-maroon-950 text-white font-extrabold py-3 px-4 rounded-xl transition-all shadow-lg shadow-maroon-900/20 flex items-center justify-center space-x-2 text-sm disabled:opacity-75 font-['Outfit']"
              >
                {isSimulating ? (
                  <span>Extracting...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span>Save to RizQ Claw</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Extraction Success Card */}
        {successLead && (
          <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-4 shadow-sm animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Extraction Complete! Business successfully injected into CRM.</span>
              </div>
              <span className="bg-emerald-600 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-xs">
                Score {successLead.score}/100 (Hot Lead)
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="font-bold text-gray-500 uppercase text-[10px] block">Extracted Entity:</span>
                <strong className="text-maroon-950 font-bold text-sm">{successLead.businessName}</strong>
                <p className="text-gray-600">📍 {successLead.location}</p>
              </div>

              <div>
                <span className="font-bold text-gray-500 uppercase text-[10px] block">Contact &amp; Key Contact:</span>
                <strong className="text-gray-900 font-mono">{successLead.phone}</strong>
                <p className="text-gray-600">{successLead.decisionMaker || 'Operations Head'} ({successLead.decisionMakerTitle})</p>
              </div>

              <div>
                <span className="font-bold text-gray-500 uppercase text-[10px] block">Digital Deficit Gap:</span>
                <span className="text-red-800 font-semibold">{successLead.needDetected}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => onSelectLeadForAudit(successLead)}
                className="bg-maroon-700 hover:bg-maroon-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow flex items-center space-x-1.5"
              >
                <span>View Full Audit &amp; AI Pitch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Capabilities Overview Grid */}
      <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm space-y-6">
        <div>
          <h3 className="font-extrabold text-xl text-maroon-950 font-['Outfit']">Extension Core Capabilities</h3>
          <p className="text-xs text-gray-500 mt-1">How the Chrome extension automates manual lead sourcing</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Capability 1 */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="font-bold text-maroon-950 text-base font-['Outfit']">Data Scraper</h4>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              Extracts business name, phone numbers, email addresses, and location data directly from the active DOM element.
            </p>
          </div>

          {/* Capability 2 */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Camera className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="font-bold text-maroon-950 text-base font-['Outfit']">Screenshot Archiver</h4>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              Captures a visual snapshot of their existing slow website or Facebook header for inclusion in the formal proposal.
            </p>
          </div>

          {/* Capability 3 */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5 text-amber-600" />
            </div>
            <h4 className="font-bold text-maroon-950 text-base font-['Outfit']">Instant Audit Trigger</h4>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              Immediately dispatches the domain to RizQ Claw backend to run PageSpeed v5 analysis and SSL verification in the background.
            </p>
          </div>

          {/* Capability 4 */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5 text-emerald-600" />
            </div>
            <h4 className="font-bold text-maroon-950 text-base font-['Outfit']">One-Click AI Draft</h4>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              Prepares a personalized outreach draft in WhatsApp or Email format so it is ready for your human approval when you open the dashboard.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
