import Link from "next/link";
import { FC } from "react";

export const Nav: FC = () => {
  return (
    <nav className="w-full flex gap-5 p-6 items-center text-2xl">
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/movies">
        <a>Movies</a>
      </Link>
    </nav>
  );
};
