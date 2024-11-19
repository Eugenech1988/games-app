import axios from 'axios';

const rawgApi = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: '616f596c0c9b4bc09604476e1105fe0b',
    page_size: 15,
  }
})

export default rawgApi;
