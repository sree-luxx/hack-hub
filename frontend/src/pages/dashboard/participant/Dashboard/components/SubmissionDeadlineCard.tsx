import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SubmissionDeadline {
  eventName: string;
  deadline: string;
  submitted: boolean;
  progress: number;
}

interface SubmissionDeadlineCardProps {
  deadline: SubmissionDeadline;
}

const SubmissionDeadlineCard: React.FC<SubmissionDeadlineCardProps> = ({ deadline }) => {
  const navigate = useNavigate();

  const formatDeadline = (deadlineString: string) => {
    const date = new Date(deadlineString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: 'Deadline passed', color: 'text-neonPink', urgent: true };
    } else if (diffDays === 0) {
      return { text: 'Due today', color: 'text-neonPink', urgent: true };
    } else if (diffDays === 1) {
      return { text: '1 day left', color: 'text-neonPink', urgent: true };
    } else if (diffDays <= 3) {
      return { text: `${diffDays} days left`, color: 'text-yellow-400', urgent: true };
    } else {
      return { text: `${diffDays} days left`, color: 'text-neonBlue', urgent: false };
    }
  };

  const deadlineInfo = formatDeadline(deadline.deadline);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-gray-900/30 border rounded-lg p-4 transition-all duration-300 ${
        deadlineInfo.urgent ? 'border-neonPink/50 hover:shadow-neon-pink' : 'border-neonPurple/30 hover:border-neonGreen/50'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-orbitron font-medium text-neonPurple text-sm line-clamp-2">
          {deadline.eventName}
        </h4>
        {deadline.submitted && (
          <CheckCircle className="h-5 w-5 text-neonGreen flex-shrink-0" />
        )}
      </div>

      <div className="flex items-center space-x-2 mb-3">
        <Clock className="h-4 w-4 text-secondaryText" />
        <span className={`text-sm ${deadlineInfo.color}`}>
          {deadlineInfo.text}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-secondaryText mb-1">
          <span>Progress</span>
          <span>{deadline.progress}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <motion.div
            className="bg-neonPurple h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${deadline.progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>

      {!deadline.submitted && (
        <button
          onClick={() => navigate('/dashboard/participant/submissions')}
          className="neon-button-green w-full text-sm"
        >
          Submit Now
        </button>
      )}
    </motion.div>
  );
};

export default SubmissionDeadlineCard;