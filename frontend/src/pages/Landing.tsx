import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  Trophy, 
  Code, 
  Zap,
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Landing: React.FC = () => {
  const location = useLocation();
  const mockEvents = [
    {
      id: '1',
      title: 'AI Innovation Challenge',
      theme: 'Artificial Intelligence',
      date: '2024-12-15',
      mode: 'hybrid',
      participants: 150,
      prizes: '$50K',
    },
    {
      id: '2',
      title: 'Web3 Future Hackathon',
      theme: 'Blockchain & Crypto',
      date: '2024-12-22',
      mode: 'online',
      participants: 89,
      prizes: '$25K',
    },
    {
      id: '3',
      title: 'Sustainability Tech',
      theme: 'Green Technology',
      date: '2025-01-05',
      mode: 'offline',
      participants: 45,
      prizes: '$30K',
    },
  ];

  const features = [
    {
      icon: Calendar,
      title: 'Easy Event Management',
      description: 'Create and manage hackathons with intuitive tools and real-time analytics.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Form teams, invite members, and collaborate seamlessly with built-in tools.'
    },
    {
      icon: Trophy,
      title: 'Fair Judging System',
      description: 'Multi-criteria scoring with transparent feedback and automated leaderboards.'
    },
    {
      icon: Code,
      title: 'Project Submissions',
      description: 'Upload code, demos, and documentation with integrated GitHub support.'
    }
  ];

  useEffect(() => {
    if (location.pathname === '/events' || location.hash === '#events') {
      const el = document.getElementById('events');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative gradient-bg particle-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-6">
              <span className="neon-text">Host & Join</span>
              <br />
              <span className="text-white">Epic Hackathons</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The ultimate platform for organizing and participating in hackathons. 
              Connect with innovators, build amazing projects, and win incredible prizes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto animate-pulse-slow">
                  <Zap className="w-5 h-5" />
                  Get Started Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              
              <Link to="/events">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Browse Events
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { number: '500+', label: 'Active Hackathons' },
              { number: '10K+', label: 'Participants' },
              { number: '$2M+', label: 'Prize Pool' }
            ].map((stat, index) => (
              <Card key={index} className="text-center animate-float"  >
                <div className="text-3xl font-orbitron font-bold neon-text mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-orbitron font-bold neon-text mb-4">
              Why Choose SynapHack?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to run successful hackathons or participate in amazing challenges.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="text-center h-full">
                  <div className="flex justify-center mb-4">
                    <feature.icon className="w-12 h-12 text-neon-purple" />
                  </div>
                  <h3 className="text-xl font-orbitron font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-orbitron font-bold neon-text mb-4">
              Featured Hackathons
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join these amazing hackathons and showcase your skills to the world.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        event.mode === 'online' ? 'bg-neon-blue/20 text-neon-blue' :
                        event.mode === 'offline' ? 'bg-neon-pink/20 text-neon-pink' :
                        'bg-neon-purple/20 text-neon-purple'
                      }`}>
                        {event.mode.toUpperCase()}
                      </span>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-orbitron font-bold text-white mb-2">
                      {event.title}
                    </h3>
                    
                    <p className="text-neon-purple font-medium mb-3">{event.theme}</p>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-400">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{event.participants} participants</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Trophy className="w-4 h-4 mr-2" />
                      <span>{event.prizes} prizes</span>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/events">
              <Button size="lg">
                View All Events
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-orbitron font-bold neon-text mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers, designers, and innovators who are building the future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  <Star className="w-5 h-5" />
                  Join as Participant
                </Button>
              </Link>
              
              <Link to="/register">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <CheckCircle className="w-5 h-5" />
                  Become an Organizer
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};