import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { ICocktail } from "./global/ICocktail";

export async function middleware(request: NextRequest) {
  const urlItems = request.nextUrl.pathname
    .split("/")
    .filter((item) => item !== "");
  if (urlItems[0] === "popular-cocktails" && urlItems.length === 2) {
    const cocktailId = urlItems[1];

    const apiKey: string = process.env.NEXT_PUBLIC_API_KEY!;
    const requestHeaders: HeadersInit = {
      "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
      "x-rapidapi-key": apiKey,
    };

    const cocktails: ICocktail[] = (await fetch(
      "https://the-cocktail-db.p.rapidapi.com/popular.php",
      {
        headers: requestHeaders,
      }
    )
      .then((res) => res.json())
      .then((data) => data.drinks)) as ICocktail[];

    if (!cocktails.some((drink: ICocktail) => drink.idDrink === cocktailId)) {
      return NextResponse.redirect(new URL("/popular-cocktails", request.url));
    }
  }
  return NextResponse.next();
}
