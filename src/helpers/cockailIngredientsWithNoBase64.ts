import { CocktailApiResponse } from '../interfaces/CocktailApiResponse';

export const getIngredientsWithNoBase64 = async (
  cocktail: CocktailApiResponse
) => {
  const baseUrl: string = 'https://www.thecocktaildb.com/images/ingredients/';
  const result: { [key: string]: string } = {};
  const keysArray = Object.keys(cocktail);
  await Promise.all(
    keysArray.map(async (key) => {
      const regex = /strIngredient(\d{1,2})/g;
      if (
        key.match(regex) &&
        cocktail[key as keyof CocktailApiResponse] !== null
      ) {
        const ingredientUrl =
          baseUrl + cocktail[key as keyof CocktailApiResponse] + '-Medium.png';
        result[`${key}Pic`] = ingredientUrl;
      }
    })
  );
  return result;
};
