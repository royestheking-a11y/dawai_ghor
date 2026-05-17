import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  AlertCircle, 
  Bot, 
  TrendingUp, 
  CheckCircle2, 
  Database,
  Building2,
  Globe2,
  Cpu
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeMetricIndex, setActiveMetricIndex] = useState<number>(0);

  const metrics = [
    { title: "Autonomous Discovery", val: "2,845", sub: "Leads crawled this week", icon: Globe2, bg: "from-blue-500/20 to-indigo-500/20", color: "text-blue-400" },
    { title: "AI Outreach Engine", val: "99.4%", sub: "Delivery success rate", icon: Cpu, bg: "from-amber-500/20 to-orange-500/20", color: "text-amber-400" },
    { title: "CRM Conversion", val: "+34.2%", sub: "Revenue uplift verified", icon: TrendingUp, bg: "from-emerald-500/20 to-teal-500/20", color: "text-emerald-400" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMetricIndex(prev => (prev + 1) % metrics.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [metrics.length]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      if (email.trim() === '' || password.trim() === '') {
        setError('Please enter your authorized email and security key.');
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      onLoginSuccess();
    }, 800);
  };

  const handleDemoFill = () => {
    setEmail('admin@rizqaratech.com');
    setPassword('rizqclaw2026!');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0d090a] text-white selection:bg-maroon-600 selection:text-white overflow-hidden">
      
      {/* LEFT SECTION: Stunning Futuristic Showcase & Brand */}
      <div className="relative lg:w-5/12 xl:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-gradient-to-br from-maroon-950 via-[#180f12] to-[#0a0708] overflow-hidden border-b lg:border-b-0 lg:border-r border-maroon-900/30">
        
        {/* Abstract glowing AI grid ambient background */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-maroon-800/20 via-transparent to-transparent opacity-70 pointer-events-none animate-pulse-subtle" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Logo */}
        <div className="flex items-center space-x-3.5 z-10">
          <img 
            src="/rizq claw.png" 
            alt="RizQ Claw Brand Logo" 
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain filter drop-shadow-xl hover:scale-105 transition-transform"
          />
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-['Outfit'] text-white">
              RizQ Claw
            </h1>
            <div className="flex items-center space-x-2 mt-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-maroon-800/80 text-maroon-200 border border-maroon-700/50 uppercase font-mono tracking-widest">
                Enterprise Core v1.2
              </span>
              <span className="inline-flex items-center space-x-1 text-[11px] text-emerald-400 font-semibold font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Cluster Active</span>
              </span>
            </div>
          </div>
        </div>

        {/* Middle Feature Cards & Dynamic Stats Showcase */}
        <div className="my-12 z-10 space-y-6">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-maroon-100 to-amber-200">
              Autonomous Client Acquisition Engine.
            </h2>
            <p className="text-sm sm:text-base text-maroon-200/80 leading-relaxed font-light">
              Transform your outbound pipeline. Our multi-agent intelligence harvests businesses, audits digital gaps, calculates trust scores, and dispatches multi-touch outreach.
            </p>
          </div>

          {/* Real-time Dynamic Metrics Card Carousel */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {metrics.map((m, idx) => {
              const Icon = m.icon;
              const isActive = activeMetricIndex === idx;
              return (
                <div 
                  key={m.title}
                  onClick={() => setActiveMetricIndex(idx)}
                  className={`p-5 rounded-2xl border backdrop-blur-xl transition-all duration-500 cursor-pointer relative overflow-hidden flex flex-col justify-between h-36 ${
                    isActive 
                      ? 'bg-gradient-to-br from-maroon-900/60 to-black/80 border-maroon-500/50 shadow-xl shadow-maroon-950/50 scale-102' 
                      : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10 opacity-75 hover:opacity-100'
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-maroon-500/20 to-transparent rounded-bl-full pointer-events-none" />
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold tracking-wider uppercase font-mono text-gray-400">
                      {m.title}
                    </span>
                    <Icon className={`w-4 h-4 ${m.color}`} />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] tracking-tight text-white mt-2 font-mono">
                      {m.val}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1 line-clamp-1">
                      {m.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Verification Badge Bar */}
          <div className="hidden sm:flex items-center space-x-6 pt-4 border-t border-maroon-900/50 text-xs text-maroon-300 font-semibold">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Google Maps API Synced</span>
            </div>
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-amber-400 shrink-0" />
              <span>256-Bit SSL Encryption</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Multi-Niche Clusters</span>
            </div>
          </div>
        </div>

        {/* Bottom Footer Details */}
        <div className="text-xs text-maroon-400/80 z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <span>&copy; 2026 RizQara Tech Ltd. All enterprise rights reserved.</span>
          <span className="text-maroon-300 font-bold uppercase tracking-widest text-[10px] font-mono">Terminal Node 07.B</span>
        </div>

      </div>

      {/* RIGHT SECTION: Pristine Responsive Login Card */}
      <div className="lg:w-7/12 xl:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-20 bg-[#fdfafb] text-[#1a1516] relative">
        
        {/* Subtle background gradient on right */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-maroon-100 rounded-full blur-3xl opacity-50 pointer-events-none animate-pulse-subtle" />

        <div className="w-full max-w-md bg-white p-8 sm:p-12 rounded-3xl border border-maroon-100 shadow-2xl shadow-maroon-950/10 z-10 space-y-8 animate-scaleUp">
          
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center space-x-2 bg-maroon-50 text-maroon-900 px-3 py-1 rounded-full text-xs font-extrabold border border-maroon-200 mb-1 font-mono">
              <Bot className="w-3.5 h-3.5 text-maroon-700" />
              <span>Access Command Terminal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-maroon-950 font-['Outfit'] tracking-tight">
              Welcome Back
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Log in to manage AI sales queues and execute outreach campaigns.
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs font-bold flex items-start space-x-3 animate-shake shadow-xs">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-gray-700 uppercase tracking-widest block font-mono">
                Work Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@rizqaratech.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50/80 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-maroon-600 focus:bg-white transition-all shadow-2xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-gray-700 uppercase tracking-widest block font-mono">
                  Security Code
                </label>
                <button 
                  type="button" 
                  onClick={handleDemoFill}
                  className="text-xs font-extrabold text-maroon-700 hover:text-maroon-900 hover:underline flex items-center space-x-1"
                  title="Click to automatically fill demo admin credentials"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Fill Demo Auth</span>
                </button>
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50/80 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-maroon-600 focus:bg-white transition-all shadow-2xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 font-semibold text-gray-600 cursor-pointer">
                <input 
                  type="checkbox" 
                  defaultChecked 
                  className="rounded border-gray-300 text-maroon-700 focus:ring-maroon-600 w-4 h-4 cursor-pointer" 
                />
                <span>Keep terminal open (30d)</span>
              </label>
              <span className="text-maroon-700 font-extrabold hover:underline cursor-pointer">Lost secret key?</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-maroon-700 via-maroon-800 to-maroon-950 hover:from-maroon-800 hover:to-black text-white py-4 sm:py-4 rounded-2xl font-extrabold text-sm tracking-wide transition-all duration-200 shadow-xl shadow-maroon-950/25 flex items-center justify-center space-x-2 group cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Authenticate Terminal Core</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Social / Single Sign-On alternatives */}
          <div className="space-y-4 pt-6 border-t border-gray-100">
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-[11px] font-bold uppercase tracking-widest font-mono">Or Enterprise Auth</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleDemoFill}
                className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl text-xs font-extrabold text-gray-700 hover:bg-gray-50 hover:border-maroon-300 transition-all shadow-2xs"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>RizQara SSO</span>
              </button>
              <button
                type="button"
                onClick={handleDemoFill}
                className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl text-xs font-extrabold text-gray-700 hover:bg-gray-50 hover:border-maroon-300 transition-all shadow-2xs"
              >
                <Globe2 className="w-4 h-4 text-blue-600" />
                <span>Google Work</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <span className="text-xs text-gray-400 font-medium">
              Protected by RizQara AI Guard &bull; Version 1.2
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
