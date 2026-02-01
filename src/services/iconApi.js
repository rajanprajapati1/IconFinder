import axios from 'axios';

// Use relative URL for the secure proxy
// In dev: Vite proxies /api to https://api.svgapi.com/v1/Ty5WcDa63E
// In prod: Vercel maps /api/list to api/list.js function
const BASE_URL = '/api';

export const searchIcons = async (query, limit = 20, start = 0) => {
 try {
  // We call /api/list which is handled by either Vite or Vercel Functions
  const response = await axios.get(`${BASE_URL}/list`, {
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
