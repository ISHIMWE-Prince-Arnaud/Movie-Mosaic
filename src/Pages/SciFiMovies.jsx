import GenrePage from "../Components/GenrePage";

function SciFiMovies() {
  return (
    <GenrePage
      placeholder="Search Sci-Fi (Science Fiction) movies..."
      genreId={878}
      searchWithinGenre
    />
  );
}

export default SciFiMovies;
