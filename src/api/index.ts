import axios from 'axios';

const rawgApi = axios.create({
  baseURL: process.env.VITE_RAWG_BASE_URL,
   params: {
    key: process.env.VITE_RAWG_API_KEY,
   }
})

export default rawgApi;
