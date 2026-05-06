import { useState, useMemo } from 'react';
import { db, User } from '../lib/db';
import { Icons } from '../components/Icons';
import { useLanguage } from '../lib/language';

export const TalentSearch = () => {
  const { language } = useLanguage();
  const [candidates] = useState<User[]>(db.getUsers().filter(u => u.role === 'candidate'));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All');

  const allSkills = useMemo(() => {
    const skills = new Set<string>();
    candidates.forEach(c => c.skills?.forEach(s => skills.add(s)));
    return ['All', ...Array.from(skills)];
  }, [candidates]);

  const filteredCandidates = useMemo(() => {
    return candidates.filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          candidate.bio?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSkill = selectedSkill === 'All' || candidate.skills?.includes(selectedSkill);
      return matchesSearch && matchesSkill;
    });
  }, [candidates, searchTerm, selectedSkill]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Header */}
      <div className="bg-emerald-600 py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold mb-4">{language === 'bn' ? 'ট্যালেন্ট সার্চ' : 'Talent Search'}</h1>
          <p className="text-emerald-50 text-lg mb-8">
            {language === 'bn' ? 'আপনার প্রতিষ্ঠানের জন্য সেরা কর্মী খুঁজে নিন' : 'Find the best talent for your organization from our verified pool.'}
          </p>
          <div className="max-w-2xl mx-auto relative group">
            <Icons.Search className="absolute left-4 top-4 text-emerald-600 w-6 h-6" />
            <input 
              type="text" 
              placeholder={language === 'bn' ? 'নাম বা দক্ষতা দিয়ে খুঁজুন...' : 'Search by name, skills, or keywords...'}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-none shadow-xl text-gray-900 focus:ring-4 focus:ring-emerald-500/50 outline-none text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {filteredCandidates.length} {language === 'bn' ? 'জন প্রার্থী পাওয়া গেছে' : 'Candidates Found'}
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{language === 'bn' ? 'ফিল্টার:' : 'Filter by Skill:'}</span>
            <select 
              className="p-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg outline-none"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
            >
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCandidates.map(candidate => (
            <div key={candidate.id} className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 hover:shadow-2xl transition-all group relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-2xl border border-emerald-50 dark:border-emerald-800">
                  {candidate.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">{candidate.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{candidate.experience?.[0]?.role || (language === 'bn' ? 'প্রার্থী' : 'Candidate')}</p>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-3 h-[60px]">
                {candidate.bio || (language === 'bn' ? 'কোনো বায়ো নেই' : 'No bio available.')}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {candidate.skills?.slice(0, 3).map(skill => (
                  <span key={skill} className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] font-bold rounded-full border border-gray-100 dark:border-gray-600">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-auto">
                <button className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  {language === 'bn' ? 'প্রোফাইল দেখুন' : 'View Profile'}
                </button>
                <button className="flex-1 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 dark:shadow-none">
                  {language === 'bn' ? 'আমন্ত্রণ জানান' : 'Invite'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCandidates.length === 0 && (
          <div className="text-center py-20">
            <Icons.Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{language === 'bn' ? 'কোনো প্রার্থী পাওয়া যায়নি' : 'No candidates match your search'}</h3>
          </div>
        )}
      </div>
    </div>
  );
};
