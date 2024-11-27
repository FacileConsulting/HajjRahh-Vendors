import { configureStore } from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk';
import { createLogger } from 'redux-logger'; 
import homeReducer from './reducers/homeSlice';
import myAccountReducer from './reducers/myAccountSlice';
import vendorsSlice from './reducers/vendorsSlice';

const loggerMiddleware = createLogger();

export default configureStore({
  reducer: {
    home: homeReducer,
    myAccount: myAccountReducer,
    vendors: vendorsSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(loggerMiddleware, thunk),
})




