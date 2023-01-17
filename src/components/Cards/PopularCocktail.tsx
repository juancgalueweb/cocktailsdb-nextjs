import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Tag } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { CocktailApiResponse } from '../../interfaces/CocktailApiResponse';
interface TProps {
  drink: CocktailApiResponse;
}

const { Meta } = Card;

export const PopularCocktail: FC<TProps> = ({ drink }) => {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/popular-cocktails/${drink.idDrink}`)}>
      <Card
        className='transform transition duration-300 hover:scale-[1.03]'
        hoverable
        cover={
          <Image
            src={drink.img}
            alt={`${drink.strDrink} Image`}
            blurDataURL={drink.base64}
            width={606}
            height={606}
            placeholder='blur'
          />
        }
      >
        <Meta
          title={drink.strDrink}
          description={drink.strCategory ? drink.strCategory : ''}
        ></Meta>
        <Tag
          className='mt-3 mr-3'
          color={drink.strAlcoholic === 'Alcoholic' ? 'magenta' : 'green'}
        >
          {drink.strAlcoholic}
        </Tag>
        {drink.strVideo ? (
          <a href={drink.strVideo} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon
              icon={faYoutube}
              size='lg'
              className='text-[#FF0000]'
            ></FontAwesomeIcon>
          </a>
        ) : null}
      </Card>
    </div>
  );
};
