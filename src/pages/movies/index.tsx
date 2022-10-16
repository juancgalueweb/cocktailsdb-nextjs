import { NextPage } from "next";
import { ApplicationWrapper } from "../../components/layout/ApplicationWrapper";
import { MovieList } from "../../components/MovieList/MovieList";

const Movies: NextPage = () => {
  const titleMessage = "Movies";
  const descriptionMessage = "Movies of the rootlab movies website";

  return (
    <ApplicationWrapper title={titleMessage} description={descriptionMessage}>
      <MovieList />
    </ApplicationWrapper>
  );
};

export default Movies;
