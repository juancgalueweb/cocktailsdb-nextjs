import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { ICocktail } from "./global/ICocktail";
import { fetchAllCocktails } from "./helpers/fetchAllCocktails";

export async function middleware(request: NextRequest) {
  const urlItems = request.nextUrl.pathname
    .split("/")
    .filter((item) => item !== "");
  if (urlItems[0] === "popular-cocktails" && urlItems.length === 2) {
    const cocktailId = urlItems[1];
    const cocktails = await fetchAllCocktails();
    if (!cocktails.some((drink: ICocktail) => drink.idDrink === cocktailId)) {
      return NextResponse.redirect(new URL("/popular-cocktails", request.url));
    }
  }
  return NextResponse.next();
}
