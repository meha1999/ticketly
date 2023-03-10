// library
import { AnyAction, combineReducers, Reducer, ReducersMapObject } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
// custom
import { ReduxStoreModel } from "src/model/redux/redux-store-model";
import { reducer as TokenReducer } from "./token/reducer";
import { reducer as userReducer } from "./user/reducer";
import { reducer as notificationReducer } from "./notifications/reducer";


const reducers: ReducersMapObject<ReduxStoreModel, AnyAction> = {
  token: TokenReducer as Reducer<ReduxStoreModel["token"], AnyAction>,
  user: userReducer as  Reducer<ReduxStoreModel["user"], AnyAction>,
  notification: notificationReducer as  Reducer<ReduxStoreModel["notification"], AnyAction>,
};

const combinedReducers = combineReducers(reducers);

const persistConfig = {
  key: "root",
  storage,
//   blacklist: [],
};

const persistedCombinedReducers = persistReducer(
  persistConfig,
  combinedReducers
);

export const store = configureStore({
  reducer: persistedCombinedReducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistedStore = persistStore(store);
