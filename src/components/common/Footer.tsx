import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const Footer: FC = () => {
  return (
    <footer className="flex p-6 md:h-20 lg:h-10 xl:h-10 text-black bg-white items-center justify-between">
      <span className="text-slate-800 font-extralight mx-2">
        Project created by Juan C. Galu&eacute; R.
      </span>
      <span className="text-blue-600 font-extralight mx-2">
        Email me to{" "}
        <a
          href="mailto: juancgalue@gmail.com?subject=Email%20from%20NextJS%20Vercel%20App"
          className="text-blue-600 font-medium"
        >
          <FontAwesomeIcon icon={faEnvelope} className="mx-1"></FontAwesomeIcon>{" "}
          juancgalue@gmail.com
        </a>{" "}
      </span>
      <span className="text-slate-800 font-extralight mx-2">
        You can check the code in my{" "}
        <a
          href="https://github.com/juancgalueweb/nextjs-rootlab-final-project"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 font-medium"
        >
          <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon> Github repo
        </a>
      </span>
    </footer>
  );
};
