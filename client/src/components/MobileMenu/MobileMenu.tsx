import React from 'react';
import { MobileMenuProps } from './MobileMenu.props';
import { ReactComponent as CloseIcon } from '../../helpers/icons/close.svg';
import { Button } from '../Button/Button';
import { ReactComponent as FavoriteIcon } from '../../helpers/icons/star.svg';
import { useNavigate } from 'react-router-dom';
import styles from './MobileMenu.module.scss';

export const MobileMenu: React.FC<MobileMenuProps> = ({ setModalMenu, setModal }): JSX.Element => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    setModalMenu(false);
    navigate('/favourite');
  };

  const append = () => {
    setModalMenu(false);
    setModal(true);
  };

  return (
    <div className={styles.wrapper} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
      <CloseIcon onClick={() => setModalMenu(false)} />
      <Button appearance='primary' onClick={append}>
        Добавить новость
      </Button>
      <div className={styles.favourite} onClick={handleNavigate}>
        <FavoriteIcon />
        <span>Избранное</span>
      </div>
    </div>
  );
};
