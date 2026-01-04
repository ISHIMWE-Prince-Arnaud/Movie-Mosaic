import GenrePage from "../Components/GenrePage";

function AdventureMovies() {
  return (
    <GenrePage
      placeholder="Search adventure movies..."
      genreId={12}
      searchWithinGenre
    />
  );
}

export default AdventureMovies;
