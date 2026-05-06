
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../lib/auth';
import { Icons } from '../components/Icons';
import { useLanguage } from '../lib/language';

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'candidate' | 'recruiter'>('candidate');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const result = await signup({ email, password, name, role });
      
      if (result) {
        setSuccess(true);
        // Reset form
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError('Failed to create account. Email might be in use.');
      }
    } catch (err) {
      setError('An error occurred during signup.');
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
             <span className="text-3xl font-bold">সু</span>
          </div>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Join the <br/>
            <span className="text-emerald-500">Revolution.</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Create your account today and start connecting with opportunities that matter.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.signup.title}</h2>
            <p className="text-gray-500 dark:text-gray-400">{t.signup.subtitle}</p>
          </div>

          {success ? (
            <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-6 rounded-xl flex flex-col items-center gap-3 text-center border border-green-200 dark:border-green-800">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                <Icons.CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Account Created Successfully!</h3>
              <p className="text-sm">You can now sign in with your credentials.</p>
              <p className="text-xs text-green-500 mt-2">Redirecting to login...</p>
              <Link to="/login" className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors">Sign In Now</Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg flex items-center gap-2 text-sm">
                  <Icons.AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {t.signup.roleLabel}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      onClick={() => setRole('candidate')}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                        role === 'candidate' 
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-gray-600'
                      }`}
                    >
                      <Icons.User className={`w-6 h-6 mb-2 ${role === 'candidate' ? 'text-emerald-600' : 'text-gray-400'}`} />
                      <div className={`font-bold ${role === 'candidate' ? 'text-emerald-900 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
                        {t.signup.roleCandidate}
                      </div>
                    </div>

                    <div 
                      onClick={() => setRole('recruiter')}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                        role === 'recruiter' 
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-gray-600'
                      }`}
                    >
                      <Icons.Briefcase className={`w-6 h-6 mb-2 ${role === 'recruiter' ? 'text-emerald-600' : 'text-gray-400'}`} />
                      <div className={`font-bold ${role === 'recruiter' ? 'text-emerald-900 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
                        {t.signup.roleRecruiter}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.signup.nameLabel}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icons.User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all sm:text-sm"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.signup.emailLabel}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t.signup.passwordLabel}
                    </label>
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t.signup.confirmPasswordLabel}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icons.Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all sm:text-sm"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all transform hover:-translate-y-0.5"
                >
                  {t.signup.submit}
                </button>
              </form>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                {t.signup.hasAccount}{' '}
                <Link to="/login" className="font-bold text-emerald-600 hover:text-emerald-500 transition-colors">
                  {t.signup.signIn}
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
