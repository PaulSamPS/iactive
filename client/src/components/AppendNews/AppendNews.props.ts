import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface AppendNewsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setModal: (click: boolean) => void;
  setUpdate?: (click: boolean) => void;
  modal: boolean;
  update?: boolean;
  newsId?: number;
  avatar?: string;
  img?: string;
}
