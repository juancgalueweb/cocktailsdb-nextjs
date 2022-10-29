import axios from "axios";

export async function fetchCocktailById(id: string) {
  const config = {
    params: { i: id },
    headers: {
      "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
      "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY,
    },
  };
  try {
    const cocktail = await axios.get(
      "https://the-cocktail-db.p.rapidapi.com/lookup.php",
      config
    );
    return cocktail.data.drinks;
  } catch (error) {
    console.error(error);
  }
}
