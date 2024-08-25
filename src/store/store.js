import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./cardsSlice.js";

export default configureStore({
  reducer: {
    cards: cardsReducer,
  },
});
