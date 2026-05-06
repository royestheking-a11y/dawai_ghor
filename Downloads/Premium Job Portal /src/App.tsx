
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router';
import { AuthProvider, useAuth } from './lib/auth';
import { LanguageProvider } from './lib/language';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { RecruiterDashboard } from './pages/RecruiterDashboard';
import { RecruiterSettings } from './pages/RecruiterSettings';
import { RecruiterSearch } from './pages/RecruiterSearch';
import { RecruiterJobs } from './pages/RecruiterJobs';
import { RecruiterApplicants } from './pages/RecruiterApplicants';
import { RecruiterCandidates } from './pages/RecruiterCandidates';
import { RecruiterBilling } from './pages/RecruiterBilling';
import { CandidateDashboard } from './pages/CandidateDashboard';
import { Jobs } from './pages/Jobs';
import { Gigs } from './pages/Gigs';
import { HowItWorks } from './pages/HowItWorks';
import { Blog } from './pages/Blog';
import { CVBuilder } from './pages/CVBuilder';
import { SkillTests } from './pages/SkillTests';
import { TalentSearch } from './pages/TalentSearch';
import { GetVerified } from './pages/GetVerified';
import { InterviewTips } from './pages/InterviewTips';
import { ResumeTips } from './pages/ResumeTips';
import { CoverLetter } from './pages/CoverLetter';
import { Articles } from './pages/Articles';
import { Education } from './pages/Education';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminJobs } from './pages/AdminJobs';
import { AdminRecruiters } from './pages/AdminRecruiters';
import { AdminCandidates } from './pages/AdminCandidates';
import { AdminReports } from './pages/AdminReports';
import { AdminPayments } from './pages/AdminPayments';
import { AdminTests } from './pages/AdminTests';
import { AdminContent } from './pages/AdminContent';
import { AdminSettings } from './pages/AdminSettings';
import { SalaryInsights } from './pages/SalaryInsights';
import { CompanyProfile } from './pages/CompanyProfile';
import { Messages } from './pages/Messages';
import { Notifications } from './pages/Notifications';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { Companies } from './pages/Companies';
import { Pricing } from './pages/Pricing';
import { MobileApp } from './pages/MobileApp';
import { MobileMorePage } from './components/MobileMorePage';
import { MobileGenericPage } from './components/MobileGenericPage';
import { MyHiring } from './pages/MyHiring';
import { PostJob } from './pages/PostJob';

import { More } from './pages/More';
import { Interviews } from './pages/Interviews';
import { CandidateSettings } from './pages/CandidateSettings';
import { VideoCV } from './pages/VideoCV';
import { CustomizedCV } from './pages/CustomizedCV';
import { EmailCV } from './pages/EmailCV';
import { ProfileViewed } from './pages/ProfileViewed';
import { EmployerInterested } from './pages/EmployerInterested';
import { PersonalityTest } from './pages/PersonalityTest';
import { AppliedJobs } from './pages/AppliedJobs';
import { FontLoader } from './components/FontLoader';

import { MobileBottomNav } from './components/MobileBottomNav';

import { Home } from './pages/Home';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-emerald-600">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to their appropriate dashboard if they try to access unauthorized role route
    return <Navigate to={user.role === 'recruiter' ? '/recruiter/dashboard' : '/me/dashboard'} replace />;
  }

  return children;
};

// Home Redirect Component (Public Root)
const HomeRedirect = () => {
  const { user, isLoading } = useAuth();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-emerald-600">Loading...</div>;
  }

  // Only redirect logged-in users if they are on mobile
  if (user && isMobile) {
    if (user.role === 'recruiter') return <Navigate to="/recruiter/dashboard" replace />;
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/me/dashboard" replace />;
  }

  return <Home />;
};

