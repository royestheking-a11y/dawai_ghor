
import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { db, Company } from '../lib/db';
import { Icons } from '../components/Icons';

export const RecruiterSettings = () => {
  const { user } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    website: '',
    logo: ''
  });
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (user) {
      const existingCompany = db.getCompanyByRecruiterId(user.id);
      if (existingCompany) {
        setCompany(existingCompany);
        setFormData({
          name: existingCompany.name,
          description: existingCompany.description,
          location: existingCompany.location || '',
          website: existingCompany.website || '',
          logo: existingCompany.logo || ''
        });
        setIsCreating(false);
      } else {
        // Prepare for creation
        setIsCreating(true);
        setFormData({
            name: user.name + "'s Company", // Default name
            description: '',
            location: '',
            website: '',
            logo: ''
        });
      }
      setLoading(false);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (isCreating) {
        const newCompany = db.createCompany({
            recruiterId: user.id,
            name: formData.name,
            description: formData.description,
            location: formData.location,
            website: formData.website,
            logo: formData.logo,
            verified: false // Needs admin verification
        });
        setCompany(newCompany);
        setIsCreating(false);
        alert('Company profile created successfully!');
    } else if (company) {
        db.updateCompany(company.id, {
            name: formData.name,
            description: formData.description,
            location: formData.location,
            website: formData.website,
            logo: formData.logo
        });
        alert('Company profile updated successfully!');
    }
  };

  if (loading) return <div className="p-8 text-center dark:text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8 pb-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
           <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
             <Icons.Settings className="w-6 h-6 text-gray-700 dark:text-gray-300" />
           </div>
           <div>
             <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {isCreating ? 'Create Company Profile' : 'Company Settings'}
             </h1>
             <p className="text-gray-500 dark:text-gray-400">
                {isCreating ? 'Set up your company details to start posting jobs' : 'Manage your company profile and branding'}
             </p>
           </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
             {/* Logo Upload Section (Mock) */}
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Company Logo</label>
               <div className="flex items-center gap-6">
                 <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-hidden relative group">
                   {formData.logo ? (
                     <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
                   ) : (
                     <span className="text-gray-400 dark:text-gray-500 font-bold text-2xl">{formData.name ? formData.name[0] : '?'}</span>
                   )}
                   <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Icons.Plus className="w-6 h-6 text-white" />
                   </div>
                 </div>
                 <div className="flex-1">
                   <div className="flex gap-2 mb-2">
                      <input 
                        type="text" 
                        placeholder="Paste logo URL here..."
                        value={formData.logo}
                        onChange={e => setFormData({...formData, logo: e.target.value})}
                        className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                   </div>
                   <p className="text-xs text-gray-500 dark:text-gray-400">Recommended size: 500x500px. JPG or PNG.</p>
                 </div>
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                 <input 
                   value={formData.name}
                   onChange={e => setFormData({...formData, name: e.target.value})}
                   className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                   required
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website</label>
                 <div className="relative">
                   <Icons.Globe className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 dark:text-gray-500" />
                   <input 
                     value={formData.website}
                     onChange={e => setFormData({...formData, website: e.target.value})}
                     className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                     placeholder="https://example.com"
                   />
                 </div>
               </div>
               <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Headquarters Location</label>
                 <div className="relative">
                   <Icons.MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 dark:text-gray-500" />
                   <input 
                     value={formData.location}
                     onChange={e => setFormData({...formData, location: e.target.value})}
                     className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                     placeholder="e.g. Gulshan 1, Dhaka"
                   />
                 </div>
               </div>
               <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">About Company</label>
                 <textarea 
                   value={formData.description}
                   onChange={e => setFormData({...formData, description: e.target.value})}
                   className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-32 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                   placeholder="Describe your company culture, mission, and vision..."
                 />
               </div>
             </div>

             <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-4">
               {!isCreating && (
                   <button type="button" className="px-6 py-2 text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                     Cancel
                   </button>
               )}
               <button type="submit" className="px-8 py-2 bg-emerald-600 dark:bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-700 shadow-lg transition-colors">
                 {isCreating ? 'Create Profile' : 'Save Changes'}
               </button>
             </div>
          </form>
        </div>
      </div>
    </div>
  );
};
