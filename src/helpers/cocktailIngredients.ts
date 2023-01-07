import { ICocktail } from '../global/ICocktail';
import { IIngredients } from '../global/IIngredients';
import { getPlaiceholder } from 'plaiceholder';

export const getIngredientsFromCocktail = (
  cocktail: ICocktail
): IIngredients => {
  const baseUrl: string = 'https://www.thecocktaildb.com/images/ingredients/';
  const result: IIngredients = {};
  const keysArray = Object.keys(cocktail);
  keysArray.map(async (key) => {
    const regex = /strIngredient(\d{1,2})/g;
    if (key.match(regex) && cocktail[key as keyof ICocktail] !== null) {
      const ingredientUrl =
        baseUrl + cocktail[key as keyof ICocktail] + '-Medium.png';
      const { base64, img } = await getPlaiceholder(ingredientUrl);
      result[`${key}Pic`] = { base64: base64, img: img };
    }
  });
  return result;
};
