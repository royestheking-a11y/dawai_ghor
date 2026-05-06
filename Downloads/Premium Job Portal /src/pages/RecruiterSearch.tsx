
import React, { useState, useMemo } from 'react';
import { db, User } from '../lib/db';
import { Icons } from '../components/Icons';
import { Link } from 'react-router';

export const RecruiterSearch = () => {
  const [candidates] = useState<User[]>(db.getUsers().filter(u => u.role === 'candidate'));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [locationFilter, setLocationFilter] = useState('');

  // Extract all unique skills for filter dropdown
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
      const matchesLocation = !locationFilter || candidate.location?.toLowerCase().includes(locationFilter.toLowerCase());

      return matchesSearch && matchesSkill && matchesLocation;
    });
  }, [candidates, searchTerm, selectedSkill, locationFilter]);

  const handleInvite = (candidateId: string) => {
    alert(`Invitation sent to candidate! They will be notified.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Find Talent</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Search for candidates with verified skills.</p>
          </div>
          <Link to="/recruiter/dashboard" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-2">
             Back to Dashboard
          </Link>
        </div>

        {/* Search & Filters */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Icons.Search className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by name or keyword..." 
                className="w-full pl-10 p-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <Icons.Code className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500 w-5 h-5" /> {/* Use Filter icon if Code not available */}
              <select 
                className="w-full pl-10 p-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none appearance-none"
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
              >
                {allSkills.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
              <Icons.ChevronDown className="absolute right-3 top-3.5 text-gray-400 dark:text-gray-500 w-5 h-5 pointer-events-none" />
            </div>

            <div className="relative">
              <Icons.MapPin className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Location..." 
                className="w-full pl-10 p-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map(candidate => (
            <div key={candidate.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all group">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden border border-gray-100 dark:border-gray-600">
                      {candidate.avatar ? (
                        <img src={candidate.avatar} alt={candidate.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-bold text-xl">
                          {candidate.name[0]}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{candidate.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{candidate.experience?.[0]?.role || 'Candidate'}</p>
                    </div>
                  </div>
                  {candidate.resumeUrl && (
                     <a href={candidate.resumeUrl} target="_blank" className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" title="View Resume">
                       <Icons.FileText className="w-5 h-5" />
                     </a>
                  )}
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 min-h-[40px]">
                  {candidate.bio || 'No bio available.'}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {candidate.skills?.slice(0, 4).map(skill => (
                    <span key={skill} className="px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded border border-gray-100 dark:border-gray-600">
                      {skill}
                    </span>
                  ))}
                  {(candidate.skills?.length || 0) > 4 && (
                    <span className="px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-400 text-xs rounded border border-gray-100 dark:border-gray-600">
                      +{candidate.skills!.length - 4}
                    </span>
                  )}
                </div>
                
                {/* Verified Skills Section */}
                {candidate.verifiedSkills && candidate.verifiedSkills.length > 0 && (
                   <div className="mb-4 flex items-center gap-2">
                     <Icons.CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
                     <span className="text-xs font-bold text-green-700 dark:text-green-300">Verified: {candidate.verifiedSkills.join(', ')}</span>
                   </div>
                )}

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex gap-3">
                  <button className="flex-1 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    View Profile
                  </button>
                  <button 
                    onClick={() => handleInvite(candidate.id)}
                    className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-200 dark:shadow-emerald-900/50"
                  >
                    Invite
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 dark:text-gray-500">
               <Icons.Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">No candidates found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
