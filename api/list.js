import axios from 'axios';

export default async function handler(req, res) {
 const { search, limit, start } = req.query;
 const API_KEY = 'Ty5WcDa63E';
 const TARGET_URL = `https://api.svgapi.com/v1/${API_KEY}/list/`;

 try {
  const response = await axios.get(TARGET_URL, {
   params: { search, limit, start }
  });

  // Set CORS headers just in case
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  return res.status(200).json(response.data);
 } catch (error) {
  console.error('Proxy Error:', error.response?.data || error.message);
  return res.status(error.response?.status || 500).json({
   error: 'Failed to fetch icons from source API',
   details: error.message
  });
 }
}