import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <FontLoader />
      <LanguageProvider>
        <AuthProvider>
          <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-white pb-16 md:pb-0">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route
                  path="/"
                  element={<HomeRedirect />}
                />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/gigs" element={<Gigs />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/salary-insights" element={<SalaryInsights />} />
                <Route path="/companies/:id" element={<CompanyProfile />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog/interview" element={<InterviewTips />} />
                <Route path="/blog/resume" element={<ResumeTips />} />
                <Route path="/cover-letter" element={<CoverLetter />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/education" element={<Education />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/mobile-app" element={<MobileApp />} />

                {/* Mobile "More" Menu Routes */}
                <Route path="/more" element={<MobileMorePage />} />

                {/* Generic Sections */}
                <Route path="/invitations/:page" element={<MobileGenericPage />} />
                <Route path="/jobs/:type" element={<MobileGenericPage />} />
                <Route path="/guide/:topic" element={<MobileGenericPage />} />
                <Route path="/education/:topic" element={<MobileGenericPage />} />
                <Route path="/services/:type" element={<MobileGenericPage />} />
                <Route path="/my-hiring/help" element={<MobileGenericPage title="Hiring Help" />} />
                <Route path="/transactions" element={<MobileGenericPage title="Transactions" />} />
                <Route path="/feedback" element={<MobileGenericPage title="Feedback" />} />
                <Route path="/me/followed-employers" element={<MobileGenericPage title="Followed Employers" />} />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Tools */}
                <Route
                  path="/messages"
                  element={
                    <ProtectedRoute>
                      <Messages />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notifications"
                  element={
                    <ProtectedRoute>
                      <Notifications />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cv-builder"
                  element={
                    <ProtectedRoute>
                      <CVBuilder />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/skills"
                  element={
                    <ProtectedRoute allowedRoles={['candidate', 'admin']}>
                      <SkillTests />
                    </ProtectedRoute>
                  }
                />

                <Route path="/talent-search" element={<TalentSearch />} />
                <Route path="/get-verified" element={<GetVerified />} />

                <Route
                  path="/more"
                  element={
                    <ProtectedRoute allowedRoles={['candidate', 'recruiter', 'admin']}>
                      <More />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/jobs" element={<ProtectedRoute allowedRoles={['admin']}><AdminJobs /></ProtectedRoute>} />
                <Route path="/admin/recruiters" element={<ProtectedRoute allowedRoles={['admin']}><AdminRecruiters /></ProtectedRoute>} />
                <Route path="/admin/candidates" element={<ProtectedRoute allowedRoles={['admin']}><AdminCandidates /></ProtectedRoute>} />
                <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><AdminReports /></ProtectedRoute>} />
                <Route path="/admin/payments" element={<ProtectedRoute allowedRoles={['admin']}><AdminPayments /></ProtectedRoute>} />
                <Route path="/admin/tests" element={<ProtectedRoute allowedRoles={['admin']}><AdminTests /></ProtectedRoute>} />
                <Route path="/admin/content" element={<ProtectedRoute allowedRoles={['admin']}><AdminContent /></ProtectedRoute>} />
                <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />

                {/* Recruiter Routes */}
                <Route path="/recruiter/dashboard" element={<ProtectedRoute allowedRoles={['recruiter', 'admin']}><RecruiterDashboard /></ProtectedRoute>} />
                <Route path="/recruiter/post-job" element={<ProtectedRoute allowedRoles={['recruiter', 'admin']}><PostJob /></ProtectedRoute>} />
                <Route path="/recruiter/jobs" element={<ProtectedRoute allowedRoles={['recruiter', 'admin']}><RecruiterJobs /></ProtectedRoute>} />
                <Route path="/recruiter/jobs/:id/applicants" element={<ProtectedRoute allowedRoles={['recruiter', 'admin']}><RecruiterApplicants /></ProtectedRoute>} />
                <Route path="/recruiter/candidates" element={<ProtectedRoute allowedRoles={['recruiter', 'admin']}><RecruiterCandidates /></ProtectedRoute>} />
                <Route path="/recruiter/billing" element={<ProtectedRoute allowedRoles={['recruiter', 'admin']}><RecruiterBilling /></ProtectedRoute>} />
                <Route path="/recruiter/settings" element={<ProtectedRoute allowedRoles={['recruiter', 'admin']}><RecruiterSettings /></ProtectedRoute>} />
                <Route path="/recruiter/search" element={<ProtectedRoute allowedRoles={['recruiter', 'admin']}><RecruiterSearch /></ProtectedRoute>} />
                <Route path="/recruiter/company" element={<ProtectedRoute allowedRoles={['recruiter', 'admin']}><RecruiterSettings /></ProtectedRoute>} /> {/* Reusing Settings for now or CompanyProfile if adaptable */}

                {/* Candidate Routes */}
                <Route path="/me/dashboard" element={<ProtectedRoute allowedRoles={['candidate', 'admin']}><CandidateDashboard /></ProtectedRoute>} />
                <Route path="/me/profile" element={<ProtectedRoute allowedRoles={['candidate', 'admin']}><CandidateDashboard /></ProtectedRoute>} />
                <Route path="/me/applications" element={<ProtectedRoute allowedRoles={['candidate', 'admin']}><CandidateDashboard /></ProtectedRoute>} />
                <Route path="/me/interviews" element={<ProtectedRoute allowedRoles={['candidate', 'admin']}><Interviews /></ProtectedRoute>} />
                <Route path="/me/settings" element={<ProtectedRoute allowedRoles={['candidate', 'admin']}><CandidateSettings /></ProtectedRoute>} />
                <Route path="/me/alerts" element={<ProtectedRoute allowedRoles={['candidate', 'admin']}><CandidateDashboard /></ProtectedRoute>} />
                <Route path="/me/video-cv" element={<ProtectedRoute allowedRoles={['candidate', 'admin']}><VideoCV /></ProtectedRoute>} />
                <Route path="/me/customized-cv" element={<ProtectedRoute allowedRoles={['candidate', 'admin']}><CustomizedCV /></ProtectedRoute>} />
                <Route path="/me/email-cv" element={<ProtectedRoute allowedRoles={['candidate', 'admin']}><EmailCV /></ProtectedRoute>} />
                <Route path="/me/profile-viewed" element={<ProtectedRoute allowedRoles={['candidate', 'admin']}><ProfileViewed /></ProtectedRoute>} />
                <Route path="/me/employer-interested" element={<ProtectedRoute allowedRoles={['candidate', 'admin']}><EmployerInterested /></ProtectedRoute>} />
                <Route path="/me/preferences" element={<ProtectedRoute allowedRoles={['candidate', 'admin']}><CandidateSettings /></ProtectedRoute>} />
                <Route path="/me/applied-jobs" element={<ProtectedRoute allowedRoles={['candidate', 'admin']}><AppliedJobs /></ProtectedRoute>} />
                <Route path="/invitations/personality-test" element={<ProtectedRoute allowedRoles={['candidate', 'admin']}><PersonalityTest /></ProtectedRoute>} />
                <Route path="/invitations/online-test" element={<ProtectedRoute allowedRoles={['candidate', 'admin']}><SkillTests /></ProtectedRoute>} />
                <Route path="/invitations/video-interview" element={<ProtectedRoute allowedRoles={['candidate', 'admin']}><Interviews /></ProtectedRoute>} />
                <Route path="/invitations/general-interview" element={<ProtectedRoute allowedRoles={['candidate', 'admin']}><Interviews /></ProtectedRoute>} />

                <Route path="/my-hiring" element={<MyHiring />} />
                <Route path="/my-hiring/post" element={<PostJob />} />

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <div className="hidden md:block">
              <Footer />
            </div>
            <MobileBottomNav />
          </div>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}
