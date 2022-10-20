import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export const Footer: FC = () => {
  return (
    <footer className="flex p-6 h-10 text-black bg-white items-center justify-between">
      <span className="text-slate-800 font-extralight">
        Project created by Juan Galu&eacute;
      </span>
      <span className="text-slate-800 font-extralight">
        You can check the code in my{" "}
        <a
          href="https://github.com/juancgalueweb/nextjs-rootlab-final-project"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 font-medium"
        >
          <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon> repo
        </a>
      </span>
    </footer>
  );
};
