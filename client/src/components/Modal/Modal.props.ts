import {DetailedHTMLProps, HTMLAttributes} from 'react';

export interface ModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    setModal: (click: boolean) => void
    modal: boolean
}
