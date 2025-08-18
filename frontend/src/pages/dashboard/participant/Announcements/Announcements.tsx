import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, MessageSquare, ArrowUp, Send, Filter } from 'lucide-react';
// No NotificationContext used here currently

interface Announcement {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  isNew: boolean;
  event?: string;
}

interface Question {
  id: string;
  question: string;
  author: string;
  timestamp: Date;
  upvotes: number;
  isUpvoted: boolean;
  answers: Answer[];
  isAnswered: boolean;
}

interface Answer {
  id: string;
  answer: string;
  author: string;
  timestamp: Date;
  isOfficial: boolean;
}

const Announcements: React.FC = () => {
  const [newQuestion, setNewQuestion] = useState('');
  const [showUnansweredOnly, setShowUnansweredOnly] = useState(false);

  // Mock data
  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'New Judging Criteria Released',
      message: 'We have updated our judging criteria to focus more on innovation, functionality, and user experience. Please review the updated guidelines in your participant dashboard.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isNew: true,
      event: 'AI Innovation Challenge 2025'
    },
    {
      id: '2',
      title: 'Workshop: Advanced React Patterns',
      message: 'Join us for an exclusive workshop on modern React development patterns this Friday at 3 PM EST. Registration link will be sent to all participants.',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      isNew: true,
    },
    {
      id: '3',
      title: 'Submission Deadline Extended',
      message: 'Due to popular request, we are extending the submission deadline for the AI Innovation Challenge by 48 hours. New deadline: February 22, 2025.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      isNew: false,
      event: 'AI Innovation Challenge 2025'
    },
    {
      id: '4',
      title: 'Networking Session This Weekend',
      message: 'Connect with fellow participants and mentors during our virtual networking session this Saturday from 2-4 PM EST.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      isNew: false,
    },
  ];

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      question: 'Can we use pre-existing code libraries and frameworks in our submissions?',
      author: 'Alex Chen',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      upvotes: 15,
      isUpvoted: false,
      isAnswered: true,
      answers: [
        {
          id: '1',
          answer: 'Yes, you can use any open-source libraries and frameworks. Please make sure to properly document all external dependencies in your submission.',
          author: 'HackVerse Team',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          isOfficial: true
        }
      ]
    },
    {
      id: '2',
      question: 'What happens if we exceed the team size limit during the hackathon?',
      author: 'Sarah Kim',
      timestamp: new Date(Date.now() - 1000 * 60 * 90),
      upvotes: 8,
      isUpvoted: true,
      isAnswered: false,
      answers: []
    },
    {
      id: '3',
      question: 'Are there any restrictions on the AI models we can use for the challenge?',
      author: 'Mike Johnson',
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
      upvotes: 23,
      isUpvoted: false,
      isAnswered: true,
      answers: [
        {
          id: '2',
          answer: 'You can use any publicly available AI models, including GPT, BERT, or custom-trained models. Commercial APIs are also allowed as long as you stay within reasonable usage limits.',
          author: 'HackVerse Team',
          timestamp: new Date(Date.now() - 1000 * 60 * 120),
          isOfficial: true
        }
      ]
    },
  ]);

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const newQ: Question = {
      id: Date.now().toString(),
      question: newQuestion,
      author: 'You',
      timestamp: new Date(),
      upvotes: 0,
      isUpvoted: false,
      isAnswered: false,
      answers: []
    };

    setQuestions([newQ, ...questions]);
    setNewQuestion('');
  };

  const handleUpvote = (questionId: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, upvotes: q.isUpvoted ? q.upvotes - 1 : q.upvotes + 1, isUpvoted: !q.isUpvoted }
        : q
    ));
  };

  const filteredQuestions = showUnansweredOnly 
    ? questions.filter(q => !q.isAnswered)
    : questions;

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
          Announcements & Q&A
        </h1>
        <p className="text-secondaryText font-montserrat">
          Stay updated with the latest announcements and get your questions answered.
        </p>
      </div>

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Announcements - Left Side */}
        <div className="lg:col-span-2">
          <div className="neon-card-green p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Megaphone className="h-6 w-6 text-neonGreen" />
              <h2 className="text-xl font-orbitron font-semibold text-neonPurple">
                Latest Announcements
              </h2>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {announcements.map((announcement) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-4 bg-gray-900/30 border rounded-lg transition-all duration-300 ${
                    announcement.isNew 
                      ? 'border-l-4 border-l-neonPink border-neonPurple/30' 
                      : 'border-neonPurple/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-orbitron font-medium text-neonPurple text-sm">
                      {announcement.title}
                    </h3>
                    {announcement.isNew && (
                      <span className="px-2 py-0.5 text-xs bg-neonPink/20 text-neonPink rounded-full animate-pulse">
                        New
                      </span>
                    )}
                  </div>
                  
                  {announcement.event && (
                    <div className="text-xs text-neonBlue mb-2">
                      {announcement.event}
                    </div>
                  )}
                  
                  <p className="text-sm text-secondaryText mb-3 leading-relaxed">
                    {announcement.message}
                  </p>
                  
                  <span className="text-xs text-gray-500">
                    {formatTimestamp(announcement.timestamp)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Q&A Section - Right Side */}
        <div className="lg:col-span-3">
          <div className="neon-card-green p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-neonGreen" />
                <h2 className="text-xl font-orbitron font-semibold text-neonPurple">
                  Q&A Forum
                </h2>
              </div>
              
              <button
                onClick={() => setShowUnansweredOnly(!showUnansweredOnly)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                  showUnansweredOnly
                    ? 'bg-neonPurple/20 border-neonPurple text-neonPurple'
                    : 'border-neonGreen/30 text-neonGreen hover:bg-neonGreen/10'
                }`}
              >
                <Filter className="h-4 w-4" />
                <span className="text-sm">Show Unanswered</span>
              </button>
            </div>

            {/* Ask Question Form */}
            <form onSubmit={handlePostQuestion} className="mb-6">
              <div className="flex space-x-3">
                <textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 px-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white resize-none"
                  rows={2}
                />
                <button
                  type="submit"
                  disabled={!newQuestion.trim()}
                  className="neon-button-green px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* Questions List */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredQuestions.map((question) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-gray-900/30 border border-neonPurple/20 rounded-lg hover:border-neonGreen/30 transition-all duration-300"
                >
                  {/* Question */}
                  <div className="flex items-start space-x-3 mb-3">
                    <button
                      onClick={() => handleUpvote(question.id)}
                      className={`flex flex-col items-center p-2 rounded transition-all duration-300 ${
                        question.isUpvoted 
                          ? 'text-neonBlue bg-neonBlue/20' 
                          : 'text-secondaryText hover:text-neonBlue hover:bg-neonBlue/10'
                      }`}
                    >
                      <ArrowUp className="h-4 w-4" />
                      <span className="text-xs font-medium">{question.upvotes}</span>
                    </button>
                    
                    <div className="flex-1">
                      <h4 className="font-orbitron text-neonPurple mb-2">
                        {question.question}
                      </h4>
                      <div className="flex items-center space-x-3 text-xs text-secondaryText">
                        <span>by {question.author}</span>
                        <span>•</span>
                        <span>{formatTimestamp(question.timestamp)}</span>
                        {question.isAnswered && (
                          <>
                            <span>•</span>
                            <span className="text-neonGreen">Answered</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Answers */}
                  {question.answers.length > 0 && (
                    <div className="ml-12 space-y-3">
                      {question.answers.map((answer) => (
                        <div
                          key={answer.id}
                          className={`p-3 rounded-lg border-l-2 ${
                            answer.isOfficial
                              ? 'bg-neonGreen/5 border-l-neonGreen'
                              : 'bg-gray-800/30 border-l-neonPurple'
                          }`}
                        >
                          <p className="text-sm text-secondaryText mb-2 leading-relaxed">
                            {answer.answer}
                          </p>
                          <div className="flex items-center space-x-3 text-xs">
                            <span className={answer.isOfficial ? 'text-neonGreen font-medium' : 'text-secondaryText'}>
                              {answer.author}
                            </span>
                            {answer.isOfficial && (
                              <span className="px-2 py-0.5 bg-neonGreen/20 text-neonGreen rounded-full">
                                Official
                              </span>
                            )}
                            <span className="text-gray-500">
                              {formatTimestamp(answer.timestamp)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              
              {filteredQuestions.length === 0 && (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-neonPurple mx-auto mb-4 opacity-50" />
                  <p className="text-secondaryText">
                    {showUnansweredOnly ? 'No unanswered questions' : 'No questions yet'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Announcements;