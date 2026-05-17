import React, { useState } from 'react';
import { Lock, Mail, ShieldCheck, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simple demo auth check or auto success after brief delay
    setTimeout(() => {
      if (email.trim() === '' || password.trim() === '') {
        setError('Please enter your email and password to access the secure terminal.');
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      onLoginSuccess();
    }, 600);
  };

  const handleDemoFill = () => {
    setEmail('admin@rizqaratech.com');
    setPassword('rizqclaw2026!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfafb] via-[#f9f0f2] to-[#f4e2e6] flex flex-col justify-center items-center p-4 relative overflow-hidden selection:bg-maroon-700 selection:text-white">
      
      {/* Background glowing ambient blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-maroon-300/20 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />

      {/* Top Header / Branding */}
      <div className="text-center space-y-4 mb-8 z-10 animate-fadeIn">
        <div className="flex justify-center items-center">
          <img 
            src="/rizq claw.png" 
            alt="RizQ Claw Brand Logo" 
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain hover:scale-105 transition-transform duration-300 filter drop-shadow-xl"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-maroon-950 font-['Outfit'] tracking-tight">
          RizQ Claw
        </h1>
        <p className="text-sm sm:text-base text-gray-600 font-semibold max-w-sm mx-auto">
          Autonomous Tech Acquisition &amp; Multi-Channel Sales Agent
        </p>
      </div>

      {/* Login Form Box */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-maroon-100 shadow-2xl shadow-maroon-950/10 z-10 animate-scaleUp space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center space-x-2 text-xs font-extrabold text-maroon-800 uppercase tracking-widest font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Secure Authentication</span>
          </div>
          <span className="text-[10px] font-extrabold bg-maroon-50 text-maroon-900 px-2.5 py-1 rounded-full border border-maroon-200 uppercase font-mono">
            V1 Hybrid AI
          </span>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-start space-x-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-gray-700 uppercase tracking-wider block">
              Work Email
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

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-gray-700 uppercase tracking-wider block">
                Password
              </label>
              <button 
                type="button" 
                onClick={handleDemoFill}
                className="text-[11px] font-extrabold text-maroon-700 hover:text-maroon-900 hover:underline flex items-center space-x-1"
                title="Fill demo credentials"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
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

          <div className="flex items-center justify-between pt-1 pb-2">
            <label className="flex items-center space-x-2 text-xs font-semibold text-gray-600 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-maroon-700 focus:ring-maroon-600 w-4 h-4 cursor-pointer" />
              <span>Remember 30 Days</span>
            </label>
            <span className="text-xs text-maroon-700 font-bold hover:underline cursor-pointer">Forgot key?</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-maroon-700 via-maroon-800 to-maroon-950 hover:from-maroon-800 hover:to-black text-white py-4 rounded-2xl font-extrabold text-sm tracking-wide transition-all shadow-lg shadow-maroon-950/25 flex items-center justify-center space-x-2 group cursor-pointer"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Access Autonomous Core</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
            Authorized Personnel Only &bull; <strong className="text-maroon-900">RizQara Tech System Secure V1</strong>
          </p>
        </div>

      </div>

      {/* Footer watermark */}
      <div className="absolute bottom-4 text-center text-xs text-gray-400 font-medium tracking-wide z-10">
        &copy; 2026 RizQara Tech Ltd. Built for Enterprise Client Acquisition Pipelines.
      </div>

    </div>
  );
};
