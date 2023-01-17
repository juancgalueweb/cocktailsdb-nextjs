import type { NextApiRequest, NextApiResponse } from 'next';
import { CocktailApiResponse } from '../../global/CocktailApiResponse';

export async function fetchCocktailById(id: string) {
  const apiKey: string = process.env.NEXT_PUBLIC_RAPIDAPI_API_KEY!;
  const url = `https://www.thecocktaildb.com/api/json/v2/${apiKey}/lookup.php?i=${id}`;
  const drink: CocktailApiResponse = await fetch(url)
    .then((res) => res.json())
    .then((data) => data.drinks[0]);
  return drink;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id = req.query['id'] as string;
    const data = await fetchCocktailById(id);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
