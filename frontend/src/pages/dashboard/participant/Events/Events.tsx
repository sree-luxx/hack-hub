import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Users, Trophy, MapPin, Monitor, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../../../contexts/NotificationContext';

interface Event {
  id: string;
  name: string;
  theme: string;
  date: string;
  mode: 'online' | 'offline' | 'hybrid';
  participants: number;
  maxParticipants: number;
  prizes: string;
  registered: boolean;
  description: string;
}

const Events: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedMode, setSelectedMode] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  // Mock data
  const events: Event[] = [
    {
      id: '1',
      name: 'AI Innovation Challenge 2025',
      theme: 'Artificial Intelligence',
      date: '2025-02-15',
      mode: 'hybrid',
      participants: 1250,
      maxParticipants: 2000,
      prizes: '$50,000',
      registered: true,
      description: 'Build the next generation AI solutions that solve real-world problems.'
    },
    {
      id: '2',
      name: 'Blockchain Revolution Hackathon',
      theme: 'Blockchain',
      date: '2025-03-01',
      mode: 'online',
      participants: 890,
      maxParticipants: 1500,
      prizes: '$30,000',
      registered: false,
      description: 'Create innovative blockchain applications for the future of finance.'
    },
    {
      id: '3',
      name: 'Sustainable Tech Summit',
      theme: 'Sustainability',
      date: '2025-03-20',
      mode: 'offline',
      participants: 450,
      maxParticipants: 800,
      prizes: '$40,000',
      registered: false,
      description: 'Develop technologies that promote environmental sustainability.'
    },
    {
      id: '4',
      name: 'Healthcare Innovation Hub',
      theme: 'Healthcare',
      date: '2025-04-10',
      mode: 'hybrid',
      participants: 675,
      maxParticipants: 1200,
      prizes: '$60,000',
      registered: false,
      description: 'Transform healthcare through innovative technology solutions.'
    },
    {
      id: '5',
      name: 'Web3 Future Builders',
      theme: 'Web3',
      date: '2025-04-25',
      mode: 'online',
      participants: 1100,
      maxParticipants: 1800,
      prizes: '$45,000',
      registered: false,
      description: 'Build the decentralized applications of tomorrow.'
    },
    {
      id: '6',
      name: 'EdTech Revolution',
      theme: 'Education',
      date: '2025-05-05',
      mode: 'hybrid',
      participants: 320,
      maxParticipants: 600,
      prizes: '$25,000',
      registered: false,
      description: 'Reimagine education through cutting-edge technology.'
    },
  ];

  const themes = [...new Set(events.map(event => event.theme))];
  const modes = ['online', 'offline', 'hybrid'];

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.theme.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTheme = !selectedTheme || event.theme === selectedTheme;
    const matchesMode = !selectedMode || event.mode === selectedMode;
    
    return matchesSearch && matchesTheme && matchesMode;
  });

  // Paginate events
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'online': return <Monitor className="h-4 w-4" />;
      case 'offline': return <MapPin className="h-4 w-4" />;
      case 'hybrid': return <Globe className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'online': return 'bg-neonBlue/20 text-neonBlue';
      case 'offline': return 'bg-neonPink/20 text-neonPink';
      case 'hybrid': return 'bg-neonPurple/20 text-neonPurple';
      default: return 'bg-neonBlue/20 text-neonBlue';
    }
  };

  const handleRegister = (event: Event) => {
    addNotification({
      title: 'Registration Successful',
      message: `You have successfully registered for ${event.name}`,
      type: 'success'
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
          Discover Events
        </h1>
        <p className="text-secondaryText font-montserrat">
          Find and register for exciting hackathons that match your interests.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="sticky top-16 bg-darkBg border-b border-neonPurple/20 pb-4 z-10">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondaryText" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white font-montserrat"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="px-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white font-montserrat"
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
          >
            <option value="">All Themes</option>
            {themes.map(theme => (
              <option key={theme} value={theme}>{theme}</option>
            ))}
          </select>

          <select
            className="px-4 py-3 bg-darkBg border border-neonPurple/30 rounded-lg focus:border-neonPurple focus:ring-2 focus:ring-neonPurple/20 text-white font-montserrat"
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
          >
            <option value="">All Modes</option>
            {modes.map(mode => (
              <option key={mode} value={mode} className="capitalize">{mode}</option>
            ))}
          </select>

          <button className="neon-button flex items-center space-x-2 px-6">
            <Filter className="h-4 w-4" />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {currentEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="neon-card p-6 cursor-pointer hover:shadow-neon-hover"
            onClick={() => navigate(`/events/${event.id}`)}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-orbitron font-semibold text-neonPurple line-clamp-2">
                {event.name}
              </h3>
              {event.registered && (
                <span className="px-2 py-1 text-xs bg-neonGreen/20 text-neonGreen rounded-full">
                  Registered
                </span>
              )}
            </div>

            <p className="text-secondaryText text-sm mb-4 line-clamp-3">
              {event.description}
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondaryText">Theme:</span>
                <span className="text-neonBlue font-medium">{event.theme}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1 text-secondaryText">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getModeColor(event.mode)}`}>
                  {getModeIcon(event.mode)}
                  <span className="capitalize">{event.mode}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1 text-secondaryText">
                  <Users className="h-4 w-4" />
                  <span>{event.participants}/{event.maxParticipants}</span>
                </div>
                <div className="flex items-center space-x-1 text-neonGreen">
                  <Trophy className="h-4 w-4" />
                  <span className="font-medium">{event.prizes}</span>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!event.registered) {
                  handleRegister(event);
                }
              }}
              disabled={event.registered}
              className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                event.registered
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'neon-button'
              }`}
            >
              {event.registered ? 'Registered' : 'Register'}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 pt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="neon-button px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                page === currentPage
                  ? 'bg-neonPurple text-white'
                  : 'text-neonPurple hover:bg-neonPurple/20'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="neon-button px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Events;