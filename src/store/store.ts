import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "./slices";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { dndSlice } from "./slices/dndSlice";
const persistConfig = {
  key: "root",
  storage: storage,
};
export const rootReducers = combineReducers({
  board: boardSlice.reducer,
  dnd: dndSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
