import React from 'react';
import { motion } from 'framer-motion';
import TeamStatusCard from './components/TeamStatusCard';
import EventCard from './components/EventCard';
import SubmissionDeadlineCard from './components/SubmissionDeadlineCard';
import AnnouncementCard from './components/AnnouncementCard';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const ParticipantDashboard: React.FC = () => {
	const teamStatus = {
		hasTeam: true,
		teamName: 'Code Ninjas',
		members: [
			{ name: 'Alex Chen', role: 'Full Stack' },
			{ name: 'Sarah Kim', role: 'UI/UX' },
			{ name: 'Mike Johnson', role: 'Backend' },
		],
	};

	const upcomingEvents = [
		{
			id: 'ai-2025',
			name: 'AI Innovation Challenge 2025',
			date: '2025-02-15',
			mode: 'hybrid' as const,
			participants: 1250,
			maxParticipants: 2000,
			prizes: '$50,000',
			registered: true,
			description: 'Build the next generation AI solutions that solve real-world problems.',
		},
		{
			id: 'bc-2025',
			name: 'Blockchain Revolution Hackathon',
			date: '2025-03-01',
			mode: 'online' as const,
			participants: 890,
			maxParticipants: 1500,
			prizes: '$30,000',
			registered: false,
			description: 'Create innovative blockchain applications for the future of finance.',
		},
	];

	const deadlines = [
		{ eventName: 'AI Innovation Challenge 2025', deadline: '2025-02-22', submitted: false, progress: 65 },
		{ eventName: 'Web3 Future Hackathon', deadline: '2025-03-05', submitted: true, progress: 100 },
	];

	const announcements = [
		{ id: '1', title: 'New Judging Criteria Released', message: 'Updated criteria focusing on innovation, functionality, and UI/UX design.', timestamp: new Date(Date.now() - 30 * 60 * 1000), isNew: true },
		{ id: '2', title: 'Workshop: Advanced React Patterns', message: 'Join us this Friday at 3 PM EST for a deep dive into modern React patterns.', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), isNew: false },
	];

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="space-y-6"
		>
			<div>
				<h1 className="text-3xl sm:text-4xl font-orbitron font-bold text-neonPurple text-shadow-neon mb-2">
					Welcome back!
				</h1>
				<p className="text-secondaryText">Here's your hackathon activity overview.</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Upcoming Events */}
				<div className="neon-card p-6">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-2xl font-orbitron font-bold text-white flex items-center gap-3">
							<Calendar className="w-6 h-6 text-neonPurple" />
							<span>Upcoming Events</span>
						</h2>
						<Link to="/dashboard/participant/events" className="text-neonPurple hover:underline">View All →</Link>
					</div>
					<div className="space-y-4">
						{upcomingEvents.map((e, idx) => (
							<EventCard key={e.id} event={{
								id: e.id,
								name: e.name,
								theme: e.mode === 'online' ? 'Online' : e.mode === 'offline' ? 'Offline' : 'Hybrid',
								date: e.date,
								mode: e.mode,
								participants: e.participants,
								maxParticipants: e.maxParticipants,
								prizes: e.prizes,
								registered: e.registered,
								description: e.description,
							}} index={idx} />
						))}
					</div>
				</div>

				{/* Team Status */}
				<div className="neon-card p-6">
					<h2 className="text-2xl font-orbitron font-bold text-white mb-4">Team Status</h2>
					<TeamStatusCard teamStatus={teamStatus} />
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Submission Deadlines */}
				<div className="neon-card p-6">
					<h2 className="text-2xl font-orbitron font-bold text-white mb-4">Submission Deadlines</h2>
					<div className="space-y-4">
						{deadlines.map((d, i) => (
							<SubmissionDeadlineCard key={i} deadline={d} />
						))}
					</div>
				</div>

				{/* Latest Announcements */}
				<div className="neon-card p-6">
					<h2 className="text-2xl font-orbitron font-bold text-white mb-4">Latest Announcements</h2>
					<div className="space-y-4">
						{announcements.map((a) => (
							<AnnouncementCard key={a.id} announcement={a as any} />
						))}
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default ParticipantDashboard;