import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCards = createAsyncThunk("cards/fetchCards", async () => {
  const response = await fetch(
    "https://www.rijksmuseum.nl/api/nl/collection?key=grMARgGk&involvedMaker=Johannes+Vermeer"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const dataJSON = await response.json();
  const artObjects = dataJSON.artObjects;

  const cardsData = artObjects.map(function (item) {
    return (item = {
      title: item.title,
      longTitle: item.longTitle,
      id: item.id,
      imgSrc: item.headerImage.url,
      imgURL: item.webImage.url,
    });
  });

  return cardsData;
});

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cardsSlice.reducer;
