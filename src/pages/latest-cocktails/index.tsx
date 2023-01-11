import { GetStaticProps, NextPage } from 'next';
import { getPlaiceholder } from 'plaiceholder';
import { MostRecentCocktails } from '../../components/Cards/MostRecentCocktails';
import { ApplicationWrapper } from '../../components/layout/ApplicationWrapper';
import { ICocktail } from '../../global/ICocktail';
import { fetchLatestCocktails } from '../api/getLatestCocktails';

interface TProps {
  drinks: ICocktail[];
}

const LatestCocktails: NextPage<TProps> = ({ drinks }) => {
  const titleMessage = 'Latest Cocktails';
  const descriptionMessage = 'Latest cocktails of the cocktails website';

  return (
    <ApplicationWrapper title={titleMessage} description={descriptionMessage}>
      <div className='flex flex-col justify-center items-center p-6 bg-slate-200'>
        <h1 className='text-4xl pb-6 font-semibold text-transparent bg-clip-text bg-gradient-to-br from-zinc-800 to-zinc-600'>
          Latest cocktails
        </h1>
        <ul className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-3'>
          {drinks.map((drink) => (
            <MostRecentCocktails key={drink.idDrink} drink={drink} />
          ))}
        </ul>
      </div>
    </ApplicationWrapper>
  );
};

export default LatestCocktails;

export const getStaticProps: GetStaticProps = async () => {
  const fetchedDrinks = await fetchLatestCocktails();
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
