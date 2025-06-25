import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, Globe, Camera, Save, Edit3 } from 'lucide-react';
import countries from '../data/countries';

const UserProfile = () => {
  const { user, userProfile, updateUserProfile, validateUserInformation } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    bio: '',
    preferences: {
      language: 'en',
      notifications: true,
      theme: 'light'
    }
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        phone: userProfile.phone || '',
        country: userProfile.country || '',
        bio: userProfile.profile?.bio || '',
        preferences: {
          language: userProfile.preferences?.language || 'en',
          notifications: userProfile.preferences?.notifications ?? true,
          theme: userProfile.preferences?.theme || 'light'
        }
      });
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('preferences.')) {
      const prefKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefKey]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (formData.phone && !/^[+]?[1-9]\d{1,14}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Validate user information first
      const validation = await validateUserInformation(user.uid);
      
      if (!validation.isValid) {
        throw new Error(validation.message);
      }
      
      // Update user profile
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        displayName: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        country: formData.country,
        preferences: formData.preferences,
        'profile.bio': formData.bio
      };
      
      await updateUserProfile(user.uid, updateData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({ submit: error.message || 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    if (userProfile) {
      setFormData({
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        phone: userProfile.phone || '',
        country: userProfile.country || '',
        bio: userProfile.profile?.bio || '',
        preferences: {
          language: userProfile.preferences?.language || 'en',
          notifications: userProfile.preferences?.notifications ?? true,
          theme: userProfile.preferences?.theme || 'light'
        }
      });
    }
    setIsEditing(false);
    setErrors({});
  };

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A0522D]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {userProfile.photoURL ? (
              <img
                src={userProfile.photoURL}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#A0522D] flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            )}
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-shadow">
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {userProfile.displayName || 'User Profile'}
            </h1>
            <p className="text-gray-600">{userProfile.email}</p>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              userProfile.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {userProfile.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
        
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#A0522D] text-white rounded-lg hover:bg-[#8B4513] transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {/* Profile Information */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your first name"
                />
              ) : (
                <p className="px-3 py-2 bg-white border border-gray-300 rounded-lg">
                  {userProfile.firstName || 'Not provided'}
                </p>
              )}
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your last name"
                />
              ) : (
                <p className="px-3 py-2 bg-white border border-gray-300 rounded-lg">
                  {userProfile.lastName || 'Not provided'}
                </p>
              )}
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Mail className="w-4 h-4 inline mr-1" />
                Email
              </label>
              <p className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600">
                {userProfile.email}
              </p>
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Phone className="w-4 h-4 inline mr-1" />
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your phone number"
                />
              ) : (
                <p className="px-3 py-2 bg-white border border-gray-300 rounded-lg">
                  {userProfile.phone || 'Not provided'}
                </p>
              )}
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Globe className="w-4 h-4 inline mr-1" />
              Country
            </label>
            {isEditing ? (
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
              >
                <option value="">Select your country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            ) : (
              <p className="px-3 py-2 bg-white border border-gray-300 rounded-lg">
                {userProfile.country ? 
                  countries.find(c => c.code === userProfile.country)?.name || userProfile.country
                  : 'Not provided'
                }
              </p>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="px-3 py-2 bg-white border border-gray-300 rounded-lg min-h-[100px]">
                {userProfile.profile?.bio || 'No bio provided'}
              </p>
            )}
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              {isEditing ? (
                <select
                  name="preferences.language"
                  value={formData.preferences.language}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
                >
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                  <option value="ar">Arabic</option>
                </select>
              ) : (
                <p className="px-3 py-2 bg-white border border-gray-300 rounded-lg">
                  {userProfile.preferences?.language === 'en' ? 'English' :
                   userProfile.preferences?.language === 'fr' ? 'French' :
                   userProfile.preferences?.language === 'es' ? 'Spanish' :
                   userProfile.preferences?.language === 'ar' ? 'Arabic' : 'English'}
                </p>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="preferences.notifications"
                  checked={formData.preferences.notifications}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mr-2 h-4 w-4 text-[#A0522D] focus:ring-[#A0522D] border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Enable notifications</span>
              </label>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Provider:</span>
              <span className="ml-2 capitalize">{userProfile.provider}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Email Verified:</span>
              <span className={`ml-2 ${userProfile.emailVerified ? 'text-green-600' : 'text-red-600'}`}>
                {userProfile.emailVerified ? 'Yes' : 'No'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Member Since:</span>
              <span className="ml-2">
                {new Date(userProfile.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Last Login:</span>
              <span className="ml-2">
                {userProfile.lastLoginAt ? 
                  new Date(userProfile.lastLoginAt).toLocaleDateString() : 'Never'
                }
              </span>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">{errors.submit}</p>
          </div>
        )}

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center space-x-2 px-6 py-2 bg-[#A0522D] text-white rounded-lg hover:bg-[#8B4513] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserProfile;