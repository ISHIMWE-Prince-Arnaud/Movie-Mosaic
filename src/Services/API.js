const API_KEY = '3afb1f7e8843b0c2d7a831d4ec9d722b'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';

export const searchMovies = async (query) => {
try {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`);
  
  if (!response.ok) {
    throw new Error('Movie search failed');
  }
  
  const data = await response.json();
  return data.results;
} catch (error) {
  console.error('Error searching movies:', error);
  throw error;
}
};

export const getPopularMovies = async () => {
try {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  
  const data = await response.json();
  return data.results;
} catch (error) {
  console.error('Error fetching popular movies:', error);
  throw error;
}
};