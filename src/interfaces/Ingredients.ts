type LoadImageReturn = {
  src: string
  height: number
  width: number
  type?: string
}

export interface Ingredients {
  [key: string]: { base64: string; img: LoadImageReturn }
}
