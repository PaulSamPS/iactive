import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { INewsInterface } from '../../interfaces/news.interface';
import { IFavouriteInterface } from '../../interfaces/favourite.interface';

export interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  news: INewsInterface | IFavouriteInterface;
}
