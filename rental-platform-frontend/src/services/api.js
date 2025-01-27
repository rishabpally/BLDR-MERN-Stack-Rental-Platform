import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/rentals';

export const listItem = (data) => axios.post(`${API_BASE_URL}/list`, data);
export const searchItems = (query) => axios.get(`${API_BASE_URL}/search`, { params: query });
export const rentItem = (id, data) => axios.patch(`${API_BASE_URL}/rent/${id}`, data);
export const returnItem = (id) => axios.patch(`${API_BASE_URL}/return/${id}`);
export const backupData = () => axios.get(`${API_BASE_URL}/backup`);
