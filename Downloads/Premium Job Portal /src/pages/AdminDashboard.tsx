
import { useState, useEffect } from 'react';
import { db, Job, User, Company, SupportMessage } from '../lib/db';
import { Icons } from '../components/Icons';
import { motion } from 'motion/react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'recruiters' | 'users' | 'companies' | 'messages'>('overview');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [messages, setMessages] = useState<SupportMessage[]>([]);

  useEffect(() => {
    // Load data from DB on mount and tab change to ensure sync
    setJobs(db.getJobs() || []);
    setUsers(db.getUsers() || []);
    setCompanies(db.getCompanies() || []);
    setMessages(db.getSupportMessages() || []);
  }, [activeTab]);

  // Stats
  const stats = [
    { label: 'Total Users', value: users.length, icon: Icons.Users, color: 'bg-blue-500' },
    { label: 'Total Jobs', value: jobs.length, icon: Icons.Briefcase, color: 'bg-emerald-500' },
    { label: 'Companies', value: companies.length, icon: Icons.Building, color: 'bg-purple-500' },
    { label: 'Pending Support', value: messages.filter(m => m.status === 'new').length, icon: Icons.Mail, color: 'bg-orange-500' },
  ];

  // Mock data for charts
  const chartData = [
    { name: 'Mon', apps: 400, jobs: 240 },
    { name: 'Tue', apps: 300, jobs: 139 },
    { name: 'Wed', apps: 200, jobs: 980 },
    { name: 'Thu', apps: 278, jobs: 390 },
    { name: 'Fri', apps: 189, jobs: 480 },
    { name: 'Sat', apps: 239, jobs: 380 },
    { name: 'Sun', apps: 349, jobs: 430 },
  ];

  const toggleJobVerification = (jobId: string) => {
    const updatedJobs = jobs.map(j => 
      j.id === jobId ? { ...j, isVerified: !j.isVerified } : j
    );
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  };

  const deleteJob = (jobId: string) => {
    if(!confirm('Are you sure you want to delete this job?')) return;
    const updatedJobs = jobs.filter(j => j.id !== jobId);
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  };

  const updateMessageStatus = (id: string, status: 'read' | 'replied') => {
    const updated = messages.map(m => m.id === id ? { ...m, status } : m);
    setMessages(updated);
    localStorage.setItem('support_messages', JSON.stringify(updated));
  };

  const SidebarItem = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon: any }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
        activeTab === id 
          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20' 
          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors duration-200">
      
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 hidden lg:block">
        <div className="flex items-center gap-2 mb-10 px-2">
            <div className="text-emerald-600"><Icons.ShieldCheck className="w-8 h-8" /></div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">Admin Panel</span>
        </div>
        
        <nav className="space-y-2">
          <SidebarItem id="overview" label="Overview" icon={Icons.LayoutDashboard} />
          <SidebarItem id="jobs" label="Job Moderation" icon={Icons.Briefcase} />
          <SidebarItem id="recruiters" label="Recruiter Verification" icon={Icons.UserCheck} />
          <SidebarItem id="users" label="User Management" icon={Icons.Users} />
          <SidebarItem id="companies" label="Companies" icon={Icons.Building} />
          <SidebarItem id="messages" label="Support Messages" icon={Icons.Mail} />
        </nav>

        <div className="mt-20 p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/20">
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">PRO VERSION</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">You are using the enhanced premium dashboard.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 sticky top-0 z-10 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
              {activeTab === 'overview' ? 'Dashboard Overview' : activeTab.replace('_', ' ')}
            </h1>
            <div className="flex items-center gap-4">
               <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors relative">
                  <Icons.Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-600 rounded-full"></span>
               </button>
               <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
        </header>

        <main className="p-6">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={stat.label} 
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                    </div>
                    <div className={`${stat.color} p-3 rounded-xl text-white`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-6">Activity Growth</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                        <Tooltip />
                        <Area type="monotone" dataKey="apps" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
                        <Area type="monotone" dataKey="jobs" stroke="#3b82f6" strokeWidth={3} fillOpacity={0} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-6">Recent Users</h3>
                  <div className="space-y-4">
                    {users.slice(-5).map(user => (
                      <div key={user.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center font-bold">
                            {(user?.name || 'U').charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{user?.name || 'Anonymous'}</p>
                            <p className="text-xs text-gray-500">{user?.role || 'Guest'}</p>
                          </div>
                        </div>
                        <span className="text-[10px] text-gray-400 font-medium">
                           {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Job Moderation Tab */}
          {activeTab === 'jobs' && (
             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700/50 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      <th className="p-4">Job Title</th>
                      <th className="p-4">Recruiter</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {jobs.map(job => (
                      <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-gray-900 dark:text-white">{job.title}</div>
                          <div className="text-xs text-gray-500">{job.location}</div>
                        </td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">ID: {job.recruiterId?.slice(0, 8)}</td>
                        <td className="p-4">
                          {job.isVerified ? (
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-[10px] font-bold">VERIFIED</span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg text-[10px] font-bold">PENDING</span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                           <div className="flex justify-end gap-2">
                             <button 
                                onClick={() => toggleJobVerification(job.id)}
                                className={`p-2 rounded-lg transition-colors ${job.isVerified ? 'text-yellow-500 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'}`}
                                title={job.isVerified ? 'Unverify' : 'Verify'}
                             >
                               {job.isVerified ? <Icons.XCircle className="w-5 h-5" /> : <Icons.CheckCircle className="w-5 h-5" />}
                             </button>
                             <button onClick={() => deleteJob(job.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                <Icons.Trash className="w-5 h-5" />
                             </button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          )}

          {/* User Management Tab */}
          {activeTab === 'users' && (
             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700/50 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      <th className="p-4">Name & Email</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Joined</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {users.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-gray-900 dark:text-white">{user?.name || 'N/A'}</div>
                          <div className="text-xs text-gray-500">{user?.email || 'N/A'}</div>
                        </td>
                        <td className="p-4">
                           <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                             user?.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                             user?.role === 'recruiter' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                           }`}>
                             {(user?.role || 'user').toUpperCase()}
                           </span>
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                           {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="p-4 text-right">
                           <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                              <Icons.Eye className="w-5 h-5" />
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          )}

          {/* Companies Tab */}
          {activeTab === 'companies' && (
             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700/50 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      <th className="p-4">Company</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Verification</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {companies.map(company => (
                      <tr key={company.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-gray-900 dark:text-white">{company.name}</div>
                          <div className="text-xs text-gray-500 truncate max-w-xs">{company.description}</div>
                        </td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{company.location || 'N/A'}</td>
                        <td className="p-4">
                           {company.verified ? (
                             <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-xs font-bold">
                               <Icons.CheckCircle className="w-4 h-4" /> Verified
                             </span>
                           ) : (
                             <span className="text-gray-400 text-xs font-bold">Unverified</span>
                           )}
                        </td>
                        <td className="p-4 text-right">
                           <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                              <Icons.Settings className="w-5 h-5" />
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
             <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="bg-white dark:bg-gray-800 p-12 rounded-2xl text-center border border-gray-100 dark:border-gray-700">
                    <Icons.Mail className="w-12 h-12 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">No messages yet</h3>
                    <p className="text-gray-500">All contact form submissions will appear here.</p>
                  </div>
                ) : (
                  messages.map(msg => (
                    <div key={msg.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between gap-4">
                       <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                               msg.status === 'new' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                             }`}>
                               {msg.status.toUpperCase()}
                             </span>
                             <span className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleString()}</span>
                          </div>
                          <h4 className="font-bold text-gray-900 dark:text-white">Subject: {msg.subject}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">From: {msg.name} ({msg.email})</p>
                          <p className="text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm italic border-l-4 border-emerald-500">
                            "{msg.message}"
                          </p>
                       </div>
                       <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                          {msg.status === 'new' && (
                            <button 
                              onClick={() => updateMessageStatus(msg.id, 'read')}
                              className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-all"
                            >
                              Mark as Read
                            </button>
                          )}
                          <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                             Reply
                          </button>
                       </div>
                    </div>
                  ))
                )}
             </div>
          )}

          {/* Placeholder for Recruiters tab */}
          {activeTab === 'recruiters' && (
             <div className="bg-white dark:bg-gray-800 p-12 rounded-2xl text-center border border-gray-100 dark:border-gray-700">
                <Icons.UserCheck className="w-12 h-12 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Verification Requests</h3>
                <p className="text-gray-500">Companies awaiting badge verification will appear here.</p>
             </div>
          )}

        </main>
      </div>
    </div>
  );
};
