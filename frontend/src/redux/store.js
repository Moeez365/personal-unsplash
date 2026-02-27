import { configureStore } from '@reduxjs/toolkit';
import collectionReducer from "./collection";

export const store = configureStore({
  reducer: {
    collection:collectionReducer
  },
})