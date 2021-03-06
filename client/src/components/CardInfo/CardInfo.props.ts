import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { INewsInterface } from '../../interfaces/news.interface';

export interface CardInfoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  news: INewsInterface;
}
