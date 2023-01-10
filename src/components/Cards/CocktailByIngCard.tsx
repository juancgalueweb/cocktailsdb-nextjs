import { Button, Card } from 'antd';
import Image from 'next/image';
import React, { FC } from 'react';
import { ICocktailsByIng } from '../../global/ICocktailsByIng';

interface TProps {
  drink: ICocktailsByIng;
}

const { Meta } = Card;

export const CocktailsByIngCard: FC<TProps> = ({ drink }) => {
  return (
    <li>
      <Card
        className='transform transition duration-300 hover:scale-[1.03]'
        hoverable
        style={{ cursor: 'default' }}
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
        extra={
          <Button
            type='primary'
            href={`/search-results-ingredient-detail?id=${drink.idDrink}`}
            className='my-3'
          >
            More
          </Button>
        }
      >
        <Meta title={drink.strDrink}></Meta>
      </Card>
    </li>
  );
};
