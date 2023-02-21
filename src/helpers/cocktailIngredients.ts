import { getPlaiceholder } from 'plaiceholder'
import { CocktailApiResponse } from '../interfaces/CocktailApiResponse'
import { Ingredients } from '../interfaces/Ingredients'

export const getIngredientsFromCocktail = async (
  cocktail: CocktailApiResponse
) => {
  const baseUrl = 'https://www.thecocktaildb.com/images/ingredients/'
  const result: Ingredients = {}
  const keysArray = Object.keys(cocktail)
  await Promise.all(
    keysArray.map(async key => {
      const regex = /strIngredient(\d{1,2})/g
      if (
        key.match(regex) &&
        cocktail[key as keyof CocktailApiResponse] !== null
      ) {
        const ingredientUrl =
          baseUrl + cocktail[key as keyof CocktailApiResponse] + '-Medium.png'
        const { base64, img } = await getPlaiceholder(ingredientUrl)
        result[`${key}Pic`] = { base64: base64, img: img }
      }
    })
  )

  return result
}
