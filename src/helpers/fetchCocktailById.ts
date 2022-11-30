import { ICocktail } from "../global/ICocktail";

export async function fetchCocktailById(id: string) {
  const apiKey: string = process.env.NEXT_PUBLIC_API_KEY!;
  const requestHeaders: HeadersInit = {
    "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
    "x-rapidapi-key": apiKey,
  };
  const options = {
    method: "GET",
    headers: requestHeaders,
  };
  const url = `https://the-cocktail-db.p.rapidapi.com/lookup.php?i=${id}`;
  const drink: ICocktail = await fetch(url, options)
    .then((res) => res.json())
    .then((data) => data.drinks[0]);
  return drink;
}
