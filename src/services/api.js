const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "/api";

// Simple in-memory cache
const cache = new Map();
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

const getCacheKey = (endpoint, params = {}) => {
  const paramStr = JSON.stringify(params);
  return `${endpoint}?${paramStr}`;
};

const isCacheValid = (timestamp) => {
  return Date.now() - timestamp < CACHE_EXPIRY;
};

const getFromCache = (key) => {
  const cached = cache.get(key);
  if (cached && isCacheValid(cached.timestamp)) {
    return cached.data;
  }
  cache.delete(key); // Remove expired cache
  return null;
};

const setCache = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
};

// Optional: Clear cache periodically to prevent memory leaks
setInterval(() => {
  for (const [key, value] of cache.entries()) {
    if (!isCacheValid(value.timestamp)) {
      cache.delete(key);
    }
  }
}, CACHE_EXPIRY);

const getApiKey = () => {
  if (!API_KEY) {
    throw new Error("VITE_TMDB_API_KEY is not set");
  }
  return API_KEY;
};

export const searchMovies = async (query, signal) => {
  const cacheKey = getCacheKey("searchMovies", { query });
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${getApiKey()}&query=${encodeURIComponent(
        query,
      )}&include_adult=false&language=en-US&page=1`,
      { signal },
    );
    if (!response.ok) throw new Error("Movie search failed");
    const data = await response.json();
    setCache(cacheKey, data.results);
    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export const getPopularMovies = async (signal) => {
  const cacheKey = getCacheKey("getPopularMovies");
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${getApiKey()}&language=en-US&page=1`,
      { signal },
    );
    if (!response.ok) throw new Error("Failed to fetch popular movies");
    const data = await response.json();
    setCache(cacheKey, data.results);
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

export const getMovieVideos = async (movieId) => {
  const cacheKey = getCacheKey("getMovieVideos", { movieId });
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${getApiKey()}`,
    );
    if (!response.ok) throw new Error("Failed to fetch videos");
    const data = await response.json();
    setCache(cacheKey, data.results);
    return data.results;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

export const getMoviesByGenre = async (genreId, signal) => {
  const cacheKey = getCacheKey("getMoviesByGenre", { genreId });
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${getApiKey()}&with_genres=${genreId}&language=en-US&page=1`,
      { signal },
    );
    if (!response.ok) throw new Error("Failed to fetch movies by genre");
    const data = await response.json();
    setCache(cacheKey, data.results);
    return data.results;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  const cacheKey = getCacheKey("getMovieDetails", { movieId });
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${getApiKey()}&language=en-US`,
    );
    if (!response.ok) throw new Error("Failed to fetch movie details");
    const data = await response.json();
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const getMovieCredits = async (movieId) => {
  const cacheKey = getCacheKey("getMovieCredits", { movieId });
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${getApiKey()}&language=en-US`,
    );
    if (!response.ok) throw new Error("Failed to fetch movie credits");
    const data = await response.json();
    setCache(cacheKey, data.cast);
    return data.cast;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
};

export const getSimilarMovies = async (movieId) => {
  const cacheKey = getCacheKey("getSimilarMovies", { movieId });
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/similar?api_key=${getApiKey()}&language=en-US&page=1`,
    );
    if (!response.ok) throw new Error("Failed to fetch similar movies");
    const data = await response.json();
    setCache(cacheKey, data.results);
    return data.results;
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    throw error;
  }
};
