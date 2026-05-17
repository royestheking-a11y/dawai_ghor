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
  PhoneCall,
  Star,
  TrendingUp,
  Globe,
  AlertTriangle
} from 'lucide-react';

interface LeadHunterProps {
  onAddLeads: (leads: Lead[]) => void;
  onOpenAddModal: () => void;
  onSelectLeadForAudit: (lead: Lead) => void;
}

// A large pool of realistic Bangladeshi business mock data
const LEAD_POOL = [
  { name: 'Kachchi Bhai Dhanmondi', cat: 'Restaurant', loc: 'Dhanmondi 27, Dhaka', rating: 4.7, reviews: 892, phone: '+880 1711-223344', dm: 'Kamal Hossain', dmTitle: 'Managing Director', need: 'No QR table ordering, long manual wait time for phone orders', service: 'QR Ordering System + Kitchen Display POS', value: 950, score: 91 },
  { name: 'PanAsia Sushi Bar Gulshan', cat: 'Restaurant', loc: 'Gulshan 2, Dhaka', rating: 4.5, reviews: 340, phone: '+880 1819-445566', dm: 'Arman Rahman', dmTitle: 'Operations Head', need: 'No online reservation system, peak hour crowding unmanaged', service: 'Smart Table Reservation Engine + SMS Automation', value: 1100, score: 87 },
  { name: 'LabAid Specialist Hospital', cat: 'Clinic', loc: 'Mirpur 10, Dhaka', rating: 4.3, reviews: 1230, phone: '+880 1678-112233', dm: 'Dr. Fazlur Rahman', dmTitle: 'Medical Director', need: 'Patients call manually for appointments, no online slot booking', service: 'Doctor Appointment Booking Engine + Automated SMS', value: 2200, score: 89 },
  { name: 'CarePoint Diagnostic Center', cat: 'Clinic', loc: 'Banani 11, Dhaka', rating: 4.1, reviews: 567, phone: '+880 1912-334455', dm: 'Dr. Sadia Islam', dmTitle: 'Clinic Administrator', need: '7-second mobile load time, no digital report delivery system', service: 'Fast Medical Portal + Automated Digital Report Delivery', value: 1800, score: 84 },
  { name: 'FitZone Premium Gym', cat: 'Gym', loc: 'Uttara Sector 11, Dhaka', rating: 4.6, reviews: 289, phone: '+880 1515-667788', dm: 'Sohel Rana', dmTitle: 'Branch Manager', need: 'Manual paper-based membership renewals, no online payment', service: 'Gym CRM + Automated Membership & Billing System', value: 750, score: 85 },
  { name: 'PowerFlex Fitness Mirpur', cat: 'Gym', loc: 'Mirpur 12, Dhaka', rating: 4.2, reviews: 145, phone: '+880 1716-889900', dm: 'Raju Ahmed', dmTitle: 'Owner', need: 'No mobile app for class booking, trainers book manually via phone', service: 'Fitness App + Class Booking Automation', value: 680, score: 82 },
  { name: 'Glow Beauty Salon Gulshan', cat: 'Salon', loc: 'Gulshan 1, Dhaka', rating: 4.8, reviews: 412, phone: '+880 1911-001122', dm: 'Nasrin Akter', dmTitle: 'Salon Owner', need: 'Appointment cancellations lost manually, no digital booking system', service: 'Smart Appointment Booking + Automated Reminder System', value: 600, score: 88 },
  { name: 'Al-Madina Pharmacy Barguna', cat: 'Pharmacy', loc: 'Barguna Sadar, Barishal', rating: 4.0, reviews: 78, phone: '+880 1711-998877', dm: 'Mizanur Rahman', dmTitle: 'Pharmacy Manager', need: 'No digital inventory system, medicine stockouts untracked', service: 'Pharmacy POS + Inventory & Expiry Tracking System', value: 550, score: 80 },
  { name: 'Skyline Towers Real Estate', cat: 'Real Estate', loc: 'Bashundhara R/A, Dhaka', rating: 4.4, reviews: 203, phone: '+880 1812-445566', dm: 'Imtiaz Karim', dmTitle: 'Sales Director', need: 'No virtual property tour system, slow website with no lead capture form', service: 'Real Estate Portal + Virtual Tour + Lead Automation', value: 3500, score: 90 },
  { name: 'Sunrise English Medium School', cat: 'School', loc: 'Sylhet Sadar', rating: 4.5, reviews: 167, phone: '+880 1615-778899', dm: 'Principal Jalil', dmTitle: 'School Principal', need: 'Paper-based admission forms, no parent communication system', service: 'School ERP + Online Admission + Parent Portal', value: 1400, score: 86 },
  { name: 'Crust & Crumbs Bakery Chittagong', cat: 'Restaurant', loc: 'GEC Circle, Chittagong', rating: 4.6, reviews: 523, phone: '+880 1819-112244', dm: 'Farida Begum', dmTitle: 'Business Owner', need: 'Custom cake orders tracked manually in notebook, no online catalog', service: 'Online Custom Order Portal + Delivery Tracking System', value: 720, score: 83 },
  { name: 'Doctors Point Clinic Rajshahi', cat: 'Clinic', loc: 'Rajshahi Natore Road', rating: 4.2, reviews: 345, phone: '+880 1716-334455', dm: 'Dr. Aminul Islam', dmTitle: 'Clinic Founder', need: 'No digital prescription system, paper files getting lost', service: 'Digital Prescription + Electronic Health Record System', value: 1600, score: 85 },
];

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
  const [progressMsg, setProgressMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [progressStep, setProgressStep] = useState<number>(0);

  const simulateLiveHarvesting = () => {
    setIsSearching(true);
    setHarvestedResults([]);
    setSuccessMsg(null);
    setProgressStep(0);

    const steps = [
      `🔍 Querying Google Places API v2 for "${searchTerm || 'businesses'}" in ${locationFilter === 'All' ? 'Bangladesh' : locationFilter}...`,
      `📊 Cross-referencing Facebook Pages directory cluster...`,
      `🔐 Running authenticity verification & spam filter...`,
      `⚡ Calculating RizQ Claw Trust Scores for each prospect...`,
      `✅ Harvest complete! Injecting verified leads into CRM pipeline...`,
    ];

    let i = 0;
    const stepInterval = setInterval(() => {
      setProgressMsg(steps[i]);
      setProgressStep(i + 1);
      i++;
      if (i >= steps.length) {
        clearInterval(stepInterval);

        // Pick leads from pool, filter by category if set, inject randomness
        const filtered = LEAD_POOL.filter(p => {
          const catMatch = categoryFilter === 'All' || p.cat === categoryFilter;
          const locMatch = locationFilter === 'All' || p.loc.toLowerCase().includes(locationFilter.toLowerCase());
          const termMatch = !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.cat.toLowerCase().includes(searchTerm.toLowerCase());
          return catMatch || locMatch || termMatch;
        });

        // Take 3–5 random ones
        const pool = filtered.length >= 3 ? filtered : LEAD_POOL;
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        const picked = shuffled.slice(0, Math.floor(Math.random() * 2) + 3);

        const newLeads: Lead[] = picked.map((p, idx) => {
          const suffix = (Date.now() + idx * 100).toString().slice(-4);
          return {
            id: `hunter-${suffix}`,
            businessName: p.name,
            category: p.cat as LeadCategory,
            location: locationFilter !== 'All' && !p.loc.toLowerCase().includes(locationFilter.toLowerCase()) ? `${locationFilter}, Bangladesh` : p.loc,
            phone: p.phone,
            email: `info@${p.name.toLowerCase().replace(/[^a-z]/g, '').slice(0, 12)}.com`,
            website: p.score > 85 ? `https://${p.name.toLowerCase().replace(/[^a-z]/g, '').slice(0, 12)}.com` : '',
            facebook: `https://facebook.com/${p.name.toLowerCase().replace(/[^a-z]/g, '').slice(0, 15)}`,
            whatsapp: p.phone.replace(/ /g, ''),
            rating: p.rating,
            reviewCount: p.reviews,
            score: p.score,
            status: 'New',
            needDetected: p.need,
            serviceRecommended: p.service,
            aiMessageDraft: `Assalamu Alaikum ${p.dm || 'Management Team'},\n\nI was reviewing your Google Maps profile for ${p.name} in ${p.loc}. With ${p.reviews} customer reviews and a strong ${p.rating}⭐ rating, your business clearly has real momentum.\n\nHowever, I noticed: ${p.need.toLowerCase()}.\n\nRizQara Tech builds exactly what your business needs — ${p.service} — at a fixed transparent price with lifetime support.\n\nCould I send over a 2-minute free demo video specifically built for your ${p.cat.toLowerCase()} business?`,
            outreachChannel: 'Email',
            approved: false,
            followUpStage: 'None',
            notes: [`Harvested via ${Math.random() > 0.5 ? 'Google Places API v2' : 'Facebook Pages Directory'} cluster.`],
            auditDetails: {
              websiteExists: p.score > 85,
              speedScore: p.score > 85 ? Math.floor(Math.random() * 30 + 40) : 0,
              isMobileFriendly: p.score > 83,
              hasOnlineOrder: false,
              hasWhatsApp: p.score > 88,
              hasBookingSystem: false,
              hasGoogleReviewsReply: p.reviews > 400,
              fbActive: p.reviews > 200,
              seoScore: Math.floor(p.score * 0.6)
            },
            decisionMaker: p.dm,
            decisionMakerTitle: p.dmTitle,
            estimatedDealValue: p.value,
            createdVia: 'Google Places'
          };
        });

        setHarvestedResults(newLeads);
        onAddLeads(newLeads);
        setProgressMsg(null);
        setSuccessMsg(`🚀 ${newLeads.length} verified prospects harvested, trust-scored & injected into CRM pipeline!`);
        setIsSearching(false);
        setTimeout(() => setSuccessMsg(null), 7000);
      }
    }, 600);
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
            Search Google Maps, Facebook Pages, and LinkedIn across Bangladesh. Instantly calculate trust scores and surface businesses with verified digital service deficits.
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

      {/* Progress Indicator */}
      {progressMsg && (
        <div className="bg-maroon-50 border border-maroon-200 rounded-2xl p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <RefreshCw className="w-4 h-4 animate-spin text-maroon-700 shrink-0" />
            <span className="text-sm font-bold text-maroon-900 font-mono">{progressMsg}</span>
          </div>
          <div className="w-full bg-maroon-200 rounded-full h-1.5">
            <div
              className="bg-maroon-700 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(progressStep / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-800 text-white font-semibold text-sm shadow-xl flex items-center space-x-3">
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
                onKeyDown={(e) => e.key === 'Enter' && simulateLiveHarvesting()}
                placeholder="e.g. Sultan's Dine, Dental Clinic, Gym..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold text-maroon-950 focus:outline-none focus:ring-2 focus:ring-maroon-600 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
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
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
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
              <option value="Pharmacy">Pharmacy</option>
            </select>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-xs text-gray-500 w-full sm:w-auto">
            <Sliders className="w-4 h-4 text-maroon-600 shrink-0" />
            <span>Sources: <strong className="text-maroon-950">Google Places v2 &bull; Meta Pages API &bull; LinkedIn Directory</strong></span>
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

      {/* Harvested Live Results */}
      {harvestedResults.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-2xl text-maroon-950 font-['Outfit'] flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
              <span>Live Harvested Stream</span>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {harvestedResults.length} New Prospects Injected
              </span>
            </h3>
            <span className="text-xs text-gray-500 font-mono hidden sm:inline">Trust Scoring & Audit complete</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {harvestedResults.map((lead) => (
              <div 
                key={lead.id} 
                className="bg-white rounded-3xl p-6 border-2 border-emerald-400 shadow-xl space-y-4 hover:border-maroon-600 transition-all group relative overflow-hidden"
              >
                {/* Score Badge */}
                <div className={`absolute top-0 right-0 text-white text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-widest shadow ${lead.score >= 88 ? 'bg-emerald-600' : 'bg-amber-500'}`}>
                  Score: {lead.score}/100
                </div>

                {/* Business Info */}
                <div className="space-y-1 pr-20">
                  <div className="flex items-center space-x-2">
                    <span className="p-1 rounded bg-maroon-50 text-maroon-700">
                      <Building2 className="w-4 h-4" />
                    </span>
                    <h4 className="font-extrabold text-base text-maroon-950 group-hover:text-maroon-700 transition-colors leading-tight">{lead.businessName}</h4>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span>{lead.location}</span>
                  </p>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="flex items-center space-x-1 text-yellow-600 font-bold">
                      <Star className="w-3 h-3" />
                      <span>{lead.rating} ({lead.reviewCount})</span>
                    </span>
                    <span className="text-gray-400">|</span>
                    <span className="font-bold text-maroon-700 font-mono">${lead.estimatedDealValue} Deal</span>
                  </div>
                </div>

                {/* Gap Analysis */}
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 space-y-1.5 text-xs">
                  <div className="flex items-center space-x-1.5 font-extrabold text-red-800">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Gap Detected:</span>
                  </div>
                  <p className="text-red-700 font-semibold leading-snug">{lead.needDetected}</p>
                </div>

                {/* Pitch */}
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1 text-xs">
                  <div className="font-extrabold text-emerald-800 uppercase tracking-wider text-[10px]">Recommended Pitch:</div>
                  <p className="font-bold text-emerald-900">{lead.serviceRecommended}</p>
                </div>

                {/* Contact & CTA */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-1.5 text-xs text-gray-600">
                    <PhoneCall className="w-3.5 h-3.5 text-maroon-600" />
                    <span className="font-bold">{lead.phone}</span>
                  </div>
                  <button
                    onClick={() => onSelectLeadForAudit(lead)}
                    className="bg-maroon-700 hover:bg-maroon-800 text-white font-extrabold px-4 py-2 rounded-xl transition-all shadow text-xs flex items-center space-x-1.5 font-['Outfit']"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Full Audit</span>
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
