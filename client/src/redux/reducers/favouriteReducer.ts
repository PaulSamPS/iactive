import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFavouriteInterface } from '../../interfaces/favourite.interface';

interface IFavourite {
  favouriteNews: IFavouriteInterface[];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: IFavourite = {
  favouriteNews: [],
  isLoading: false,
  error: '',
};

export const favouriteReducer = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    setFavouriteNewsLoading(state) {
      state.isLoading = true;
    },
    setFavouriteNewsSuccess(state, action: PayloadAction<IFavouriteInterface[]>) {
      state.isLoading = false;
      state.error = '';
      state.favouriteNews = action.payload;
    },
    setFavouriteNewsError(state, action: PayloadAction<string | undefined>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default favouriteReducer.reducer;
