import React, { useState } from 'react';
import type { Lead, LeadCategory } from '../types';
import { 
  Search, 
  Sparkles, 
  Filter, 
  MapPin, 
  Sliders, 
  Plus, 
  CheckCircle2, 
  ArrowRight,
  RefreshCw,
  Building2,
  PhoneCall
} from 'lucide-react';

interface LeadHunterProps {
  onAddLeads: (leads: Lead[]) => void;
  onOpenAddModal: () => void;
  onSelectLeadForAudit: (lead: Lead) => void;
}

export const LeadHunter: React.FC<LeadHunterProps> = ({
  onAddLeads,
  onOpenAddModal,
  onSelectLeadForAudit
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [isSearching, setIsSearching] = useState(false);
  const [harvestedResults, setHarvestedResults] = useState<Lead[]>([]);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const simulateLiveHarvesting = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      const idSuffix1 = Date.now().toString().slice(-4);
      const idSuffix2 = (Date.now() + 100).toString().slice(-4);

      const scraped1: Lead = {
        id: `scraped-live-${idSuffix1}`,
        businessName: searchTerm ? `${searchTerm} Express` : 'Takeout Banani',
        category: categoryFilter === 'All' ? 'Restaurant' : (categoryFilter as LeadCategory),
        location: locationFilter === 'All' ? 'Banani 11, Dhaka' : `${locationFilter}, Bangladesh`,
        phone: '+880 1711-45' + idSuffix1.slice(0, 2),
        email: `contact@${searchTerm ? searchTerm.toLowerCase().replace(/[^a-z]/g, '') : 'takeout'}.com`,
        website: '',
        facebook: 'https://facebook.com/' + (searchTerm ? searchTerm.toLowerCase().replace(/[^a-z]/g, '') : 'takeoutbanani'),
        whatsapp: '+880171145' + idSuffix1.slice(0, 2),
        rating: 4.4,
        reviewCount: 380,
        score: 88,
        status: 'New',
        needDetected: 'No online food delivery portal or automated WhatsApp ordering system',
        serviceRecommended: 'Instant QR Menu & Delivery Management Dashboard',
        aiMessageDraft: `Assalamu Alaikum ${searchTerm || 'Takeout'} management,\n\nI was reviewing your Google rating (4.4 stars across 380 customer reviews) in ${locationFilter === 'All' ? 'Banani' : locationFilter}. I noticed you rely on manual phone calls or third-party apps taking heavy commissions.\n\nRizQara Tech can deploy an instant zero-commission WhatsApp QR ordering menu.\n\nCould I send over a 2-minute video demo?`,
        outreachChannel: 'WhatsApp',
        approved: false,
        followUpStage: 'None',
        notes: ['Harvested live via Google Maps scraping cluster.'],
        auditDetails: {
          websiteExists: false,
          speedScore: 0,
          isMobileFriendly: false,
          hasOnlineOrder: false,
          hasWhatsApp: false,
          hasBookingSystem: false,
          hasGoogleReviewsReply: false,
          fbActive: true,
          seoScore: 0
        },
        decisionMaker: 'Tanvir Ahmed',
        decisionMakerTitle: 'Managing Partner',
        estimatedDealValue: 750,
        createdVia: 'Google Places'
      };

      const scraped2: Lead = {
        id: `scraped-live-${idSuffix2}`,
        businessName: searchTerm ? `${searchTerm} Dental Care` : 'LabAid Diagnostic Mirpur',
        category: 'Clinic',
        location: locationFilter === 'All' ? 'Mirpur 10, Dhaka' : `${locationFilter}, Bangladesh`,
        phone: '+880 1819-22' + idSuffix2.slice(0, 2),
        email: `admin@${searchTerm ? searchTerm.toLowerCase().replace(/[^a-z]/g, '') : 'labaid'}.com.bd`,
        website: 'https://' + (searchTerm ? searchTerm.toLowerCase().replace(/[^a-z]/g, '') : 'labaid') + '.com',
        facebook: 'https://facebook.com/' + (searchTerm ? searchTerm.toLowerCase().replace(/[^a-z]/g, '') : 'labaidmirpur'),
        whatsapp: '+880181922' + idSuffix2.slice(0, 2),
        rating: 4.2,
        reviewCount: 512,
        score: 84,
        status: 'New',
        needDetected: 'Website takes 7 seconds to load on mobile, no automated doctor appointment scheduling',
        serviceRecommended: 'Doctor Appointment Booking Engine + Automated WhatsApp Reminders',
        aiMessageDraft: `Assalamu Alaikum ${searchTerm || 'LabAid'} management,\n\nI visited your digital portal in ${locationFilter === 'All' ? 'Mirpur' : locationFilter} and noticed strong local search presence (512 reviews). However, patients must call your hotline manually to confirm doctor slots.\n\nRizQara Tech can integrate an automated WhatsApp booking engine directly onto your profile.\n\nWould you be open to a 2-minute walkthrough?`,
        outreachChannel: 'WhatsApp',
        approved: false,
        followUpStage: 'None',
        notes: ['Harvested live via Facebook & Directory search cluster.'],
        auditDetails: {
          websiteExists: true,
          speedScore: 42,
          isMobileFriendly: true,
          hasOnlineOrder: false,
          hasWhatsApp: false,
          hasBookingSystem: false,
          hasGoogleReviewsReply: true,
          fbActive: true,
          seoScore: 45
        },
        decisionMaker: 'Dr. Shahinur Rahman',
        decisionMakerTitle: 'Medical Director',
        estimatedDealValue: 1250,
        createdVia: 'Website Scraper'
      };

      setHarvestedResults([scraped1, scraped2]);
      onAddLeads([scraped1, scraped2]);
      setSuccessMsg(`🚀 Successfully harvested & audited 2 live businesses matching '${searchTerm || 'General'}' in ${locationFilter}.`);
      setTimeout(() => setSuccessMsg(null), 6000);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-yellow-50 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-yellow-200">
            <Search className="w-3.5 h-3.5 text-yellow-600" />
            <span>Autonomous Web Sourcing Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-maroon-950 font-['Outfit']">
            Prospect Harvester
          </h1>
          <p className="text-gray-600 text-sm mt-1 max-w-2xl">
            Search Google Maps, Facebook Pages, and LinkedIn across Bangladeshi regions. Instantly calculate trust scores and discover businesses needing digital upgrades.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="bg-maroon-700 hover:bg-maroon-800 text-white font-extrabold px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center space-x-2 text-sm shrink-0 font-['Outfit']"
        >
          <Plus className="w-4 h-4" />
          <span>Manually Inject Lead</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-800 text-white font-semibold text-sm shadow-xl flex items-center space-x-3 animate-bounce">
          <CheckCircle2 className="w-6 h-6 text-yellow-300 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Advanced Search Bar & Filters */}
      <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="md:col-span-2 relative">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Search Keyword or Brand</label>
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g. Sultan's Dine, Star Kabab, Dental..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold text-maroon-950 focus:outline-none focus:ring-2 focus:ring-maroon-600 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-maroon-600" />
              <span>Target Cluster</span>
            </label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold text-maroon-950 focus:outline-none focus:ring-2 focus:ring-maroon-600 transition-all"
            >
              <option value="All">All Bangladesh</option>
              <option value="Dhaka">Dhaka (Gulshan, Banani, Mirpur)</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Barishal">Barishal</option>
              <option value="Rajshahi">Rajshahi</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
              <Filter className="w-3.5 h-3.5 text-maroon-600" />
              <span>Target Niche</span>
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold text-maroon-950 focus:outline-none focus:ring-2 focus:ring-maroon-600 transition-all"
            >
              <option value="All">All Categories</option>
              <option value="Restaurant">Restaurant &amp; Cafe</option>
              <option value="Clinic">Clinic &amp; Hospital</option>
              <option value="Gym">Gym &amp; Fitness</option>
              <option value="Salon">Salon &amp; Spa</option>
              <option value="Real Estate">Real Estate</option>
              <option value="School">School &amp; Coaching</option>
            </select>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-xs text-gray-500 w-full sm:w-auto">
            <Sliders className="w-4 h-4 text-maroon-600 shrink-0" />
            <span>Scraping Sources: <strong className="text-maroon-950">Google Places API v2 &bull; Meta Pages API &bull; LinkedIn Company Directory</strong></span>
          </div>

          <button
            onClick={simulateLiveHarvesting}
            disabled={isSearching}
            className="w-full sm:w-auto bg-gradient-to-r from-yellow-300 to-amber-400 hover:from-yellow-400 hover:to-amber-500 text-maroon-950 font-extrabold px-8 py-3.5 rounded-xl transition-all shadow-xl flex items-center justify-center space-x-2 text-sm font-['Outfit'] disabled:opacity-75"
          >
            {isSearching ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-maroon-900" />
                <span>Interrogating Live Endpoints...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-maroon-900" />
                <span>Autonomous Search &amp; Audit</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Harvested Live Results Section */}
      {harvestedResults.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-2xl text-maroon-950 font-['Outfit'] flex items-center space-x-2">
              <span>Live Harvested Stream</span>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {harvestedResults.length} New Prospects Injected
              </span>
            </h3>
            <span className="text-xs text-gray-500 font-mono">Automated Trust Scoring &amp; Audit complete</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {harvestedResults.map((lead) => (
              <div 
                key={lead.id} 
                className="bg-white rounded-3xl p-6 border-2 border-emerald-500 shadow-xl space-y-4 hover:border-maroon-600 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-widest shadow">
                  Score: {lead.score}/100
                </div>

                <div className="space-y-1 pr-20">
                  <div className="flex items-center space-x-2">
                    <span className="p-1 rounded bg-maroon-50 text-maroon-700">
                      <Building2 className="w-4 h-4" />
                    </span>
                    <h4 className="font-extrabold text-lg text-maroon-950 group-hover:text-maroon-700 transition-colors">{lead.businessName}</h4>
                  </div>
                  <p className="text-xs text-gray-600">📍 {lead.location} &bull; ⭐️ {lead.rating} ({lead.reviewCount} Reviews)</p>
                </div>

                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-gray-500 uppercase">Operational Bottleneck Detected:</span>
                    <span className="text-maroon-800 font-extrabold font-mono">${lead.estimatedDealValue || 750} Value</span>
                  </div>
                  <p className="font-semibold text-red-700">{lead.needDetected}</p>
                  <div className="pt-2 border-t border-gray-200/80 flex items-center justify-between text-gray-600">
                    <span>Verified Contact: <strong className="text-gray-900">{lead.phone}</strong></span>
                    <span>C-Level: <strong className="text-maroon-900">{lead.decisionMaker}</strong></span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-50 text-blue-800 text-[10px] font-extrabold px-2 py-1 rounded flex items-center space-x-1 border border-blue-200">
                      <PhoneCall className="w-3 h-3" />
                      <span>{lead.outreachChannel} Queued</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectLeadForAudit(lead)}
                    className="bg-maroon-700 hover:bg-maroon-800 text-white font-extrabold px-4 py-2 rounded-xl transition-all shadow text-xs flex items-center space-x-1.5 font-['Outfit']"
                  >
                    <span>Inspect Full Digital Audit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
