import GenrePage from "../Components/GenrePage";

function ComedyMovies() {
  return (
    <GenrePage
      placeholder="Search comedy movies..."
      genreId={35}
      searchWithinGenre
    />
  );
}

export default ComedyMovies;
