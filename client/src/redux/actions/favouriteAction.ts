import { AppDispatch } from '../store';
import { favouriteReducer } from '../reducers/favouriteReducer';
import { IErrorResponse } from '../../interfaces/error.interface';
import { AxiosError, AxiosResponse } from 'axios';
import { IResponseFavouriteNews } from '../../interfaces/favourite.interface';
import { $api } from '../../http/axios';
import { getNews } from './newsAction';

export const getFavouriteNews = () => async (dispatch: AppDispatch) => {
  dispatch(favouriteReducer.actions.setFavouriteNewsLoading());
  await $api
    .get(`/api/favourite`)
    .then((res: AxiosResponse<IResponseFavouriteNews>) => {
      dispatch(favouriteReducer.actions.setFavouriteNewsSuccess(res.data.news));
    })
    .catch((e: AxiosError<IErrorResponse>) => {
      dispatch(favouriteReducer.actions.setFavouriteNewsError(e.response?.data.message));
    });
};

export const addToFavouriteNews = (newsId: number, sortBy: string) => async (dispatch: AppDispatch) => {
  await $api.post(`/api/favourite/append/${newsId}`);
  dispatch(getNews(sortBy));
  dispatch(getFavouriteNews());
};

export const removeFromFavouriteNews = (newsId: number, sortBy: string) => async (dispatch: AppDispatch) => {
  await $api.put(`/api/favourite/remove/${newsId}`);
  await dispatch(getNews(sortBy));
  await dispatch(getFavouriteNews());
};
