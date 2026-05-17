import React, { useState } from 'react';
import JSZip from 'jszip';
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
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadZip = async () => {
    setIsDownloading(true);
    try {
      const zip = new JSZip();

      // manifest.json
      const manifest = {
        manifest_version: 3,
        name: "RizQ Claw - Lead Extractor",
        version: "1.2.0",
        description: "Instantly extract business contact data, run digital gap audits, and inject leads into the RizQ Claw CRM pipeline with one click.",
        permissions: ["activeTab", "scripting", "storage"],
        action: { default_popup: "popup.html", default_icon: { "48": "icon48.png" } },
        content_scripts: [{ matches: ["https://www.google.com/maps/*", "https://*.facebook.com/*", "https://*.linkedin.com/*"], js: ["content.js"] }],
        background: { service_worker: "background.js" },
        icons: { "48": "icon48.png", "128": "icon128.png" }
      };
      zip.file("manifest.json", JSON.stringify(manifest, null, 2));

      // popup.html
      const popupHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>RizQ Claw</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; }
    body { width: 320px; min-height: 400px; background: #fdfafb; color: #1a1516; }
    .header { background: linear-gradient(135deg, #7f1d1d, #450a0a); color: white; padding: 16px; display: flex; align-items: center; gap: 10px; }
    .header h1 { font-size: 16px; font-weight: 800; }
    .header span { font-size: 10px; opacity: 0.75; display: block; }
    .status { padding: 12px 16px; background: #f0fdf4; border-bottom: 1px solid #d1fae5; font-size: 11px; font-weight: 600; color: #065f46; display: flex; align-items: center; gap: 8px; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: #10b981; animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
    .body { padding: 16px; space-y: 12px; }
    button { width: 100%; padding: 12px; border-radius: 12px; border: none; font-weight: 800; font-size: 12px; cursor: pointer; transition: all 0.2s; margin-bottom: 10px; }
    .btn-primary { background: linear-gradient(135deg, #991b1b, #7f1d1d); color: white; }
    .btn-primary:hover { background: linear-gradient(135deg, #7f1d1d, #450a0a); }
    .btn-secondary { background: #f9fafb; border: 1px solid #e5e7eb; color: #374151; }
    .btn-secondary:hover { background: #f3f4f6; }
    #status-msg { font-size: 11px; text-align: center; color: #6b7280; padding: 8px; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1>🦅 RizQ Claw</h1>
      <span>Enterprise Lead Extractor v1.2</span>
    </div>
  </div>
  <div class="status">
    <span class="dot"></span>
    Extension Active &amp; Scanning Page…
  </div>
  <div class="body">
    <button class="btn-primary" id="extractBtn">⚡ Save to RizQ Claw</button>
    <button class="btn-secondary" id="auditBtn">🔍 Run Digital Audit</button>
    <button class="btn-secondary" id="openDashboard">📊 Open Dashboard</button>
    <div id="status-msg">Hover over a business on Google Maps or Facebook to extract.</div>
  </div>
  <script src="popup.js"></script>
</body>
</html>`;
      zip.file("popup.html", popupHtml);

      // popup.js
      const popupJs = `document.getElementById('extractBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['content.js']
    });
    document.getElementById('status-msg').textContent = '✅ Extraction triggered! Check your RizQ Claw dashboard.';
    document.getElementById('status-msg').style.color = '#065f46';
  });
});

document.getElementById('auditBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.storage.local.set({ audit_url: tabs[0].url });
    document.getElementById('status-msg').textContent = '🔍 Digital audit queued for this domain.';
  });
});

document.getElementById('openDashboard').addEventListener('click', () => {
  chrome.tabs.create({ url: 'http://localhost:5173' });
});`;
      zip.file("popup.js", popupJs);

      // content.js
      const contentJs = `(function() {
  const url = window.location.href;
  let data = { url, title: document.title, timestamp: new Date().toISOString() };

  // Google Maps extraction
  if (url.includes('google.com/maps')) {
    const nameEl = document.querySelector('h1.DUwDvf, [data-item-id] h1');
    const phoneEl = document.querySelector('[data-tooltip="Copy phone number"]');
    const ratingEl = document.querySelector('.ceNzKf span, .MW4etd');
    if (nameEl) data.businessName = nameEl.textContent.trim();
    if (phoneEl) data.phone = phoneEl.closest('[aria-label]')?.getAttribute('aria-label') || '';
    if (ratingEl) data.rating = parseFloat(ratingEl.textContent);
  }

  // Facebook Page extraction
  if (url.includes('facebook.com')) {
    const titleEl = document.querySelector('h1');
    if (titleEl) data.businessName = titleEl.textContent.trim();
    data.facebook = url;
  }

  // LinkedIn extraction
  if (url.includes('linkedin.com/company')) {
    const nameEl = document.querySelector('h1');
    if (nameEl) data.businessName = nameEl.textContent.trim();
    data.linkedin = url;
  }

  chrome.storage.local.get('rizq_leads', (result) => {
    const leads = result.rizq_leads || [];
    leads.push(data);
    chrome.storage.local.set({ rizq_leads: leads });
    console.log('[RizQ Claw] Lead extracted and queued:', data);
  });

  // Visual feedback flash
  const flash = document.createElement('div');
  flash.style.cssText = 'position:fixed;top:20px;right:20px;z-index:99999;background:#7f1d1d;color:white;padding:14px 20px;border-radius:12px;font-family:sans-serif;font-size:13px;font-weight:700;box-shadow:0 8px 24px rgba(0,0,0,0.25);';
  flash.textContent = '✅ RizQ Claw: Lead saved to pipeline!';
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 3000);
})();`;
      zip.file("content.js", contentJs);

      // background.js
      const backgroundJs = `chrome.runtime.onInstalled.addListener(() => {
  console.log('[RizQ Claw] Extension installed successfully. Version 1.2');
  chrome.storage.local.set({ rizq_leads: [], rizq_version: '1.2.0' });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['content.js'] });
});`;
      zip.file("background.js", backgroundJs);

      // README.md
      const readme = `# RizQ Claw Chrome Extension v1.2

