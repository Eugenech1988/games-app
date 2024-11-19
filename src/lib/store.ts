import { configureStore, combineReducers } from '@reduxjs/toolkit';
import contentReducer from './slices/contentSlice';
import loginReducer from './slices/loginSlice';

const rootReducer = combineReducers({
  content: contentReducer,
  login: loginReducer
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production'
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']