import type { NextApiRequest, NextApiResponse } from 'next';
import { ICocktail } from '../../global/ICocktail';

export async function fetchAllCocktails() {
  const apiKey: string = process.env.NEXT_PUBLIC_RAPIDAPI_API_KEY!;
  const requestHeaders: HeadersInit = {
    'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
    'x-rapidapi-key': apiKey,
  };

  const drinks = (await fetch(
    'https://the-cocktail-db.p.rapidapi.com/popular.php',
    {
      headers: requestHeaders,
    }
  )
    .then((res) => res.json())
    .then((data) => data.drinks)) as ICocktail[];

  return drinks;
}

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await fetchAllCocktails();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
