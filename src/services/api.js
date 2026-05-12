const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const getApiKey = () => {
  if (!API_KEY) {
    throw new Error("VITE_TMDB_API_KEY is not set");
  }
  return API_KEY;
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${getApiKey()}&query=${encodeURIComponent(
        query
      )}&include_adult=false&language=en-US&page=1`
    );
    if (!response.ok) throw new Error("Movie search failed");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export const getPopularMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${getApiKey()}&language=en-US&page=1`
    );
    if (!response.ok) throw new Error("Failed to fetch popular movies");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

// Fetch Action Movies (Genre ID: 28)
export const getActionMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${getApiKey()}&with_genres=28&language=en-US&page=1`
    );
    if (!response.ok) throw new Error("Failed to fetch action movies");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching action movies:", error);
    throw error;
  }
};

// Get Movie Trailer Videos
export const getMovieVideos = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${getApiKey()}`
    );
    if (!response.ok) throw new Error("Failed to fetch videos");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

export const getHorrorMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${getApiKey()}&with_genres=27&language=en-US&page=1`
    );
    if (!response.ok) throw new Error("Failed to fetch horror movies");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching horror movies:", error);
    throw error;
  }
};

export const getDramaMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${getApiKey()}&with_genres=18&language=en-US&page=1`
    );
    if (!response.ok) throw new Error("Failed to fetch drama movies");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching drama movies:", error);
    throw error;
  }
};

export const getMoviesByGenre = async (genreId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${getApiKey()}&with_genres=${genreId}&language=en-US&page=1`
    );
    if (!response.ok) throw new Error("Failed to fetch movies by genre");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    throw error;
  }
};
