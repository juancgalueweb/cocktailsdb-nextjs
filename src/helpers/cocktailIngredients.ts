import { ICocktail } from '../global/ICocktail';

type GenericObj = { [key: string]: string };

export function getIngredientsFromCocktail(cocktail: ICocktail): GenericObj {
  const baseUrl: string = 'https://www.thecocktaildb.com/images/ingredients/';
  const result: GenericObj = {};
  const keysArray = Object.keys(cocktail);
  keysArray.map((key) => {
    const regex = /strIngredient(\d{1,2})/g;
    if (key.match(regex) && cocktail[key as keyof ICocktail] !== null) {
      result[`${key}Pic`] =
        baseUrl + cocktail[key as keyof ICocktail] + '-Medium.png';
    }
  });
  return result;
}
