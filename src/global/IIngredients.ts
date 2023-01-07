type ILoadImageReturn = {
  src: string;
  height: number;
  width: number;
  type?: string;
};

export interface IIngredients {
  [key: string]: { base64: string; img: ILoadImageReturn };
}
