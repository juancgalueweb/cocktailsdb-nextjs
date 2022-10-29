import axios from "axios";

export async function fetchPopularCocktails() {
  const config = {
    headers: {
      "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
      "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY,
    },
  };
  try {
    const cocktails = await axios.get(
      "https://the-cocktail-db.p.rapidapi.com/popular.php",
      config
    );
    return cocktails.data.drinks;
  } catch (error) {
    console.error(error);
  }
}
