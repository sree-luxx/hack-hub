import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Save, Eye, EyeOff, X } from 'lucide-react';
import { useNotifications } from '../../../contexts/NotificationContext';

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@hackverse.com',
  });
  
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  });
  // Removed unused errors state to satisfy linter
  const { addNotification } = useNotifications();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSaveProfile = () => {
    const newErrors: string[] = [];

    if (!profileData.name.trim()) {
      newErrors.push('Name is required');
    }

    if (!profileData.email.trim()) {
      newErrors.push('Email is required');
    } else if (!validateEmail(profileData.email)) {
      newErrors.push('Invalid email format');
    }

    if (newErrors.length > 0) {
      newErrors.forEach(error => {
        addNotification({
          title: 'Validation Error',
          message: error,
          type: 'error'
        });
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      addNotification({
        title: 'Profile Updated',
        message: 'Your profile has been updated successfully',
        type: 'success'
      });
      // clear error display if any
    }, 1000);
  };

  const handleChangePassword = () => {
    const newErrors: string[] = [];

    if (!passwordData.oldPassword) {
      newErrors.push('Current password is required');
    }

    if (!passwordData.newPassword) {
      newErrors.push('New password is required');
    } else if (passwordData.newPassword.length < 8) {
      newErrors.push('New password must be at least 8 characters');
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.push('Passwords do not match');
    }

    if (newErrors.length > 0) {
      newErrors.forEach(error => {
        addNotification({
          title: 'Validation Error',
          message: error,
          type: 'error'
        });
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      addNotification({
        title: 'Password Updated',
        message: 'Your password has been changed successfully',
        type: 'success'
      });
      setShowPasswordModal(false);
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    }, 1000);
  };

  const togglePasswordVisibility = (field: 'old' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="font-orbitron text-3xl md:text-4xl text-neonPurple text-shadow-neon mb-2">
          Profile Settings
        </h1>
        <p className="text-secondaryText">
          Manage your account information and security settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Picture */}
        <div className="lg:col-span-1">
          <motion.div 
            className="neon-card-orange text-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-orbitron text-xl text-neonPurple mb-6">Profile Picture</h2>
            
            <div className="mb-6">
              <div className="w-32 h-32 mx-auto rounded-full border-4 border-neonOrange overflow-hidden shadow-neon-orange">
                <img
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <button className="neon-button-outline w-full mb-4">
              Change Picture
            </button>

            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-secondaryText text-sm">
                <User className="w-4 h-4" />
                Judge Panel Member
              </div>
              <div className="text-neonPurple font-orbitron text-lg">
                {profileData.name}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <motion.div 
            className="neon-card-orange"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="font-orbitron text-xl text-neonPurple mb-6">Personal Information</h2>

            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-secondaryText mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neonOrange" />
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className="neon-input w-full pl-12"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-secondaryText mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neonOrange" />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email address"
                    className="neon-input w-full pl-12"
                  />
                </div>
                <p className="text-xs text-secondaryText mt-1">
                  This email will be used for all hackathon communications
                </p>
              </div>

              {/* Password Section */}
              <div>
                <label className="block text-sm font-medium text-secondaryText mb-2">
                  Password
                </label>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="neon-button-outline flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Change Password
                </button>
              </div>

              {/* Save Button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-700/30">
                <button
                  onClick={handleSaveProfile}
                  className="neon-button flex items-center gap-2 flex-1 justify-center"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button className="neon-button-outline flex-1">
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPasswordModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="neon-card-orange max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-orbitron text-lg text-neonPurple">Change Password</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-neonPurple hover:text-neonOrange transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm text-secondaryText mb-2">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neonOrange" />
                  <input
                    type={showPasswords.old ? 'text' : 'password'}
                    value={passwordData.oldPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, oldPassword: e.target.value }))}
                    placeholder="Enter current password"
                    className="neon-input w-full pl-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('old')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondaryText hover:text-neonPurple"
                  >
                    {showPasswords.old ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm text-secondaryText mb-2">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neonOrange" />
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Enter new password"
                    className="neon-input w-full pl-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondaryText hover:text-neonPurple"
                  >
                    {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm text-secondaryText mb-2">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neonOrange" />
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Confirm new password"
                    className="neon-input w-full pl-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondaryText hover:text-neonPurple"
                  >
                    {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <p className="text-xs text-secondaryText">
                Password must be at least 8 characters long and include uppercase, lowercase, and numbers.
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleChangePassword}
                  disabled={!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                  className="neon-button flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Update Password
                </button>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="neon-button-outline flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Profile;