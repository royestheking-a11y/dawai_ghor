
import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { db, Job, Application, Company } from '../lib/db';
import { Icons } from '../components/Icons';
import { Link, useLocation } from 'react-router';
import { ApplicationTimeline } from '../components/ApplicationTimeline';

export const CandidateDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'matches' | 'applied' | 'profile' | 'alerts'>('matches');

  // Data
  const [matches, setMatches] = useState<(Job & { company?: Company; matchScore?: number })[]>([]);
  const [applications, setApplications] = useState<(Application & { job: Job; company?: Company })[]>([]);
  const [stats, setStats] = useState({ applied: 0, viewed: 0, interviews: 0 });
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [alerts, setAlerts] = useState([
    { id: 1, query: 'Frontend Developer', location: 'Dhaka', frequency: 'Daily' },
    { id: 2, query: 'React Native', location: 'Remote', frequency: 'Weekly' }
  ]);

  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || '',
    skills: user?.skills?.join(', ') || ''
  });

  // Handle URL-based tab switching
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/me/profile')) {
      setActiveTab('profile');
    } else if (path.includes('/me/applications')) {
      setActiveTab('applied');
    } else if (path.includes('/me/alerts')) {
      setActiveTab('alerts');
    } else {
      setActiveTab('matches');
    }
  }, [location.pathname]);

  // Helper: Calculate Match Score
  const calculateMatchScore = (job: Job, userSkills: string[] = []) => {
    if (!job.skills || job.skills.length === 0) return 50; // Default if no skills listed
    const jobSkills = job.skills.map(s => s.toLowerCase());
    const candidateSkills = userSkills.map(s => s.toLowerCase());

    const intersection = jobSkills.filter(s => candidateSkills.includes(s));
    const score = Math.round((intersection.length / jobSkills.length) * 100);

    // Bonus for exact title match (simple check)
    if (user?.title && job.title.toLowerCase().includes(user.title.toLowerCase())) {
      return Math.min(score + 20, 100);
    }

    return score;
  };

  useEffect(() => {
    if (!user) return;

    // Calculate Profile Completion
    const fields = [
      user.name,
      user.email,
      user.phone,
      user.bio,
      user.location,
      user.avatar,
      user.title,
      user.skills?.length ? 'yes' : '',
      user.experience?.length ? 'yes' : ''
    ];
    const filledFields = fields.filter(f => f).length;
    setProfileCompletion(Math.round((filledFields / fields.length) * 100));

    const allJobs = db.getJobs();
    const allCompanies = db.getCompanies();

    // Fetch Matches with Score
    const activeJobs = allJobs.filter(j => j.status === 'active');
    const scoredJobs = activeJobs.map(j => ({
      ...j,
      company: allCompanies.find(c => c.id === j.companyId || c.recruiterId === j.recruiterId),
      matchScore: calculateMatchScore(j, user.skills)
    })).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0)); // Sort by match score

    setMatches(scoredJobs);

    // Fetch Applications with joined Job data
    const myApps = db.getApplications().filter(a => a.candidateId === user.id);

    const joinedApps = myApps.map(app => {
      const job = allJobs.find(j => j.id === app.jobId);
      if (!job) return null;
      const company = allCompanies.find(c => c.id === job.companyId || c.recruiterId === job.recruiterId);
      return { ...app, job, company };
    }).filter(a => a !== null) as (Application & { job: Job; company?: Company })[];

    setApplications(joinedApps);

    // Calculate Stats
    setStats({
      applied: myApps.length,
      viewed: myApps.filter(a => a.status === 'shortlisted').length, // Using shortlisted as viewed proxy
      interviews: myApps.filter(a => a.status === 'interview').length
    });

  }, [user]);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    db.updateUser(user.id, {
      name: profileForm.name,
      bio: profileForm.bio,
      location: profileForm.location,
      skills: profileForm.skills.split(',').map(s => s.trim())
    });
    alert('Profile updated successfully!');
  };

  const deleteAlert = (id: number) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const withdrawApplication = (appId: string) => {
    if (confirm('Are you sure you want to withdraw this application?')) {
      // In a real app, delete from DB
      // db.deleteApplication(appId);
      setApplications(apps => apps.filter(a => a.id !== appId));
      setStats(s => ({ ...s, applied: s.applied - 1 }));
      alert('Application withdrawn.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-0 md:pt-8 pb-12 transition-colors duration-200">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sticky top-24 transition-colors">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3 border-4 border-white dark:border-gray-700 shadow-sm overflow-hidden">
                  {user?.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /> : <Icons.User className="w-10 h-10" />}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{user?.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">{user?.bio || 'Add a bio to standout'}</p>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-1 justify-center mt-3">
                  {user?.verifiedSkills?.map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold rounded-full flex items-center gap-1">
                      <Icons.CheckCircle className="w-3 h-3" /> {skill}
                    </span>
                  ))}
                </div>

                <div className="w-full mt-4 bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-green-500 h-full transition-all duration-500" style={{ width: `${profileCompletion}%` }}></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Profile Completion: {profileCompletion}%</p>
              </div>

              <nav className="space-y-2">
                <Link
                  to="/me/dashboard"
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'matches' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <Icons.Zap className="w-5 h-5" />
                  Matched Jobs
                </Link>
                <Link
                  to="/me/interviews"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Icons.CalendarDays className="w-5 h-5" />
                  Interviews
                </Link>
                <Link
                  to="/me/applications"
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'applied' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <Icons.FileText className="w-5 h-5" />
                  My Applications
                </Link>
                <Link
                  to="/me/alerts" // Assuming we add this route or handle it
                  onClick={(e) => { e.preventDefault(); setActiveTab('alerts'); window.history.pushState(null, '', '/me/dashboard'); }} // Fallback for now if no route
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'alerts' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <Icons.Zap className="w-5 h-5" />
                  Job Alerts
                </Link>
                <Link
                  to="/me/profile"
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <Icons.User className="w-5 h-5" />
                  Profile
                </Link>
                <Link
                  to="/cv-builder"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Icons.FileText className="w-5 h-5 text-emerald-600" />
                  CV Builder
                </Link>
                <Link
                  to="/skills"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Icons.Star className="w-5 h-5" />
                  Skill Tests
                </Link>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase">Applied</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.applied}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase">Viewed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.viewed}</p>
              </div>
              <Link to="/me/interviews" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:border-emerald-200 dark:hover:border-emerald-900 transition-colors block">
                <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase">Interviews</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.interviews}</p>
              </Link>
            </div>

            {activeTab === 'matches' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Jobs Matched for You</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Icons.Filter className="w-4 h-4" /> Filter
                  </div>
                </div>

                <div className="grid gap-4">
                  {matches.map(job => (
                    <div key={job.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-900 transition-all group">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="flex gap-4">
                          <div className="w-14 h-14 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center border border-gray-100 dark:border-gray-600 group-hover:bg-white dark:group-hover:bg-gray-800 transition-colors overflow-hidden">
                            {job.company?.logo ? (
                              <img src={job.company.logo} alt={job.company.name} className="w-full h-full object-contain" />
                            ) : (
                              <span className="font-bold text-gray-400 dark:text-gray-500 text-xl">{job.title[0]}</span>
                            )}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{job.title}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-gray-600 dark:text-gray-400 font-medium text-sm">{job.company?.name || 'Tech Company'}</span>
                              {job.isVerified && <Icons.CheckCircle className="w-4 h-4 text-blue-500 dark:text-blue-400" />}
                            </div>
                            <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                              <span className="bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded border border-gray-100 dark:border-gray-600 flex items-center gap-1">
                                <Icons.MapPin className="w-3 h-3" /> {job.location}
                              </span>
                              <span className="bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded border border-gray-100 dark:border-gray-600 flex items-center gap-1">
                                <Icons.Briefcase className="w-3 h-3" /> {job.type}
                              </span>
                              <span className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded border border-green-100 dark:border-green-800 font-medium">
                                ৳{job.salaryMin ? `${(job.salaryMin / 1000)}k` : ''} - ৳{job.salaryMax ? `${(job.salaryMax / 1000)}k` : ''}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                          <div className={`flex items-center gap-1 text-sm font-bold px-3 py-1 rounded-full ${(job.matchScore || 0) >= 80 ? 'text-green-600 bg-green-50 dark:bg-green-900/20' :
                            (job.matchScore || 0) >= 50 ? 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20' :
                              'text-gray-500 bg-gray-50 dark:bg-gray-800'
                            }`}>
                            <Icons.Zap className="w-3 h-3" /> {job.matchScore}% Match
                          </div>
                          <Link to="/jobs" className="w-full sm:w-auto px-6 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-200 dark:shadow-emerald-900/50 text-center">
                            View Job
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'alerts' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Job Alerts</h2>
                  <button className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-4 py-2 rounded-lg transition-colors">
                    <Icons.Plus className="w-4 h-4" /> Create Alert
                  </button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
                  {alerts.length > 0 ? (
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                      {alerts.map(alert => (
                        <div key={alert.id} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
                              <Icons.Search className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 dark:text-white">{alert.query}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{alert.location} • {alert.frequency}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <label className="flex items-center cursor-pointer">
                              <div className="relative">
                                <input type="checkbox" className="sr-only" defaultChecked />
                                <div className="block bg-gray-200 dark:bg-gray-600 w-10 h-6 rounded-full"></div>
                                <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                              </div>
                            </label>
                            <button
                              onClick={() => deleteAlert(alert.id)}
                              className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                            >
                              <Icons.X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                      <Icons.Zap className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                      <p>No job alerts set up yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-8 transition-colors">
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Edit Profile</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                      <input
                        value={profileForm.name}
                        onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <input
                        value={profileForm.email}
                        disabled
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                      <input
                        value={profileForm.location}
                        onChange={e => setProfileForm({ ...profileForm, location: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skills (Comma separated)</label>
                      <input
                        value={profileForm.skills}
                        onChange={e => setProfileForm({ ...profileForm, skills: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio / Headline</label>
                    <textarea
                      value={profileForm.bio}
                      onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-32 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Software Engineer with 5 years experience..."
                    />
                  </div>

                  <button type="submit" className="px-8 py-3 bg-gray-900 dark:bg-emerald-600 text-white font-bold rounded-lg hover:bg-gray-800 dark:hover:bg-emerald-700 transition-colors">
                    Save Changes
                  </button>
                </form>

                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Resume / CV</h3>
                  <div className="p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                    <Icons.FileText className="w-10 h-10 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                    <p className="font-medium text-gray-900 dark:text-white">Upload your CV</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">PDF, DOCX up to 5MB</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'applied' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Application History</h2>
                {applications.length === 0 ? (
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                      <Icons.FileText className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">No applications yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Start applying to jobs to see them here.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {applications.map(app => (
                      <div key={app.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
                        <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer">{app.job.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                              <span className="font-medium text-gray-700 dark:text-gray-300">{app.company?.name || 'Tech Company'}</span>
                              <span>•</span>
                              <span>Applied on {new Date(app.appliedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => withdrawApplication(app.id)}
                              className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
                            >
                              Withdraw
                            </button>
                            <Link
                              to="/messages"
                              className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 border border-blue-100 dark:border-blue-900/30"
                            >
                              <Icons.MessageSquare className="w-4 h-4" /> Message
                            </Link>
                          </div>
                        </div>

                        {/* Timeline Component */}
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                          <ApplicationTimeline status={app.status} />
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
