import GenrePage from "../components/GenrePage";

function ThrillerMovies() {
  return (
    <GenrePage
      placeholder="Search thriller movies..."
      genreId={53}
      searchWithinGenre
    />
  );
}

export default ThrillerMovies;
