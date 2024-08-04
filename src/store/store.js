import { configureStore } from "@reduxjs/toolkit";
import cards from "./cardsSlice.js";

export default configureStore({
  reducer: {
    cards: cards,
  },
});
