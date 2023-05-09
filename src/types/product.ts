export interface IProduct {
  id: number;
  name: string;
  price: number;
  image: string | File | null;
}

export type Products = IProduct[];
