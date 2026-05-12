import GenrePage from "../components/GenrePage";

function AnimationMovies() {
  return (
    <GenrePage
      placeholder="Search animation movies..."
      genreId={16}
      searchWithinGenre
    />
  );
}

export default AnimationMovies;
