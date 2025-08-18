import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, FileText, Mail, ExternalLink, TrendingUp } from 'lucide-react';
import { useNotifications } from '../../../contexts/NotificationContext';

interface Event {
  id: string;
  name: string;
  date: string;
  mode: 'online' | 'offline' | 'hybrid';
  submissions: number;
}

interface Submission {
  id: string;
  event: string;
  team: string;
  title: string;
  round: string;
  status: 'pending' | 'reviewed';
}

const JudgeDashboard: React.FC = () => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const { addNotification } = useNotifications();

  const assignedEvents: Event[] = [
    {
      id: '1',
      name: 'Tech Innovation Hackathon 2024',
      date: '2024-12-15',
      mode: 'online',
      submissions: 25
    },
    {
      id: '2', 
      name: 'AI for Good Challenge',
      date: '2024-12-20',
      mode: 'hybrid',
      submissions: 18
    },
    {
      id: '3',
      name: 'Fintech Revolution',
      date: '2024-12-25',
      mode: 'offline',
      submissions: 12
    }
  ];

  const reviewQueue: Submission[] = [
    {
      id: '1',
      event: 'Tech Innovation Hackathon 2024',
      team: 'Team Alpha',
      title: 'Smart City Management Platform',
      round: 'Final',
      status: 'pending'
    },
    {
      id: '2',
      event: 'AI for Good Challenge',
      team: 'Code Warriors',
      title: 'AI-Powered Healthcare Assistant',
      round: 'Semi-Final',
      status: 'pending'
    },
    {
      id: '3',
      event: 'Tech Innovation Hackathon 2024',
      team: 'Innovation Hub',
      title: 'Blockchain Voting System',
      round: 'Final',
      status: 'reviewed'
    }
  ];

  const totalSubmissions = 55;
  const reviewedSubmissions = 38;
  const progressPercentage = Math.round((reviewedSubmissions / totalSubmissions) * 100);

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'online': return 'bg-neonPurple/20 text-neonPurple';
      case 'offline': return 'bg-neonBlue/20 text-neonBlue';
      case 'hybrid': return 'bg-neonPink/20 text-neonPink';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'pending' ? 'bg-neonOrange/20 text-neonOrange' : 'bg-green-500/20 text-green-400';
  };

  const handleSendEmail = () => {
    // Simulate API call
    setTimeout(() => {
      addNotification({
        title: 'Message Sent',
        message: 'Your message has been sent to the organizer',
        type: 'success'
      });
      setShowEmailModal(false);
      setEmailSubject('');
      setEmailMessage('');
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="font-orbitron text-3xl md:text-4xl text-neonPurple text-shadow-neon mb-2">
          Judge Dashboard
        </h1>
        <p className="text-secondaryText">
          Welcome back, Sarah! You have {reviewQueue.filter(s => s.status === 'pending').length} pending reviews.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Assigned Events */}
        <div className="lg:col-span-2">
          <motion.div 
            className="neon-card-green mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-orbitron text-xl text-neonPurple flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Assigned Events
              </h2>
            </div>

            <div className="space-y-4">
              {assignedEvents.length > 0 ? (
                assignedEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    className="bg-gray-900/30 p-4 rounded-lg border border-neonPurple/30 hover:border-neonGreen/50 transition-all duration-300 hover:shadow-neon-green"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-orbitron text-lg text-neonPurple mb-2">
                          {event.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-secondaryText">
                            <Calendar className="w-4 h-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1 text-secondaryText">
                            <FileText className="w-4 h-4" />
                            {event.submissions} submissions
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getModeColor(event.mode)}`}>
                            {event.mode}
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`/events/${event.id}`}
                        className="neon-button flex items-center gap-2 whitespace-nowrap"
                      >
                        View Event
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-secondaryText mb-4">No events assigned</p>
                  <button 
                    onClick={() => setShowEmailModal(true)}
                    className="neon-button-outline flex items-center gap-2 mx-auto"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Organizer
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Review Queue */}
          <motion.div 
            className="neon-card-green"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-orbitron text-xl text-neonPurple flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Review Queue
              </h2>
              <Link
                to="/dashboard/judge/project-review"
                className="neon-button-outline"
              >
                View All Reviews
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neonPurple/30">
                    <th className="text-left py-3 font-orbitron text-sm text-neonPurple">Event</th>
                    <th className="text-left py-3 font-orbitron text-sm text-neonPurple">Team</th>
                    <th className="text-left py-3 font-orbitron text-sm text-neonPurple">Title</th>
                    <th className="text-left py-3 font-orbitron text-sm text-neonPurple">Status</th>
                    <th className="text-center py-3 font-orbitron text-sm text-neonPurple">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewQueue.map((submission) => (
                    <motion.tr
                      key={submission.id}
                      className="border-b border-neonPurple/20 hover:bg-neonPurple/5 transition-colors"
                      whileHover={{ backgroundColor: 'rgba(255, 149, 0, 0.05)' }}
                    >
                      <td className="py-4 text-sm text-secondaryText">{submission.event}</td>
                      <td className="py-4 text-sm text-white">{submission.team}</td>
                      <td className="py-4 text-sm text-white">{submission.title}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <Link
                          to={`/dashboard/judge/project-review?submissionId=${submission.id}`}
                          className="text-neonPurple hover:text-neonOrange text-sm font-medium transition-colors"
                        >
                          Review
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {reviewQueue.length === 0 && (
              <div className="text-center py-8">
                <p className="text-secondaryText mb-4">No submissions to review</p>
                <Link
                  to="/dashboard/judge"
                  className="neon-button-outline"
                >
                  Back to Dashboard
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        {/* Progress Sidebar */}
        <div className="lg:col-span-1">
          <motion.div 
            className="neon-card-green"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="font-orbitron text-xl text-neonPurple flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6" />
              Review Progress
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-secondaryText">Overall Progress</span>
                  <span className="text-sm font-medium text-neonPurple">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <motion.div
                    className="bg-neonPurple h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <p className="text-xs text-secondaryText mt-2">
                  {reviewedSubmissions} of {totalSubmissions} projects reviewed
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-900/30 rounded-lg">
                  <div className="text-2xl font-bold text-neonPurple mb-1">{totalSubmissions}</div>
                  <div className="text-xs text-secondaryText">Total Projects</div>
                </div>
                <div className="text-center p-4 bg-gray-900/30 rounded-lg">
                  <div className="text-2xl font-bold text-green-400 mb-1">{reviewedSubmissions}</div>
                  <div className="text-xs text-secondaryText">Reviewed</div>
                </div>
              </div>

              <div className="text-center p-4 bg-neonPurple/10 rounded-lg border border-neonPurple/30">
                <div className="text-lg font-bold text-neonOrange mb-1">
                  {totalSubmissions - reviewedSubmissions}
                </div>
                <div className="text-xs text-secondaryText">Pending Reviews</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowEmailModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="neon-card-orange max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-orbitron text-lg text-neonPurple">Contact Organizer</h3>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-neonPurple hover:text-neonOrange"
              >
                <ExternalLink className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-secondaryText mb-2">Subject</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Enter subject"
                  className="neon-input w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-secondaryText mb-2">Message</label>
                <textarea
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  placeholder="Enter your message..."
                  rows={4}
                  className="neon-input w-full resize-none"
                />
              </div>

              <button
                onClick={handleSendEmail}
                disabled={!emailSubject.trim() || !emailMessage.trim()}
                className="neon-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Message
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default JudgeDashboard;