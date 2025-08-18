import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Github, FileText, Video, Eye, Award } from 'lucide-react';
import { useNotifications } from '../../../../contexts/NotificationContext';

interface Submission {
  id: string;
  event: string;
  round: string;
  title: string;
  status: 'pending' | 'submitted' | 'scored';
  submittedAt?: Date;
  feedback?: {
    innovation: number;
    functionality: number;
    uiux: number;
    comments: string;
  };
}

const Submissions: React.FC = () => {
  const { addNotification } = useNotifications();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  // Mock data
  const events = [
    'AI Innovation Challenge 2025',
    'Blockchain Revolution Hackathon',
    'Sustainable Tech Summit',
  ];

  const rounds = ['Preliminary', 'Semi-Final', 'Final'];

  const pastSubmissions: Submission[] = [
    {
      id: '1',
      event: 'AI Innovation Challenge 2025',
      round: 'Preliminary',
      title: 'Smart Healthcare Assistant',
      status: 'scored',
      submittedAt: new Date('2025-01-10'),
      feedback: {
        innovation: 8,
        functionality: 7,
        uiux: 9,
        comments: 'Excellent UI/UX design and innovative approach to healthcare AI. Great potential for real-world implementation.'
      }
    },
    {
      id: '2',
      event: 'Web3 Future Hackathon',
      round: 'Final',
      title: 'Decentralized Learning Platform',
      status: 'submitted',
      submittedAt: new Date('2024-12-15'),
    },
    {
      id: '3',
      event: 'Blockchain Revolution Hackathon',
      round: 'Semi-Final',
      title: 'NFT Marketplace for Digital Art',
      status: 'pending',
    }
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          addNotification({
            title: 'Project Submitted',
            message: 'Your project has been submitted successfully!',
            type: 'success'
          });
          setSelectedFiles([]);
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleViewFeedback = (submission: Submission) => {
    setSelectedSubmission(submission);
    setShowFeedbackModal(true);
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

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-neonGreen';
    if (score >= 6) return 'text-neonBlue';
    if (score >= 4) return 'text-yellow-400';
    return 'text-neonPink';
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
          Project Submissions
        </h1>
        <p className="text-secondaryText font-montserrat">
          Submit your projects and track your progress in hackathons.
        </p>
      </div>

      {/* Submission Form */}
      <div className="neon-card-green p-6">
        <h2 className="text-2xl font-orbitron font-semibold text-neonPurple mb-6">
          Submit New Project
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-secondaryText mb-2">
                Event
              </label>
              <select
                required
                className="w-full px-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white"
              >
                <option value="">Select an event</option>
                {events.map(event => (
                  <option key={event} value={event}>{event}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondaryText mb-2">
                Round
              </label>
              <select
                required
                className="w-full px-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white"
              >
                <option value="">Select round</option>
                {rounds.map(round => (
                  <option key={round} value={round}>{round}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondaryText mb-2">
              Project Title
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white"
              placeholder="Enter project title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondaryText mb-2">
              Project Description
            </label>
            <textarea
              required
              rows={4}
              className="w-full px-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white resize-none"
              placeholder="Describe your project..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondaryText mb-2">
              GitHub Repository
            </label>
            <div className="relative">
              <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondaryText" />
              <input
                type="url"
                className="w-full pl-10 pr-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-secondaryText mb-2">
              Project Files (Documents, Videos)
            </label>
            <div className="border-2 border-dashed border-neonPurple/30 rounded-lg p-6 text-center hover:border-neonPurple/50 transition-colors">
              <Upload className="h-12 w-12 text-neonPurple mx-auto mb-4" />
              <p className="text-secondaryText mb-2">
                Drag and drop files here, or{' '}
                <label className="text-neonPurple hover:text-neonGreen cursor-pointer">
                  browse
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.mp4,.mov,.avi"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </p>
              <p className="text-xs text-gray-500">Max file size: 10MB</p>
            </div>
            
            {selectedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-900/30 border border-neonPurple/20 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      {file.type.startsWith('video/') ? (
                        <Video className="h-4 w-4 text-neonBlue" />
                      ) : (
                        <FileText className="h-4 w-4 text-neonGreen" />
                      )}
                      <span className="text-sm text-white">{file.name}</span>
                      <span className="text-xs text-secondaryText">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div>
              <div className="flex justify-between text-sm text-secondaryText mb-1">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <motion.div
                  className="bg-neonPurple h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={uploadProgress > 0 && uploadProgress < 100}
            className="neon-button-green w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploadProgress > 0 && uploadProgress < 100 ? (
              <span className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                <span>Submitting...</span>
              </span>
            ) : (
              'Submit Project'
            )}
          </button>
        </form>
      </div>

      {/* Past Submissions */}
      <div className="neon-card-green p-6">
        <h2 className="text-2xl font-orbitron font-semibold text-neonPurple mb-6">
          Past Submissions
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neonGreen/30">
                <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Event</th>
                <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Round</th>
                <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Title</th>
                <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Status</th>
                <th className="text-left py-3 px-4 font-orbitron text-neonPurple">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pastSubmissions.map((submission) => (
                <motion.tr
                  key={submission.id}
                  whileHover={{ backgroundColor: 'rgba(195, 0, 255, 0.05)' }}
                  className="border-b border-neonGreen/10"
                >
                  <td className="py-3 px-4 text-secondaryText">{submission.event}</td>
                  <td className="py-3 px-4 text-secondaryText">{submission.round}</td>
                  <td className="py-3 px-4 text-white font-medium">{submission.title}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(submission.status)}`}>
                      {submission.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {submission.feedback && (
                      <button
                        onClick={() => handleViewFeedback(submission)}
                        className="flex items-center space-x-1 text-neonPurple hover:text-neonGreen transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View Feedback</span>
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && selectedSubmission?.feedback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowFeedbackModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="neon-card p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-orbitron font-semibold text-neonPurple">
                Project Feedback
              </h3>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="text-neonPurple hover:text-neonPink transition-colors text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-orbitron text-lg text-white mb-2">
                  {selectedSubmission.title}
                </h4>
                <p className="text-secondaryText">
                  {selectedSubmission.event} • {selectedSubmission.round}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-900/30 rounded-lg border border-neonPurple/20">
                  <Award className="h-6 w-6 text-neonPurple mx-auto mb-2" />
                  <p className="text-sm text-secondaryText mb-1">Innovation</p>
                  <p className={`text-2xl font-orbitron font-bold ${getScoreColor(selectedSubmission.feedback.innovation)}`}>
                    {selectedSubmission.feedback.innovation}/10
                  </p>
                </div>
                
                <div className="text-center p-4 bg-gray-900/30 rounded-lg border border-neonPurple/20">
                  <Award className="h-6 w-6 text-neonPurple mx-auto mb-2" />
                  <p className="text-sm text-secondaryText mb-1">Functionality</p>
                  <p className={`text-2xl font-orbitron font-bold ${getScoreColor(selectedSubmission.feedback.functionality)}`}>
                    {selectedSubmission.feedback.functionality}/10
                  </p>
                </div>
                
                <div className="text-center p-4 bg-gray-900/30 rounded-lg border border-neonPurple/20">
                  <Award className="h-6 w-6 text-neonPurple mx-auto mb-2" />
                  <p className="text-sm text-secondaryText mb-1">UI/UX</p>
                  <p className={`text-2xl font-orbitron font-bold ${getScoreColor(selectedSubmission.feedback.uiux)}`}>
                    {selectedSubmission.feedback.uiux}/10
                  </p>
                </div>
              </div>

              <div>
                <h5 className="font-orbitron text-neonPurple mb-3">Judge Comments</h5>
                <div className="p-4 bg-gray-900/30 rounded-lg border border-neonPurple/20">
                  <p className="text-secondaryText leading-relaxed">
                    {selectedSubmission.feedback.comments}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Submissions;