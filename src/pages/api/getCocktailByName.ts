import type { NextApiRequest, NextApiResponse } from 'next';
import { CLIENT_PUBLIC_FILES_PATH } from 'next/dist/shared/lib/constants';
import { ICocktail } from '../../global/ICocktail';

export async function fetchCocktailsbyName(name: string) {
  const apiKey: string = process.env.NEXT_PUBLIC_RAPIDAPI_API_KEY!;
  const url: string = `https://www.thecocktaildb.com/api/json/v2/${apiKey}/search.php?s=${name}`;
  const drinks: ICocktail[] = (await fetch(url)
    .then((res) => res.json())
    .then((data) => data.drinks)) as ICocktail[];
  return drinks;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const name = req.query['name'] as string;
    const data = await fetchCocktailsbyName(name);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
