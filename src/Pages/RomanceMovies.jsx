import GenrePage from "../Components/GenrePage";

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
