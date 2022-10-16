import { useMovies } from "../../hooks/useMovies";
import { Movie } from "./Movie/Movie";

export const MovieList = () => {
  const movies = useMovies();
  return (
    <div className="flex flex-col justify-center text-white items-center p-6">
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
};
