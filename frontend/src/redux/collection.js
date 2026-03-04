import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collection: [],
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addData: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.collection = action.payload;
      } else {
        state.collection.push(action.payload);
      }
    },
  },
});

export const { addData } = collectionSlice.actions;
export default collectionSlice.reducer;
