type LoadImageReturn = {
  src: string
  height: number
  width: number
  type?: string
}

export interface CocktailsByIng {
  strDrink: string
  strDrinkThumb: string
  idDrink: string
  base64: string
  img: LoadImageReturn
}
