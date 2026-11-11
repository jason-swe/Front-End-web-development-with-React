import axios from 'axios';
import { auth } from '../firebase/firebase';

const apiClient = axios.create();
apiClient.interceptors.request.use(async (config) => {
  const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
