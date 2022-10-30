import { NextPage } from "next";
import { ApplicationWrapper } from "../../components/layout/ApplicationWrapper";
import { ICocktail } from "../../global/ICocktail";
import { PopularCocktail } from "../../components/PopularCocktail/PopularCocktail";
import { GetStaticProps } from "next";
import { v4 as uuidv4 } from "uuid";
import { fetchAllCocktails } from "../../helpers/fetchAllCocktails";

interface TProps {
  drinks: ICocktail[];
}

const Popularcocktails: NextPage<TProps> = ({ drinks }) => {
  const titleMessage = "Popular Cocktails";
  const descriptionMessage = "Popular cocktails of the cocktails website";

  return (
    <ApplicationWrapper title={titleMessage} description={descriptionMessage}>
      <div className="flex flex-col justify-center items-center p-6 bg-slate-200">
        <h1 className="text-4xl pb-6 font-semibold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
          Most populars cocktails
        </h1>
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {drinks.map((drink) => (
            <PopularCocktail key={uuidv4()} drink={drink} />
          ))}
        </ul>
      </div>
    </ApplicationWrapper>
  );
};

export default Popularcocktails;

export const getStaticProps: GetStaticProps = async () => {
  const drinks = await fetchAllCocktails();

  return {
    props: {
      drinks,
    },
  };
};
