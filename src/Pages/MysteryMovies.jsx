import GenrePage from "../Components/GenrePage";

function MysteryMovies() {
  return (
    <GenrePage
      placeholder="Search mystery movies..."
      genreId={9648}
      searchWithinGenre
    />
  );
}

export default MysteryMovies;
