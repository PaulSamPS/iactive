import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface MobileMenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setModalMenu: (click: boolean) => void;
  setModal: (click: boolean) => void;
}
