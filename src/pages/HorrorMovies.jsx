import GenrePage from "../components/GenrePage";
import { getHorrorMovies } from "../services/api";

function HorrorMovies() {
  return (
    <GenrePage
      placeholder="Search horror movies..."
      fetchGenreMovies={getHorrorMovies}
      genreId={27}
      searchWithinGenre
    />
  );
}

export default HorrorMovies;
