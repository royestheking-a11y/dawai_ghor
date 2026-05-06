
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { db, Company } from '../lib/db';
import { Icons } from '../components/Icons';

export const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const allCompanies = db.getCompanies();
    setCompanies(allCompanies);
  }, []);

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Top Companies Hiring Now</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the best workplaces in Bangladesh. From startups to multinationals, find the company that fits your culture.
          </p>
          
          <div className="mt-8 max-w-lg mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icons.Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-full leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
              placeholder="Search companies by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {filteredCompanies.length === 0 ? (
           <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Icons.Briefcase className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No companies found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Try adjusting your search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map(company => (
              <Link 
                key={company.id} 
                to={`/companies/${company.id}`}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-900/50 transition-all duration-300"
              >
                <div className="h-32 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 relative">
                  {/* Banner placeholder */}
                </div>
                <div className="px-6 pb-6 relative">
                  <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl shadow-md p-2 -mt-8 mb-4 border border-gray-100 dark:border-gray-700 flex items-center justify-center">
                     {company.logo ? (
                        <img src={company.logo} alt={company.name} className="w-full h-full object-contain rounded-lg" />
                      ) : (
                        <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">
                          {company.name[0]}
                        </div>
                      )}
                  </div>
                  
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {company.name}
                    </h3>
                    {company.verified && (
                      <Icons.CheckCircle className="w-5 h-5 text-blue-500" title="Verified Company" />
                    )}
                  </div>
                  
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {company.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Icons.MapPin className="w-3 h-3" />
                      {company.location || 'Dhaka'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icons.Briefcase className="w-3 h-3" />
                      Open Jobs
                    </span>
                  </div>
                  
                  <button className="w-full mt-6 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 group-hover:border-emerald-200 dark:group-hover:border-emerald-800 transition-all">
                    View Profile
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
