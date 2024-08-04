import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCards = createAsyncThunk("fetchCards", async () => {
  const cardsData = await fetch("http://itgirlschool.justmakeit.ru/api/words");
  const cardsDataJSON = await cardsData.json();
  // const cards = cardsDataJSON.map(function (item) {
  //   return (item = {
  //     id: item.artObjects.id,
  //     title: item.artObjects.title,
  //     url: item.artObjects.headerImage.url,
  //     like: false,
  //   });
  // });
  return cardsDataJSON;
});

export const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    isLoading: false,
    data: [],
    error: false,
  },
  extraReducer: (builder) => {
    builder.addCase(fetchCards.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCards.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default cardsSlice.reducer;
