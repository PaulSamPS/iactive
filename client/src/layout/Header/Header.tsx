import React from 'react';
import { Button } from '../../components/Button/Button';
import { ReactComponent as FavoriteIcon } from '../../helpers/icons/star.svg';
import { useNavigate } from 'react-router-dom';
import { AppendNews } from './AppendNews/AppendNews';
import styles from './Header.module.scss';

export const Header = (): JSX.Element => {
  const [modal, setModal] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const appendNews = async () => {
    setModal(true);
  };

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
          <Button appearance='primary' onClick={appendNews}>
            Добавить новость
          </Button>
        </div>
        <AppendNews setModal={setModal} modal={modal} />
      </div>
    </div>
  );
};
