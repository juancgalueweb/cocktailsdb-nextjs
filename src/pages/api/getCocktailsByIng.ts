import type { NextApiRequest, NextApiResponse } from 'next';
import { ICocktailsByIng } from '../../global/ICocktailsByIng';

export async function fetchCocktailsByIng(ingredient: string) {
  const apiKey: string = process.env.NEXT_PUBLIC_RAPIDAPI_API_KEY!;
  const url = `https://www.thecocktaildb.com/api/json/v2/${apiKey}/filter.php?i=${ingredient}`;
  const drinks: ICocktailsByIng[] = await fetch(url)
    .then((res) => res.json())
    .then((data) => data.drinks);
  return drinks;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const ingredient = req.query['ingredient'] as string;
    const data = await fetchCocktailsByIng(ingredient);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
