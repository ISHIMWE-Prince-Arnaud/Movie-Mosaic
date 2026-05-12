import GenrePage from "../components/GenrePage";

function RomanceMovies() {
  return (
    <GenrePage
      placeholder="Search romance movies..."
      genreId={10749}
      searchWithinGenre
    />
  );
}

export default RomanceMovies;
