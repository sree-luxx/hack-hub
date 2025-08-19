Hackathon Platform
A modern, role-based web application for managing hackathons, designed for participants, organizers, and judges. The platform provides a sleek, neon-themed user interface with role-specific dashboards and navigation, built with React and TypeScript.
Table of Contents

Tech Stack
Architecture
Frontend
Routing
Authentication
State Management
UI Components


Project Structure
Setup and Installation
Running the Application
Future Enhancements
Contributing

Tech Stack
The project leverages modern web development technologies for a robust and scalable frontend:

React (v18): JavaScript library for building dynamic, component-based user interfaces.
TypeScript: Superset of JavaScript for type-safe code, enhancing maintainability and developer experience.
React Router (v6): Declarative routing for navigating between pages and managing role-based routes.
Framer Motion: Animation library for smooth, declarative animations (e.g., fade-ins, transitions).
Lucide React: Icon library providing customizable SVG icons for UI elements.
Tailwind CSS: Utility-first CSS framework for styling, customized with neon-themed colors (neon-purple, neon-blue).
Vite: Build tool for fast development and optimized production builds.
Notification Context: Custom context for managing in-app notifications (currently mocked).
Auth Context: Custom context for mock authentication and role-based access control.

Architecture
The application follows a modular, role-based architecture with a clear separation of concerns. It is designed to support three user roles: Participant, Organizer, and Judge, each with distinct dashboards and features.
Frontend

Component-Based Design: Built with reusable React components (e.g., Card, Button, StatsGrid) for consistent UI across roles.
Role-Based Dashboards: Each role has a dedicated dashboard with sub-pages (e.g., /dashboard/participant/events for participants, /dashboard/organizer/create-event for organizers).
Responsive Design: Tailwind CSS ensures a responsive, mobile-friendly layout with a neon-themed aesthetic.

Routing

React Router: Manages client-side routing with a nested route structure.
Public routes: /login, /register, /events, /leaderboard, /about (currently placeholders).
Protected routes: /dashboard/[role]/* (e.g., /dashboard/participant, /dashboard/organizer) restricted by role using ProtectedRoute.
Example routes:
Participant: /dashboard/participant/events, /dashboard/participant/teams
Organizer: /dashboard/organizer/create-event, /dashboard/organizer/analytics
Judge: /dashboard/judge/reviews, /dashboard/judge/feedback




Role-Based Navigation: The Sidebar.tsx dynamically renders navigation links based on user.role from AuthContext.

Authentication

Mock Authentication: Uses AuthContext with localStorage for user data (name, email, role).
Roles are inferred from email (e.g., organizer@test.com for organizer, judge@test.com for judge, else participant).
ProtectedRoute ensures only authenticated users with the correct role access their dashboard.


Future Integration: Designed to support real backend authentication (e.g., Firebase, Supabase) with minimal changes.

State Management

React Context:
AuthContext: Manages user authentication state (user, isLoading, login, logout, register).
NotificationContext: Provides notification functionality (currently mocked).


Local State: Individual components use useState for form inputs and UI interactions (e.g., CreateEvent.tsx form).

UI Components

Reusable Components (in components/ui/):
Card: A customizable card with hover effects for displaying stats, events, and other content.
Button: Supports multiple variants (e.g., outline, ghost) with neon-themed styling.
Input: Form input with label support for forms (e.g., login, event creation).
StatsGrid: Displays role-specific statistics with animated icons.


Layout Components (in components/Layout/):
Navbar: Top navigation bar for all pages.
Sidebar: Role-based sidebar with dynamic links based on user.role.
Layout: Wraps protected routes, rendering Navbar, Sidebar, and an <Outlet /> for sub-pages.


Styling:
Tailwind CSS with custom colors (neon-purple, neon-blue, darkBg).
Framer Motion for animations (e.g., fade-ins, slide-ins).
Lucide icons for consistent, scalable iconography.



Project Structure
hackathon-platform/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Layout.tsx
│   │   └── ui/
│   │       ├── Card.tsx
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── StatsGrid.tsx
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   └── NotificationContext.tsx
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   └── dashboard/
│   │       ├── participant/
│   │       │   ├── Dashboard.tsx
│   │       │   ├── Events.tsx
│   │       │   ├── Teams.tsx
│   │       │   ├── Submissions.tsx
│   │       │   ├── QA.tsx
│   │       │   └── Profile.tsx
│   │       ├── organizer/
│   │       │   ├── Dashboard.tsx
│   │       │   ├── CreateEvent.tsx
│   │       │   ├── ManageEvents.tsx
│   │       │   ├── Participants.tsx
│   │       │   ├── Judges.tsx
│   │       │   ├── Announcements.tsx
│   │       │   ├── Analytics.tsx
│   │       │   └── Profile.tsx
│   │       └── judge/
│   │           ├── Dashboard.tsx
│   │           ├── Events.tsx
│   │           ├── Reviews.tsx
│   │           ├── Feedback.tsx
│   │           └── Profile.tsx
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md


components/: Reusable UI and layout components.
contexts/: React contexts for authentication and notifications.
pages/: Page components, organized by role under dashboard/.
App.tsx: Main router and application entry point.
main.tsx: React entry point for rendering the app.

Setup and Installation

Clone the Repository:
git clone <repository-url>
cd hackathon-platform


Install Dependencies:
npm install

Required packages:

react, react-dom
react-router-dom
framer-motion
lucide-react
tailwindcss
@types/react, @types/react-dom (for TypeScript)


Configure Environment:

Ensure Node.js (v16 or later) is installed.
No environment variables are required for the mock setup.



Running the Application

Development Server:
npm run dev

Opens the app at http://localhost:5173 (default Vite port).

Build for Production:
npm run build

Generates optimized assets in the dist/ folder.

Testing Authentication:

Use /register to create a user:
Email with "organizer" (e.g., organizer@test.com) for organizer role.
Email with "judge" (e.g., judge@test.com) for judge role.
Other emails for participant role.


Log in at /login to access role-specific dashboards.



Future Enhancements

Backend Integration: Replace mock authentication with a real backend (e.g., Firebase, Supabase) for user management and data storage.
Dynamic Data: Fetch real-time data for events, teams, submissions, and analytics via API calls.
Additional Features:
Implement public pages (/events, /leaderboard, /about).
Add notification system with real-time updates.
Enhance accessibility and add dark/light mode toggles.


Testing: Add unit tests (e.g., Jest, React Testing Library) and end-to-end tests (e.g., Cypress).
Organizer/Judge Dashboards: Fully implement sub-pages for organizer and judge roles with real functionality.

Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/YourFeature).
Commit changes (git commit -m "Add YourFeature").
Push to the branch (git push origin feature/YourFeature).
Open a pull request.

For issues or suggestions, please open an issue on the repository.
