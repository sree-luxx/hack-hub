import React from 'react';
import { motion } from 'framer-motion';
import TeamStatusCard from './components/TeamStatusCard';

const ParticipantDashboard: React.FC = () => {
  const teamStatus = {
    hasTeam: false,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl sm:text-4xl font-orbitron font-bold text-neonPurple text-shadow-neon mb-2">
          Participant Dashboard
        </h1>
        <p className="text-secondaryText">Overview of your hackathon activity</p>
      </div>

      <div className="neon-card-green p-6">
        <h2 className="text-xl font-orbitron font-semibold text-neonPurple mb-4">Team Status</h2>
        <TeamStatusCard teamStatus={teamStatus} />
      </div>
    </motion.div>
  );
};

export default ParticipantDashboard;