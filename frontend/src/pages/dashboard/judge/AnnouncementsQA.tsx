import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  ArrowUp, 
  ChevronDown, 
  ChevronRight,
  Filter,
  Users,
  Clock
} from 'lucide-react';
import { useNotifications } from '../../../contexts/NotificationContext';

interface Announcement {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  isNew?: boolean;
}

interface Question {
  id: string;
  question: string;
  author: string;
  timestamp: Date;
  upvotes: number;
  upvoted?: boolean;
  answers: Answer[];
  expanded?: boolean;
}

interface Answer {
  id: string;
  answer: string;
  author: string;
  timestamp: Date;
  isJudge: boolean;
}

const AnnouncementsQA: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'announcements' | 'qa'>('announcements');
  const [showUnanswered, setShowUnanswered] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [newReply, setNewReply] = useState<{ [key: string]: string }>({});
  const { addNotification } = useNotifications();

  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'Tech Innovation Hackathon 2024 - Final Round Guidelines',
      message: 'The final round evaluation will focus on innovation, technical implementation, and business viability. Make sure your presentations highlight these key areas.',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      isNew: true
    },
    {
      id: '2',
      title: 'Submission Deadline Extended',
      message: 'Due to technical difficulties, the submission deadline for AI for Good Challenge has been extended by 2 hours.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isNew: true
    },
    {
      id: '3',
      title: 'Judge Panel Introduction',
      message: 'Welcome to the judging panel! Please review the evaluation criteria document before starting your reviews.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ];

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      question: 'Can we use external APIs in our project implementation?',
      author: 'Team Alpha',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      upvotes: 12,
      upvoted: false,
      answers: [
        {
          id: '1-1',
          answer: 'Yes, you can use external APIs as long as they are publicly available and documented. Make sure to include proper error handling.',
          author: 'Judge Sarah',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          isJudge: true
        }
      ]
    },
    {
      id: '2',
      question: 'What is the maximum team size allowed for the competition?',
      author: 'Code Warriors',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      upvotes: 8,
      upvoted: true,
      answers: [
        {
          id: '2-1',
          answer: 'The maximum team size is 4 members. All team members must be registered participants.',
          author: 'Judge Michael',
          timestamp: new Date(Date.now() - 50 * 60 * 1000),
          isJudge: true
        }
      ]
    },
    {
      id: '3',
      question: 'Are there any restrictions on the technology stack we can use?',
      author: 'Innovation Hub',
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      upvotes: 15,
      upvoted: false,
      answers: []
    }
  ]);

  const filteredQuestions = showUnanswered 
    ? questions.filter(q => q.answers.length === 0)
    : questions;

  const toggleExpanded = (questionId: string) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const handleUpvote = (questionId: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          upvotes: q.upvoted ? q.upvotes - 1 : q.upvotes + 1,
          upvoted: !q.upvoted
        };
      }
      return q;
    }));
  };

  const handleReplySubmit = (questionId: string) => {
    const reply = newReply[questionId];
    if (!reply?.trim()) return;

    const newAnswer: Answer = {
      id: Date.now().toString(),
      answer: reply,
      author: 'Judge Sarah',
      timestamp: new Date(),
      isJudge: true
    };

    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          answers: [...q.answers, newAnswer]
        };
      }
      return q;
    }));

    setNewReply(prev => ({ ...prev, [questionId]: '' }));
    
    addNotification({
      title: 'Reply Posted',
      message: 'Your reply has been posted successfully',
      type: 'success'
    });
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return `${Math.floor(minutes / 1440)}d ago`;
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
          Announcements & Q&A
        </h1>
        <p className="text-secondaryText">
          Stay updated with event announcements and help participants with their questions.
        </p>
      </div>

      {/* Mobile Tabs */}
      <div className="lg:hidden mb-6">
        <div className="flex bg-gray-900/30 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('announcements')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === 'announcements'
                ? 'bg-neonPurple text-white'
                : 'text-secondaryText hover:text-white'
            }`}
          >
            Announcements
          </button>
          <button
            onClick={() => setActiveTab('qa')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === 'qa'
                ? 'bg-neonPurple text-white'
                : 'text-secondaryText hover:text-white'
            }`}
          >
            Q&A
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Announcements Feed */}
        <div className={`lg:col-span-2 ${activeTab === 'qa' ? 'hidden lg:block' : ''}`}>
          <motion.div 
            className="neon-card-green"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-orbitron text-xl text-neonPurple flex items-center gap-2 mb-6">
              <MessageSquare className="w-6 h-6" />
              Latest Announcements
            </h2>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {announcements.length > 0 ? (
                announcements.map((announcement) => (
                  <motion.div
                    key={announcement.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      announcement.isNew 
                        ? 'border-neonPink bg-neonPink/5' 
                        : 'border-neonPurple/30 bg-gray-900/30'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-orbitron text-sm text-neonPurple">
                        {announcement.title}
                      </h3>
                      {announcement.isNew && (
                        <span className="px-2 py-0.5 bg-neonPink/20 text-neonPink text-xs rounded-full">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-secondaryText text-sm mb-2">
                      {announcement.message}
                    </p>
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <Clock className="w-3 h-3" />
                      {formatTime(announcement.timestamp)}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-secondaryText">No announcements</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Q&A Section */}
        <div className={`lg:col-span-3 ${activeTab === 'announcements' ? 'hidden lg:block' : ''}`}>
          <motion.div 
            className="neon-card-green"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-orbitron text-xl text-neonPurple flex items-center gap-2">
                <Users className="w-6 h-6" />
                Questions & Answers
              </h2>
              <button
                onClick={() => setShowUnanswered(!showUnanswered)}
                className={`neon-button-outline flex items-center gap-2 ${
                  showUnanswered ? 'bg-neonOrange/20' : ''
                }`}
              >
                <Filter className="w-4 h-4" />
                {showUnanswered ? 'Show All' : 'Unanswered Only'}
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((question) => (
                  <motion.div
                    key={question.id}
                    className="border border-gray-700/50 rounded-lg p-4 bg-gray-900/30"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Question Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <button
                        onClick={() => handleUpvote(question.id)}
                        className={`flex flex-col items-center gap-1 px-2 py-1 rounded transition-colors ${
                          question.upvoted 
                            ? 'text-neonBlue bg-neonBlue/20' 
                            : 'text-secondaryText hover:text-neonBlue'
                        }`}
                      >
                        <ArrowUp className="w-4 h-4" />
                        <span className="text-xs font-medium">{question.upvotes}</span>
                      </button>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 
                            className="font-orbitron text-sm text-neonPurple cursor-pointer hover:text-neonOrange transition-colors"
                            onClick={() => toggleExpanded(question.id)}
                          >
                            {question.question}
                          </h3>
                          <button
                            onClick={() => toggleExpanded(question.id)}
                            className="text-neonOrange hover:text-neonPurple transition-colors"
                          >
                            {expandedQuestions.has(question.id) ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-secondaryText">
                            by {question.author}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatTime(question.timestamp)}
                          </span>
                          {question.answers.length === 0 && (
                            <span className="px-2 py-0.5 bg-neonOrange/20 text-neonOrange text-xs rounded-full">
                              Unanswered
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {expandedQuestions.has(question.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          {/* Existing Answers */}
                          {question.answers.length > 0 && (
                            <div className="space-y-3 mb-4 pl-8">
                              {question.answers.map((answer) => (
                                <div
                                  key={answer.id}
                                  className={`p-3 rounded-lg ${
                                    answer.isJudge 
                                      ? 'bg-neonPurple/10 border-l-4 border-neonPurple' 
                                      : 'bg-gray-800/50'
                                  }`}
                                >
                                  <p className="text-sm text-white mb-2">{answer.answer}</p>
                                  <div className="flex items-center gap-2 text-xs">
                                    <span className={answer.isJudge ? 'text-neonPurple' : 'text-secondaryText'}>
                                      {answer.author} {answer.isJudge && '(Judge)'}
                                    </span>
                                    <span className="text-gray-500">
                                      {formatTime(answer.timestamp)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Reply Form */}
                          <div className="pl-8">
                            <div className="flex gap-3">
                              <textarea
                                value={newReply[question.id] || ''}
                                onChange={(e) => setNewReply(prev => ({ 
                                  ...prev, 
                                  [question.id]: e.target.value 
                                }))}
                                placeholder="Enter your reply..."
                                rows={2}
                                className="neon-input flex-1 resize-none text-sm"
                              />
                              <button
                                onClick={() => handleReplySubmit(question.id)}
                                disabled={!newReply[question.id]?.trim()}
                                className="neon-button px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Send className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-secondaryText mb-4">
                    {showUnanswered ? 'No unanswered questions' : 'No questions yet'}
                  </p>
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
      </div>
    </motion.div>
  );
};

export default AnnouncementsQA;