import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INewsInterface } from '../../interfaces/news.interface';

interface INews {
  oneNews: INewsInterface;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: INews = {
  oneNews: {} as any,
  isLoading: false,
  error: '',
};

export const oneNewsReducer = createSlice({
  name: 'oneNews',
  initialState,
  reducers: {
    setOneNewsLoading(state) {
      state.isLoading = true;
    },
    setOneNewsSuccess(state, action: PayloadAction<INewsInterface>) {
      state.isLoading = false;
      state.error = '';
      state.oneNews = action.payload;
    },
    setOneNewsError(state, action: PayloadAction<string | undefined>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default oneNewsReducer.reducer;
