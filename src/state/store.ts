import { configureStore } from "@reduxjs/toolkit";

import favSliceReducer from "./fav/favSlice";

export const store = configureStore({
  reducer: {
    fav: favSliceReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
