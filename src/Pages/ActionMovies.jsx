import GenrePage from "../Components/GenrePage";
import { getActionMovies } from "../Services/API";

function ActionMovies() {
  return (
    <GenrePage
      placeholder="Search action movies..."
      fetchGenreMovies={getActionMovies}
      searchWithinGenre
    />
  );
}

export default ActionMovies;
