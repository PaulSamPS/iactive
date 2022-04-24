import { AppDispatch } from '../store';
import { newsReducer } from '../reducers/newsReducer';
import { IResponseNews } from '../../interfaces/news.interface';
import { IErrorResponse } from '../../interfaces/error.interface';
import { AxiosError, AxiosResponse } from 'axios';
import { $api } from '../../http/axios';

export const getNews = () => async (dispatch: AppDispatch) => {
  dispatch(newsReducer.actions.setNewsLoading());
  await $api
    .get(`/api/news`)
    .then((res: AxiosResponse<IResponseNews>) => {
      dispatch(newsReducer.actions.setNewsSuccess(res.data.rows));
    })
    .catch((e: AxiosError<IErrorResponse>) => {
      dispatch(newsReducer.actions.setNewsError(e.response?.data.message));
    });
};
