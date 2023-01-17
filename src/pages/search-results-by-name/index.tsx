import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { getPlaiceholder } from 'plaiceholder';
import { useCallback, useEffect, useState } from 'react';
import { CocktailDrawerById } from '../../components/Cards/CocktailDrawerById';
import { ApplicationWrapper } from '../../components/layout/ApplicationWrapper';
import { CocktailApiResponse } from '../../global/CocktailApiResponse';
import { fetchCocktailsbyName } from '../api/getCocktailByName';
interface TProps {
  drinks: CocktailApiResponse[];
  name: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const name = context.query['name'] as string;
  const fetchedDrinks = await fetchCocktailsbyName(name);
  const drinks = await Promise.all(
    fetchedDrinks.map(async (drink) => {
      const { base64, img } = await getPlaiceholder(drink.strDrinkThumb);
      return { ...drink, base64, img };
    })
  );
  return {
    props: { drinks, name },
  };
};

const CocktailsByNameSearchResult: NextPage<TProps> = ({ drinks }) => {
  const router = useRouter();
  const titleMessage = 'Cocktails by name';
  const descriptionMessage = 'Results of the cocktails searched by name';
  const [current, setCurrent] = useState(1);

  const chunks = useCallback((allDrinks: CocktailApiResponse[]) => {
    let newArray: CocktailApiResponse[] = [];
    const finalArray: CocktailApiResponse[][] = [];
    if (allDrinks.length <= 10) {
      finalArray.push(allDrinks);
    } else {
      allDrinks.forEach((drink, idx) => {
        newArray.push(drink);
        if ((idx + 1) % 10 === 0) {
          finalArray.push(newArray);
          newArray = [];
        } else if (idx === allDrinks.length - 1 && newArray.length !== 0) {
          finalArray.push(newArray);
        }
      });
    }
    return finalArray;
  }, []);

  const [dataToShow, setDataToShow] = useState(chunks(drinks)[0]);
  const onChange: PaginationProps['onChange'] = (page) => {
    setDataToShow(chunks(drinks)[page - 1]);
    setCurrent(page);
    router.replace(
      {
        query: { ...router.query, page: page },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    setDataToShow(chunks(drinks)[0]);
    setCurrent(1);
  }, [drinks, chunks]);

  return (
    <ApplicationWrapper title={titleMessage} description={descriptionMessage}>
      <div className='flex flex-col justify-center items-center p-6 bg-slate-200'>
        <ul className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-3'>
          {dataToShow.map((drink) => (
            <CocktailDrawerById key={drink.idDrink} drink={drink} />
          ))}
        </ul>
        <Pagination
          hideOnSinglePage
          simple
          pageSize={10}
          current={current}
          onChange={onChange}
          total={drinks.length}
          showTotal={(total) => `${total} cocktails in total`}
        />
      </div>
    </ApplicationWrapper>
  );
};

export default CocktailsByNameSearchResult;
