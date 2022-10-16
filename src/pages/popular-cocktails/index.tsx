import { NextPage } from "next";
import { ApplicationWrapper } from "../../components/layout/ApplicationWrapper";
import { ICocktail } from "../../global/ICocktail";
import { PopularCocktail } from "../../components/PopularCocktail/PopularCocktail";
import { GetStaticProps } from "next";
import axios from "axios";

interface TProps {
  drinks: ICocktail[];
}

const Popularcocktails: NextPage<TProps> = ({ drinks }) => {
  const titleMessage = "Movies";
  const descriptionMessage = "Movies of the rootlab movies website";

  return (
    <ApplicationWrapper title={titleMessage} description={descriptionMessage}>
      <div className="flex flex-col justify-center text-white items-center p-6">
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {drinks.map((drink) => (
            <PopularCocktail key={drink.idDrink} drink={drink} />
          ))}
        </ul>
      </div>
    </ApplicationWrapper>
  );
};

export default Popularcocktails;

export const getStaticProps: GetStaticProps = async () => {
  const config = {
    headers: {
      "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
      "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY,
    },
  };
  console.log(process.env.NEXT_PUBLIC_API_KEY);
  const cocktails = await axios.get(
    "https://the-cocktail-db.p.rapidapi.com/popular.php",
    config
  );
  const drinks = cocktails.data.drinks;
  return {
    props: {
      drinks,
    },
  };
};
