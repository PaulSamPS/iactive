import { AppDispatch } from '../store';
import { newsReducer } from '../reducers/newsReducer';
import { IResponseNews } from '../../interfaces/news.interface';
import { IErrorResponse } from '../../interfaces/error.interface';
import axios, { AxiosError, AxiosResponse } from 'axios';

export const getNews = () => async (dispatch: AppDispatch) => {
  dispatch(newsReducer.actions.setNewsLoading());
  await axios
    .get(`http://localhost:5000/api/news`)
    .then((res: AxiosResponse<IResponseNews>) => {
      dispatch(newsReducer.actions.setNewsSuccess(res.data.rows));
    })
    .catch((e: AxiosError<IErrorResponse>) => {
      dispatch(newsReducer.actions.setNewsError(e.response?.data.message));
    });
};
