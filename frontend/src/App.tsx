import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Landing } from './pages/Landing';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

// Participant pages
import ParticipantDashboard from './pages/dashboard/participant/Dashboard/Dashboard';
import ParticipantEvents from './pages/dashboard/participant/Events/Events';
import ParticipantTeams from './pages/dashboard/participant/Teams/Teams';
import ParticipantSubmissions from './pages/dashboard/participant/Submissions/Submissions';
import ParticipantAnnouncements from './pages/dashboard/participant/Announcements/Announcements';
import ParticipantProfile from './pages/dashboard/participant/Profile/Profile';

// Organizer and Judge dashboards
import OrganizerDashboard from './pages/dashboard/organiser/OrganizerDashboard';
import CreateEvent from './pages/dashboard/organiser/CreateEvent';
import EventManagement from './pages/dashboard/organiser/EventManagement';
import OrganizerAnnouncements from './pages/dashboard/organiser/AnnouncementsQA';
import OrganizerProfile from './pages/dashboard/organiser/ProfileSettings';

import JudgeDashboard from './pages/dashboard/judge/JudgeDashboard';
import ProjectReview from './pages/dashboard/judge/ProjectReview';
import JudgeAnnouncements from './pages/dashboard/judge/AnnouncementsQA';
import JudgeProfile from './pages/dashboard/judge/Profile';

const ProtectedRoute: React.FC<{ children: React.ReactNode; requireRole?: string }> = ({ children, requireRole }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-neon-purple/30 border-t-neon-purple rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neon-purple">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireRole && user.role !== requireRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const RoleBasedRedirect: React.FC = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'organizer') return <Navigate to="/dashboard/organizer" replace />;
  if (user.role === 'judge') return <Navigate to="/dashboard/judge" replace />;
  return <Navigate to="/dashboard/participant" replace />;
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      {user ? (
        <div className="flex">
          <Sidebar />
          <main className="flex-1 min-h-[calc(100vh-4rem)] p-6">
            {children}
          </main>
        </div>
      ) : (
        <main>{children}</main>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <AppLayout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/events" element={<div>Events Page (TBD)</div>} />
              <Route path="/leaderboard" element={<div>Leaderboard Page (TBD)</div>} />
              <Route path="/about" element={<div>About Page (TBD)</div>} />

              {/* Dashboard root redirects based on role */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <RoleBasedRedirect />
                  </ProtectedRoute>
                }
              />

              {/* Participant Routes */}
              <Route
                path="/dashboard/participant"
                element={
                  <ProtectedRoute>
                    <ParticipantDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/participant/events"
                element={
                  <ProtectedRoute>
                    <ParticipantEvents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/participant/teams"
                element={
                  <ProtectedRoute>
                    <ParticipantTeams />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/participant/submissions"
                element={
                  <ProtectedRoute>
                    <ParticipantSubmissions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/participant/announcements"
                element={
                  <ProtectedRoute>
                    <ParticipantAnnouncements />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/participant/profile"
                element={
                  <ProtectedRoute>
                    <ParticipantProfile />
                  </ProtectedRoute>
                }
              />

              {/* Organizer & Judge base dashboards (keep roles present) */}
              <Route
                path="/dashboard/organizer"
                element={
                  <ProtectedRoute requireRole="organizer">
                    <OrganizerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/organizer/create-event"
                element={
                  <ProtectedRoute requireRole="organizer">
                    <CreateEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/organizer/manage-events"
                element={
                  <ProtectedRoute requireRole="organizer">
                    <EventManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/organizer/announcements"
                element={
                  <ProtectedRoute requireRole="organizer">
                    <OrganizerAnnouncements />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/organizer/profile"
                element={
                  <ProtectedRoute requireRole="organizer">
                    <OrganizerProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/judge"
                element={
                  <ProtectedRoute requireRole="judge">
                    <JudgeDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/judge/reviews"
                element={
                  <ProtectedRoute requireRole="judge">
                    <ProjectReview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/judge/announcements"
                element={
                  <ProtectedRoute requireRole="judge">
                    <JudgeAnnouncements />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/judge/profile"
                element={
                  <ProtectedRoute requireRole="judge">
                    <JudgeProfile />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppLayout>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;