import type { NextApiRequest, NextApiResponse } from 'next'
import { CocktailApiResponse } from '../../interfaces/CocktailApiResponse'

export async function fetchAllCocktails() {
  const apiKey: string = process.env.NEXT_PUBLIC_RAPIDAPI_API_KEY!
  const drinks = (await fetch(
    `https://www.thecocktaildb.com/api/json/v2/${apiKey}/popular.php`
  )
    .then((res) => res.json())
    .then((data) => data.drinks)) as CocktailApiResponse[]

  return drinks
}

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await fetchAllCocktails()
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}
