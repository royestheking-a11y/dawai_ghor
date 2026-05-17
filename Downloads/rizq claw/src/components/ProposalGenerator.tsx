import React, { useState } from 'react';
import type { Lead } from '../types';
import { 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  Printer, 
  Layers
} from 'lucide-react';

interface ProposalGeneratorProps {
  leads: Lead[];
  onConvertDeal: (leadId: string) => void;
  selectedLeadId?: string;
}

export const ProposalGenerator: React.FC<ProposalGeneratorProps> = ({ 
  leads, 
  onConvertDeal,
  selectedLeadId 
}) => {
  const interestedLeads = leads.filter(l => ['Interested', 'Demo Sent', 'Meeting Booked', 'Proposal Sent', 'Converted', 'Replied'].includes(l.status));
  const initialSelectedId = selectedLeadId || interestedLeads[0]?.id || leads[0]?.id || '';
  
  const [currentLeadId, setCurrentLeadId] = useState<string>(initialSelectedId);
  const [selectedTier, setSelectedTier] = useState<string>('Professional');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const selectedLead = leads.find(l => l.id === currentLeadId) || leads[0];

  if (!selectedLead) {
    return <div className="p-8 text-center text-gray-500">No leads available for proposal generation.</div>;
  }

  const handleAcceptProposal = () => {
    onConvertDeal(selectedLead.id);
    setSuccessMsg(`🎉 Success! Customer agreement signed and verified for ${selectedLead.businessName}. Initial advance deposit invoice sent to ${selectedLead.email || selectedLead.phone}.`);
    setTimeout(() => {
      setSuccessMsg(null);
    }, 6000);
  };

  const handleDownloadPdf = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert(`Proposal PDF successfully compiled and downloaded for ${selectedLead.businessName}!`);
    }, 1500);
  };

  const pricingTiers = [
    {
      name: 'Starter Setup',
      price: '$499',
      timeline: '7-10 Business Days',
      features: [
        'Single-Page Responsive Web Portal',
        'Basic WhatsApp Chat Widget integration',
        'Google Business Profile verification support',
        '3 months free maintenance & cloud hosting'
      ]
    },
    {
      name: 'Professional',
      price: `$${selectedLead.estimatedDealValue || 750}`,
      timeline: '14 Business Days',
      features: [
        `Complete ${selectedLead.category} System Suite`,
        'Automated QR Menu / Booking Scheduler',
        'POS / Inventory Dashboard Integration',
        'Admin Mobile App access & notifications',
        '1 Year Cloud Hosting & Premium SSL'
      ],
      badge: 'Most Popular'
    },
    {
      name: 'Enterprise Automation',
      price: '$1,299',
      timeline: '21 Business Days',
      features: [
        'Full Multi-Branch Setup & Custom CRM',
        'Biometric / Barcode Scanner Support',
        'Automated WhatsApp Billing reminders',
        'Dedicated Cloud VPS & Daily Backups',
        '24/7 Priority VIP Developer support'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-emerald-200">
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Web Proposal Compiler</span>
          </div>
          <h1 className="text-3xl font-extrabold text-maroon-950 font-['Outfit']">
            Formal Business Proposal
          </h1>
          <p className="text-gray-600 text-sm mt-1 max-w-2xl">
            Compile professional, high-fidelity contract proposals outlining exactly how RizQara Tech resolves their operational bottleneck. Includes pricing tiers, timeline, and digital acceptance.
          </p>
        </div>

        {/* Lead Selector Dropdown */}
        <div className="w-full md:w-72">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Select Interested Lead
          </label>
          <select
            value={currentLeadId}
            onChange={(e) => setCurrentLeadId(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-maroon-950 focus:outline-none focus:ring-2 focus:ring-maroon-600 transition-all shadow-sm"
          >
            {interestedLeads.map((l) => (
              <option key={l.id} value={l.id}>
                {l.status === 'Converted' ? '🏆' : '💼'} {l.businessName} ({l.category}) - ${l.estimatedDealValue || 650}
              </option>
            ))}
          </select>
        </div>
      </div>

      {successMsg && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-800 text-white font-semibold text-sm shadow-xl flex items-center space-x-3 animate-bounce">
          <CheckCircle2 className="w-6 h-6 text-yellow-300 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Proposal Document Wrapper */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden max-w-5xl mx-auto">
        
        {/* Document Header Banner */}
        <div className="bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-800 p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b-4 border-maroon-500">
          <div className="space-y-2">
            <span className="text-xs font-mono text-maroon-300 uppercase tracking-widest block">Digital Transformation Agreement</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-['Outfit']">
              {selectedLead.serviceRecommended}
            </h2>
            <p className="text-sm text-maroon-100 font-light max-w-xl">
              Prepared specifically for <strong className="font-bold text-white">{selectedLead.businessName}</strong> &bull; {selectedLead.location}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-right space-y-1 w-full md:w-auto">
            <div className="text-[11px] text-maroon-200 uppercase tracking-wider font-bold">Proposal Vendor</div>
            <div className="font-extrabold text-lg font-['Outfit'] text-white">RizQara Tech Ltd.</div>
            <div className="text-xs text-maroon-300 font-mono">ID: RQT-2026-{selectedLead.id.slice(-4)}</div>
            <div className="text-xs text-emerald-300 font-semibold pt-1">Status: {selectedLead.status === 'Converted' ? 'Signed & Paid' : 'Pending Client Acceptance'}</div>
          </div>
        </div>

        {/* Document Body */}
        <div className="p-8 md:p-12 space-y-10">
          
          {/* Executive Summary & Problem vs Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-red-50/50 border border-red-200 space-y-3">
              <h4 className="font-extrabold text-red-950 text-base uppercase tracking-wider font-['Outfit'] flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                <span>Current Operational Bottleneck</span>
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                {selectedLead.needDetected}. Customers actively searching for your services in {selectedLead.location} face friction when ordering or booking appointments. This manual phone call dependency causes high drop-offs during rush hours and limits scaling.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
              <h4 className="font-extrabold text-emerald-950 text-base uppercase tracking-wider font-['Outfit'] flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <span>The RizQara Tech Solution</span>
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                Deploying a state-of-the-art {selectedLead.category} automation suite. Includes a responsive mobile-first portal, automated QR ordering/scheduling, and instant WhatsApp customer notifications to maximize retention and streamline administrative management.
              </p>
            </div>
          </div>

          {/* Scope of Work Breakdown */}
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-maroon-950 font-['Outfit'] flex items-center space-x-2 border-b pb-3 border-gray-100">
              <Layers className="w-5 h-5 text-maroon-600" />
              <span>Scope of Work &amp; Deliverables</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-700">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                <strong className="text-maroon-950 block text-sm">1. UI/UX Design &amp; Portal</strong>
                <p>Custom mobile-friendly website tailored for {selectedLead.category} customers. Lightning-fast PageSpeed optimized for 4G devices.</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                <strong className="text-maroon-950 block text-sm">2. Workflow &amp; POS Integration</strong>
                <p>Automated ordering, table QR scanning, or doctor appointment booking engine directly synced to your staff dashboard.</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                <strong className="text-maroon-950 block text-sm">3. WhatsApp Automation</strong>
                <p>Automated SMS and WhatsApp notifications sent instantly upon order confirmation or appointment booking.</p>
              </div>
            </div>
          </div>

          {/* Pricing Tiers Table / Cards */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-maroon-950 font-['Outfit']">Investment &amp; Pricing Packages</h3>
              <p className="text-xs text-gray-500 mt-1">Select the package that fits your operational roadmap. All packages include 3 months free maintenance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {pricingTiers.map((tier) => {
                const isSelected = selectedTier === tier.name;
                return (
                  <div 
                    key={tier.name}
                    onClick={() => setSelectedTier(tier.name)}
                    className={`rounded-3xl p-6 border text-left cursor-pointer transition-all flex flex-col justify-between relative ${
                      isSelected 
                        ? 'bg-maroon-950 text-white border-maroon-950 shadow-xl scale-102 ring-2 ring-maroon-600' 
                        : 'bg-white text-gray-900 border-gray-200 hover:border-maroon-300 hover:shadow-md'
                    }`}
                  >
                    {tier.badge && (
                      <span className="absolute -top-3 right-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-maroon-950 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase shadow">
                        {tier.badge}
                      </span>
                    )}

                    <div className="space-y-4">
                      <div>
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${isSelected ? 'text-maroon-300' : 'text-gray-500'}`}>
                          {tier.timeline}
                        </span>
                        <h4 className={`text-2xl font-extrabold mt-1 font-['Outfit'] ${isSelected ? 'text-white' : 'text-maroon-950'}`}>
                          {tier.name}
                        </h4>
                      </div>

                      <div className="text-3xl font-extrabold font-['Outfit']">
                        {tier.price}
                      </div>

                      <ul className="space-y-2.5 border-t pt-4 border-gray-200/50 text-xs">
                        {tier.features.map((feat, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-yellow-300' : 'text-emerald-600'}`} />
                            <span className={isSelected ? 'text-maroon-100' : 'text-gray-700'}>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6">
                      <button
                        className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-yellow-300 to-amber-400 text-maroon-950 shadow-md'
                            : 'bg-gray-100 text-gray-800 hover:bg-maroon-100 hover:text-maroon-900'
                        }`}
                      >
                        {isSelected ? 'Selected Package' : 'Select Package'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action / Acceptance Bar */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm font-extrabold text-maroon-950 font-['Outfit']">Customer Acceptance &amp; Signature</div>
              <p className="text-xs text-gray-600 mt-0.5">By clicking accept, the client agrees to the terms and initiates project onboarding.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <button
                onClick={handleDownloadPdf}
                disabled={isDownloading}
                className="w-full sm:w-auto bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 px-6 py-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2"
              >
                <Printer className="w-4 h-4 text-gray-600" />
                <span>{isDownloading ? 'Compiling PDF...' : 'Download Proposal PDF'}</span>
              </button>

              {selectedLead.status === 'Converted' ? (
                <button
                  disabled
                  className="w-full sm:w-auto bg-emerald-100 text-emerald-800 font-bold px-8 py-3.5 rounded-xl cursor-default flex items-center justify-center space-x-2 text-sm border border-emerald-200"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Agreement Signed &amp; Paid ($375 Deposit)</span>
                </button>
              ) : (
                <button
                  onClick={handleAcceptProposal}
                  className="w-full sm:w-auto bg-gradient-to-r from-maroon-700 to-maroon-950 hover:from-maroon-800 hover:to-maroon-950 text-white font-extrabold px-8 py-3.5 rounded-xl transition-all shadow-xl shadow-maroon-900/20 flex items-center justify-center space-x-2 text-sm font-['Outfit']"
                >
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                  <span>Accept &amp; Sign Agreement ({selectedTier})</span>
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
