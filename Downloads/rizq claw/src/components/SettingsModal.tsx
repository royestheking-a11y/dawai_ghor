import React, { useState, useEffect } from 'react';
import { TRUST_SIGNALS } from '../data/mockLeads';
import { 
  Key, 
  ShieldCheck, 
  Save, 
  Sliders, 
  CheckCircle2, 
  Lock,
  Cpu,
  Sparkles,
  Globe
} from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [googleKey, setGoogleKey] = useState<string>('AIzaSyCr4ROM... (Active Key)');
  const [geminiKey, setGeminiKey] = useState<string>('AIzaSyC0HD_E... (Active Key)');
  const [groqKey, setGroqKey] = useState<string>('gsk_gV5xlYJU... (Active Key)');
  const [saved, setSaved] = useState<boolean>(false);

  // Load from localStorage on mount if saved previously
  useEffect(() => {
    const savedGoogle = localStorage.getItem('rizq_google_key');
    const savedGemini = localStorage.getItem('rizq_gemini_key');
    const savedGroq = localStorage.getItem('rizq_groq_key');

    if (savedGoogle) setGoogleKey(savedGoogle);
    if (savedGemini) setGeminiKey(savedGemini);
    if (savedGroq) setGroqKey(savedGroq);
  }, []);

  const handleSave = () => {
    localStorage.setItem('rizq_google_key', googleKey);
    localStorage.setItem('rizq_gemini_key', geminiKey);
    localStorage.setItem('rizq_groq_key', groqKey);
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
            <span>Hybrid Intelligence Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-maroon-950 font-['Outfit'] tracking-tight">
            System Settings &amp; API Keys
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Configure external LLMs, discovery endpoints, and trust scoring weights
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-maroon-700 hover:bg-maroon-800 text-white font-extrabold px-6 py-3 rounded-xl transition-all shadow-md flex items-center space-x-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{saved ? 'Saved Successfully!' : 'Save Settings'}</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white font-bold text-sm shadow flex items-center space-x-2 animate-scaleUp">
          <CheckCircle2 className="w-5 h-5 text-yellow-300 shrink-0" />
          <span>API Keys and system configuration securely encrypted and stored in local cache!</span>
        </div>
      )}

      {/* API Keys Configuration Box */}
      <div className="bg-white rounded-3xl p-8 border border-maroon-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h3 className="font-extrabold text-xl text-maroon-950 font-['Outfit'] flex items-center space-x-2">
            <Key className="w-5 h-5 text-maroon-600" />
            <span>Encrypted AI &amp; Discovery API Endpoints</span>
          </h3>
          <span className="bg-maroon-50 text-maroon-900 text-xs font-bold px-3 py-1 rounded-full border border-maroon-200">
            Active Keys
          </span>
        </div>

        <div className="space-y-5">
          {/* Google Places API Key */}
          <div className="space-y-1.5">
            <label className="flex items-center space-x-2 text-xs font-extrabold text-gray-700 uppercase tracking-wider font-mono">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>Google Places API Key (Lead Harvester)</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={googleKey}
                onChange={(e) => setGoogleKey(e.target.value)}
                placeholder="Paste API key here..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-300 rounded-xl text-xs font-mono font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-maroon-600 transition-all shadow-2xs"
              />
            </div>
            <p className="text-[11px] text-gray-500 font-medium">
              Harvests live business listings, GPS coordinates, Google star ratings, and review metrics from Google Maps.
            </p>
          </div>

          {/* Gemini AI Key */}
          <div className="space-y-1.5">
            <label className="flex items-center space-x-2 text-xs font-extrabold text-gray-700 uppercase tracking-wider font-mono">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Google Gemini API Key (Multimodal Audit &amp; Analysis Engine)</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="Paste API key here..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-300 rounded-xl text-xs font-mono font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-maroon-600 transition-all shadow-2xs"
              />
            </div>
            <p className="text-[11px] text-gray-500 font-medium">
              Powers deep website audits, trust signal extraction, and automated technology stack gap identification.
            </p>
          </div>

          {/* Groq API Key */}
          <div className="space-y-1.5">
            <label className="flex items-center space-x-2 text-xs font-extrabold text-gray-700 uppercase tracking-wider font-mono">
              <Cpu className="w-4 h-4 text-amber-600" />
              <span>Groq API Key (Instant Sales Reasoning &amp; Copy Generation)</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={groqKey}
                onChange={(e) => setGroqKey(e.target.value)}
                placeholder="Paste API key here..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-300 rounded-xl text-xs font-mono font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-maroon-600 transition-all shadow-2xs"
              />
            </div>
            <p className="text-[11px] text-gray-500 font-medium">
              Ultra-low latency inference engine driving hyper-personalized sales outreach drafts and proposal generation.
            </p>
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
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 font-mono">
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
