import apiClient from './apiClient';

const profilesUrl = import.meta.env.VITE_PROFILE_API_URL;
const storageKey = 'orchid-profiles';

const getProfiles = () => JSON.parse(localStorage.getItem(storageKey) || '{}');
const saveProfiles = (profiles) => localStorage.setItem(storageKey, JSON.stringify(profiles));

export const saveProfile = async (uid, profile) => {
  if (profilesUrl) {
    try { return (await apiClient.put(`${profilesUrl}/${uid}`, profile)).data; } catch (error) {
      if (error.response?.status !== 404) throw error;
    }
  }
  const profiles = getProfiles();
  profiles[uid] = profile;
  saveProfiles(profiles);
  return profile;
};

export const getProfile = (uid) => getProfiles()[uid] || null;
