import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8083/api/notifications',
  headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
});

export const notificationApi = {
  create: (title, message) => instance.post('/', {title, message}),
  setFcm: (fcmToken) => instance.post('/set-fcm-token', {fcmToken}),
  getAll: () => instance.get('/'),
};
