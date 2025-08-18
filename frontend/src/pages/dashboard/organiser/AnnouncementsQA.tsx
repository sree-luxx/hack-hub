import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Send,
  ArrowUp,
  Trash2,
  Filter
} from 'lucide-react';
import { useNotifications } from '../../../contexts/NotificationContext';

interface Announcement {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isNew?: boolean;
}

interface QAThread {
  id: string;
  question: string;
  author: string;
  timestamp: string;
  upvotes: number;
  answers: Array<{
    id: string;
    answer: string;
    author: string;
    timestamp: string;
  }>;
  isAnswered: boolean;
}

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Welcome to HackTech 2024!',
    message: 'Welcome everyone to our biggest hackathon yet! We are excited to have over 145 participants from around the world. Please make sure to check the schedule and guidelines.',
    timestamp: '2024-02-10 10:00',
    isNew: true
  },
  {
    id: '2',
    title: 'Submission Guidelines Updated',
    message: 'We have updated the submission guidelines for Round 1. Please review the new requirements on our documentation portal.',
    timestamp: '2024-02-12 14:30',
    isNew: false
  },
  {
    id: '3',
    title: 'Mentorship Sessions Available',
    message: 'Book 1-on-1 mentorship sessions with our expert mentors. Sessions are available throughout the hackathon.',
    timestamp: '2024-02-13 09:15',
    isNew: false
  }
];

const mockQAThreads: QAThread[] = [
  {
    id: '1',
    question: 'What are the submission requirements for Round 1?',
    author: 'john_doe',
    timestamp: '2024-02-14 15:30',
    upvotes: 12,
    isAnswered: true,
    answers: [
      {
        id: '1',
        answer: 'For Round 1, please submit your project demo, source code, and a brief presentation. All files should be uploaded to the submission portal.',
        author: 'organizer',
        timestamp: '2024-02-14 16:00'
      }
    ]
  },
  {
    id: '2',
    question: 'Can we use external APIs in our project?',
    author: 'sarah_dev',
    timestamp: '2024-02-14 18:45',
    upvotes: 8,
    isAnswered: false,
    answers: []
  },
  {
    id: '3',
    question: 'When will the judging results be announced?',
    author: 'team_alpha',
    timestamp: '2024-02-15 10:20',
    upvotes: 15,
    isAnswered: true,
    answers: [
      {
        id: '2',
        answer: 'Judging results will be announced on the final day during the closing ceremony at 6 PM.',
        author: 'organizer',
        timestamp: '2024-02-15 11:00'
      }
    ]
  }
];

