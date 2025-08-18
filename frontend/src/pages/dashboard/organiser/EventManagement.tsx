import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  HelpCircle, 
  Settings, 
  UserCheck, 
  BarChart3,
  Calendar,
  Trophy,
  Edit,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  Download
} from 'lucide-react';

const tabs = [
  { id: 'overview', name: 'Overview', icon: Calendar },
  { id: 'participants', name: 'Teams/Participants', icon: Users },
  { id: 'submissions', name: 'Submissions', icon: FileText },
  { id: 'announcements', name: 'Announcements', icon: MessageSquare },
  { id: 'qa', name: 'Q&A', icon: HelpCircle },
  { id: 'judges', name: 'Judges', icon: UserCheck },
  { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  { id: 'settings', name: 'Settings', icon: Settings },
];

const mockParticipants = [
  { id: '1', name: 'John Doe', email: 'john@example.com', team: 'Team Alpha', status: 'Approved' },
  { id: '2', name: 'Sarah Chen', email: 'sarah@example.com', team: 'Code Warriors', status: 'Pending' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', team: 'Tech Titans', status: 'Approved' },
];

const mockSubmissions = [
  { id: '1', team: 'Team Alpha', round: '1', title: 'AI-Powered Healthcare App', date: '2024-02-15', files: ['app.zip', 'demo.mp4'] },
  { id: '2', team: 'Code Warriors', round: '1', title: 'Blockchain Voting System', date: '2024-02-14', files: ['source.zip'] },
];

const mockAnnouncements = [
  { id: '1', title: 'Welcome to HackTech 2024!', message: 'Get ready for an amazing hackathon experience...', timestamp: '2024-02-10 10:00' },
  { id: '2', title: 'Submission Guidelines Updated', message: 'Please check the new guidelines for Round 1...', timestamp: '2024-02-12 14:30' },
];

export const EventManagement: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const eventData = {
    name: 'HackTech 2024',
    theme: 'AI & Machine Learning',
    type: 'Hybrid',
    startDate: '2024-02-15',
    endDate: '2024-02-17',
    registrations: 145,
    submissions: 67,
    status: 'Active'
  };

  const renderOverview = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="gradient-bg rounded-lg h-32 flex items-center justify-center border border-neonPurple/30">
        <h2 className="text-2xl font-orbitron text-neonPurple text-shadow-neon">
          {eventData.name}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="neon-card border-neonBlue p-6 text-center">
          <Users size={32} className="mx-auto mb-2 text-neonBlue" />
          <p className="text-2xl font-bold text-white">{eventData.registrations}</p>
          <p className="text-secondaryText">Registrations</p>
        </div>
        <div className="neon-card border-neonBlue p-6 text-center">
          <FileText size={32} className="mx-auto mb-2 text-neonPurple" />
          <p className="text-2xl font-bold text-white">{eventData.submissions}</p>
          <p className="text-secondaryText">Submissions</p>
        </div>
        <div className="neon-card border-neonBlue p-6 text-center">
          <Trophy size={32} className="mx-auto mb-2 text-neonPink" />
          <p className="text-2xl font-bold text-white">{eventData.status}</p>
          <p className="text-secondaryText">Status</p>
        </div>
      </div>

      <div className="neon-card border-neonBlue p-6">
        <h3 className="text-lg font-orbitron text-neonPurple mb-4">Event Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-secondaryText">Theme</p>
            <p className="text-white font-medium">{eventData.theme}</p>
          </div>
          <div>
            <p className="text-secondaryText">Type</p>
            <p className="text-white font-medium">{eventData.type}</p>
          </div>
          <div>
            <p className="text-secondaryText">Start Date</p>
            <p className="text-white font-medium">{eventData.startDate}</p>
          </div>
          <div>
            <p className="text-secondaryText">End Date</p>
            <p className="text-white font-medium">{eventData.endDate}</p>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('settings')}
          className="mt-4 neon-button-outline flex items-center space-x-2"
        >
          <Edit size={16} />
          <span>Edit Event</span>
        </button>
      </div>
    </motion.div>
  );

  const renderParticipants = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondaryText" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="neon-input pl-10"
              placeholder="Search participants/teams"
            />
          </div>
          <button className="neon-button-outline flex items-center space-x-2">
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="neon-card border-neonBlue overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-neonBlue/30">
              <tr>
                <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Name</th>
                <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Email</th>
                <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Team</th>
                <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Status</th>
                <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockParticipants.map((participant, index) => (
                <motion.tr
                  key={participant.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-neonBlue/10 hover:bg-neonPurple/5 transition-colors"
                >
                  <td className="py-3 px-4 text-white">{participant.name}</td>
                  <td className="py-3 px-4 text-secondaryText">{participant.email}</td>
                  <td className="py-3 px-4 text-secondaryText">{participant.team}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      participant.status === 'Approved' 
                        ? 'bg-neonPurple/20 text-neonPurple border border-neonPurple/50'
                        : 'bg-neonBlue/20 text-neonBlue border border-neonBlue/50'
                    }`}>
                      {participant.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="neon-button-outline text-xs px-2 py-1">
                        {participant.status === 'Approved' ? 'Ban' : 'Approve'}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );

  const renderSubmissions = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="neon-card border-neonBlue overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-neonBlue/30">
              <tr>
                <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Team</th>
                <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Round</th>
                <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Title</th>
                <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Date</th>
                <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Files</th>
                <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockSubmissions.map((submission, index) => (
                <motion.tr
                  key={submission.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-neonBlue/10 hover:bg-neonPurple/5 transition-colors"
                >
                  <td className="py-3 px-4 text-white">{submission.team}</td>
                  <td className="py-3 px-4 text-secondaryText">Round {submission.round}</td>
                  <td className="py-3 px-4 text-secondaryText">{submission.title}</td>
                  <td className="py-3 px-4 text-secondaryText">{submission.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {submission.files.map((file, fileIndex) => (
                        <button
                          key={fileIndex}
                          className="text-xs bg-neonBlue/20 text-neonBlue px-2 py-1 rounded border border-neonBlue/50 hover:bg-neonBlue/30 transition-colors"
                        >
                          {file}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="neon-button-outline text-xs px-2 py-1 flex items-center space-x-1">
                        <Eye size={12} />
                        <span>View</span>
                      </button>
                      <button className="neon-button-outline text-xs px-2 py-1 flex items-center space-x-1">
                        <Download size={12} />
                        <span>Download</span>
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );

  const renderAnnouncements = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="neon-card border-neonBlue p-6">
        <h3 className="text-lg font-orbitron text-neonPurple mb-4">Post New Announcement</h3>
        <div className="space-y-4">
          <input
            type="text"
            className="neon-input w-full"
            placeholder="Announcement title"
          />
          <textarea
            rows={4}
            className="neon-input w-full"
            placeholder="Announcement message"
          />
          <button className="neon-button">Post Announcement</button>
        </div>
      </div>

      <div className="neon-card border-neonBlue p-6">
        <h3 className="text-lg font-orbitron text-neonPurple mb-4">Recent Announcements</h3>
        <div className="space-y-4">
          {mockAnnouncements.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-l-4 border-l-neonPink pl-4 py-2 bg-darkBg/30 rounded-r"
            >
              <h4 className="font-orbitron text-neonPurple">{announcement.title}</h4>
              <p className="text-secondaryText text-sm mt-1">{announcement.message}</p>
              <p className="text-gray-500 text-xs mt-2">{announcement.timestamp}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'participants': return renderParticipants();
      case 'submissions': return renderSubmissions();
      case 'announcements': return renderAnnouncements();
      case 'qa': return <div className="text-center py-12 text-secondaryText">Q&A section coming soon...</div>;
      case 'judges': return <div className="text-center py-12 text-secondaryText">Judges section coming soon...</div>;
      case 'analytics': return <div className="text-center py-12 text-secondaryText">Analytics section coming soon...</div>;
      case 'settings': return <div className="text-center py-12 text-secondaryText">Settings section coming soon...</div>;
      default: return renderOverview();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-orbitron font-bold text-neonPurple text-shadow-neon mb-8 text-center lg:text-left">
          {eventData.name}
        </h1>

        {/* Tabs */}
        <div className="border-b border-neonPurple/20 mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? 'border-neonBlue text-neonPurple'
                      : 'border-transparent text-secondaryText hover:text-neonPurple'
                  }`}
                >
                  <tab.icon size={16} />
                  <span className="font-orbitron text-sm">{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        {renderContent()}
      </motion.div>
    </div>
  );
};

export default EventManagement;