import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, Monitor, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Event {
  id: string;
  name: string;
  date: string;
  mode: 'online' | 'offline' | 'hybrid';
  participants: number;
  registered: boolean;
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'online':
        return <Monitor className="h-4 w-4" />;
      case 'offline':
        return <MapPin className="h-4 w-4" />;
      case 'hybrid':
        return <Globe className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'online':
        return 'bg-neonBlue/20 text-neonBlue';
      case 'offline':
        return 'bg-neonPink/20 text-neonPink';
      case 'hybrid':
        return 'bg-neonPurple/20 text-neonPurple';
      default:
        return 'bg-neonBlue/20 text-neonBlue';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-900/30 border border-neonPurple/30 rounded-lg p-4 hover:border-neonGreen/50 transition-all duration-300 hover:shadow-neon-green cursor-pointer"
      onClick={() => navigate(`/events/${event.id}`)}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-orbitron font-semibold text-neonPurple line-clamp-2">
          {event.name}
        </h3>
        {event.registered && (
          <span className="px-2 py-1 text-xs bg-neonGreen/20 text-neonGreen rounded-full">
            Registered
          </span>
        )}
      </div>

      <div className="flex items-center space-x-4 text-sm text-secondaryText mb-4">
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="h-4 w-4" />
          <span>{event.participants}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getModeColor(event.mode)}`}>
          {getModeIcon(event.mode)}
          <span className="capitalize">{event.mode}</span>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/events/${event.id}`);
          }}
          className="neon-button-green text-sm px-4 py-2"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default EventCard;