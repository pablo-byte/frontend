import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postsApi = {
  // Obtener todos los posts
  getPosts: async () => {
    const response = await api.get('/posts');
    return response.data;
  },

  // Crear un nuevo post
  createPost: async (post) => {
    const response = await api.post('/posts', post);
    return response.data;
  },

  // Eliminar un post
  deletePost: async (postId) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
  },
};

export default api;

