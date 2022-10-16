import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { IMovie } from "../../../global/IMovie";

interface TProps {
  movie: IMovie;
}

export const Movie: FC<TProps> = ({ movie }) => {
  return (
    <li>
      <Link href={`/movies/${movie.id}`}>
        <Image
          className="cursor-pointer"
          src={movie.Poster}
          alt={`${movie.Title} Poster`}
          width={300}
          height={447}
        />
      </Link>
      <p className="text-lg">{movie.Title}</p>
    </li>
  );
};
