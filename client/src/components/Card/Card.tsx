import React from 'react';
import { CardProps } from './Card.props';
import { Button } from '../Button/Button';
import { ReactComponent as ArrowIcon } from '../../helpers/icons/arrowRight.svg';
import { ReactComponent as SettingsIcon } from '../../helpers/icons/settings.svg';
import { ReactComponent as RectangleIcon } from '../../helpers/icons/rectangle.svg';
import { ReactComponent as StarIcon } from '../../helpers/icons/star.svg';
import cn from 'classnames';
import moment from 'moment';
import styles from './Card.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addToFavouriteNews, removeFromFavouriteNews } from '../../redux/actions/favouriteAction';
import 'moment/locale/ru';
import { AppendNews } from '../../layout/Header/AppendNews/AppendNews';

export const Card = ({ news, ...props }: CardProps): JSX.Element => {
  const { sortBy } = useAppSelector((state) => state.sortReducer);
  const [modal, setModal] = React.useState<boolean>(false);
  const [update, setUpdate] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  moment.locale('ru');

  const time = moment(news.createdAt).format('HH:mm');
  const date = moment(news.createdAt).format('D.MM.y');
  const postedAgo = moment(news.createdAt).fromNow();

  const addToFavourite = async (newsId: number) => {
    await dispatch(addToFavouriteNews(newsId, sortBy));
  };

  const removeFromFavourite = async (newsId: number) => {
    await dispatch(removeFromFavouriteNews(newsId, sortBy));
  };

  const handleUpdate = () => {
    setModal(true);
    setUpdate(true);
  };

  return (
    <div className={styles.wrapper} {...props}>
      <span className={styles.date}>{date}</span>
      <img className={styles.avatar} src={`http://localhost:5000/avatar/${news.avatar}`} alt={news.author} />
      <div className={styles.title}>{news.author}</div>
      <div className={styles.position}>
        <Button appearance='card'>Левый</Button>
        <Button appearance='card'>Центр</Button>
        <Button appearance='card'>Правый</Button>
      </div>
      <div className={styles.icons}>
        <ArrowIcon />
        <SettingsIcon onClick={handleUpdate} />
        <RectangleIcon />
        <div className={styles.favouriteBlock}>
          <StarIcon
            className={cn(styles.favourite, {
              [styles.append]: news.isFavourite,
            })}
            onClick={() => addToFavourite(news.id)}
          />
          {news.isFavourite && (
            <div className={styles.dropdownContent}>
              <span onClick={() => removeFromFavourite(news.id)}>Удалить из избраного</span>
            </div>
          )}
        </div>
      </div>
      <span className={styles.time}>{time}</span>
      <p className={styles.body}>{news.body}</p>
      <div className={styles.image}>
        <span className={styles.next}>Далее</span>
        <img src={`http://localhost:5000/news/${news.img}`} alt={news.author} />
        <span className={styles.postedAgo}>{postedAgo}</span>
      </div>
      <AppendNews setModal={setModal} modal={modal} update={update} setUpdate={setUpdate} newsId={news.id} />
    </div>
  );
};
