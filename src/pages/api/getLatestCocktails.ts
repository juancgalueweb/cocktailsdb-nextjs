import type { NextApiRequest, NextApiResponse } from 'next';
import { ICocktail } from '../../global/ICocktail';

//Exporting the fetching all cocktails as a function
export async function fetchLatestCocktails() {
  const apiKey: string = process.env.NEXT_PUBLIC_RAPIDAPI_API_KEY!;
  const drinks = (await fetch(
    `https://www.thecocktaildb.com/api/json/v2/${apiKey}/latest.php`
  )
    .then((res) => res.json())
    .then((data) => data.drinks)) as ICocktail[];

  return drinks;
}

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await fetchLatestCocktails();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
