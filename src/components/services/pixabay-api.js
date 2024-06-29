// services/pixabay-api.js
import axios from 'axios';

export const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '42872675-364989bcac8f0c57b2db4a522';

export const getAPI = async (query, page) => {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  const response = await axios.get(url);

  return response.data;
};