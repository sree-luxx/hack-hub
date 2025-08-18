import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  Trophy, 
  Activity, 
  Plus, 
  Eye, 
  MessageSquare, 
  Table, 
  Grid3X3,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../../../contexts/NotificationContext';

interface Event {
  id: string;
  name: string;
  status: 'Active' | 'Upcoming' | 'Ended';
  date: string;
  registrations: number;
}

const mockEvents: Event[] = [
  { id: '1', name: 'HackTech 2024', status: 'Active', date: '2024-02-15', registrations: 145 },
  { id: '2', name: 'AI Innovation Challenge', status: 'Upcoming', date: '2024-03-10', registrations: 89 },
  { id: '3', name: 'Web3 Hackathon', status: 'Ended', date: '2024-01-20', registrations: 203 },
];

const recentActivities = [
  { action: 'Event "HackTech 2024" published', timestamp: '2 hours ago', isNew: true },
  { action: 'Participant "Sarah Chen" registered', timestamp: '3 hours ago', isNew: false },
  { action: 'Team "CodeMasters" submitted Round 1', timestamp: '5 hours ago', isNew: false },
  { action: 'Judge feedback received for Team Alpha', timestamp: '1 day ago', isNew: false },
];

const OrganizerDashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
  const { addNotification } = useNotifications();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-neonPurple/20 text-neonPurple border border-neonPurple/50';
      case 'Upcoming':
        return 'bg-neonBlue/20 text-neonBlue border border-neonBlue/50';
      case 'Ended':
        return 'bg-neonPink/20 text-neonPink border border-neonPink/50';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle size={16} className="text-neonPurple" />;
      case 'Upcoming':
        return <Clock size={16} className="text-neonBlue" />;
      case 'Ended':
        return <XCircle size={16} className="text-neonPink" />;
      default:
        return null;
    }
  };

  const handleTestNotification = () => {
    addNotification({
      title: 'Test Notification',
      message: 'This is a test notification from the dashboard!'
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-orbitron font-bold text-neonPurple text-shadow-neon mb-8 text-center lg:text-left">
          Organizer Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Event Overview */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="neon-card-green p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-orbitron text-neonPurple">Event Overview</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'table'
                        ? 'bg-neonPurple/20 text-neonPurple shadow-neon'
                        : 'text-secondaryText hover:text-neonPurple'
                    }`}
                  >
                    <Table size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'cards'
                        ? 'bg-neonPurple/20 text-neonPurple shadow-neon'
                        : 'text-secondaryText hover:text-neonPurple'
                    }`}
                  >
                    <Grid3X3 size={18} />
                  </button>
                </div>
              </div>

              {mockEvents.length > 0 ? (
                <>
                  {viewMode === 'cards' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockEvents.map((event, index) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className="bg-darkBg/50 border border-neonPurple/30 rounded-lg p-4 hover:shadow-neon-green hover:scale-105 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-orbitron text-lg text-neonPurple">{event.name}</h3>
                            {getStatusIcon(event.status)}
                          </div>
                          <div className="space-y-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(event.status)}`}>
                              {event.status}
                            </span>
                            <div className="flex items-center text-secondaryText text-sm">
                              <Calendar size={16} className="mr-2" />
                              {event.date}
                            </div>
                            <div className="flex items-center text-secondaryText text-sm">
                              <Users size={16} className="mr-2" />
                              {event.registrations} registrations
                            </div>
                          </div>
                          <Link
                            to={`/events/${event.id}`}
                            className="mt-4 inline-flex items-center px-4 py-2 neon-button-outline text-sm"
                          >
                            Manage
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-neonPurple/30">
                            <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Event Name</th>
                            <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Status</th>
                            <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Date</th>
                            <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Registrations</th>
                            <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockEvents.map((event, index) => (
                            <motion.tr
                              key={event.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1, duration: 0.5 }}
                              className="border-b border-neonPurple/10 hover:bg-neonPurple/5 transition-colors"
                            >
                              <td className="py-3 px-4 text-white">{event.name}</td>
                              <td className="py-3 px-4">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(event.status)}`}>
                                  {event.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-secondaryText">{event.date}</td>
                              <td className="py-3 px-4 text-secondaryText">{event.registrations}</td>
                              <td className="py-3 px-4">
                                <Link
                                  to={`/events/${event.id}`}
                                  className="inline-flex items-center px-3 py-1 neon-button-outline text-sm"
                                >
                                  Manage
                                </Link>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <Trophy size={64} className="mx-auto mb-4 text-secondaryText opacity-50" />
                  <p className="text-secondaryText mb-4">No events created yet</p>
                  <Link
                    to="/dashboard/organizer/create-event"
                    className="neon-button inline-flex items-center space-x-2"
                  >
                    <Plus size={18} />
                    <span>Create Event</span>
                  </Link>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="neon-card-green p-6"
            >
              <h2 className="text-xl font-orbitron text-neonPurple mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/dashboard/organizer/create-event"
                  className="w-full neon-button-green flex items-center justify-center space-x-2"
                >
                  <Plus size={18} />
                  <span>Create New Event</span>
                </Link>
                <Link
                  to="/dashboard/organizer/participants"
                  className="w-full neon-button-outline flex items-center justify-center space-x-2"
                >
                  <Eye size={18} />
                  <span>View Participants</span>
                </Link>
                <Link
                  to="/dashboard/organizer/announcements"
                  className="w-full neon-button-outline flex items-center justify-center space-x-2"
                >
                  <MessageSquare size={18} />
                  <span>Post Announcement</span>
                </Link>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="neon-card-green p-6"
            >
              <h2 className="text-xl font-orbitron text-neonPurple mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0">
                      <Activity size={16} className="text-neonPurple mt-1" />
                      {activity.isNew && (
                        <div className="w-2 h-2 bg-neonPink rounded-full animate-pulse-neon mt-1 ml-2"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-secondaryText">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link
                to="/dashboard/organizer/announcements"
                className="mt-4 w-full neon-button-outline flex items-center justify-center"
              >
                View All
              </Link>
            </motion.div>

            {/* Test Notification Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="neon-card-green p-6"
            >
              <button
                onClick={handleTestNotification}
                className="w-full neon-button-outline flex items-center justify-center space-x-2"
              >
                <Activity size={18} />
                <span>Test Notification</span>
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrganizerDashboard;