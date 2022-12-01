import Link from "next/link";
import { FC } from "react";

export const Nav: FC = () => {
  return (
    <nav className="w-full flex gap-5 p-2 pl-4 items-center text-xl">
      <Link href="/">Home</Link>
      <Link href="/popular-cocktails">Pupular Cocktails</Link>
    </nav>
  );
};
