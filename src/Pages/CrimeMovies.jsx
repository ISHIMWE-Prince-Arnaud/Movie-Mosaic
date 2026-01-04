import GenrePage from "../Components/GenrePage";

function CrimeMovies() {
  return (
    <GenrePage
      placeholder="Search crime movies..."
      genreId={80}
      searchWithinGenre
    />
  );
}

export default CrimeMovies;
