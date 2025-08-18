import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  Trophy, 
  Activity,
  Plus,
  Bell,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = {
    participant: [
      { icon: Calendar, label: 'Events Joined', value: '12', color: 'text-neon-purple' },
      { icon: Users, label: 'Teams Formed', value: '8', color: 'text-neon-blue' },
      { icon: Trophy, label: 'Awards Won', value: '3', color: 'text-yellow-400' },
      { icon: Activity, label: 'Projects', value: '15', color: 'text-green-400' }
    ],
    organizer: [
      { icon: Calendar, label: 'Events Created', value: '25', color: 'text-neon-purple' },
      { icon: Users, label: 'Total Participants', value: '1,234', color: 'text-neon-blue' },
      { icon: Trophy, label: 'Prizes Awarded', value: '$125K', color: 'text-yellow-400' },
      { icon: TrendingUp, label: 'Success Rate', value: '95%', color: 'text-green-400' }
    ],
    judge: [
      { icon: Calendar, label: 'Events Judged', value: '18', color: 'text-neon-purple' },
      { icon: Users, label: 'Projects Reviewed', value: '156', color: 'text-neon-blue' },
      { icon: Trophy, label: 'Winners Selected', value: '42', color: 'text-yellow-400' },
      { icon: CheckCircle, label: 'Completion Rate', value: '100%', color: 'text-green-400' }
    ]
  };

  const recentActivities = [
    { 
      type: 'submission', 
      title: 'New project submitted to AI Challenge',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-400'
    },
    { 
      type: 'team', 
      title: 'Invited to join Team Alpha',
      time: '4 hours ago',
      icon: Users,
      color: 'text-neon-blue'
    },
    { 
      type: 'event', 
      title: 'Registered for Web3 Hackathon',
      time: '1 day ago',
      icon: Calendar,
      color: 'text-neon-purple'
    },
    { 
      type: 'award', 
      title: 'Won 2nd place in Blockchain Challenge',
      time: '3 days ago',
      icon: Trophy,
      color: 'text-yellow-400'
    }
  ];

  const upcomingEvents = [
    {
      title: 'AI Innovation Challenge',
      date: '2024-12-15',
      status: 'registered',
      participants: 150
    },
    {
      title: 'Web3 Future Hackathon', 
      date: '2024-12-22',
      status: 'open',
      participants: 89
    },
    {
      title: 'Sustainability Tech',
      date: '2025-01-05',
      status: 'upcoming',
      participants: 45
    }
  ];

  const currentStats = stats[user?.role || 'participant'];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-orbitron font-bold neon-text">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-400 mt-1">
            Here's what's happening in your {user?.role} dashboard
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <Button variant="ghost" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-neon-purple rounded-full animate-pulse" />
          </Button>
          
          {user?.role === 'organizer' && (
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          )}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover className="text-center">
              <div className="flex justify-center mb-3">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-2xl font-orbitron font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-orbitron font-bold text-white">
                  Recent Activity
                </h2>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg bg-gray-900/50`}>
                      <activity.icon className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.title}</p>
                      <div className="flex items-center mt-1">
                        <Clock className="w-3 h-3 text-gray-500 mr-1" />
                        <span className="text-gray-500 text-xs">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Upcoming Events */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-orbitron font-bold text-white">
                  Upcoming Events
                </h2>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="border border-gray-800 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-medium text-sm">{event.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${
                        event.status === 'registered' ? 'bg-neon-purple/20 text-neon-purple' :
                        event.status === 'open' ? 'bg-green-500/20 text-green-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      <span>{event.participants} participants</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4" variant="outline">
                Browse More Events
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};