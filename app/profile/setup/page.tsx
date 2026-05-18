'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { useLoading } from '@/contexts/LoadingContext';
import { ChevronDown, ArrowRight, CheckCircle2 } from 'lucide-react';

import dynamic from 'next/dynamic';

const TOTAL_STEPS = 7;
const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5MB as per backend
const ALLOWED_PHOTO_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

// Dynamically import LocationPicker to avoid SSR issues with Leaflet
const LocationPicker = dynamic(() => import('@/components/LocationPicker'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-100 dark:bg-black/20 animate-pulse rounded-2xl flex items-center justify-center text-gray-400 font-medium">
      Loading Maps...
    </div>
  ),
});

export default function ProfileSetupPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { startLoading } = useLoading();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    gender: '',
    genderPreference: ['all'],
    age: '',
    ageRange: { min: 18, max: 120 },
    relationshipIntention: '',
    bio: '',
    spiritualBeliefs: [] as string[],
    spiritualPractices: [] as string[],
    activityLevel: 'moderate',
    intentBadges: [] as string[],
    location: null as any,
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles: File[] = [];
    const errorMessages: string[] = [];

    // Filter valid image files (JPG, PNG only)
    files.forEach((file) => {
      // Check file type
      if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
        errorMessages.push(`${file.name} is not a valid format. Only JPG and PNG are allowed.`);
        return;
      }

      // Check file size (5MB max)
      if (file.size > MAX_PHOTO_SIZE) {
        errorMessages.push(`${file.name} is too large. Maximum file size is 5MB.`);
        return;
      }

      validFiles.push(file);
    });

    // Limit to 5 photos total
    const totalPhotos = photos.length + validFiles.length;
    let filesToAdd = validFiles;
    if (totalPhotos > 5) {
      const remaining = 5 - photos.length;
      filesToAdd = validFiles.slice(0, remaining);
      errorMessages.push(`You can upload up to 5 photos. Only ${remaining} photo(s) were added.`);
    }

    // Create previews for new files using URL.createObjectURL (synchronous)
    const newPreviews = filesToAdd.map(file => URL.createObjectURL(file));
    
    setPhotos(prev => [...prev, ...filesToAdd]);
    setPhotoPreviews(prev => [...prev, ...newPreviews]);

    // Show validation errors if any
    if (errorMessages.length > 0) {
      alert(errorMessages.join('\n'));
    }

    // Reset input
    e.target.value = '';
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    const newPreviews = photoPreviews.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    setPhotoPreviews(newPreviews);
  };

  const nextStep = () => {
    // Validate current step before proceeding
    const stepValidations: { [key: number]: () => boolean } = {
      1: () => {
        const stepErrors: { [key: string]: string } = {};
        if (!formData.name.trim()) stepErrors.name = 'Name is required';
        if (!formData.gender) stepErrors.gender = 'Gender is required';
        if (!formData.age) stepErrors.age = 'Age is required';
        else if (parseInt(formData.age) < 18) stepErrors.age = 'Must be 18+';
        if (formData.genderPreference.length === 0) stepErrors.genderPreference = 'Select at least one';
        
        setErrors(stepErrors);
        return Object.keys(stepErrors).length === 0;
      },
      2: () => {
        const stepErrors: { [key: string]: string } = {};
        if (!formData.location) stepErrors.location = 'Please select your city';
        
        setErrors(stepErrors);
        return Object.keys(stepErrors).length === 0;
      },
      3: () => {
        const stepErrors: { [key: string]: string } = {};
        if (photos.length === 0) stepErrors.photos = 'Upload at least one photo';
        
        setErrors(stepErrors);
        return Object.keys(stepErrors).length === 0;
      },
      4: () => {
        const stepErrors: { [key: string]: string } = {};
        if (!formData.relationshipIntention) stepErrors.relationshipIntention = 'Select an intention';
        
        setErrors(stepErrors);
        return Object.keys(stepErrors).length === 0;
      },
      5: () => {
        const stepErrors: { [key: string]: string } = {};
        if (formData.spiritualBeliefs.length === 0) stepErrors.spiritualBeliefs = 'Select at least one';
        
        setErrors(stepErrors);
        return Object.keys(stepErrors).length === 0;
      },
      6: () => {
        const stepErrors: { [key: string]: string } = {};
        if (formData.spiritualPractices.length === 0) stepErrors.spiritualPractices = 'Select at least one';
        
        setErrors(stepErrors);
        return Object.keys(stepErrors).length === 0;
      },
      7: () => {
        const stepErrors: { [key: string]: string } = {};
        // Final step - bio is optional, no validation needed
        setErrors(stepErrors);
        return true;
      }
    };

    if (stepValidations[currentStep] && !stepValidations[currentStep]()) {
      console.warn(`⚠️ Step ${currentStep} validation failed:`, errors);
      return;
    }

    if (currentStep < TOTAL_STEPS) {
      console.log(`✅ Step ${currentStep} passed, moving to step ${currentStep + 1}`);
      setCurrentStep(currentStep + 1);
      setErrors({});
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({}); // Clear errors when navigating
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Basic validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (parseInt(formData.age) < 18) {
      newErrors.age = 'You must be at least 18 years old';
    }
    if (!formData.relationshipIntention) {
      newErrors.relationshipIntention = 'Relationship intention is required';
    }
    if (formData.genderPreference.length === 0) {
      newErrors.genderPreference = 'Please select at least one gender preference';
    }
    if (formData.spiritualBeliefs.length === 0) {
      newErrors.spiritualBeliefs = 'Please select at least one spiritual belief';
    }
    if (formData.spiritualPractices.length === 0) {
      newErrors.spiritualPractices = 'Please select at least one spiritual practice';
    }
    if (!formData.location) {
      newErrors.location = 'Please select your city';
    }
    if (photos.length === 0) {
      newErrors.photos = 'Please upload at least one photo (max 5 photos, 5MB each)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    // Validate form before submission
    if (!validateForm()) {
      console.error('❌ Profile validation failed:', errors);
      alert('Please fill in all required fields with valid data');
      return;
    }

    console.log('✅ Profile validation passed, submitting...');
    
    setLoading(true);
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Add all form fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('age', formData.age.toString());
      formDataToSend.append('genderPreference', JSON.stringify(formData.genderPreference));
      formDataToSend.append('relationshipIntention', formData.relationshipIntention);
      formDataToSend.append('bio', formData.bio || '');
      formDataToSend.append('spiritualBeliefs', JSON.stringify(formData.spiritualBeliefs));
      formDataToSend.append('spiritualPractices', JSON.stringify(formData.spiritualPractices));
      formDataToSend.append('activityLevel', formData.activityLevel);
      formDataToSend.append('intentBadges', JSON.stringify(formData.intentBadges));
      formDataToSend.append('ageRange', JSON.stringify(formData.ageRange));
      if (formData.location) {
        formDataToSend.append('location', JSON.stringify(formData.location));
      }
      
      // Add photos
      photos.forEach((photo) => {
        formDataToSend.append('photos', photo);
      });

      // Send with multipart/form-data
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      const response = await fetch(`${API_URL}/profiles`, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
        credentials: 'include',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('❌ Profile save failed:', { status: response.status, message: data.message });
        throw new Error(data.message || 'Error saving profile');
      }

      console.log('🎉 Profile created successfully!', { userId: data.profile?.user, profileId: data.profile?._id });
      startLoading();
      router.push('/plans');
    } catch (error: any) {
      console.error('❌ Profile save error:', error.message);
      alert(error.message || 'Error saving profile');
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col relative overflow-hidden">
      {/* Overlay Loader */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm mx-4 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg font-semibold text-gray-800">Please wait</p>
            <p className="text-sm text-gray-600 mt-2">Creating your profile...</p>
          </div>
        </div>
      )}



      {/* Hero Content & Form Section */}
      <main className="flex-grow flex items-center justify-center pt-28 pb-12 px-4 md:px-16 relative overflow-hidden min-h-screen">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/screen.png')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-surface/20 via-transparent to-surface/90 dark:to-background"></div>
        </div>

        <div className="relative z-10 w-full max-w-[650px] flex flex-col items-center">
          {/* Progress Bar */}
          <div className="w-full mb-8 space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">Step {currentStep} of {TOTAL_STEPS}</span>
              <span className="text-xs text-primary uppercase tracking-widest font-bold">{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-high dark:bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full shadow-[0_0_12px_rgba(182,23,34,0.4)]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Onboarding Card */}
          <div className="glass-card bg-white/70 dark:bg-black/40 backdrop-blur-2xl w-full p-6 sm:p-10 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden border border-white/40 dark:border-white/10">
            <div className="aura-glow top-[-200px] left-[-200px] absolute w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(182,23,34,0.1)_0%,rgba(255,255,255,0)_70%)] z-[-1] rounded-full"></div>
            
            <AnimatePresence mode="wait">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="w-full"
                >
                  <header className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-3 tracking-tight">Tell us about yourself</h1>
                    <p className="text-lg text-on-surface-variant font-medium">Let's begin your journey toward a soul-deep connection.</p>
                  </header>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-80 ml-1">YOUR NAME</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className={`w-full px-6 py-4 bg-surface-container-low dark:bg-white/5 rounded-xl border-0 focus:ring-2 focus:ring-primary transition-all text-base placeholder:text-on-surface-variant/40 ${errors.name ? 'ring-2 ring-red-500' : ''}`}
                          placeholder="Soulful Name"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold">✗ {errors.name}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-80 ml-1">AGE</label>
                        <input
                          type="number"
                          value={formData.age}
                          onChange={(e) => handleChange('age', parseInt(e.target.value) || '')}
                          min="18"
                          max="120"
                          className={`w-full px-6 py-4 bg-surface-container-low dark:bg-white/5 rounded-xl border-0 focus:ring-2 focus:ring-primary transition-all text-base placeholder:text-on-surface-variant/40 ${errors.age ? 'ring-2 ring-red-500' : ''}`}
                          placeholder="Years"
                        />
                        {errors.age && <p className="text-red-500 text-xs mt-1 font-semibold">✗ {errors.age}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-80 ml-1">I IDENTIFY AS</label>
                        <div className="relative flex items-center">
                          <select
                            value={formData.gender}
                            onChange={(e) => handleChange('gender', e.target.value)}
                            className={`w-full px-6 py-4 pr-12 bg-surface-container-low dark:bg-white/5 rounded-xl border-0 focus:ring-2 focus:ring-primary appearance-none transition-all text-base cursor-pointer ${errors.gender ? 'ring-2 ring-red-500' : ''}`}
                          >
                            <option disabled value="">Select Gender</option>
                            <option value="female">Woman</option>
                            <option value="male">Man</option>
                            <option value="non-binary">Non-binary</option>
                            <option value="other">Other</option>
                          </select>
                          <ChevronDown className="absolute right-4 text-on-surface-variant pointer-events-none" size={20} />
                        </div>
                        {errors.gender && <p className="text-red-500 text-xs mt-1 font-semibold">✗ {errors.gender}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-80 ml-1">LOOKING FOR</label>
                        <div className="relative flex items-center">
                          <select
                            value={formData.genderPreference[0]}
                            onChange={(e) => handleChange('genderPreference', [e.target.value])}
                            className={`w-full px-6 py-4 pr-12 bg-surface-container-low dark:bg-white/5 rounded-xl border-0 focus:ring-2 focus:ring-primary appearance-none transition-all text-base cursor-pointer ${errors.genderPreference ? 'ring-2 ring-red-500' : ''}`}
                          >
                            <option disabled value="">Seeking...</option>
                            <option value="male">Men</option>
                            <option value="female">Women</option>
                            <option value="non-binary">Non-binary</option>
                            <option value="all">Open to All</option>
                          </select>
                          <ChevronDown className="absolute right-4 text-on-surface-variant pointer-events-none" size={20} />
                        </div>
                        {errors.genderPreference && <p className="text-red-500 text-xs mt-1 font-semibold">✗ {errors.genderPreference}</p>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Location Selection */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="w-full"
                >
                  <header className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-3 tracking-tight">Where are you located?</h1>
                    <p className="text-lg text-on-surface-variant font-medium">Find souls in your spiritual community nearby.</p>
                  </header>

                  <div className="rounded-2xl overflow-hidden shadow-lg border border-surface-variant/30">
                    <LocationPicker 
                      onLocationSelect={(loc) => handleChange('location', loc)} 
                      initialLocation={formData.location}
                    />
                  </div>
                  
                  {errors.location && <p className="text-red-500 text-sm mt-4 text-center font-semibold">✗ {errors.location}</p>}
                </motion.div>
              )}

              {/* Step 3: Photo Upload */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="w-full"
                >
                  <header className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-3 tracking-tight">Add Your Photos</h1>
                    <p className="text-lg text-on-surface-variant font-medium">Upload up to 5 photos (JPG or PNG only, max 5MB each).</p>
                  </header>

                  <div className="space-y-6">
                    <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                      errors.photos ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-primary/50 hover:border-primary hover:bg-primary/5'
                    }`}>
                      <input
                        type="file"
                        id="photo-upload"
                        accept="image/jpeg,image/jpg,image/png"
                        multiple
                        onChange={handlePhotoChange}
                        className="hidden"
                        disabled={photos.length >= 5}
                      />
                      <label
                        htmlFor="photo-upload"
                        className={`cursor-pointer block ${photos.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="text-5xl mb-4 text-primary opacity-80">📸</div>
                        <p className="text-lg font-bold text-on-surface mb-1">
                          {photos.length >= 5 ? 'Maximum 5 photos reached' : 'Tap to upload photos'}
                        </p>
                        <p className="text-sm text-on-surface-variant">JPG or PNG only</p>
                      </label>
                    </div>

                    {errors.photos && <p className="text-red-500 text-sm text-center font-semibold">✗ {errors.photos}</p>}

                    {photos.length > 0 && (
                      <p className="text-sm text-primary text-center font-bold">✓ {photos.length}/5 photos uploaded</p>
                    )}

                    {photos.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {photos.map((photo, index) => (
                          <div key={index} className="relative group aspect-[3/4] overflow-hidden rounded-xl shadow-md border border-surface-variant/20">
                            <img
                              src={photoPreviews[index] || URL.createObjectURL(photo)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {index === 0 && (
                              <div className="absolute top-2 left-2 bg-primary text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">
                                Primary
                              </div>
                            )}
                            <button
                              onClick={(e) => { e.preventDefault(); removePhoto(index); }}
                              className="absolute top-2 right-2 bg-black/50 hover:bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Relationship Intent */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="w-full"
                >
                  <header className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-3 tracking-tight">What are you looking for?</h1>
                    <p className="text-lg text-on-surface-variant font-medium">Help us understand your intentions.</p>
                  </header>

                  <div className="space-y-4">
                    {[
                      { value: 'conscious-partnership', label: 'Conscious Partnership', icon: '✨' },
                      { value: 'marriage-oriented', label: 'Marriage-Oriented', icon: '💍' },
                      { value: 'spiritual-friendship', label: 'Spiritual Friendship', icon: '🧘' },
                      { value: 'healing-companion', label: 'Healing Companion', icon: '🌱' },
                      { value: 'exploring', label: 'Exploring', icon: '🔍' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleChange('relationshipIntention', option.value)}
                        className={`w-full p-5 rounded-2xl border-2 text-left flex items-center gap-4 transition-all hover:scale-[1.01] ${
                          formData.relationshipIntention === option.value
                            ? 'border-primary bg-primary/5 shadow-md dark:bg-primary/20'
                            : 'border-surface-variant/50 hover:border-primary/50 bg-white/50 dark:bg-black/20'
                        }`}
                      >
                        <span className="text-3xl bg-surface-container-low dark:bg-white/10 p-2 rounded-xl">{option.icon}</span>
                        <span className="font-bold text-lg text-on-surface">{option.label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.relationshipIntention && <p className="text-red-500 text-sm mt-4 text-center font-semibold">✗ {errors.relationshipIntention}</p>}
                </motion.div>
              )}

              {/* Step 5: Spiritual Beliefs */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="w-full"
                >
                  <header className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-3 tracking-tight">Your Spiritual Path</h1>
                    <p className="text-lg text-on-surface-variant font-medium">Select your spiritual beliefs (multiple).</p>
                  </header>

                  <div className="flex flex-wrap gap-3 justify-center">
                    {['buddhism', 'christianity', 'hinduism', 'islam', 'judaism', 'spiritual-but-not-religious', 'yoga-practitioner', 'meditation', 'atheist', 'agnostic'].map((belief) => {
                      const isSelected = formData.spiritualBeliefs.includes(belief);
                      return (
                        <button
                          key={belief}
                          onClick={() => {
                            const current = formData.spiritualBeliefs;
                            if (isSelected) {
                              handleChange('spiritualBeliefs', current.filter(b => b !== belief));
                            } else {
                              handleChange('spiritualBeliefs', [...current, belief]);
                            }
                          }}
                          className={`px-6 py-3 rounded-full border-2 text-sm font-bold transition-all hover:scale-[1.03] ${
                            isSelected
                              ? 'border-primary bg-primary text-white shadow-[0_4px_14px_0_rgba(182,23,34,0.39)]'
                              : 'border-surface-variant/50 bg-white/50 dark:bg-black/20 text-on-surface hover:border-primary/50'
                          }`}
                        >
                          {belief.replace(/-/g, ' ').toUpperCase()}
                        </button>
                      );
                    })}
                  </div>
                  {errors.spiritualBeliefs && <p className="text-red-500 text-sm mt-6 text-center font-semibold">✗ {errors.spiritualBeliefs}</p>}
                  {formData.spiritualBeliefs.length > 0 && <p className="text-primary font-bold text-sm mt-6 text-center">✓ {formData.spiritualBeliefs.length} selected</p>}
                </motion.div>
              )}

              {/* Step 6: Spiritual Practices */}
              {currentStep === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="w-full"
                >
                  <header className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-3 tracking-tight">Your Practices</h1>
                    <p className="text-lg text-on-surface-variant font-medium">What spiritual practices do you engage in?</p>
                  </header>

                  <div className="flex flex-wrap gap-3 justify-center">
                    {['meditation', 'yoga', 'prayer', 'chanting', 'breathwork', 'mindfulness', 'nature-connection', 'energy-healing', 'astrology', 'tarot'].map((practice) => {
                      const isSelected = formData.spiritualPractices.includes(practice);
                      return (
                        <button
                          key={practice}
                          onClick={() => {
                            const current = formData.spiritualPractices;
                            if (isSelected) {
                              handleChange('spiritualPractices', current.filter(p => p !== practice));
                            } else {
                              handleChange('spiritualPractices', [...current, practice]);
                            }
                          }}
                          className={`px-6 py-3 rounded-full border-2 text-sm font-bold transition-all hover:scale-[1.03] ${
                            isSelected
                              ? 'border-primary bg-primary text-white shadow-[0_4px_14px_0_rgba(182,23,34,0.39)]'
                              : 'border-surface-variant/50 bg-white/50 dark:bg-black/20 text-on-surface hover:border-primary/50'
                          }`}
                        >
                          {practice.replace(/-/g, ' ').toUpperCase()}
                        </button>
                      );
                    })}
                  </div>
                  {errors.spiritualPractices && <p className="text-red-500 text-sm mt-6 text-center font-semibold">✗ {errors.spiritualPractices}</p>}
                  {formData.spiritualPractices.length > 0 && <p className="text-primary font-bold text-sm mt-6 text-center">✓ {formData.spiritualPractices.length} selected</p>}
                </motion.div>
              )}

              {/* Step 7: Bio */}
              {currentStep === 7 && (
                <motion.div
                  key="step7"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="w-full"
                >
                  <header className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-3 tracking-tight">Tell your story</h1>
                    <p className="text-lg text-on-surface-variant font-medium">Share a bit about yourself (optional).</p>
                  </header>

                  <div>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleChange('bio', e.target.value)}
                      rows={6}
                      className="w-full px-6 py-4 bg-surface-container-low dark:bg-white/5 rounded-2xl border-0 focus:ring-2 focus:ring-primary transition-all text-base placeholder:text-on-surface-variant/40 resize-none shadow-inner"
                      placeholder="Tell us about yourself, your journey, what you're looking for..."
                    />
                    <p className="text-xs text-on-surface-variant mt-3 text-right font-bold tracking-widest uppercase">{formData.bio.length}/500</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons inside Card */}
            <div className="pt-10 flex flex-col sm:flex-row items-center gap-4 justify-between mt-4">
              {currentStep > 1 ? (
                <button
                  onClick={(e) => { e.preventDefault(); prevStep(); }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-on-surface-variant font-bold hover:bg-surface-container-high dark:hover:bg-white/10 transition-colors"
                >
                  Back
                </button>
              ) : (
                <div className="hidden sm:block px-8 w-[100px]"></div>
              )}

              {currentStep < TOTAL_STEPS ? (
                <button
                  onClick={(e) => { e.preventDefault(); nextStep(); }}
                  className="w-full sm:w-auto px-12 py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <span>Continue</span>
                  <ArrowRight size={24} />
                </button>
              ) : (
                <button
                  onClick={(e) => { e.preventDefault(); handleSubmit(); }}
                  disabled={loading}
                  className="w-full sm:w-auto px-12 py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100"
                >
                  <span>{loading ? 'Saving...' : 'Complete Profile'}</span>
                  {!loading && <CheckCircle2 size={24} />}
                </button>
              )}
            </div>
            
            {currentStep === 1 && (
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant text-center opacity-60 mt-8 font-bold">
                BY CONTINUING, YOU AGREE TO OUR MINDFUL COMMUNITY TERMS
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-6 bg-surface-container-lowest dark:bg-black/50 border-t border-surface-variant/20 relative z-20">
        <div className="text-xl font-extrabold text-primary tracking-tight">Spiritual Unity Match</div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          <a href="#" className="text-[11px] uppercase tracking-[0.15em] font-bold text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="text-[11px] uppercase tracking-[0.15em] font-bold text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="text-[11px] uppercase tracking-[0.15em] font-bold text-on-surface-variant hover:text-primary transition-colors">Spirituality Guide</a>
          <a href="#" className="text-[11px] uppercase tracking-[0.15em] font-bold text-on-surface-variant hover:text-primary transition-colors">Contact Support</a>
        </div>
        <div className="text-[11px] uppercase tracking-[0.15em] font-bold text-on-surface-variant opacity-70">
          © {new Date().getFullYear()} Spiritual Unity Match. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
