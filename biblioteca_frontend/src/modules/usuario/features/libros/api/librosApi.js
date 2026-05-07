import api from '../../../../../services/api';

export const getLibros = () => api.get('/libro/');

export const getLibro = (id) => api.get(`/libro/${id}/`);

export const createLibro = (data) => api.post('/libro/', data);

export const updateLibro = (id, data) => api.put(`/libro/${id}/`, data);

export const deleteLibro = (id) => api.delete(`/libro/${id}/`);
