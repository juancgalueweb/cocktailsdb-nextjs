import { useEffect, useState } from "react";
import { IMovie } from "../global/IMovie";

export const useMovies = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`)
      .then((res) => res.json())
      .then((data: IMovie[]) => setMovies(data.slice(0, 20)))
      .catch((error) => console.error(error));
  }, []);

  return movies;
};
