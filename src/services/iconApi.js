import axios from 'axios';

// Use relative URL for Vite proxy to handle CORS
const BASE_URL = '/v1';

let domainKey = 'Ty5WcDa63E';

export const setDomainKey = (key) => {
 // Ensure we don't have leading/trailing slashes in the key
 domainKey = key.replace(/^\/+|\/+$/g, '');
};

export const getDomainKey = () => domainKey;

export const searchIcons = async (query, limit = 20, start = 0) => {
 if (!domainKey) {
  throw new Error('API Configuration missing.');
 }

 try {
  // Construct URL carefully to avoid double slashes
  const response = await axios.get(`${BASE_URL}/${domainKey}/list/`, {
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
