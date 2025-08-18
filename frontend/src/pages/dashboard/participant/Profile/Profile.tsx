import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Github, Linkedin, Lock, Download, Award, Eye, Save } from 'lucide-react';
import { useNotifications } from '../../../../contexts/NotificationContext';

interface Certificate {
  id: string;
  eventName: string;
  date: string;
  position?: string;
  imageUrl: string;
}

const Profile: React.FC = () => {
  const { addNotification } = useNotifications();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  // Mock data
  const pastSubmissions = [
    {
      id: '1',
      event: 'AI Innovation Challenge 2025',
      title: 'Smart Healthcare Assistant',
      date: '2025-01-10',
      status: 'scored',
      feedback: {
        innovation: 8,
        functionality: 7,
        uiux: 9,
        comments: 'Excellent UI/UX design and innovative approach.'
      }
    },
    {
      id: '2',
      event: 'Web3 Future Hackathon',
      title: 'Decentralized Learning Platform',
      date: '2024-12-15',
      status: 'submitted',
    },
    {
      id: '3',
      event: 'Blockchain Revolution Hackathon',
      title: 'NFT Marketplace for Digital Art',
      date: '2024-11-20',
      status: 'scored',
      feedback: {
        innovation: 9,
        functionality: 8,
        uiux: 7,
        comments: 'Great innovation in NFT space with solid implementation.'
      }
    },
  ];

  const certificates: Certificate[] = [
    {
      id: '1',
      eventName: 'AI Innovation Challenge 2024',
      date: '2024-12-15',
      position: '2nd Place',
      imageUrl: 'https://images.pexels.com/photos/6802342/pexels-photo-6802342.jpeg'
    },
    {
      id: '2',
      eventName: 'Web3 Future Hackathon',
      date: '2024-11-20',
      position: 'Participant',
      imageUrl: 'https://images.pexels.com/photos/6802342/pexels-photo-6802342.jpeg'
    },
  ];

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification({
      title: 'Profile Updated',
      message: 'Your profile has been successfully updated!',
      type: 'success'
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification({
      title: 'Password Changed',
      message: 'Your password has been successfully updated!',
      type: 'success'
    });
    setShowPasswordModal(false);
  };

  const handleCertificateDownload = (certificate: Certificate) => {
    addNotification({
      title: 'Download Started',
      message: `Downloading certificate for ${certificate.eventName}`,
      type: 'info'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-neonPurple/20 text-neonPurple';
      case 'submitted':
        return 'bg-neonBlue/20 text-neonBlue';
      case 'scored':
        return 'bg-neonGreen/20 text-neonGreen';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-orbitron font-bold text-neonPurple text-shadow-neon mb-2">
          Profile
        </h1>
        <p className="text-secondaryText font-montserrat">
          Manage your personal information and view your hackathon achievements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="neon-card p-6">
            <h2 className="text-2xl font-orbitron font-semibold text-neonPurple mb-6">
              Personal Information
            </h2>
            
            <form onSubmit={handleProfileSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondaryText mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Alex"
                    className="w-full px-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondaryText mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Chen"
                    className="w-full px-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondaryText mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="alex.chen@example.com"
                  className="w-full px-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondaryText mb-2">
                  Bio
                </label>
                <textarea
                  rows={4}
                  defaultValue="Full-stack developer passionate about AI and machine learning. Love building innovative solutions that solve real-world problems."
                  className="w-full px-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondaryText mb-2">
                    GitHub Profile
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondaryText" />
                    <input
                      type="url"
                      defaultValue="https://github.com/alexchen"
                      className="w-full pl-10 pr-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondaryText mb-2">
                    LinkedIn Profile
                  </label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondaryText" />
                    <input
                      type="url"
                      defaultValue="https://linkedin.com/in/alexchen"
                      className="w-full pl-10 pr-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="neon-button flex items-center space-x-2 px-6 py-3"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(true)}
                  className="flex items-center space-x-2 px-6 py-3 border border-neonPurple/30 text-neonPurple rounded-lg hover:bg-neonPurple/10 transition-colors"
                >
                  <Lock className="h-4 w-4" />
                  <span>Change Password</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Profile Picture & Stats */}
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="neon-card p-6 text-center">
            <div className="h-32 w-32 mx-auto mb-4 rounded-full bg-neonPurple/20 border-4 border-neonGreen flex items-center justify-center">
              <User className="h-16 w-16 text-neonGreen" />
            </div>
            <h3 className="text-xl font-orbitron font-semibold text-neonPurple">
              Alex Chen
            </h3>
            <p className="text-secondaryText">Full Stack Developer</p>
          </div>

          {/* Stats */}
          <div className="neon-card p-6">
            <h3 className="text-lg font-orbitron font-semibold text-neonPurple mb-4">
              Your Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-secondaryText">Events Joined</span>
                <span className="text-neonGreen font-medium">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondaryText">Projects Submitted</span>
                <span className="text-neonGreen font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondaryText">Awards Won</span>
                <span className="text-neonGreen font-medium">2</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Past Submissions */}
      <div className="neon-card p-6">
        <h2 className="text-2xl font-orbitron font-semibold text-neonPurple mb-6">
          Submission History
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neonGreen/30">
                <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Event</th>
                <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Title</th>
                <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Date</th>
                <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Status</th>
                <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pastSubmissions.map((submission) => (
                <tr key={submission.id} className="border-b border-neonGreen/10 hover:bg-neonPurple/5">
                  <td className="py-3 px-4 text-secondaryText">{submission.event}</td>
                  <td className="py-3 px-4 text-white font-medium">{submission.title}</td>
                  <td className="py-3 px-4 text-secondaryText">
                    {new Date(submission.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(submission.status)}`}>
                      {submission.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {submission.feedback && (
                      <button className="flex items-center space-x-1 text-neonPurple hover:text-neonGreen transition-colors">
                        <Eye className="h-4 w-4" />
                        <span>View Feedback</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Certificates */}
      {certificates.length > 0 && (
        <div className="neon-card p-6">
          <h2 className="text-2xl font-orbitron font-semibold text-neonPurple mb-6">
            Certificates & Achievements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate) => (
              <motion.div
                key={certificate.id}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900/30 border border-neonPurple/30 rounded-lg p-4 hover:border-neonGreen/50 transition-all duration-300"
              >
                <div className="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-neonPurple" />
                </div>
                
                <h3 className="font-orbitron font-semibold text-neonPurple mb-2">
                  {certificate.eventName}
                </h3>
                
                <div className="flex justify-between items-center text-sm text-secondaryText mb-4">
                  <span>{new Date(certificate.date).toLocaleDateString()}</span>
                  {certificate.position && (
                    <span className="px-2 py-1 bg-neonGreen/20 text-neonGreen rounded-full text-xs">
                      {certificate.position}
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedCertificate(certificate);
                      setShowCertificateModal(true);
                    }}
                    className="flex-1 py-2 text-sm text-neonPurple border border-neonPurple/30 rounded hover:bg-neonPurple/10 transition-colors"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleCertificateDownload(certificate)}
                    className="flex items-center space-x-1 px-4 py-2 neon-button text-sm"
                  >
                    <Download className="h-3 w-3" />
                    <span>Download</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Password Change Modal */}
      {showPasswordModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowPasswordModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="neon-card p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-orbitron font-semibold text-neonPurple">
                Change Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-neonPurple hover:text-neonPink transition-colors text-2xl"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondaryText mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondaryText mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondaryText mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white"
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 py-3 border border-neonPurple/30 text-secondaryText rounded-lg hover:bg-neonPurple/10 transition-colors"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 neon-button-green">
                  Update Password
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Certificate Preview Modal */}
      {showCertificateModal && selectedCertificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowCertificateModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="neon-card p-6 max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-orbitron font-semibold text-neonPurple">
                Certificate Preview
              </h3>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="text-neonPurple hover:text-neonPink transition-colors text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="aspect-video bg-gray-800 border-2 border-neonPurple/30 rounded-lg mb-6 flex items-center justify-center">
              <div className="text-center">
                <Award className="h-16 w-16 text-neonPurple mx-auto mb-4" />
                <h4 className="text-xl font-orbitron text-neonPurple">
                  Certificate of Achievement
                </h4>
                <p className="text-secondaryText mt-2">{selectedCertificate.eventName}</p>
                <p className="text-neonGreen mt-1">{selectedCertificate.position}</p>
              </div>
            </div>
            
            <button
              onClick={() => handleCertificateDownload(selectedCertificate)}
              className="neon-button w-full flex items-center justify-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download Certificate</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Profile;