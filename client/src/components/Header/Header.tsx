import React from 'react';
import styles from './Header.module.scss';
import { Button } from '../Button/Button';
import { ReactComponent as FavoriteIcon } from '../../helpers/icons/star.svg';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.logo} onClick={() => navigate('/')}>
          IActive
        </h1>
        <div className={styles.right}>
          <div className={styles.favourite} onClick={() => navigate('/favourite')}>
            <FavoriteIcon />
            <span>Избранное</span>
          </div>
          <Button appearance='primary'>Добавить новость</Button>
        </div>
      </div>
    </div>
  );
};
