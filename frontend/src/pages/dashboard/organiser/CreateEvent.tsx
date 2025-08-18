import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  Upload,
  X,
  Plus,
  Save,
  Rocket
} from 'lucide-react';
import { useNotifications } from '../../../contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';

interface FormData {
  basics: {
    name: string;
    theme: string;
    type: 'Online' | 'Offline' | 'Hybrid';
    location: string;
  };
  tracks: {
    selectedTracks: string[];
    rounds: number;
  };
  timeline: {
    startDate: string;
    endDate: string;
    registrationDeadline: string;
  };
  rules: {
    rules: string;
    prizes: Array<{ rank: string; description: string; value: string }>;
  };
  sponsors: Array<{ name: string; website: string; logo?: File }>;
}

const steps = [
  { id: 'basics', title: 'Basics' },
  { id: 'tracks', title: 'Tracks & Rounds' },
  { id: 'timeline', title: 'Timeline' },
  { id: 'rules', title: 'Rules & Prizes' },
  { id: 'sponsors', title: 'Sponsors' },
  { id: 'review', title: 'Review' },
];

const themes = [
  'AI & Machine Learning',
  'Blockchain & Web3',
  'Healthcare Tech',
  'Fintech',
  'EdTech',
  'Gaming',
  'IoT',
  'Cybersecurity'
];

const tracks = [
  'Web Development',
  'Mobile Development',
  'AI/ML',
  'Blockchain',
  'IoT',
  'Game Development',
  'Data Science',
  'UI/UX Design'
];

