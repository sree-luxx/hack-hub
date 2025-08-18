import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Key, 
  Save, 
  X, 
  Eye, 
  EyeOff, 
  Shield,
  Trash2,
  Plus
} from 'lucide-react';
import { useNotifications } from '../../../contexts/NotificationContext';

interface APIKey {
  id: string;
  key: string;
  createdDate: string;
  status: 'Active' | 'Revoked';
}

const mockAPIKeys: APIKey[] = [
  {
    id: '1',
    key: 'hv_sk_test_123456789abcdef',
    createdDate: '2024-02-01',
    status: 'Active'
  },
  {
    id: '2',
    key: 'hv_sk_test_987654321fedcba',
    createdDate: '2024-01-15',
    status: 'Revoked'
  }
];

const ProfileSettings: React.FC = () => {
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
  });
  const [apiKeys, setAPIKeys] = useState<APIKey[]>(mockAPIKeys);
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
  const [errors, setErrors] = useState<string[]>([]);
  
  const { addNotification } = useNotifications();

  const handleProfileSave = () => {
    const validationErrors: string[] = [];
    
    if (!profile.name.trim()) {
      validationErrors.push('Name is required');
    }
    
    if (!profile.email.trim()) {
      validationErrors.push('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      validationErrors.push('Invalid email format');
    }
    
    setErrors(validationErrors);
    
    if (validationErrors.length === 0) {
      addNotification({
        title: 'Profile Updated',
        message: 'Your profile has been updated successfully!'
      });
      setErrors([]);
    }
  };

  const handlePasswordChange = () => {
    const validationErrors: string[] = [];
    
    if (!passwordData.oldPassword) {
      validationErrors.push('Current password is required');
    }
    
    if (!passwordData.newPassword) {
      validationErrors.push('New password is required');
    } else if (passwordData.newPassword.length < 8) {
      validationErrors.push('New password must be at least 8 characters');
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      validationErrors.push('Passwords do not match');
    }
    
    setErrors(validationErrors);
    
    if (validationErrors.length === 0) {
      addNotification({
        title: 'Password Updated',
        message: 'Your password has been updated successfully!'
      });
      setShowPasswordModal(false);
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setErrors([]);
    }
  };

  const generateAPIKey = () => {
    const newKey: APIKey = {
      id: Date.now().toString(),
      key: `hv_sk_test_${Math.random().toString(36).substring(2, 18)}`,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    };
    
    setAPIKeys(prev => [newKey, ...prev]);
    
    addNotification({
      title: 'API Key Generated',
      message: 'New API key has been generated successfully!'
    });
  };

  const revokeAPIKey = (keyId: string) => {
    setAPIKeys(prev =>
      prev.map(key =>
        key.id === keyId ? { ...key, status: 'Revoked' as const } : key
      )
    );
    
    addNotification({
      title: 'API Key Revoked',
      message: 'API key has been revoked successfully!'
    });
  };

  const deleteAPIKey = (keyId: string) => {
    setAPIKeys(prev => prev.filter(key => key.id !== keyId));
    
    addNotification({
      title: 'API Key Deleted',
      message: 'API key has been deleted successfully!'
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-orbitron font-bold text-neonPurple text-shadow-neon mb-8 text-center lg:text-left">
          Profile & Settings
        </h1>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="neon-card border-neonBlue p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <User className="text-neonPurple" size={24} />
              <h2 className="text-xl font-orbitron text-neonPurple">Profile Information</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-orbitron text-neonPurple mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="neon-input w-full"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-orbitron text-neonPurple mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="neon-input w-full"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-orbitron text-neonPurple mb-2">
                  Password
                </label>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="neon-button-outline flex items-center space-x-2"
                >
                  <Key size={16} />
                  <span>Change Password</span>
                </button>
              </div>

              {/* Error Messages */}
              <AnimatePresence>
                {errors.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    {errors.map((error, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-neonPink/10 border border-neonPink text-neonPink p-3 rounded-lg text-sm"
                      >
                        {error}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={handleProfileSave}
                className="neon-button w-full flex items-center justify-center space-x-2"
              >
                <Save size={16} />
                <span>Save Changes</span>
              </button>
            </div>
          </motion.div>

          {/* API Keys Management */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="neon-card border-neonBlue p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Shield className="text-neonPurple" size={24} />
                <h2 className="text-xl font-orbitron text-neonPurple">API Keys</h2>
              </div>
              <button
                onClick={generateAPIKey}
                className="neon-button flex items-center space-x-2 text-sm"
              >
                <Plus size={16} />
                <span>Generate</span>
              </button>
            </div>

            <div className="space-y-4">
              {apiKeys.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="border-b border-neonBlue/30">
                        <tr>
                          <th className="text-left py-3 font-orbitron text-neonPurple">API Key</th>
                          <th className="text-left py-3 font-orbitron text-neonPurple">Created</th>
                          <th className="text-left py-3 font-orbitron text-neonPurple">Status</th>
                          <th className="text-left py-3 font-orbitron text-neonPurple">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {apiKeys.map((apiKey, index) => (
                          <motion.tr
                            key={apiKey.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="border-b border-neonBlue/10 hover:bg-neonPurple/5 transition-colors"
                          >
                            <td className="py-3 text-white font-mono text-xs">
                              {apiKey.key.substring(0, 20)}...
                            </td>
                            <td className="py-3 text-secondaryText">
                              {apiKey.createdDate}
                            </td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                apiKey.status === 'Active'
                                  ? 'bg-neonPurple/20 text-neonPurple border border-neonPurple/50'
                                  : 'bg-neonPink/20 text-neonPink border border-neonPink/50'
                              }`}>
                                {apiKey.status}
                              </span>
                            </td>
                            <td className="py-3">
                              <div className="flex space-x-2">
                                {apiKey.status === 'Active' ? (
                                  <button
                                    onClick={() => revokeAPIKey(apiKey.id)}
                                    className="neon-button-outline text-xs px-2 py-1"
                                  >
                                    Revoke
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => deleteAPIKey(apiKey.id)}
                                    className="text-neonPink hover:text-white transition-colors"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-secondaryText">
                  <Shield size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No API keys generated yet</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Password Change Modal */}
        <AnimatePresence>
          {showPasswordModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowPasswordModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="neon-card border-neonBlue p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-orbitron text-neonPurple">Change Password</h3>
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="text-neonPurple hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-orbitron text-neonPurple mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.old ? 'text' : 'password'}
                        value={passwordData.oldPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, oldPassword: e.target.value }))}
                        className="neon-input w-full pr-10"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, old: !prev.old }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondaryText hover:text-neonPurple transition-colors"
                      >
                        {showPasswords.old ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-orbitron text-neonPurple mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.new ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="neon-input w-full pr-10"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondaryText hover:text-neonPurple transition-colors"
                      >
                        {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-orbitron text-neonPurple mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.confirm ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="neon-input w-full pr-10"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondaryText hover:text-neonPurple transition-colors"
                      >
                        {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Error Messages */}
                  <AnimatePresence>
                    {errors.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        {errors.map((error, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-neonPink/10 border border-neonPink text-neonPink p-2 rounded text-sm"
                          >
                            {error}
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={() => setShowPasswordModal(false)}
                      className="neon-button-outline flex-1"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePasswordChange}
                      className="neon-button flex-1 flex items-center justify-center space-x-2"
                    >
                      <Key size={16} />
                      <span>Update</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProfileSettings;