import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Users, 
  FileText, 
  MessageSquare, 
  Settings,
  Plus,
  Award,
  BarChart3,
  Megaphone,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const participantLinks = [
  { to: '/dashboard', icon: Home, label: 'Home' },
  { to: '/dashboard/events', icon: Calendar, label: 'Events' },
  { to: '/dashboard/teams', icon: Users, label: 'Teams' },
  { to: '/dashboard/submissions', icon: FileText, label: 'Submissions' },
  { to: '/dashboard/qa', icon: MessageSquare, label: 'Q&A' },
  { to: '/dashboard/profile', icon: Settings, label: 'Profile' },
];

const organizerLinks = [
  { to: '/dashboard', icon: Home, label: 'Home' },
  { to: '/dashboard/create-event', icon: Plus, label: 'Create Event' },
  { to: '/dashboard/manage-events', icon: Calendar, label: 'Manage Events' },
  { to: '/dashboard/participants', icon: Users, label: 'Participants' },
  { to: '/dashboard/judges', icon: UserCheck, label: 'Judges' },
  { to: '/dashboard/announcements', icon: Megaphone, label: 'Announcements' },
  { to: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/dashboard/profile', icon: Settings, label: 'Profile' },
];

const judgeLinks = [
  { to: '/dashboard', icon: Home, label: 'Home' },
  { to: '/dashboard/events', icon: Calendar, label: 'Events' },
  { to: '/dashboard/reviews', icon: Award, label: 'Reviews' },
  { to: '/dashboard/feedback', icon: FileText, label: 'Feedback' },
  { to: '/dashboard/profile', icon: Settings, label: 'Profile' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) return null;

  const getLinks = () => {
    switch (user.role) {
      case 'organizer':
        return organizerLinks;
      case 'judge':
        return judgeLinks;
      default:
        return participantLinks;
    }
  };

  const links = getLinks();

  return (
    <div className="w-64 bg-black/80 backdrop-blur-md border-r border-neon-purple/20 h-screen sticky top-16 overflow-y-auto scrollbar-neon">
      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-lg font-orbitron font-bold text-neon-purple capitalize">
            {user.role} Dashboard
          </h3>
          <p className="text-sm text-gray-400 mt-1">Welcome back, {user.name}</p>
        </div>

        <nav className="space-y-2">
          {links.map(({ to, icon: Icon, label }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                  isActive
                    ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/50'
                    : 'text-gray-300 hover:text-neon-purple hover:bg-gray-900/50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-neon-purple' : 'group-hover:text-neon-purple'}`} />
                <span className="font-medium">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};