import { combineReducers, configureStore } from '@reduxjs/toolkit';
import newsReducer from './reducers/newsReducer';

const rootReducer = combineReducers({
  newsReducer,
});

export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
