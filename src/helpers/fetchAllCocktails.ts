import { ICocktail } from "../global/ICocktail";

export async function fetchAllCocktails() {
  const apiKey: string = process.env.NEXT_PUBLIC_API_KEY!;
  const requestHeaders: HeadersInit = {
    "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
    "x-rapidapi-key": apiKey,
  };

  const drinks: ICocktail[] = (await fetch(
    "https://the-cocktail-db.p.rapidapi.com/popular.php",
    {
      headers: requestHeaders,
    }
  )
    .then((res) => res.json())
    .then((data) => data.drinks)) as ICocktail[];

  return drinks;
}
