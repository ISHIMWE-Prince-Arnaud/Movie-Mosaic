import GenrePage from "../components/GenrePage";

function DocumentaryMovies() {
  return (
    <GenrePage
      placeholder="Search documentary movies..."
      genreId={99}
      searchWithinGenre
    />
  );
}

export default DocumentaryMovies;
