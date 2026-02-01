import axios from 'axios';

// Use relative URL for the secure Vite proxy
const BASE_URL = '/api';

export const searchIcons = async (query, limit = 20, start = 0) => {
 try {
  const response = await axios.get(`${BASE_URL}/list/`, {
   params: {
    search: query,
    limit: limit,
    start: start
   }
  });
  return response.data;
 } catch (error) {
  console.error('Error fetching icons:', error);
  throw error;
 }
};

export const getIconUrl = (id) => `https://cdn.svgapi.com/vector/${id}.svg`;

// Mock these for App.jsx compatibility during transition
export const setDomainKey = () => { };
export const getDomainKey = () => "proxy-protected";
