import Link from "next/link";
import { FC } from "react";

export const Nav: FC = () => {
  return (
    <nav className="w-full flex gap-5 p-2 pl-4 items-center text-xl">
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/movies">
        <a>Movies</a>
      </Link>
    </nav>
  );
};
