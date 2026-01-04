import GenrePage from "../Components/GenrePage";

function FantasyMovies() {
  return (
    <GenrePage
      placeholder="Search fantasy movies..."
      genreId={14}
      searchWithinGenre
    />
  );
}

export default FantasyMovies;
