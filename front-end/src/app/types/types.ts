import { type StaticImageData } from 'next/image';

export type Label = 'top' | 'women' | 'men' | 'new' | 'sale';

export type View = 'List' | 'Grid';
export type Sort = 'popularity' | 'price-low' | 'price-high';

export interface Image {
  id: number;
  color: string;
  pathImg: StaticImageData;
}

export type Input = 'password' | 'text';