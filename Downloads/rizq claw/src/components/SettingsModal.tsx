import React, { useState } from 'react';
import { TRUST_SIGNALS } from '../data/mockLeads';
import { 
  Key, 
  ShieldCheck, 
  Save, 
  Sliders, 
  CheckCircle2, 
  Lock
} from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [googleKey, setGoogleKey] = useState('AIzaSyD8mRzQ... (Active)');
  const [openAiKey, setOpenAiKey] = useState('sk-proj-RizQara... (Active)');
  const [whatsappToken, setWhatsappToken] = useState('EAAQzQ... (Active)');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm flex items-center justify-between">
        <div>
          <div className="inline-flex items-center space-x-2 bg-maroon-50 text-maroon-800 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-maroon-200">
            <Sliders className="w-3.5 h-3.5 text-maroon-600" />
            <span>Hybrid Architecture Configuration</span>
          </div>
          <h1 className="text-3xl font-extrabold text-maroon-950 font-['Outfit']">
            System Settings &amp; API Keys
          </h1>
          <p className="text-gray-600 text-sm mt-1">Configure external integrations, scraping endpoints, and trust scoring weights</p>
        </div>

        <button
          onClick={handleSave}
          className="bg-maroon-700 hover:bg-maroon-800 text-white font-extrabold px-6 py-3 rounded-xl transition-all shadow-md flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{saved ? 'Saved!' : 'Save Settings'}</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white font-bold text-sm shadow flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-yellow-300" />
          <span>Settings successfully encrypted and stored in local configuration!</span>
        </div>
      )}

      {/* API Keys Configuration Box */}
      <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm space-y-6">
        <h3 className="font-extrabold text-xl text-maroon-950 font-['Outfit'] flex items-center space-x-2">
          <Key className="w-5 h-5 text-maroon-600" />
          <span>External API Endpoints &amp; Tokens</span>
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Google Places API Key (Lead Harvester)
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={googleKey}
                onChange={(e) => setGoogleKey(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-xs font-mono font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-maroon-600 transition-all"
              />
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Used to harvest business names, GPS coordinates, Google star ratings, and review counts.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              OpenAI / Gemini AI Key (Sales Copy Generator)
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={openAiKey}
                onChange={(e) => setOpenAiKey(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-xs font-mono font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-maroon-600 transition-all"
              />
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Powers the AI Sales Brain for hyper-personalized WhatsApp and Email outreach drafts.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              WhatsApp Cloud API Token (Messaging Engine)
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={whatsappToken}
                onChange={(e) => setWhatsappToken(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-xs font-mono font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-maroon-600 transition-all"
              />
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Authenticates automated dispatch of Day 3, 7, and 14 follow-up sequences.</p>
          </div>
        </div>
      </div>

      {/* Trust Scoring Engine Weights */}
      <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h3 className="font-extrabold text-xl text-maroon-950 font-['Outfit'] flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Authentic Client Trust Scoring Weights</span>
            </h3>
            <p className="text-xs text-gray-500 mt-1">RizQ Claw scoring engine formula used to determine prospect priority</p>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
            Formula Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TRUST_SIGNALS.map((ts, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-start justify-between space-x-3 shadow-2xs">
              <div>
                <strong className="text-maroon-950 text-xs font-bold block">{ts.signal}</strong>
                <p className="text-[11px] text-gray-600 mt-0.5">{ts.desc}</p>
              </div>
              <span className={`px-2 py-1 rounded-lg text-xs font-extrabold font-mono shrink-0 ${
                ts.weight.startsWith('+') ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-red-100 text-red-800 border border-red-300'
              }`}>
                {ts.weight} Pts
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
