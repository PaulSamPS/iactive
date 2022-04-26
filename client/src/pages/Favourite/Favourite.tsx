import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getFavouriteNews } from '../../redux/actions/favouriteAction';
import { Card } from '../../components/Card/Card';
import { getNews } from '../../redux/actions/newsAction';
import { Spinner } from '../../components/Spinner/Spinner';
import { ReactComponent as ArrowIcon } from '../../helpers/icons/arrow.svg';
import { useNavigate } from 'react-router-dom';
import styles from './Favourite.module.scss';

export const Favourite = (): JSX.Element => {
  const { favouriteNews, isLoading } = useAppSelector((state) => state.favouriteReducer);
  const { sortBy } = useAppSelector((state) => state.sortReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(getFavouriteNews());
    dispatch(getNews(sortBy));
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (favouriteNews.length <= 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.back} onClick={() => navigate('/')}>
          <ArrowIcon /> На главную
        </div>
        <h2 className={styles.notFound}>Вы пока ничего не добавили в избранное</h2>;
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.back} onClick={() => navigate('/')}>
        <ArrowIcon /> На главную
      </div>
      {favouriteNews.map((f) => (
        <Card key={f.id} news={f} />
      ))}
    </div>
  );
};
