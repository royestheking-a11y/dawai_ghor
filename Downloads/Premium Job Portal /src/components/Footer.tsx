import { Link } from 'react-router';
import { Icons } from './Icons';
import { useLanguage } from '../lib/language';

export const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-[#0f172a] text-white pt-16 pb-8 font-sans border-t-4 border-emerald-600 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="text-emerald-500">
                  <Icons.Briefcase className="w-8 h-8" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-3xl text-white leading-none tracking-tight font-sans">
                  {language === 'bn' ? 'চাকরি বাজার' : 'Chakri Bazar'}
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t.footer.brandDesc}
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all duration-300">
                <Icons.Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all duration-300">
                <Icons.Briefcase className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all duration-300">
                <Icons.Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* For Candidates */}
          <div>
            <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-emerald-600 rounded-full"></div>
              {t.footer.forCandidates}
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/jobs" className="hover:text-emerald-500 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-emerald-500 transition-colors"></span> {t.footer.browseJobs}</Link></li>
              <li><Link to="/companies" className="hover:text-emerald-500 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-emerald-500 transition-colors"></span> {t.footer.verifiedCompanies}</Link></li>
              <li><Link to="/cv-builder" className="hover:text-emerald-500 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-emerald-500 transition-colors"></span> {t.footer.cvBuilder}</Link></li>
              <li><Link to="/skills" className="hover:text-emerald-500 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-emerald-500 transition-colors"></span> {t.footer.skillTests}</Link></li>
            </ul>
          </div>

          {/* For Recruiters */}
          <div>
            <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-emerald-600 rounded-full"></div>
              {t.footer.forRecruiters}
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/pricing" className="hover:text-emerald-500 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-emerald-500 transition-colors"></span> {t.footer.postJob}</Link></li>
              <li><Link to="/pricing" className="hover:text-emerald-500 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-emerald-500 transition-colors"></span> {t.footer.pricing}</Link></li>
              <li><Link to="/talent-search" className="hover:text-emerald-500 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-emerald-500 transition-colors"></span> {t.footer.talentSearch}</Link></li>
              <li><Link to="/get-verified" className="hover:text-emerald-500 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-emerald-500 transition-colors"></span> {t.footer.getVerified}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-emerald-600 rounded-full"></div>
              {t.footer.support}
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-emerald-500 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-emerald-500 transition-colors"></span> {t.footer.about}</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-500 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-emerald-500 transition-colors"></span> {t.footer.contact}</Link></li>
              <li><Link to="/terms" className="hover:text-emerald-500 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-emerald-500 transition-colors"></span> {t.footer.terms}</Link></li>
              <li><Link to="/privacy" className="hover:text-emerald-500 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-emerald-500 transition-colors"></span> {t.footer.privacy}</Link></li>
              <li><Link to="/login" className="hover:text-emerald-500 transition-colors flex items-center gap-2 group text-xs mt-4 opacity-50 hover:opacity-100 transition-opacity"><Icons.Lock className="w-3 h-3" /> Admin Login</Link></li>
            </ul>
            
            <div className="mt-6 pt-6 border-t border-gray-800">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <div className="p-2 bg-gray-800 rounded-full text-emerald-500">
                   <Icons.Phone className="w-4 h-4" />
                </div>
                <div>
                   <div className="text-xs text-gray-500">Hotline</div>
                   <div className="font-bold text-white">16479</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center gap-2">
             <span className="text-xs">Secure Payment:</span>
             <div className="flex gap-2 opacity-60 grayscale hover:grayscale-0 transition-all">
                <div className="h-6 w-10 bg-white rounded flex items-center justify-center"><span className="text-[8px] font-bold text-blue-800">VISA</span></div>
                <div className="h-6 w-10 bg-white rounded flex items-center justify-center"><span className="text-[8px] font-bold text-red-600">MC</span></div>
                <div className="h-6 w-10 bg-white rounded flex items-center justify-center"><span className="text-[8px] font-bold text-emerald-600">bkash</span></div>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
