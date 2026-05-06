
import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { db, Job, Application, User, Company } from '../lib/db';
import { Icons } from '../components/Icons';
import { Link } from 'react-router';
import { RichTextEditor } from '../components/RichTextEditor';
import { useLanguage } from '../lib/language';

type ApplicantWithProfile = Application & { candidate: User };


export const RecruiterDashboard = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'applicants' | 'post'>('overview');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // Data State
  const [jobs, setJobs] = useState<Job[]>([]);
  const [company, setCompany] = useState<Company | undefined>(undefined);
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplicants: 0,
    shortlisted: 0,
    views: 1250 // Mock
  });

  useEffect(() => {
    if (!user) return;

    // Load Jobs
    const userJobs = db.getJobs().filter(j => j.recruiterId === user.id);
    setJobs(userJobs);

    // Load Company
    const userCompany = db.getCompanyByRecruiterId(user.id);
    setCompany(userCompany);

    // Load Stats
    const allApps = db.getApplications();
    const myJobIds = userJobs.map(j => j.id);
    const myApps = allApps.filter(a => myJobIds.includes(a.jobId));

    setStats({
      activeJobs: userJobs.filter(j => j.status === 'active').length,
      totalApplicants: myApps.length,
      shortlisted: myApps.filter(a => a.status === 'shortlisted' || a.status === 'interview').length,
      views: 1250 // Mock data
    });
  }, [user]);

  const handleDeleteJob = (id: string) => {
    if (!confirm('Delete this job?')) return;
    setJobs(prev => prev.filter(j => j.id !== id));
    // Ideally sync with DB
  };

  const Overview = () => {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg">
                <Icons.Briefcase className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">+12%</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active Jobs</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.activeJobs}</h3>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                <Icons.Users className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">+5%</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Applicants</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalApplicants}</h3>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg">
                <Icons.UserCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-full">0%</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Shortlisted</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.shortlisted}</h3>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg">
                <Icons.Eye className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">+24%</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Views</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.views}</h3>
          </div>
        </div>

        {/* Recent Activity / Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Job Performance</h3>
              <button onClick={() => setActiveTab('jobs')} className="text-emerald-600 dark:text-emerald-400 text-sm font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {jobs.slice(0, 3).map(job => (
                <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-emerald-500 font-bold border border-gray-100 dark:border-gray-700">
                      {job.title[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm">{job.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{job.location} • {job.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">12 Applicants</p>
                    <p className="text-xs text-green-500 font-medium">Active</p>
                  </div>
                </div>
              ))}
              {jobs.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No jobs active right now.
                </div>
              )}
            </div>
          </div>

          <div className="bg-emerald-600 rounded-xl p-6 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Post a New Job</h3>
              <p className="text-emerald-100 text-sm mb-6">Find the best talent for your company. Get started in minutes.</p>
              <ul className="space-y-2 text-sm text-emerald-50 mb-8">
                <li className="flex items-center gap-2"><Icons.CheckCircle className="w-4 h-4" /> Smart candidate matching</li>
                <li className="flex items-center gap-2"><Icons.CheckCircle className="w-4 h-4" /> AI-powered descriptions</li>
                <li className="flex items-center gap-2"><Icons.CheckCircle className="w-4 h-4" /> Reach 50k+ candidates</li>
              </ul>
            </div>
            <button
              onClick={() => setActiveTab('post')}
              className="w-full py-3 bg-white text-emerald-600 font-bold rounded-lg hover:bg-emerald-50 transition-colors shadow-sm"
            >
              Create Job Post
            </button>
          </div>
        </div>
      </div>
    );
  }

  const ApplicantsView = () => {
    const [applicants, setApplicants] = useState<ApplicantWithProfile[]>(() => {
      const apps = db.getApplications();
      const users = db.getUsers();

      // Filter applications for jobs owned by this recruiter
      return apps
        .filter(a => jobs.some(j => j.id === a.jobId))
        .filter(a => selectedJobId ? a.jobId === selectedJobId : true)
        .map(a => ({
          ...a,
          candidate: users.find(u => u.id === a.candidateId)!
        }))
        .filter(a => a.candidate); // Safety check
    });

    const updateStatus = (appId: string, status: 'shortlisted' | 'rejected') => {
      // Update local state
      setApplicants(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
      // Update mock db
      // Note: In a real app we'd call db.updateApplication(appId, { status })
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {selectedJobId ? `Applicants for ${jobs.find(j => j.id === selectedJobId)?.title}` : 'All Applicants'}
          </h2>
          {selectedJobId && (
            <button
              onClick={() => setSelectedJobId(null)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium flex items-center gap-1"
            >
              <Icons.ChevronLeft className="w-4 h-4" /> Back to All
            </button>
          )}
        </div>

        {/* Job Filter Dropdown if showing all */}
        {!selectedJobId && (
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedJobId(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${!selectedJobId ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'}`}
            >
              All Jobs
            </button>
            {jobs.map(j => (
              <button
                key={j.id}
                onClick={() => setSelectedJobId(j.id)}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-emerald-300 dark:hover:border-emerald-500 whitespace-nowrap"
              >
                {j.title}
              </button>
            ))}
          </div>
        )}

        {applicants.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 dark:text-gray-500">
              <Icons.User className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No applicants found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Wait for candidates to apply to your jobs.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {applicants.map(app => (
              <div key={app.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                      {app.candidate.avatar ? <img src={app.candidate.avatar} className="w-full h-full object-cover" /> : <span className="font-bold text-gray-500 dark:text-gray-400">{app.candidate.name[0]}</span>}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">{app.candidate.name}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${app.status === 'shortlisted' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                          app.status === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                            'bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                          }`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{app.candidate.title || 'Candidate'}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {app.candidate.verifiedSkills?.map(skill => (
                          <span key={skill} className="px-2 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs font-bold rounded flex items-center gap-1 border border-green-100 dark:border-green-800">
                            <Icons.CheckCircle className="w-3 h-3" /> {skill}
                          </span>
                        ))}
                        {app.candidate.skills?.slice(0, 3).map(skill => (
                          <span key={skill} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded border border-gray-200 dark:border-gray-600">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="text-sm text-gray-500 dark:text-gray-400 flex gap-4">
                        <span className="flex items-center gap-1"><Icons.MapPin className="w-3 h-3" /> {app.candidate.location || 'N/A'}</span>
                        <span className="flex items-center gap-1"><Icons.Clock className="w-3 h-3" /> Applied {new Date(app.appliedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col gap-2 justify-center">
                    <button className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium rounded hover:bg-gray-800 dark:hover:bg-gray-600 flex items-center justify-center gap-2">
                      <Icons.FileText className="w-4 h-4" /> View CV
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(app.id, 'shortlisted')}
                        className="flex-1 px-3 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-bold rounded border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30"
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => updateStatus(app.id, 'rejected')}
                        className="flex-1 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm font-bold rounded border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const JobPostForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      title: '',
      type: 'Full-time',
      category: 'Engineering',
      location: 'Remote',
      salaryMin: 40000,
      salaryMax: 60000,
      description: '',
      requirements: '',
      skills: ''
    });

    const handlePost = () => {
      if (!user) return;

      const newJob = db.createJob({
        recruiterId: user.id,
        companyId: company?.id || 'c1', // Fallback to c1 if company not loaded yet, ideally should force company creation
        title: formData.title,
        description: formData.description,
        type: formData.type as any,
        category: formData.category,
        location: formData.location,
        salaryMin: formData.salaryMin,
        salaryMax: formData.salaryMax,
        skills: formData.skills.split(',').map(s => s.trim()),
        requirements: formData.requirements.split('\n'),
        status: 'active',
        isVerified: false, // New jobs need admin verification
        isFeatured: false,
        isUrgent: false
      });

      setJobs([...jobs, newJob]);
      setActiveTab('jobs');
      alert('Job posted successfully! It is now pending approval.');
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-200">
        {/* Progress Bar */}
        <div className="bg-gray-50 dark:bg-gray-750 border-b border-gray-100 dark:border-gray-700 p-4 flex justify-between items-center">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`w-8 h-2 rounded-full transition-colors ${step >= s ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-600'}`} />
            ))}
          </div>
          <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Step {step} of 4</span>
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Job Basics</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title</label>
                <input
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="e.g. Senior Frontend Developer"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Type</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Remote</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option>Engineering</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                <div className="relative">
                  <Icons.MapPin className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  <input
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="e.g. Dhaka (Hybrid)"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Compensation</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 flex gap-3 text-sm text-blue-800 dark:text-blue-300 mb-6">
                <Icons.CheckCircle className="w-5 h-5 flex-shrink-0" />
                <p>Jobs with transparent salary ranges get 3x more applicants on {language === 'bn' ? 'চাকরি বাজার' : 'Chakri Bazar'}.</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Minimum Salary (BDT)</label>
                  <input
                    type="number"
                    value={formData.salaryMin}
                    onChange={e => setFormData({ ...formData, salaryMin: parseInt(e.target.value) })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Maximum Salary (BDT)</label>
                  <input
                    type="number"
                    value={formData.salaryMax}
                    onChange={e => setFormData({ ...formData, salaryMax: parseInt(e.target.value) })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Requirements & Description</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skills (Comma separated)</label>
                <input
                  value={formData.skills}
                  onChange={e => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="React, TypeScript, Node.js"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Description</label>
                <RichTextEditor
                  value={formData.description}
                  onChange={(val) => setFormData({ ...formData, description: val })}
                  placeholder="Describe the responsibilities and company culture..."
                  height="h-64"
                />
                <button className="mt-2 text-emerald-600 dark:text-emerald-400 text-sm font-bold flex items-center gap-1 hover:underline">
                  <Icons.Zap className="w-4 h-4" /> AI Generate Description
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Review & Post</h2>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{formData.title}</h3>
                <div
                  className="text-gray-600 dark:text-gray-300 mb-4 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: formData.description }}
                />

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-white dark:bg-gray-800 dark:text-white px-2 py-1 border dark:border-gray-600 rounded text-xs">{formData.type}</span>
                  <span className="bg-white dark:bg-gray-800 dark:text-white px-2 py-1 border dark:border-gray-600 rounded text-xs">{formData.location}</span>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 border border-green-200 dark:border-green-800 rounded text-xs font-bold">
                    ৳{formData.salaryMin} - ৳{formData.salaryMax}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded" />
                <span className="text-sm text-gray-600 dark:text-gray-400">I confirm this is a real job post and agree to {language === 'bn' ? 'চাকরি বাজার' : 'Chakri Bazar'}'s terms.</span>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(s => s - 1)}
                className="px-6 py-2 text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Back
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                className="px-6 py-2 bg-gray-900 dark:bg-gray-700 text-white font-medium hover:bg-gray-800 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handlePost}
                className="px-8 py-2 bg-emerald-600 text-white font-bold hover:bg-emerald-700 rounded-lg shadow-lg shadow-emerald-200 dark:shadow-emerald-900/50 transition-colors"
              >
                Publish Job
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-0 md:pt-8 pb-12 transition-colors duration-200">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sticky top-24 transition-colors">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Icons.Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white truncate w-32">{company?.name || user?.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Recruiter Account</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <Icons.LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'jobs' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <Icons.FileText className="w-5 h-5" />
                  Manage Jobs
                </button>
                <button
                  onClick={() => setActiveTab('post')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'post' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <Icons.Plus className="w-5 h-5" />
                  Post New Job
                </button>
                <button
                  onClick={() => setActiveTab('applicants')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'applicants' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <Icons.User className="w-5 h-5" />
                  Applicants
                </button>
                <Link
                  to="/recruiter/search"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Icons.Search className="w-5 h-5" />
                  Search Talent
                </Link>
                <Link
                  to="/recruiter/settings"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Icons.Settings className="w-5 h-5" />
                  Settings
                </Link>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'overview' && <Overview />}
            {activeTab === 'post' && <JobPostForm />}
            {activeTab === 'applicants' && <ApplicantsView />}
            {activeTab === 'jobs' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Active Jobs</h2>
                  <button onClick={() => setActiveTab('post')} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 flex items-center gap-2 shadow-lg shadow-emerald-200 dark:shadow-emerald-900/50">
                    <Icons.Plus className="w-4 h-4" /> Post Job
                  </button>
                </div>

                {jobs.length === 0 ? (
                  <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 dark:text-gray-500">
                      <Icons.Briefcase className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No jobs posted yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Start hiring by posting your first job.</p>
                    <button onClick={() => setActiveTab('post')} className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
                      Create a Job Post
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {jobs.map(job => (
                      <div key={job.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{job.title}</h3>
                            <div className="flex gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
                              <span>{job.type}</span>
                              <span>•</span>
                              <span>{job.location}</span>
                              <span>•</span>
                              <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex gap-2">
                              {job.isVerified ? (
                                <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full flex items-center gap-1 border border-green-100 dark:border-green-800">
                                  <Icons.CheckCircle className="w-3 h-3" /> Active & Verified
                                </span>
                              ) : (
                                <span className="px-3 py-1 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs font-medium rounded-full flex items-center gap-1 border border-yellow-100 dark:border-yellow-800">
                                  <Icons.Clock className="w-3 h-3" /> Pending Approval
                                </span>
                              )}
                              <button
                                onClick={() => { setActiveTab('applicants'); setSelectedJobId(job.id); }}
                                className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-100 dark:border-blue-800"
                              >
                                View Applicants
                              </button>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Link to="/recruiter/settings" className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg">
                              <Icons.Settings className="w-5 h-5" />
                            </Link>
                            <button onClick={() => handleDeleteJob(job.id)} className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg">
                              <Icons.X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
