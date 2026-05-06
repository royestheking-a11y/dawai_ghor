
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { db, Job, Company } from '../lib/db';
import { Icons } from '../components/Icons';

export const CompanyProfile = () => {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (id) {
      const allCompanies = db.getCompanies();
      // Try finding by company ID first, or by recruiter ID if that fails (backward compatibility)
      const foundCompany = allCompanies.find(c => c.id === id) || allCompanies.find(c => c.recruiterId === id);
      
      if (foundCompany) {
        setCompany(foundCompany);
        // Fetch jobs for this company
        const allJobs = db.getJobs();
        const companyJobs = allJobs.filter(j => j.companyId === foundCompany.id || j.recruiterId === foundCompany.recruiterId);
        setJobs(companyJobs);
      }
    }
  }, [id]);

  if (!company) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center transition-colors duration-200">
        <Icons.Briefcase className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Company not found</h2>
        <Link to="/" className="mt-4 text-emerald-600 hover:underline">Go back home</Link>
      </div>
    );
  }

  // Placeholder images since we don't have them in DB yet
  const coverImage = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000';
  const galleryImages = [
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000'
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Banner */}
      <div className="h-64 md:h-80 relative">
        <img 
          src={coverImage} 
          alt="Office" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-20 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-gray-800 rounded-xl shadow-md p-2 -mt-16 md:-mt-24">
              {company.logo ? (
                <img src={company.logo} alt={company.name} className="w-full h-full object-contain rounded-lg" />
              ) : (
                <div className="w-full h-full bg-blue-600 rounded-lg flex items-center justify-center text-white text-3xl font-bold">
                  {company.name[0]}
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    {company.name}
                    {company.verified && <Icons.CheckCircle className="w-6 h-6 text-blue-500" />}
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">{company.description.substring(0, 80)}...</p>
                </div>
                
                <div className="flex gap-3">
                  {company.website && (
                    <a 
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Visit Website
                    </a>
                  )}
                  <button 
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-6 py-2 rounded-lg font-bold transition-colors ${isFollowing ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 border-t border-gray-100 dark:border-gray-700 pt-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                <Icons.MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Location</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{company.location || 'Not specified'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                <Icons.User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Company Size</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">50-100 employees</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                <Icons.Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Founded</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">2015</p>
              </div>
            </div>
             <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                <Icons.Star className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Rating</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">4.8/5 (12 reviews)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: About & Gallery */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About the Company</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 whitespace-pre-wrap">
                {company.description || "No description available."}
              </p>
              
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Office Gallery</h3>
              <div className="grid grid-cols-2 gap-4">
                 <img src={galleryImages[0]} className="rounded-lg object-cover h-48 w-full hover:opacity-90 transition-opacity" />
                 <img src={galleryImages[1]} className="rounded-lg object-cover h-48 w-full hover:opacity-90 transition-opacity" />
              </div>
            </section>

             <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Open Positions ({jobs.length})</h2>
              {jobs.length === 0 ? (
                <div className="p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                  <p className="text-gray-500 dark:text-gray-400">No open positions at the moment.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map(job => (
                    <div key={job.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                            <Link to={`/jobs`}>{job.title}</Link>
                          </h3>
                          <div className="flex gap-3 text-sm text-gray-500 dark:text-gray-400 mt-2">
                             <span>{job.type}</span>
                             <span>•</span>
                             <span>{job.location}</span>
                             {job.salaryMin && job.salaryMax && (
                               <>
                                 <span>•</span>
                                 <span className="text-green-600 dark:text-green-400 font-medium">৳{(job.salaryMin/1000)}k - ৳{(job.salaryMax/1000)}k</span>
                               </>
                             )}
                          </div>
                        </div>
                        <Link 
                          to={`/jobs`}
                          className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-bold rounded-lg text-sm hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                        >
                          Apply
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Column: Benefits & Contact */}
          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-8 border border-gray-100 dark:border-gray-700">
               <h3 className="font-bold text-gray-900 dark:text-white mb-4">Why Join Us?</h3>
               <ul className="space-y-3">
                 {[
                   'Competitive Salary',
                   '2 Festival Bonuses',
                   'Health Insurance',
                   'Yearly Tour',
                   'Lunch & Snacks',
                   'Learning Fund'
                 ].map((benefit, i) => (
                   <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                     <Icons.CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0" />
                     {benefit}
                   </li>
                 ))}
               </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Contact</h3>
              <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                {company.website && (
                  <p className="flex items-center gap-3">
                    <Icons.Globe className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <a href={company.website} target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline truncate">{company.website}</a>
                  </p>
                )}
                <p className="flex items-center gap-3">
                  <Icons.MessageSquare className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  recruitment@{company.name.toLowerCase().replace(/\s/g, '')}.com
                </p>
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 mt-4">
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Social Profiles</p>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">in</div>
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">fb</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