const AnnouncementsQA: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [qaThreads, setQAThreads] = useState<QAThread[]>(mockQAThreads);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', message: '' });
  const [showUnansweredOnly, setShowUnansweredOnly] = useState(false);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [activeView, setActiveView] = useState<'announcements' | 'qa'>('announcements');
  
  const { addNotification } = useNotifications();

  const handlePostAnnouncement = () => {
    if (newAnnouncement.title.trim() && newAnnouncement.message.trim()) {
      const announcement: Announcement = {
        id: Date.now().toString(),
        title: newAnnouncement.title,
        message: newAnnouncement.message,
        timestamp: new Date().toISOString(),
        isNew: true
      };
      
      setAnnouncements(prev => [announcement, ...prev]);
      setNewAnnouncement({ title: '', message: '' });
      
      addNotification({
        title: 'Announcement Posted',
        message: `"${announcement.title}" has been posted successfully`
      });
    }
  };

  const handleUpvote = (threadId: string) => {
    setQAThreads(prev =>
      prev.map(thread =>
        thread.id === threadId
          ? { ...thread, upvotes: thread.upvotes + 1 }
          : thread
      )
    );
  };

  const handleReply = (threadId: string) => {
    const reply = replyText[threadId]?.trim();
    if (reply) {
      setQAThreads(prev =>
        prev.map(thread =>
          thread.id === threadId
            ? {
                ...thread,
                isAnswered: true,
                answers: [
                  ...thread.answers,
                  {
                    id: Date.now().toString(),
                    answer: reply,
                    author: 'organizer',
                    timestamp: new Date().toISOString()
                  }
                ]
              }
            : thread
        )
      );
      
      setReplyText(prev => ({ ...prev, [threadId]: '' }));
      
      addNotification({
        title: 'Reply Posted',
        message: 'Your reply has been posted successfully'
      });
    }
  };

  const handleDeleteThread = (threadId: string) => {
    setQAThreads(prev => prev.filter(thread => thread.id !== threadId));
    addNotification({
      title: 'Question Deleted',
      message: 'Question has been removed'
    });
  };

  const filteredQAThreads = showUnansweredOnly 
    ? qaThreads.filter(thread => !thread.isAnswered)
    : qaThreads;

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
          Announcements & Q&A
        </h1>

        {/* Mobile View Toggle */}
        <div className="lg:hidden mb-6">
          <div className="flex border-b border-neonPurple/20">
            <button
              onClick={() => setActiveView('announcements')}
              className={`flex-1 py-3 px-4 text-center font-orbitron transition-all duration-300 ${
                activeView === 'announcements'
                  ? 'text-neonPurple border-b-2 border-neonPurple'
                  : 'text-secondaryText'
              }`}
            >
              Announcements
            </button>
            <button
              onClick={() => setActiveView('qa')}
              className={`flex-1 py-3 px-4 text-center font-orbitron transition-all duration-300 ${
                activeView === 'qa'
                  ? 'text-neonPurple border-b-2 border-neonPurple'
                  : 'text-secondaryText'
              }`}
            >
              Q&A
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Announcements */}
          <div className={`lg:col-span-2 ${activeView === 'announcements' ? 'block' : 'hidden lg:block'}`}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="neon-card border-neonBlue p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-orbitron text-neonPurple">Announcements</h2>
                <MessageSquare className="text-neonBlue" size={24} />
              </div>

              {/* New Announcement Form */}
              <div className="space-y-4 mb-6 p-4 bg-darkBg/50 rounded-lg border border-neonPurple/20">
                <input
                  type="text"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement(prev => ({ ...prev, title: e.target.value }))}
                  className="neon-input w-full"
                  placeholder="Announcement title"
                />
                <textarea
                  rows={3}
                  value={newAnnouncement.message}
                  onChange={(e) => setNewAnnouncement(prev => ({ ...prev, message: e.target.value }))}
                  className="neon-input w-full"
                  placeholder="Announcement message"
                />
                <button
                  onClick={handlePostAnnouncement}
                  className="neon-button flex items-center space-x-2"
                >
                  <Send size={16} />
                  <span>Post</span>
                </button>
              </div>

              {/* Announcements List */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {announcements.length > 0 ? (
                  announcements.map((announcement, index) => (
                    <motion.div
                      key={announcement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-neon ${
                        announcement.isNew
                          ? 'border-l-4 border-l-neonPink bg-neonPink/5'
                          : 'border-neonPurple/20 bg-darkBg/30'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-orbitron text-neonPurple text-sm font-medium">
                            {announcement.title}
                          </h3>
                          <p className="text-secondaryText text-sm mt-2 leading-relaxed">
                            {announcement.message}
                          </p>
                          <p className="text-gray-500 text-xs mt-3">
                            {formatTime(announcement.timestamp)}
                          </p>
                        </div>
                        {announcement.isNew && (
                          <div className="w-2 h-2 bg-neonPink rounded-full animate-pulse-neon ml-2 flex-shrink-0"></div>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-secondaryText">
                    <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No announcements yet</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Q&A */}
          <div className={`lg:col-span-3 ${activeView === 'qa' ? 'block' : 'hidden lg:block'}`}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="neon-card border-neonBlue p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-orbitron text-neonPurple">Q&A</h2>
                <button
                  onClick={() => setShowUnansweredOnly(!showUnansweredOnly)}
                  className={`neon-button-outline flex items-center space-x-2 text-sm ${
                    showUnansweredOnly ? 'bg-neonPurple/20' : ''
                  }`}
                >
                  <Filter size={16} />
                  <span>Show Unanswered</span>
                </button>
              </div>

              <div className="space-y-6 max-h-96 overflow-y-auto">
                {filteredQAThreads.length > 0 ? (
                  filteredQAThreads.map((thread, index) => (
                    <motion.div
                      key={thread.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="p-4 bg-darkBg/50 rounded-lg border border-neonPurple/20"
                    >
                      {/* Question */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-orbitron text-neonPurple text-sm font-medium mb-2">
                            {thread.question}
                          </h3>
                          <div className="flex items-center space-x-4 text-xs text-secondaryText">
                            <span>by {thread.author}</span>
                            <span>{formatTime(thread.timestamp)}</span>
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => handleUpvote(thread.id)}
                                className="text-neonBlue hover:text-white transition-colors"
                              >
                                <ArrowUp size={14} />
                              </button>
                              <span className="text-neonBlue">{thread.upvotes}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            thread.isAnswered
                              ? 'bg-neonPurple/20 text-neonPurple'
                              : 'bg-neonBlue/20 text-neonBlue'
                          }`}>
                            {thread.isAnswered ? 'Answered' : 'Pending'}
                          </span>
                          <button
                            onClick={() => handleDeleteThread(thread.id)}
                            className="text-neonPink hover:text-white transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Answers */}
                      {thread.answers.length > 0 && (
                        <div className="space-y-3 mb-4">
                          {thread.answers.map((answer) => (
                            <div key={answer.id} className="ml-4 p-3 bg-neonPurple/5 rounded border-l-2 border-neonPurple">
                              <p className="text-secondaryText text-sm">{answer.answer}</p>
                              <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                                <span>by {answer.author}</span>
                                <span>{formatTime(answer.timestamp)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Form */}
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={replyText[thread.id] || ''}
                          onChange={(e) => setReplyText(prev => ({ ...prev, [thread.id]: e.target.value }))}
                          className="neon-input flex-1 text-sm"
                          placeholder="Type your reply..."
                        />
                        <button
                          onClick={() => handleReply(thread.id)}
                          className="neon-button text-sm px-3 py-2"
                        >
                          Reply
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-secondaryText">
                    <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                    <p>{showUnansweredOnly ? 'No unanswered questions' : 'No questions yet'}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnnouncementsQA;