import { GetServerSideProps, NextPage } from 'next';
import { getPlaiceholder } from 'plaiceholder';
import { v4 as uuidv4 } from 'uuid';
import { CocktailsByIngCard } from '../../components/CocktailsByIng/CocktailByIngCard';
import { ApplicationWrapper } from '../../components/layout/ApplicationWrapper';
import { ICocktailsByIng } from '../../global/ICocktailsByIng';
import { fetchCocktailsByIng } from '../../helpers/fetchCocktailsByIng';

interface TProps {
  drinks: ICocktailsByIng[];
  ingredient: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ingredient = context.query['ingredient'] as string;
  const fetchedDrinks = await fetchCocktailsByIng(ingredient);
  const drinks = await Promise.all(
    fetchedDrinks.map(async (drink) => {
      const { base64, img } = await getPlaiceholder(drink.strDrinkThumb);
      return { ...drink, base64, img };
    })
  );
  return {
    props: { drinks, ingredient },
  };
};

const CocktailsByIngSearchResult: NextPage<TProps> = ({
  drinks,
  ingredient,
}) => {
  const titleMessage = `Cocktails with ${ingredient}`;
  const descriptionMessage = 'Results of the cocktails by searched ingredient';

  return (
    <ApplicationWrapper title={titleMessage} description={descriptionMessage}>
      <div className='flex flex-col justify-center items-center p-6 bg-slate-200'>
        <h1 className='text-4xl pb-6 font-semibold text-transparent bg-clip-text bg-gradient-to-br from-zinc-800 to-zinc-600'>
          Cocktails made of {ingredient}
        </h1>
        <ul className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-3'>
          {drinks.map((drink) => (
            <CocktailsByIngCard key={uuidv4()} drink={drink} />
          ))}
        </ul>
      </div>
    </ApplicationWrapper>
  );
};

export default CocktailsByIngSearchResult;
