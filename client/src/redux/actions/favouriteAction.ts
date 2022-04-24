import { AppDispatch } from '../store';
import { favouriteReducer } from '../reducers/favouriteReducer';
import { IErrorResponse } from '../../interfaces/error.interface';
import { AxiosError, AxiosResponse } from 'axios';
import { IResponseFavouriteNews } from '../../interfaces/favourite.interface';
import { $api } from '../../http/axios';

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

export const addToFavouriteNews = (newsId: number) => async (dispatch: AppDispatch) => {
  await $api.post(`/api/favourite/append/${newsId}`);
};
