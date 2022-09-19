import React from 'react';
import { useParams } from 'react-router-dom';
import { getOneNews } from '../../redux/actions/newsAction';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { CardInfo } from '../../components/CardInfo/CardInfo';
import { Spinner } from '../../components/Ui/Spinner/Spinner';

export const News = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { oneNews, isLoading } = useAppSelector((state) => state.oneNewsReducer);

  React.useEffect(() => {
    dispatch(getOneNews(id));
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <CardInfo news={oneNews} />
    </div>
  );
};
