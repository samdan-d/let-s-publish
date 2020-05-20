import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
});

const profileInstance = axios.create({
  baseURL: 'http://localhost:8082/api',
  headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
});

export const postApi = {
  getAll: () => instance.get('/posts'),
  get: (id) => instance.get(`/posts/${id}`),
  uploadImage: (id, file) => {
    const formData = new FormData();
    formData.append('image',file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return instance.post(`/posts/upload-image/${id}`, formData, config);
  },
  create: (post) => instance.post('/posts', {...post}),
  update: (id, name) => instance.put(`/posts/${id}`, {name}),
  delete: (id) => instance.delete(`/posts/${id}`)
}

export const tagApi = {
  getAll: () => instance.get('/tags'),
  create: (name) => instance.post('/tags', {name}),
  update: (id, name) => instance.put(`/tags/${id}`, {name}),
  delete: (id) => instance.delete(`/tags/${id}`)
}

export const categoryApi = {
  getAll: () => instance.get('/categories'),
  create: (name) => instance.post('/categories', {name}),
  update: (id, name) => instance.put(`/categories/${id}`, {name}),
  delete: (id) => instance.delete(`/categories/${id}`)
}

export const profileApi = {
  getAll: () => profileInstance.get('/all')
}