import GenrePage from "../components/GenrePage";
import { getDramaMovies } from "../services/api";

function DramaMovies() {
  return (
    <GenrePage
      placeholder="Search drama movies..."
      fetchGenreMovies={getDramaMovies}
      genreId={18}
      searchWithinGenre
    />
  );
}

export default DramaMovies;
