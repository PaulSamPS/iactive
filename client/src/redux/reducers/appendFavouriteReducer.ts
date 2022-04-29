import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAppendFavourite {
  isLoading: boolean;
  error: string | undefined;
}

const initialState: IAppendFavourite = {
  isLoading: false,
  error: '',
};

export const appendFavouriteReducer = createSlice({
  name: 'appendFavourite',
  initialState,
  reducers: {
    setAppendFavouriteNewsLoading(state) {
      state.isLoading = true;
    },
    setAppendFavouriteNewsSuccess(state) {
      state.isLoading = false;
      state.error = '';
    },
    setAppendFavouriteNewsError(state, action: PayloadAction<string | undefined>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default appendFavouriteReducer.reducer;
