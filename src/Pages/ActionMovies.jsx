import GenrePage from "../Components/GenrePage";
import { getActionMovies } from "../Services/API";

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
