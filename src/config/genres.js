export const GENRES = [
  { id: 28, slug: 'action', label: 'Action', placeholder: 'Search action movies...' },
  { id: 12, slug: 'adventure', label: 'Adventure', placeholder: 'Search adventure movies...' },
  { id: 16, slug: 'animation', label: 'Animation', placeholder: 'Search animation movies...' },
  { id: 35, slug: 'comedy', label: 'Comedy', placeholder: 'Search comedy movies...' },
  { id: 80, slug: 'crime', label: 'Crime', placeholder: 'Search crime movies...' },
  { id: 99, slug: 'documentary', label: 'Documentary', placeholder: 'Search documentary movies...' },
  { id: 18, slug: 'drama', label: 'Drama', placeholder: 'Search drama movies...' },
  { id: 14, slug: 'fantasy', label: 'Fantasy', placeholder: 'Search fantasy movies...' },
  { id: 27, slug: 'horror', label: 'Horror', placeholder: 'Search horror movies...' },
  { id: 9648, slug: 'mystery', label: 'Mystery', placeholder: 'Search mystery movies...' },
  { id: 10749, slug: 'romance', label: 'Romance', placeholder: 'Search romance movies...' },
  { id: 878, slug: 'sci-fi', label: 'Sci-Fi', placeholder: 'Search Sci-Fi (Science Fiction) movies...' },
  { id: 53, slug: 'thriller', label: 'Thriller', placeholder: 'Search thriller movies...' },
];

export const getGenreBySlug = (slug) => {
  return GENRES.find(genre => genre.slug === slug);
};

export const getGenreById = (id) => {
  return GENRES.find(genre => genre.id === id);
};
