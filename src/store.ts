import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import ticketsReducer from './reducers/tickets';

export const store = configureStore({
  reducer: {
    ticketsReducer: ticketsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
