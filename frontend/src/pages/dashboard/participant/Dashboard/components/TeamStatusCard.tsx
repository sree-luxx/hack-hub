import React from 'react';
import { motion } from 'framer-motion';
import { Users, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TeamMember {
  name: string;
  role: string;
}

interface TeamStatus {
  hasTeam: boolean;
  teamName?: string;
  members?: TeamMember[];
}

interface TeamStatusCardProps {
  teamStatus: TeamStatus;
}

const TeamStatusCard: React.FC<TeamStatusCardProps> = ({ teamStatus }) => {
  const navigate = useNavigate();

  if (!teamStatus.hasTeam) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="text-center py-8"
      >
        <Users className="h-12 w-12 text-neonPurple mx-auto mb-4 opacity-50" />
        <p className="text-secondaryText mb-4">You're not part of any team yet</p>
        <button
          onClick={() => navigate('/dashboard/participant/teams')}
          className="neon-button-green flex items-center space-x-2 mx-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Create / Join Team</span>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="space-y-4"
    >
      <div>
        <h3 className="text-lg font-orbitron font-semibold text-neonPurple mb-2">
          {teamStatus.teamName}
        </h3>
        
        <div className="space-y-2 mb-4">
          {teamStatus.members?.map((member, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-900/30 rounded border border-neonPurple/20"
            >
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-neonPurple/20 border border-neonGreen flex items-center justify-center">
                  <span className="text-xs text-neonGreen font-medium">
                    {member.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{member.name}</p>
                  <p className="text-xs text-secondaryText">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => navigate('/dashboard/participant/teams')}
        className="neon-button-green w-full"
      >
        Manage Team
      </button>
    </motion.div>
  );
};

export default TeamStatusCard;