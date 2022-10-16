import { NextPage } from "next";
import { ApplicationWrapper } from "../../components/layout/ApplicationWrapper";
import { ICocktail } from "../../global/ICocktail";

interface TProps {
  drink: ICocktail;
}
//TODO: This component is not ready to view properly
const MovieDetailPage: NextPage<TProps> = ({ drink }) => {
  return (
    <ApplicationWrapper title={drink.strDrink}>
      <h1>{drink.strDrink}</h1>
    </ApplicationWrapper>
  );
};

export default MovieDetailPage;

//TODO: need to write the code to lookup full cocktail details by ID
