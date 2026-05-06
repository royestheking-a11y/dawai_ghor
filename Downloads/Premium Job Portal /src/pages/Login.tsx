
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router';
import { useAuth } from '../lib/auth';
import { Icons } from '../components/Icons';
import { useLanguage } from '../lib/language';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'candidate' | 'recruiter'>('candidate');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      
      if (user) {
        // Redirect based on the user's actual role from the DB, not just the toggle
        // Although the toggle helps filter, the user object is the source of truth
        const targetRole = user.role;
        const from = location.state?.from?.pathname || 
          (targetRole === 'admin' ? '/admin/dashboard' : 
           targetRole === 'recruiter' ? '/recruiter/dashboard' : '/me/dashboard');
        navigate(from, { replace: true });
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-900 transition-colors duration-200">
      
      {/* Left Side - Image & Branding */}
      <div className="hidden lg:flex w-1/2 bg-gray-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1765366417030-16d9765d920a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcwNzU4MTg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
            alt="Workspace" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 p-12 text-white max-w-lg">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-900/50">
             <span className="text-3xl font-bold">{language === 'bn' ? 'চা' : 'CB'}</span>
          </div>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Welcome to <br/>
            <span className="text-emerald-500">{language === 'bn' ? 'চাকরি বাজার' : 'Chakri Bazar'}.</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Connect with top companies, showcase your skills, and find the career you deserve.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.login.title}</h2>
            <p className="text-gray-500 dark:text-gray-400">{t.login.subtitle}</p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg flex items-center gap-2 text-sm">
              <Icons.AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Role Switcher (Visual only, actual role comes from DB) */}
            <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl flex">
              <button
                type="button"
                onClick={() => setRole('candidate')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                  role === 'candidate' 
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                {t.login.candidate}
              </button>
              <button
                type="button"
                onClick={() => setRole('recruiter')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                  role === 'recruiter' 
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                {t.login.recruiter}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.login.emailLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icons.Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all sm:text-sm"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t.login.passwordLabel}
                </label>
                <Link to="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
                  {t.login.forgotPassword}
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icons.Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all sm:text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all transform hover:-translate-y-0.5"
            >
              {t.login.submit}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
                {t.login.or}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Icons.Globe className="h-5 w-5 text-blue-500 mr-2" />
              Google
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Icons.Facebook className="h-5 w-5 text-blue-700 mr-2" />
              Facebook
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            {t.login.noAccount}{' '}
            <Link to="/signup" className="font-bold text-emerald-600 hover:text-emerald-500 transition-colors">
              {t.login.signUp}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
