import GenrePage from "../Components/GenrePage";
import { getDramaMovies } from "../Services/API";

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
