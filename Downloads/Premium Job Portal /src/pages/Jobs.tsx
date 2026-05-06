
import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { db, Job } from '../lib/db';
import { Icons } from '../components/Icons';
import { useAuth } from '../lib/auth';
import { ApplyModal } from '../components/ApplyModal';
import { useLanguage } from '../lib/language';

export const Jobs = () => {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [jobs] = useState<Job[]>(db.getJobs());

  // Filters State
  const [filterVerified, setFilterVerified] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  // Modal State
  const [applyingJob, setApplyingJob] = useState<Job | null>(null);
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  // Derived filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
      const matchesType = selectedType === 'All' || job.type === selectedType;
      const matchesVerified = !filterVerified || job.isVerified;
      const matchesLocation = selectedLocation === 'All' || job.location.toLowerCase().includes(selectedLocation.toLowerCase());

      return matchesSearch && matchesCategory && matchesType && matchesVerified && matchesLocation;
    });
  }, [jobs, searchTerm, selectedCategory, selectedType, filterVerified, selectedLocation]);

  const categories = ['All', 'Engineering', 'Design', 'Marketing', 'Finance', 'Sales', 'Data Entry'];
  const types = ['All', 'Full-time', 'Part-time', 'Contract', 'Remote', 'Internship'];
  const locations = ['All', 'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Remote'];

  const handleApply = async (method: 'whatsapp' | 'chakri bazar', coverLetter?: string) => {
    if (!user) {
      alert('Please login to apply');
      return;
    }

    if (method === 'chakri bazar') {
      try {
        db.createApplication({
          jobId: applyingJob!.id,
          candidateId: user.id,
          status: 'applied',
          coverLetter
        });
        alert('Application submitted successfully!');
        setApplyingJob(null);
      } catch (e) {
        alert('Failed to apply. You may have already applied.');
      }
    } else {
      // WhatsApp logic
      const message = `I'm interested in the ${applyingJob!.title} role. ${coverLetter ? `\n\n${coverLetter}` : ''}`;
      const url = `https://wa.me/8801700000000?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
      setApplyingJob(null);
    }
  };

  const handleCreateAlert = () => {
    if (!user) {
      alert('Please login to create alerts');
      return;
    }
    // Mock API call
    setShowAlertDialog(false);
    alert(`Alert created for "${searchTerm || selectedCategory}" in ${selectedLocation}! You will be notified via email.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header & Search */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {language === 'bn' ? 'আপনার চাকরি বাজার খুঁজুন' : 'Find Your Chakri Bazar'}
            </h1>
            <button
              onClick={() => setShowAlertDialog(true)}
              className="hidden md:flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-4 py-2 rounded-lg transition-colors"
            >
              <Icons.Zap className="w-4 h-4" /> Create Job Alert
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative w-full">
              <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by job title, skill, or company..."
                className="w-full pl-10 pr-10 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {/* Voice Search Icon (UI Only) */}
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400">
                <span className="sr-only">Voice Search</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
              </button>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div
                className={`flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border cursor-pointer transition-colors ${filterVerified ? 'border-emerald-300 dark:border-emerald-700' : 'border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-600'}`}
                onClick={() => setFilterVerified(!filterVerified)}
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${filterVerified ? 'bg-emerald-600 border-emerald-600' : 'border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-800'}`}>
                  {filterVerified && <Icons.CheckCircle className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-200 select-none">Verified Only</span>
              </div>
            </div>
          </div>

          {/* Mobile Create Alert Button */}
          <button
            onClick={() => setShowAlertDialog(true)}
            className="md:hidden w-full mt-4 flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-800 px-4 py-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
          >
            <Icons.Zap className="w-4 h-4" /> Create Job Alert
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="hidden lg:block space-y-8">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Icons.Filter className="w-4 h-4" /> Filters
              </h3>

              <div className="space-y-6">
                {/* Category */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat}
                          onChange={() => setSelectedCategory(cat)}
                          className="text-emerald-600 focus:ring-emerald-500 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                        />
                        <span className={`text-sm ${selectedCategory === cat ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`}>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Location</h4>
                  <div className="space-y-2">
                    {locations.map(loc => (
                      <label key={loc} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="location"
                          checked={selectedLocation === loc}
                          onChange={() => setSelectedLocation(loc)}
                          className="text-emerald-600 focus:ring-emerald-500 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                        />
                        <span className={`text-sm ${selectedLocation === loc ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`}>{loc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Job Type */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Job Type</h4>
                  <div className="space-y-2">
                    {types.map(type => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="type"
                          checked={selectedType === type}
                          onChange={() => setSelectedType(type)}
                          className="text-emerald-600 focus:ring-emerald-500 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                        />
                        <span className={`text-sm ${selectedType === type ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`}>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job List */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>Showing {filteredJobs.length} jobs</span>
              <span>Sort by: <span className="font-medium text-gray-900 dark:text-white">Newest</span></span>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-100 dark:border-gray-700">
                <Icons.Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">No jobs found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
                <button
                  onClick={() => { setSearchTerm(''); setFilterVerified(false); setSelectedCategory('All'); setSelectedLocation('All'); setSelectedType('All'); }}
                  className="mt-4 text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              filteredJobs.map(job => (
                <div key={job.id} className={`bg-white dark:bg-gray-800 p-6 rounded-xl border transition-all hover:shadow-lg group ${job.isFeatured ? 'border-emerald-200 dark:border-emerald-900 bg-emerald-50/10 dark:bg-emerald-900/10' : 'border-gray-100 dark:border-gray-700'}`}>
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Logo Placeholder */}
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-gray-500 dark:text-gray-300 text-2xl">
                      {job.title[0]}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-gray-600 dark:text-gray-400 font-medium">Tech Solutions Ltd</span>
                            {job.isVerified && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-100 dark:border-blue-800">
                                <Icons.CheckCircle className="w-3 h-3" /> VERIFIED
                              </span>
                            )}
                          </div>
                        </div>
                        {job.isUrgent && (
                          <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-bold animate-pulse">
                            URGENT
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-3 my-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm">
                          <Icons.Briefcase className="w-3.5 h-3.5" /> {job.type}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm">
                          <Icons.MapPin className="w-3.5 h-3.5" /> {job.location}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium border border-green-100 dark:border-green-800">
                          <Icons.DollarSign className="w-3.5 h-3.5" />
                          {job.salaryMin ? `৳${(job.salaryMin / 1000)}k - ৳${((job.salaryMax || 0) / 1000)}k` : 'Negotiable'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                        <span className="text-gray-400 dark:text-gray-500 text-sm">Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                        <div className="flex gap-3">
                          <button className="text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium text-sm">Save</button>
                          <button
                            onClick={() => setApplyingJob(job)}
                            className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors shadow-sm hover:shadow-emerald-300/50"
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {applyingJob && (
        <ApplyModal
          job={applyingJob}
          isOpen={!!applyingJob}
          onClose={() => setApplyingJob(null)}
          onApply={handleApply}
        />
      )}

      {/* Alert Dialog */}
      {showAlertDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200 border border-gray-100 dark:border-gray-700">
            <button
              onClick={() => setShowAlertDialog(false)}
              className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <Icons.X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                <Icons.Zap className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create Job Alert</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Get notified when new jobs match your criteria.</p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase mb-1">Search Query</p>
                <p className="font-medium text-gray-900 dark:text-white">{searchTerm || selectedCategory || "All Jobs"}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase mb-1">Frequency</p>
                <select className="bg-transparent font-medium text-gray-900 dark:text-white w-full outline-none">
                  <option className="dark:bg-gray-800">Daily</option>
                  <option className="dark:bg-gray-800">Weekly</option>
                  <option className="dark:bg-gray-800">Instantly</option>
                </select>
              </div>

              <button
                onClick={handleCreateAlert}
                className="w-full py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Create Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
