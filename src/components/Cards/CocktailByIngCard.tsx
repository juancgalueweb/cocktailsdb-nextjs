import { Card } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { ICocktailsByIng } from '../../global/ICocktailsByIng';

interface TProps {
  drink: ICocktailsByIng;
}

const { Meta } = Card;

export const CocktailsByIngCard: FC<TProps> = ({ drink }) => {
  const router = useRouter();
  return (
    <div
      onClick={() =>
        router.push(`/search-results-ingredient-detail?id=${drink.idDrink}`)
      }
    >
      <Card
        className='transform transition duration-300 hover:scale-[1.03]'
        hoverable
        cover={
          <Image
            src={drink.strDrinkThumb}
            alt={`${drink.strDrink} Image`}
            blurDataURL={drink.base64}
            width={606}
            height={606}
            placeholder='blur'
          />
        }
      >
        <Meta title={drink.strDrink}></Meta>
      </Card>
    </div>
  );
};
