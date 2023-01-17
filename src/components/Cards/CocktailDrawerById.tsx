import { Card, Drawer } from 'antd';
import Image from 'next/image';
import { FC, useState } from 'react';
import { CocktailApiResponse } from '../../global/CocktailApiResponse';
import { CocktailsByIng } from '../../global/CocktailsByIng';
import { getIngredientsWithNoBase64 } from '../../helpers/cockailIngredientsWithNoBase64';
import { fetchCocktailById } from '../../pages/api/getCocktailById';
import { DrawerByIdElements } from '../Drawer/DrawerByIdElements';

interface TProps {
  drink: CocktailsByIng;
}
const { Meta } = Card;

export const CocktailDrawerById: FC<TProps> = ({ drink }) => {
  const [open, setOpen] = useState(false);
  const [cocktail, setCocktail] = useState({} as CocktailApiResponse);
  const [ingredient, setIngredient] = useState({} as { [key: string]: string });
  const showDrawer = async () => {
    // Get a single drink by its id
    const singleDrink = await fetchCocktailById(drink.idDrink);
    const ingredientsUrl = await getIngredientsWithNoBase64(singleDrink);
    setIngredient(ingredientsUrl);
    setCocktail(singleDrink);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Drawer
        size='large'
        title={cocktail.strDrink}
        placement='right'
        onClose={onClose}
        open={open}
      >
        <DrawerByIdElements cocktail={cocktail} ingredient={ingredient} />
      </Drawer>
      <div onClick={() => showDrawer()}>
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
    </>
  );
};
