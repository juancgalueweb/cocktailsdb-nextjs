import { NextPage } from "next";
import { ApplicationWrapper } from "../components/layout/ApplicationWrapper";

const Home: NextPage = () => {
  const titleMessage = "Home";
  const descriptionMessage = "Home of the RootLab movies website";

  return (
    <ApplicationWrapper title={titleMessage} description={descriptionMessage}>
      <div className="grow flex flex-col justify-center items-center bg-[url('/images/home-bg.jpg')]">
        <div className="grow bg-black w-full justify-center items-center flex opacity-70">
          <h1 className="text-7xl font-bold text-white">
            Bienvenidos a Rootlab Movies
          </h1>
        </div>
      </div>
    </ApplicationWrapper>
  );
};

export default Home;
