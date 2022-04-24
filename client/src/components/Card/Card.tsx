import React from 'react';
import { CardProps } from './Card.props';
import { Button } from '../Button/Button';
import { ReactComponent as ArrowIcon } from '../../helpers/icons/arrow.svg';
import { ReactComponent as SettingsIcon } from '../../helpers/icons/settings.svg';
import { ReactComponent as RectangleIcon } from '../../helpers/icons/rectangle.svg';
import { ReactComponent as StarIcon } from '../../helpers/icons/star.svg';
import cn from 'classnames';
import moment from 'moment';
import styles from './Card.module.scss';
import { useAppDispatch } from '../../hooks/redux';
import { addToFavouriteNews } from '../../redux/actions/favouriteAction';

export const Card = ({ news, ...props }: CardProps): JSX.Element => {
  const time = moment(news.createdAt).format('HH:mm');
  const dispatch = useAppDispatch();

  const addToFavourite = async (newsId: number) => {
    dispatch(addToFavouriteNews(newsId));
  };

  return (
    <div className={styles.wrapper} {...props}>
      <img className={styles.avatar} src={`http://localhost:5000/avatar/${news.avatar}`} alt={news.author} />
      <div className={styles.title}>{news.author}</div>
      <div className={styles.position}>
        <Button appearance='card'>Левый</Button>
        <Button appearance='card'>Центр</Button>
        <Button appearance='card'>Правый</Button>
      </div>
      <div className={styles.icons}>
        <ArrowIcon />
        <SettingsIcon />
        <RectangleIcon />
        <StarIcon
          className={cn(styles.favourite, {
            [styles.append]: news.isFavourite,
          })}
          onClick={() => addToFavourite(news.id)}
        />
      </div>
      <span className={styles.time}>{time}</span>
      <p className={styles.body}>{news.body}</p>
      <div className={styles.image}>
        <span>Далее</span>
        <img src={`http://localhost:5000/news/${news.img}`} alt={news.author} />
      </div>
    </div>
  );
};
