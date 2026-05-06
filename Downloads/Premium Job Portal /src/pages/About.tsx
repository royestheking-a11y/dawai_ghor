
import { Icons } from '../components/Icons';
import { useLanguage } from '../lib/language';

export const About = () => {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 pt-16 pb-24">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
          Empowering Careers in <span className="text-emerald-600">Bangladesh</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {language === 'bn' ? 'চাকরি বাজার' : 'Chakri Bazar'} is Bangladesh's premier bilingual job portal, dedicated to bridging the gap between exceptional talent and visionary companies.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
              <Icons.Target className="w-4 h-4" /> Our Mission
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Democratizing Opportunity
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              We believe that talent exists everywhere, but opportunity does not. Our mission is to build a platform where every Bangladeshi, regardless of their background or location, can access world-class career opportunities.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                'Bilingual interface for inclusivity',
                'AI-driven skill matching',
                'Transparent recruitment processes',
                'Skill development resources'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Icons.CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-blue-600 rounded-2xl transform rotate-3 opacity-20"></div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
              alt="Team collaboration" 
              className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Active Jobs', value: '5,000+' },
              { label: 'Companies', value: '1,200+' },
              { label: 'Job Seekers', value: '500k+' },
              { label: 'Success Stories', value: '10k+' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-extrabold text-emerald-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Built by Locals, for Locals</h2>
          <p className="text-gray-600 dark:text-gray-400">Our diverse team is passionate about solving the employment challenge in Bangladesh.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Tanvir Hasan', role: 'CEO & Founder', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400' },
            { name: 'Nusrat Jahan', role: 'Head of Product', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
            { name: 'Karim Uddin', role: 'CTO', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
          ].map((member, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="h-64 overflow-hidden">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-emerald-600 font-medium text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
