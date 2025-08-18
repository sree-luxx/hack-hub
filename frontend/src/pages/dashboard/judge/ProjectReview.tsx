import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSearch, Filter, Download, ExternalLink, File, X, Github as GitHub, Send } from 'lucide-react';
import { useNotifications } from '../../../contexts/NotificationContext';

interface Submission {
  id: string;
  event: string;
  team: string;
  title: string;
  description: string;
  round: string;
  status: 'pending' | 'reviewed';
  githubUrl: string;
  files: Array<{
    name: string;
    size: string;
    url: string;
  }>;
  scores?: {
    innovation: number;
    technical: number;
    uiux: number;
  };
  feedback?: string;
}

const ProjectReview: React.FC = () => {
  const [searchParams] = useSearchParams();
  const selectedSubmissionId = searchParams.get('submissionId');
  
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(selectedSubmissionId);
  const [filters, setFilters] = useState({
    event: '',
    round: '',
    status: ''
  });
  const [showFilePreview, setShowFilePreview] = useState<string | null>(null);
  const [scores, setScores] = useState({
    innovation: 7,
    technical: 8,
    uiux: 6
  });
  const [feedback, setFeedback] = useState('');
  const { addNotification } = useNotifications();

  const submissions: Submission[] = [
    {
      id: '1',
      event: 'Tech Innovation Hackathon 2024',
      team: 'Team Alpha',
      title: 'Smart City Management Platform',
      description: 'A comprehensive IoT-based platform for managing smart city infrastructure, including traffic management, waste disposal, and energy optimization.',
      round: 'Final',
      status: 'pending',
      githubUrl: 'https://github.com/team-alpha/smart-city',
      files: [
        { name: 'presentation.pdf', size: '2.5MB', url: '#' },
        { name: 'demo-video.mp4', size: '15.2MB', url: '#' },
        { name: 'architecture.docx', size: '1.8MB', url: '#' }
      ]
    },
    {
      id: '2',
      event: 'AI for Good Challenge',
      team: 'Code Warriors',
      title: 'AI-Powered Healthcare Assistant',
      description: 'An AI chatbot that provides preliminary medical advice and helps users find nearby healthcare services.',
      round: 'Semi-Final',
      status: 'pending',
      githubUrl: 'https://github.com/code-warriors/health-ai',
      files: [
        { name: 'project-report.pdf', size: '3.1MB', url: '#' },
        { name: 'app-demo.mp4', size: '12.5MB', url: '#' }
      ]
    },
    {
      id: '3',
      event: 'Tech Innovation Hackathon 2024',
      team: 'Innovation Hub',
      title: 'Blockchain Voting System',
      description: 'A secure, transparent voting system built on blockchain technology to ensure election integrity.',
      round: 'Final',
      status: 'reviewed',
      githubUrl: 'https://github.com/innovation-hub/blockchain-voting',
      files: [
        { name: 'whitepaper.pdf', size: '4.2MB', url: '#' },
        { name: 'system-demo.mp4', size: '18.7MB', url: '#' }
      ],
      scores: { innovation: 9, technical: 8, uiux: 7 },
      feedback: 'Excellent implementation of blockchain technology. The security measures are well thought out.'
    }
  ];

  const filteredSubmissions = submissions.filter(submission => {
    return (
      (!filters.event || submission.event.includes(filters.event)) &&
      (!filters.round || submission.round === filters.round) &&
      (!filters.status || submission.status === filters.status)
    );
  });

  const currentSubmission = selectedSubmission 
    ? submissions.find(s => s.id === selectedSubmission)
    : null;

  const handleSubmitReview = () => {
    if (currentSubmission) {
      addNotification({
        title: 'Review Submitted',
        message: `Review for ${currentSubmission.title} has been submitted successfully`,
        type: 'success'
      });
      
      // Update submission status (in real app, this would be an API call)
      setSelectedSubmission(null);
    }
  };

  const handleMarkComplete = () => {
    if (currentSubmission) {
      addNotification({
        title: 'Review Completed',
        message: `${currentSubmission.title} has been marked as complete`,
        type: 'success'
      });
      
      setSelectedSubmission(null);
    }
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
          Project Review
        </h1>
        <p className="text-secondaryText">
          Review and evaluate project submissions from hackathon participants.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Submission List */}
        <div className="lg:col-span-2">
          <motion.div 
            className="neon-card-green"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-orbitron text-xl text-neonPurple flex items-center gap-2">
                <FileSearch className="w-6 h-6" />
                Submissions
              </h2>
              <Filter className="w-5 h-5 text-neonPurple" />
            </div>

            {/* Filters */}
            <div className="space-y-3 mb-6">
              <select
                value={filters.event}
                onChange={(e) => setFilters(prev => ({ ...prev, event: e.target.value }))}
                className="neon-input w-full"
              >
                <option value="">All Events</option>
                <option value="Tech Innovation">Tech Innovation Hackathon 2024</option>
                <option value="AI for Good">AI for Good Challenge</option>
                <option value="Fintech">Fintech Revolution</option>
              </select>
              
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={filters.round}
                  onChange={(e) => setFilters(prev => ({ ...prev, round: e.target.value }))}
                  className="neon-input"
                >
                  <option value="">All Rounds</option>
                  <option value="Preliminary">Preliminary</option>
                  <option value="Semi-Final">Semi-Final</option>
                  <option value="Final">Final</option>
                </select>
                
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="neon-input"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                </select>
              </div>
            </div>

            {/* Submissions List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredSubmissions.length > 0 ? (
                filteredSubmissions.map((submission) => (
                  <motion.div
                    key={submission.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                      selectedSubmission === submission.id
                        ? 'border-neonGreen bg-neonGreen/10'
                        : 'border-neonPurple/30 bg-gray-900/30 hover:border-neonGreen/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedSubmission(submission.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-orbitron text-sm text-neonPurple mb-1 truncate">
                          {submission.title}
                        </h3>
                        <p className="text-xs text-white mb-1">{submission.team}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-secondaryText">{submission.round}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            submission.status === 'pending' 
                              ? 'bg-neonOrange/20 text-neonOrange'
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {submission.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
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
            </div>
          </motion.div>
        </div>

        {/* Review Panel */}
        <div className="lg:col-span-3">
          <motion.div 
            className="neon-card-green"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {currentSubmission ? (
              <div className="space-y-6">
                {/* Submission Details */}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="font-orbitron text-xl text-neonPurple mb-2">
                        {currentSubmission.title}
                      </h2>
                      <p className="text-secondaryText text-sm mb-2">
                        Team: {currentSubmission.team} • Round: {currentSubmission.round}
                      </p>
                    </div>
                    <a
                      href={currentSubmission.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neonPurple hover:text-neonOrange transition-colors"
                    >
                      <GitHub className="w-6 h-6" />
                    </a>
                  </div>
                  
                  <p className="text-secondaryText mb-4">
                    {currentSubmission.description}
                  </p>

                  {/* Files */}
                  <div>
                    <h3 className="font-orbitron text-lg text-neonPurple mb-3">Project Files</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentSubmission.files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg border border-gray-700/50"
                        >
                          <div className="flex items-center gap-2">
                            <File className="w-4 h-4 text-neonOrange" />
                            <div>
                              <p className="text-sm text-white">{file.name}</p>
                              <p className="text-xs text-secondaryText">{file.size}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setShowFilePreview(file.name)}
                            className="text-neonPurple hover:text-neonOrange transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Scoring */}
                {currentSubmission.status === 'pending' && (
                  <>
                    <div>
                      <h3 className="font-orbitron text-lg text-neonPurple mb-4">Evaluation Criteria</h3>
                      <div className="space-y-4">
                        {Object.entries(scores).map(([criteria, score]) => (
                          <div key={criteria} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium text-secondaryText capitalize">
                                {criteria === 'uiux' ? 'UI/UX Design' : criteria}
                              </label>
                              <span className="text-neonPurple font-bold">{score}/10</span>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="10"
                              value={score}
                              onChange={(e) => setScores(prev => ({
                                ...prev,
                                [criteria]: parseInt(e.target.value)
                              }))}
                              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Feedback */}
                    <div>
                      <label className="block text-sm font-medium text-secondaryText mb-2">
                        Feedback & Comments
                      </label>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Enter your detailed feedback for the team..."
                        rows={4}
                        className="neon-input w-full resize-none"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleSubmitReview}
                        disabled={!feedback.trim()}
                        className="neon-button flex items-center gap-2 flex-1 justify-center disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        Submit Review
                      </button>
                      <button
                        onClick={handleMarkComplete}
                        className="neon-button-outline flex-1"
                      >
                        Mark as Complete
                      </button>
                    </div>
                  </>
                )}

                {/* Already Reviewed */}
                {currentSubmission.status === 'reviewed' && currentSubmission.scores && (
                  <div>
                    <h3 className="font-orbitron text-lg text-neonPurple mb-4">Review Summary</h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {Object.entries(currentSubmission.scores).map(([criteria, score]) => (
                        <div key={criteria} className="text-center p-3 bg-gray-900/30 rounded-lg">
                          <div className="text-2xl font-bold text-neonPurple mb-1">{score}/10</div>
                          <div className="text-xs text-secondaryText capitalize">
                            {criteria === 'uiux' ? 'UI/UX' : criteria}
                          </div>
                        </div>
                      ))}
                    </div>
                    {currentSubmission.feedback && (
                      <div className="p-4 bg-gray-900/30 rounded-lg">
                        <h4 className="font-medium text-neonOrange mb-2">Feedback</h4>
                        <p className="text-secondaryText text-sm">{currentSubmission.feedback}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileSearch className="w-16 h-16 text-neonOrange mx-auto mb-4 opacity-50" />
                <p className="text-secondaryText text-lg mb-2">Select a submission to review</p>
                <p className="text-secondaryText text-sm">
                  Choose a project from the list to start your evaluation
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* File Preview Modal */}
      <AnimatePresence>
        {showFilePreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowFilePreview(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="neon-card-green max-w-2xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-orbitron text-lg text-neonPurple">File Preview</h3>
                <button
                  onClick={() => setShowFilePreview(null)}
                  className="text-neonPurple hover:text-neonOrange transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="bg-gray-900/50 p-8 rounded-lg text-center">
                <File className="w-16 h-16 text-neonOrange mx-auto mb-4" />
                <p className="text-white mb-2">{showFilePreview}</p>
                <p className="text-secondaryText text-sm mb-4">
                  File preview would be displayed here
                </p>
                <div className="flex gap-3 justify-center">
                  <button className="neon-button flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button 
                    onClick={() => setShowFilePreview(null)}
                    className="neon-button-outline"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          background: #FF9500;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px #FF9500;
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          background: #FF9500;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px #FF9500;
        }
      `}</style>
    </motion.div>
  );
};

export default ProjectReview;