type ILoadImageReturn = {
  src: string;
  height: number;
  width: number;
  type?: string;
};

export interface ICocktailsByIng {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
  base64: string;
  img: ILoadImageReturn;
}
