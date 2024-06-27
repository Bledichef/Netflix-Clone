
import axios from 'axios';

const API_KEY = '89e802175d8ccb6b4549eef6f85c78ec';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const getMovieDetails = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };