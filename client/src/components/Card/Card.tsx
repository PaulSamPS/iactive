import React, { ForwardedRef, forwardRef } from 'react';
import { CardProps } from './Card.props';
import { Button } from '../Button/Button';
import { ReactComponent as ArrowIcon } from '../../helpers/icons/arrowRight.svg';
import { ReactComponent as SettingsIcon } from '../../helpers/icons/settings.svg';
import { ReactComponent as RectangleIcon } from '../../helpers/icons/rectangle.svg';
import { ReactComponent as StarIcon } from '../../helpers/icons/star.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addToFavouriteNews, removeFromFavouriteNews } from '../../redux/actions/favouriteAction';
import { AppendNews } from '../AppendNews/AppendNews';
import { deleteNews } from '../../redux/actions/newsAction';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../Spinner/Spinner';
import { API_URL } from '../../App';
import 'moment/locale/ru';
import cn from 'classnames';
import moment from 'moment';
import styles from './Card.module.scss';

export const Card = motion(
  forwardRef(({ news, ...props }: CardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const { sortBy } = useAppSelector((state) => state.newsReducer);
    const { favouriteNews } = useAppSelector((state) => state.favouriteReducer);
    const [modal, setModal] = React.useState<boolean>(false);
    const [update, setUpdate] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    moment.locale('ru');

    const time = moment(news.createdAt).format('HH:mm');
    const date = moment(news.createdAt).format('D.MM.y');
    const postedAgo = moment(news.createdAt).fromNow();
    const fav = favouriteNews && favouriteNews.map((f) => f.id).includes(news.id);

    const addToFavourite = (newsId: number) => {
      setIsLoading(true);
      dispatch(addToFavouriteNews(newsId, sortBy)).then(() => setIsLoading(false));
    };

    const removeFromFavourite = (newsId: number) => {
      setIsLoading(true);
      dispatch(removeFromFavouriteNews(newsId, sortBy)).then(() => setIsLoading(false));
    };

    const handleUpdate = () => {
      setModal(true);
      setUpdate(true);
    };

    const handleDelete = (newsId: number, avatar: string, img: string) => {
      dispatch(deleteNews(newsId, avatar, img, sortBy));
    };

    return (
      <div className={styles.wrapper} {...props} ref={ref}>
        <span className={styles.date}>{date}</span>
        <img className={styles.avatar} src={`${API_URL}/avatar/${news.avatar}`} alt={news.author} />
        <div className={styles.titleBlock}>
          <div className={styles.author}>{news.author}</div>
          <div className={styles.title}>{news.title}</div>
        </div>
        <div className={styles.position}>
          <Button appearance='card'>Левый</Button>
          <Button appearance='card'>Центр</Button>
          <Button appearance='card'>Правый</Button>
        </div>
        <div className={styles.icons}>
          <ArrowIcon />
          <div className={styles.favouriteBlock}>
            <SettingsIcon />
            <div className={cn(styles.dropdownContent, styles.settings)}>
              <span onClick={handleUpdate}>Изменить</span>
              <span onClick={() => handleDelete(news.id, news.avatar, news.img)}>Удалить</span>
            </div>
          </div>
          <RectangleIcon />
          <div className={styles.favouriteBlock}>
            {!isLoading ? (
              <StarIcon
                className={cn(styles.favourite, {
                  [styles.append]: fav,
                })}
                onClick={() => addToFavourite(news.id)}
              />
            ) : (
              <Spinner className={styles.spinner} />
            )}
            {fav && (
              <div className={styles.dropdownContent}>
                <span onClick={() => removeFromFavourite(news.id)}>Удалить из избраного</span>
              </div>
            )}
          </div>
        </div>
        <span className={styles.time}>{time}</span>
        <p className={styles.body}>{news.body}</p>
        <div className={styles.image}>
          <span className={styles.next} onClick={() => navigate(`/news/${news.id}`)}>
            Далее
          </span>
          <img src={`${API_URL}/news/${news.img}`} alt={news.author} />
          <span className={styles.postedAgo}>{postedAgo}</span>
        </div>
        <AppendNews
          setModal={setModal}
          modal={modal}
          update={update}
          setUpdate={setUpdate}
          newsId={news.id}
          avatar={news.avatar}
          img={news.img}
        />
      </div>
    );
  })
);
