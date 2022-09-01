import { configureStore } from "@reduxjs/toolkit";
import typingSliceReducer from "../features/typing/typingSlice";

export const store = configureStore({
  reducer: {
    typing: typingSliceReducer,
  },
});
