import { ICocktailsByIng } from '../global/ICocktailsByIng';

export async function fetchCocktailsByIng(ingredient: string) {
  const apiKey: string = process.env.NEXT_PUBLIC_RAPIDAPI_API_KEY!;
  const requestHeaders: HeadersInit = {
    'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
    'x-rapidapi-key': apiKey,
  };
  const options = {
    method: 'GET',
    headers: requestHeaders,
  };
  const url = `https://the-cocktail-db.p.rapidapi.com/filter.php?i=${ingredient}`;
  const drinks: ICocktailsByIng[] = await fetch(url, options)
    .then((res) => res.json())
    .then((data) => data.drinks);
  return drinks;
}
