import GenrePage from "../components/GenrePage";
import { getActionMovies } from "../services/api";

function ActionMovies() {
  return (
    <GenrePage
      placeholder="Search action movies..."
      fetchGenreMovies={getActionMovies}
      genreId={28}
      searchWithinGenre
    />
  );
}

export default ActionMovies;
