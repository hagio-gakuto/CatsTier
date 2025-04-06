import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorageを使用
import petsReducer from "./petsSlice"; // petsSlice

const persistConfig = {
  key: "root",
  storage, // localStorageを使用
};

const persistedReducer = persistReducer(persistConfig, petsReducer);

// ストアを作成
const store = configureStore({
  reducer: {
    pets: persistedReducer, // petsReducerを永続化
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist が発行するアクションをチェック対象から除外
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// RootState 型を定義
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch 型を定義
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
