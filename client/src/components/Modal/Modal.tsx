import React from 'react';
import {ReactComponent as CloseIcon} from '../../helpers/icons/close.svg';
import {ModalProps} from './Modal.props';
import {AnimatePresence, motion} from 'framer-motion';
import styles from './Modal.module.scss';

export const Modal: React.FC<ModalProps> = ({children, setModal, modal}): JSX.Element => {
  const handleCloseModal = () => {
    setModal(false);
  };

  const variants = {
    open: {opacity: 1},
    closed: {opacity: 0},
  };

  const variantsModal = {
    open: {opacity: 1, y: 0},
    closed: {opacity: 0, y: '-100%'},
  };

  return (
    <AnimatePresence>
      {modal &&
        <motion.div
          className={styles.overlay}
          onClick={handleCloseModal}
          animate={modal ? 'open' : 'closed'}
          variants={variants}
          initial={'closed'}
          exit={'closed'}
          transition={{
            damping: 20,
            type: 'spring',
            stiffness: 360,
          }}
        >
          <motion.div
            className={styles.modal}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            animate={modal ? 'open' : 'closed'}
            variants={variantsModal}
            initial={'closed'}
            exit={'closed'}
            transition={{
              damping: 20,
              type: 'spring',
              stiffness: 360,
            }}
          >
            <CloseIcon onClick={handleCloseModal}/>
            {children}
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>
  );
};