## Installation
1. Unzip this package to a folder on your computer
2. Open Chrome/Brave and go to: chrome://extensions
3. Enable **Developer Mode** (toggle top-right)
4. Click **Load unpacked** and select the unzipped folder
5. The RizQ Claw icon will appear in your browser toolbar

## Usage
- Navigate to **Google Maps**, **Facebook Pages**, or **LinkedIn Company** profiles
- Click the **RizQ Claw** icon in your toolbar
- Click **"Save to RizQ Claw"** to extract the business lead
- Open your **RizQ Claw Dashboard** to see the lead, trigger a digital audit, and generate AI outreach copy

## Supported Platforms
- Google Maps (restaurants, clinics, gyms, pharmacies, etc.)
- Facebook Business Pages
- LinkedIn Company Profiles

## Permissions Required
- **activeTab**: Read the currently active page to extract business data
- **scripting**: Inject the data extraction script on supported pages
- **storage**: Cache extracted leads locally until synced to dashboard

---
Built by RizQara Tech Ltd. © 2026`;
      zip.file("README.md", readme);

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "rizq-claw-extension-v1.2.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("ZIP generation failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

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
            <button
              onClick={handleDownloadZip}
              disabled={isDownloading}
              className="w-full bg-white text-maroon-900 font-bold px-4 py-2 rounded-xl text-xs shadow hover:bg-maroon-50 transition-all flex items-center justify-center space-x-1.5 mt-2 disabled:opacity-75 cursor-pointer"
            >
              {isDownloading ? (
                <div className="w-3.5 h-3.5 border-2 border-maroon-700 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{isDownloading ? 'Packaging…' : 'Download .ZIP Package'}</span>
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
