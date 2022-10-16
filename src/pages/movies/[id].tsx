import { GetServerSideProps, NextPage } from "next";
import { ApplicationWrapper } from "../../components/layout/ApplicationWrapper";
import { IMovie } from "../../global/IMovie";

interface TProps {
  movie: IMovie;
}

const MovieDetailPage: NextPage<TProps> = ({ movie }) => {
  return (
    <ApplicationWrapper title={movie.Title}>
      <h1>{movie.Title}</h1>
    </ApplicationWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movies/${context.params?.id}`
  );
  const movie = await res.json();
  return {
    props: { movie },
  };
};

export default MovieDetailPage;
