import React, { useState } from 'react';
import type { Lead, LeadCategory } from '../types';
import { Plus, X, Building2 } from 'lucide-react';

interface AddLeadModalProps {
  onClose: () => void;
  onAddLead: (lead: Lead) => void;
}

export const AddLeadModal: React.FC<AddLeadModalProps> = ({ onClose, onAddLead }) => {
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState<LeadCategory>('Restaurant');
  const [location, setLocation] = useState('Dhaka');
  const [phone, setPhone] = useState('+880 1711-');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [facebook, setFacebook] = useState('');
  const [needDetected, setNeedDetected] = useState('Missing mobile-responsive website and automated WhatsApp ordering');
  const [serviceRecommended, setServiceRecommended] = useState('Web Portal + Automated WhatsApp Order Workflow');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      alert('Please enter a valid business name.');
      return;
    }

    const idSuffix = Date.now().toString().slice(-4);
    let score = 75;
    if (!website) score += 15;
    if (phone) score += 10;

    const newLead: Lead = {
      id: `manual-lead-${idSuffix}`,
      businessName,
      category,
      location,
      phone,
      email,
      website,
      facebook,
      whatsapp: phone,
      rating: 4.5,
      reviewCount: 95,
      score: Math.min(100, score),
      status: 'New',
      needDetected,
      serviceRecommended,
      aiMessageDraft: `Assalamu Alaikum ${businessName} team,\n\nI reviewed your local profile in ${location} and noticed strong customer interest, but identified an operational gap: ${needDetected.toLowerCase()}.\n\nWe specialize in building ${serviceRecommended.toLowerCase()} to streamline your client onboarding.\n\nCould I share a free 2-minute demo?`,
      outreachChannel: 'WhatsApp',
      approved: false,
      followUpStage: 'None',
      notes: ['Manually inputted by RizQara Tech Sales Consultant.'],
      auditDetails: {
        websiteExists: !!website,
        speedScore: website ? 52 : 0,
        isMobileFriendly: false,
        hasOnlineOrder: false,
        hasWhatsApp: false,
        hasBookingSystem: false,
        hasGoogleReviewsReply: false,
        fbActive: !!facebook,
        seoScore: website ? 40 : 0
      },
      decisionMaker: 'Managing Director',
      decisionMakerTitle: 'Owner / Executive',
      estimatedDealValue: category === 'Restaurant' ? 750 : 1200,
      createdVia: 'Manual'
    };

    onAddLead(newLead);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl w-full max-w-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-maroon-900 to-maroon-800 p-6 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Building2 className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-xl font-['Outfit']">Manually Inject Prospect</h3>
              <p className="text-xs text-maroon-100">Add local business details directly into CRM scoring engine</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-white transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Business Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Business Name *</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                placeholder="e.g. Sultan's Dine Banani"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-maroon-600"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as LeadCategory)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-maroon-600"
              >
                {['Restaurant', 'Clinic', 'Gym', 'Salon', 'School', 'Shop', 'Pharmacy', 'Real Estate'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">City / Address</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Banani 11, Dhaka"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-maroon-600"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Phone / WhatsApp *</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-maroon-600"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-maroon-600"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Website URL (if any)</label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-maroon-600"
              />
            </div>

            {/* Facebook */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Facebook Page</label>
              <input
                type="text"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-maroon-600"
              />
            </div>
          </div>

          {/* Identified Gap */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Identified Operational Gap</label>
            <input
              type="text"
              value={needDetected}
              onChange={(e) => setNeedDetected(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-maroon-600"
            />
          </div>

          {/* Service Recommended */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Recommended RizQara Pitch</label>
            <input
              type="text"
              value={serviceRecommended}
              onChange={(e) => setServiceRecommended(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-maroon-600"
            />
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-maroon-700 hover:bg-maroon-800 text-white font-extrabold px-8 py-3.5 rounded-xl transition-all shadow-lg flex items-center space-x-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Verify &amp; Inject Lead</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
