import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Card } from '../../components/Card/Card';
import styles from './Main.module.scss';
import { SocketContext } from '../../context/socketContext';
import { setNewsSuccess } from '../../redux/reducers/newsReducer';

export const Main = (): JSX.Element => {
  const socket = React.useContext(SocketContext);
  const dispatch = useAppDispatch();
  const { news } = useAppSelector((state) => state.newsReducer);

  React.useEffect(() => {
    socket?.emit('news-all:get');
    socket?.on('news-all:sent', ({ news }) => {
      dispatch(setNewsSuccess(news));
    });

    setInterval(() => {
      socket?.emit('news-all:get');
    }, 5000);
  }, [socket]);

  if (news.length <= 0) {
    return <h2 className={styles.notFound}>Нет новостей...</h2>;
  }

  return (
    <>
      {news
        .slice()
        .reverse()
        .map((n) => (
          <Card key={n._id} news={n} />
        ))}
    </>
  );
};
