import { configureStore } from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk';
import { createLogger } from 'redux-logger'; 
import vendorsSlice from './reducers/vendorsSlice';

const loggerMiddleware = createLogger();

export default configureStore({
  reducer: {
    vendors: vendorsSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(loggerMiddleware, thunk),
})




