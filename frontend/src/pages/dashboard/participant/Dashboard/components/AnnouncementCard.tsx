import React from 'react';
import { motion } from 'framer-motion';

interface Announcement {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  isNew: boolean;
}

interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`p-4 bg-gray-900/30 border rounded-lg transition-all duration-300 ${
        announcement.isNew 
          ? 'border-l-4 border-l-neonPink border-neonPurple/30' 
          : 'border-neonPurple/20'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-orbitron font-medium text-neonPurple">
              {announcement.title}
            </h4>
            {announcement.isNew && (
              <span className="px-2 py-0.5 text-xs bg-neonPink/20 text-neonPink rounded-full animate-pulse">
                New
              </span>
            )}
          </div>
          <p className="text-sm text-secondaryText mb-2 line-clamp-2">
            {announcement.message}
          </p>
          <span className="text-xs text-gray-500">
            {formatTimestamp(announcement.timestamp)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default AnnouncementCard;