const CreateEvent: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    basics: {
      name: '',
      theme: '',
      type: 'Online',
      location: ''
    },
    tracks: {
      selectedTracks: [],
      rounds: 1
    },
    timeline: {
      startDate: '',
      endDate: '',
      registrationDeadline: ''
    },
    rules: {
      rules: '',
      prizes: [{ rank: '1st', description: '', value: '' }]
    },
    sponsors: []
  });
  
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleSaveDraft = () => {
    addNotification({
      title: 'Draft Saved',
      message: 'Your event draft has been saved successfully!'
    });
  };

  const handlePublish = () => {
    addNotification({
      title: 'Event Published',
      message: 'Your event has been published successfully!'
    });
    navigate('/dashboard/organizer');
  };

  const addPrize = () => {
    const newPrize = { rank: `${formData.rules.prizes.length + 1}st`, description: '', value: '' };
    updateFormData('rules', { 
      prizes: [...formData.rules.prizes, newPrize] 
    });
  };

  const removePrize = (index: number) => {
    const newPrizes = formData.rules.prizes.filter((_, i) => i !== index);
    updateFormData('rules', { prizes: newPrizes });
  };

  const addSponsor = () => {
    updateFormData('sponsors', [
      ...formData.sponsors,
      { name: '', website: '' }
    ]);
  };

  const removeSponsor = (index: number) => {
    const newSponsors = formData.sponsors.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, sponsors: newSponsors }));
  };

  const renderBasics = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-orbitron text-neonPurple mb-2">Event Name</label>
        <input
          type="text"
          value={formData.basics.name}
          onChange={(e) => updateFormData('basics', { name: e.target.value })}
          className="neon-input w-full"
          placeholder="Enter event name"
        />
      </div>
      
      <div>
        <label className="block text-sm font-orbitron text-neonPurple mb-2">Theme</label>
        <select
          value={formData.basics.theme}
          onChange={(e) => updateFormData('basics', { theme: e.target.value })}
          className="neon-input w-full"
        >
          <option value="">Select a theme</option>
          {themes.map(theme => (
            <option key={theme} value={theme} className="bg-darkBg text-white">{theme}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-orbitron text-neonPurple mb-2">Event Type</label>
        <div className="flex space-x-4">
          {(['Online', 'Offline', 'Hybrid'] as const).map(type => (
            <button
              key={type}
              onClick={() => updateFormData('basics', { type })}
              className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                formData.basics.type === type
                  ? 'bg-neonPurple/20 border-neonPurple text-neonPurple shadow-neon'
                  : 'bg-darkBg border-neonPurple/50 text-secondaryText hover:border-neonPurple hover:text-neonPurple'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {formData.basics.type !== 'Online' && (
        <div>
          <label className="block text-sm font-orbitron text-neonPurple mb-2">Location</label>
          <input
            type="text"
            value={formData.basics.location}
            onChange={(e) => updateFormData('basics', { location: e.target.value })}
            className="neon-input w-full"
            placeholder="Enter event location"
          />
        </div>
      )}
    </motion.div>
  );

  const renderTracks = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-orbitron text-neonPurple mb-2">Tracks</label>
        <div className="grid grid-cols-2 gap-3">
          {tracks.map(track => (
            <button
              key={track}
              onClick={() => {
                const newTracks = formData.tracks.selectedTracks.includes(track)
                  ? formData.tracks.selectedTracks.filter(t => t !== track)
                  : [...formData.tracks.selectedTracks, track];
                updateFormData('tracks', { selectedTracks: newTracks });
              }}
              className={`p-3 rounded-lg border-2 text-sm transition-all duration-300 ${
                formData.tracks.selectedTracks.includes(track)
                  ? 'bg-neonPurple/20 border-neonPurple text-neonPurple shadow-neon'
                  : 'bg-darkBg border-neonPurple/50 text-secondaryText hover:border-neonPurple hover:text-neonPurple'
              }`}
            >
              {track}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-orbitron text-neonPurple mb-2">Number of Rounds</label>
        <input
          type="number"
          min="1"
          max="5"
          value={formData.tracks.rounds}
          onChange={(e) => updateFormData('tracks', { rounds: parseInt(e.target.value) })}
          className="neon-input w-32"
        />
      </div>
    </motion.div>
  );

  const renderTimeline = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-orbitron text-neonPurple mb-2">Start Date</label>
        <input
          type="date"
          value={formData.timeline.startDate}
          onChange={(e) => updateFormData('timeline', { startDate: e.target.value })}
          className="neon-input w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-orbitron text-neonPurple mb-2">End Date</label>
        <input
          type="date"
          value={formData.timeline.endDate}
          onChange={(e) => updateFormData('timeline', { endDate: e.target.value })}
          className="neon-input w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-orbitron text-neonPurple mb-2">Registration Deadline</label>
        <input
          type="date"
          value={formData.timeline.registrationDeadline}
          onChange={(e) => updateFormData('timeline', { registrationDeadline: e.target.value })}
          className="neon-input w-full"
        />
      </div>
    </motion.div>
  );

  const renderRules = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-orbitron text-neonPurple mb-2">Rules</label>
        <textarea
          rows={6}
          value={formData.rules.rules}
          onChange={(e) => updateFormData('rules', { rules: e.target.value })}
          className="neon-input w-full"
          placeholder="Enter event rules and guidelines..."
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-orbitron text-neonPurple">Prizes</label>
          <button
            onClick={addPrize}
            className="neon-button-outline flex items-center space-x-2 text-sm"
          >
            <Plus size={16} />
            <span>Add Prize</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {formData.rules.prizes.map((prize, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-darkBg/50 rounded-lg border border-neonPurple/20">
              <input
                type="text"
                value={prize.rank}
                onChange={(e) => {
                  const newPrizes = [...formData.rules.prizes];
                  newPrizes[index].rank = e.target.value;
                  updateFormData('rules', { prizes: newPrizes });
                }}
                className="neon-input"
                placeholder="Rank"
              />
              <input
                type="text"
                value={prize.description}
                onChange={(e) => {
                  const newPrizes = [...formData.rules.prizes];
                  newPrizes[index].description = e.target.value;
                  updateFormData('rules', { prizes: newPrizes });
                }}
                className="neon-input md:col-span-2"
                placeholder="Prize description"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={prize.value}
                  onChange={(e) => {
                    const newPrizes = [...formData.rules.prizes];
                    newPrizes[index].value = e.target.value;
                    updateFormData('rules', { prizes: newPrizes });
                  }}
                  className="neon-input flex-1"
                  placeholder="Value"
                />
                {index > 0 && (
                  <button
                    onClick={() => removePrize(index)}
                    className="text-neonPink hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderSponsors = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <label className="block text-sm font-orbitron text-neonPurple">Sponsors</label>
        <button
          onClick={addSponsor}
          className="neon-button-outline flex items-center space-x-2 text-sm"
        >
          <Plus size={16} />
          <span>Add Sponsor</span>
        </button>
      </div>

      <div className="space-y-4">
        {formData.sponsors.map((sponsor, index) => (
          <div key={index} className="p-4 bg-darkBg/50 rounded-lg border border-neonPurple/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={sponsor.name}
                onChange={(e) => {
                  const newSponsors = [...formData.sponsors];
                  newSponsors[index].name = e.target.value;
                  setFormData(prev => ({ ...prev, sponsors: newSponsors }));
                }}
                className="neon-input"
                placeholder="Sponsor name"
              />
              <input
                type="url"
                value={sponsor.website}
                onChange={(e) => {
                  const newSponsors = [...formData.sponsors];
                  newSponsors[index].website = e.target.value;
                  setFormData(prev => ({ ...prev, sponsors: newSponsors }));
                }}
                className="neon-input"
                placeholder="Website URL"
              />
            </div>

            <div className="border-2 border-dashed border-neonPurple/50 rounded-lg p-6 text-center">
              <Upload size={48} className="mx-auto mb-4 text-neonPurple opacity-50" />
              <p className="text-secondaryText">Drop logo here or click to upload</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
            </div>

            <button
              onClick={() => removeSponsor(index)}
              className="mt-4 text-neonPink hover:text-white transition-colors flex items-center space-x-2"
            >
              <X size={16} />
              <span>Remove Sponsor</span>
            </button>
          </div>
        ))}

        {formData.sponsors.length === 0 && (
          <div className="text-center py-8 text-secondaryText">
            No sponsors added yet
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderReview = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="neon-card border-neonBlue p-6">
        <h3 className="text-lg font-orbitron text-neonPurple mb-4">Event Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-orbitron text-neonBlue mb-2">Basic Information</h4>
            <p><span className="text-secondaryText">Name:</span> <span className="text-white">{formData.basics.name || 'Not specified'}</span></p>
            <p><span className="text-secondaryText">Theme:</span> <span className="text-white">{formData.basics.theme || 'Not selected'}</span></p>
            <p><span className="text-secondaryText">Type:</span> <span className="text-white">{formData.basics.type}</span></p>
            {formData.basics.location && <p><span className="text-secondaryText">Location:</span> <span className="text-white">{formData.basics.location}</span></p>}
          </div>
          <div>
            <h4 className="font-orbitron text-neonBlue mb-2">Timeline</h4>
            <p><span className="text-secondaryText">Start:</span> <span className="text-white">{formData.timeline.startDate || 'Not set'}</span></p>
            <p><span className="text-secondaryText">End:</span> <span className="text-white">{formData.timeline.endDate || 'Not set'}</span></p>
            <p><span className="text-secondaryText">Registration Deadline:</span> <span className="text-white">{formData.timeline.registrationDeadline || 'Not set'}</span></p>
          </div>
          <div>
            <h4 className="font-orbitron text-neonBlue mb-2">Tracks & Rounds</h4>
            <p><span className="text-secondaryText">Tracks:</span> <span className="text-white">{formData.tracks.selectedTracks.length || 'None selected'}</span></p>
            <p><span className="text-secondaryText">Rounds:</span> <span className="text-white">{formData.tracks.rounds}</span></p>
          </div>
          <div>
            <h4 className="font-orbitron text-neonBlue mb-2">Other</h4>
            <p><span className="text-secondaryText">Prizes:</span> <span className="text-white">{formData.rules.prizes.length}</span></p>
            <p><span className="text-secondaryText">Sponsors:</span> <span className="text-white">{formData.sponsors.length}</span></p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return renderBasics();
      case 1: return renderTracks();
      case 2: return renderTimeline();
      case 3: return renderRules();
      case 4: return renderSponsors();
      case 5: return renderReview();
      default: return renderBasics();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-orbitron font-bold text-neonPurple text-shadow-neon mb-8 text-center lg:text-left">
          Create New Event
        </h1>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="flex items-center"
              >
                <button
                  onClick={() => goToStep(index)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    index <= currentStep
                      ? 'bg-neonPurple border-neonPurple text-white shadow-neon'
                      : 'border-gray-600 text-gray-600 hover:border-neonPurple hover:text-neonPurple'
                  }`}
                >
                  {index + 1}
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`w-full h-2 mx-2 rounded transition-all duration-300 ${
                      index < currentStep ? 'bg-neonPurple shadow-neon' : 'bg-gray-800'
                    }`}
                    style={{ width: '60px' }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <span
                key={step.id}
                className={`text-xs font-orbitron transition-colors duration-300 ${
                  index <= currentStep ? 'text-neonPurple' : 'text-gray-600'
                }`}
              >
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="neon-card border-neonBlue p-8 mb-8">
          <h2 className="text-xl font-orbitron text-neonPurple mb-6">
            {steps[currentStep].title}
          </h2>
          
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`neon-button-outline flex items-center space-x-2 ${
              currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ChevronLeft size={18} />
            <span>Back</span>
          </button>

          <div className="flex space-x-4">
            {currentStep === steps.length - 1 ? (
              <>
                <button
                  onClick={handleSaveDraft}
                  className="neon-button-outline flex items-center space-x-2"
                >
                  <Save size={18} />
                  <span>Save Draft</span>
                </button>
                <button
                  onClick={handlePublish}
                  className="neon-button flex items-center space-x-2"
                >
                  <Rocket size={18} />
                  <span>Publish</span>
                </button>
              </>
            ) : (
              <button
                onClick={nextStep}
                className="neon-button flex items-center space-x-2"
              >
                <span>Next</span>
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateEvent;