import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="flex p-6 h-20 text-black bg-slate-100 items-center justify-center">
      <a
        href="https://rootstack.com/en"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by <span className="">Rootstack</span>
      </a>
    </footer>
  );
};
