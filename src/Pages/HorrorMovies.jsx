import GenrePage from "../Components/GenrePage";
import { getHorrorMovies } from "../Services/API";

function HorrorMovies() {
  return (
    <GenrePage
      placeholder="Search horror movies..."
      fetchGenreMovies={getHorrorMovies}
      searchWithinGenre
    />
  );
}

export default HorrorMovies;
