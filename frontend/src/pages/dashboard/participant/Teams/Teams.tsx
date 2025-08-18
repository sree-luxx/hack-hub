import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Users, Mail, Copy, UserCheck, UserX } from 'lucide-react';
import { useNotifications } from '../../../../contexts/NotificationContext';

const Teams: React.FC = () => {
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState<'create' | 'join' | 'current'>('current');
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Mock data
  const currentTeam = {
    id: '1',
    name: 'Code Ninjas',
    event: 'AI Innovation Challenge 2025',
    code: 'CN2025X1',
    members: [
      { id: '1', name: 'Alex Chen', email: 'alex@example.com', role: 'Team Lead', status: 'accepted' },
      { id: '2', name: 'Sarah Kim', email: 'sarah@example.com', role: 'UI/UX Designer', status: 'accepted' },
      { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'Backend Developer', status: 'accepted' },
      { id: '4', name: 'Jessica Wong', email: 'jessica@example.com', role: 'Frontend Developer', status: 'pending' },
    ],
    maxSize: 6
  };

  const openTeams = [
    {
      id: '2',
      name: 'Tech Innovators',
      event: 'Blockchain Revolution Hackathon',
      members: 3,
      maxSize: 5,
      description: 'Looking for blockchain experts to join our team!'
    },
    {
      id: '3',
      name: 'Green Coders',
      event: 'Sustainable Tech Summit',
      members: 2,
      maxSize: 4,
      description: 'Passionate about sustainability? Join us!'
    },
  ];

  const events = [
    'AI Innovation Challenge 2025',
    'Blockchain Revolution Hackathon',
    'Sustainable Tech Summit',
  ];

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification({
      title: 'Team Created',
      message: 'Your team has been created successfully!',
      type: 'success'
    });
    setActiveTab('current');
  };

  const handleJoinTeam = (teamId: string) => {
    addNotification({
      title: 'Join Request Sent',
      message: 'Your request to join the team has been sent.',
      type: 'info'
    });
  };

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification({
      title: 'Invitation Sent',
      message: 'Team invitation has been sent successfully!',
      type: 'success'
    });
    setShowInviteModal(false);
  };

  const handleAcceptMember = (memberId: string) => {
    addNotification({
      title: 'Member Accepted',
      message: 'Team member has been accepted successfully!',
      type: 'success'
    });
  };

  const handleDeclineMember = (memberId: string) => {
    addNotification({
      title: 'Member Declined',
      message: 'Team invitation has been declined.',
      type: 'info'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-orbitron font-bold text-neonPurple text-shadow-neon mb-2">
          Team Management
        </h1>
        <p className="text-secondaryText font-montserrat">
          Create, join, or manage your hackathon teams.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-900/50 rounded-lg p-1">
        {[
          { id: 'current', label: 'Current Team' },
          { id: 'create', label: 'Create Team' },
          { id: 'join', label: 'Join Team' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 px-4 rounded-md font-montserrat transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-neonPurple text-white border-b-2 border-neonPurple'
                : 'text-secondaryText hover:text-neonPurple'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Current Team Tab */}
        {activeTab === 'current' && (
          <div className="neon-card-green p-6">
            {currentTeam ? (
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-orbitron font-semibold text-neonPurple mb-2">
                      {currentTeam.name}
                    </h2>
                    <p className="text-secondaryText mb-2">Event: {currentTeam.event}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-secondaryText">Team Code:</span>
                      <code className="bg-gray-900/50 px-2 py-1 rounded text-neonGreen font-mono">
                        {currentTeam.code}
                      </code>
                      <button
                        onClick={() => navigator.clipboard.writeText(currentTeam.code)}
                        className="p-1 text-neonPurple hover:text-neonGreen transition-colors"
                        title="Copy team code"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowInviteModal(true)}
                    className="neon-button-green flex items-center space-x-2"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Invite Member</span>
                  </button>
                </div>

                {/* Team Members */}
                <div>
                  <h3 className="text-lg font-orbitron text-neonPurple mb-4">
                    Team Members ({currentTeam.members.length}/{currentTeam.maxSize})
                  </h3>
                  <div className="space-y-3">
                    {currentTeam.members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-4 bg-gray-900/30 border border-neonGreen/30 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-neonPurple/20 border-2 border-neonGreen flex items-center justify-center">
                            <span className="text-neonGreen font-medium">
                              {member.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-white">{member.name}</p>
                            <p className="text-sm text-secondaryText">{member.email}</p>
                            <p className="text-xs text-neonBlue">{member.role}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {member.status === 'pending' ? (
                            <>
                              <button
                                onClick={() => handleAcceptMember(member.id)}
                                className="p-2 text-neonGreen hover:bg-neonGreen/20 rounded transition-colors"
                                title="Accept member"
                              >
                                <UserCheck className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeclineMember(member.id)}
                                className="p-2 text-neonPink hover:bg-neonPink/20 rounded transition-colors"
                                title="Decline member"
                              >
                                <UserX className="h-4 w-4" />
                              </button>
                            </>
                          ) : (
                            <span className="px-2 py-1 text-xs bg-neonGreen/20 text-neonGreen rounded-full">
                              {member.status === 'accepted' ? 'Active' : member.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full py-3 border border-neonPink/30 text-neonPink rounded-lg hover:bg-neonPink/10 transition-colors">
                  Leave Team
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-neonPurple mx-auto mb-4 opacity-50" />
                <p className="text-secondaryText mb-4">You're not part of any team yet</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setActiveTab('create')}
                    className="neon-button-green"
                  >
                    Create Team
                  </button>
                  <button
                    onClick={() => setActiveTab('join')}
                    className="neon-button px-6 py-2"
                  >
                    Join Team
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Create Team Tab */}
        {activeTab === 'create' && (
          <div className="neon-card-green p-6">
            <h2 className="text-2xl font-orbitron font-semibold text-neonPurple mb-6">
              Create New Team
            </h2>
            <form onSubmit={handleCreateTeam} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-secondaryText mb-2">
                  Team Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white"
                  placeholder="Enter team name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondaryText mb-2">
                  Team Size
                </label>
                <select className="w-full px-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white">
                  <option value="2">2 members</option>
                  <option value="3">3 members</option>
                  <option value="4">4 members</option>
                  <option value="5">5 members</option>
                  <option value="6">6 members</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondaryText mb-2">
                  Event
                </label>
                <select className="w-full px-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white">
                  <option value="">Select an event</option>
                  {events.map(event => (
                    <option key={event} value={event}>{event}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="neon-button-green w-full py-3">
                Create Team
              </button>
            </form>
          </div>
        )}

        {/* Join Team Tab */}
        {activeTab === 'join' && (
          <div className="space-y-6">
            {/* Join by Code */}
            <div className="neon-card-green p-6">
              <h2 className="text-xl font-orbitron font-semibold text-neonPurple mb-4">
                Join Team by Code
              </h2>
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Enter team code"
                  className="flex-1 px-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white"
                />
                <button className="neon-button-green px-6">
                  Join Team
                </button>
              </div>
            </div>

            {/* Open Teams */}
            <div className="neon-card-green p-6">
              <h2 className="text-xl font-orbitron font-semibold text-neonPurple mb-6">
                Open Teams
              </h2>
              <div className="space-y-4">
                {openTeams.map((team) => (
                  <div
                    key={team.id}
                    className="p-4 bg-gray-900/30 border border-neonPurple/30 rounded-lg hover:border-neonGreen/50 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-orbitron font-semibold text-neonPurple">
                          {team.name}
                        </h3>
                        <p className="text-sm text-secondaryText">{team.event}</p>
                      </div>
                      <span className="text-xs text-neonBlue">
                        {team.members}/{team.maxSize} members
                      </span>
                    </div>
                    <p className="text-sm text-secondaryText mb-4">
                      {team.description}
                    </p>
                    <button
                      onClick={() => handleJoinTeam(team.id)}
                      className="neon-button-green w-full"
                    >
                      Request to Join
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowInviteModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="neon-card p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-orbitron font-semibold text-neonPurple">
                Invite Team Member
              </h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-neonPurple hover:text-neonPink transition-colors"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleInviteMember} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondaryText mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white"
                  placeholder="Enter email address"
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 py-3 border border-neonPurple/30 text-secondaryText rounded-lg hover:bg-neonPurple/10 transition-colors"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 neon-button-green">
                  Send Invite
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Teams;