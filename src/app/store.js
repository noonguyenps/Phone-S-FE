import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice"
import searchReducer from "../slices/searchSlice"
import compareReducer from "../slices/compareProduct"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import paymentSlice from '../slices/paymentSlice';


const rootReducer = combineReducers({ auth: authReducer, cart: cartReducer, search: searchReducer,payment:paymentSlice, compare:compareReducer })

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)
