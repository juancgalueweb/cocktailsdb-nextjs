import { GetStaticProps, NextPage } from 'next';
import { getPlaiceholder } from 'plaiceholder';
import { PopularCocktail } from '../../components/Cards/PopularCocktail';
import { ApplicationWrapper } from '../../components/layout/ApplicationWrapper';
import { CocktailApiResponse } from '../../interfaces/CocktailApiResponse';
import { fetchAllCocktails } from '../api/getPopularCocktails';

interface TProps {
  drinks: CocktailApiResponse[];
}

const Popularcocktails: NextPage<TProps> = ({ drinks }) => {
  const titleMessage = 'Popular Cocktails';
  const descriptionMessage = 'Popular cocktails of the cocktails website';

  return (
    <ApplicationWrapper title={titleMessage} description={descriptionMessage}>
      <div className='flex flex-col justify-center items-center p-6 bg-slate-200'>
        <h1 className='text-4xl pb-6 font-semibold text-transparent bg-clip-text bg-gradient-to-br from-zinc-800 to-zinc-600'>
          Most populars cocktails
        </h1>
        <ul className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-3'>
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
  const fetchedDrinks = await fetchAllCocktails();
  const drinks = await Promise.all(
    fetchedDrinks.map(async (drink) => {
      const { base64, img } = await getPlaiceholder(drink.strDrinkThumb);
      return { ...drink, base64, img };
    })
  );

  return {
    props: {
      drinks,
    },
  };
};
