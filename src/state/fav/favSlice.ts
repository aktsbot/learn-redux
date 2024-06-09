import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../api";

interface IFav {
  id: number;
  text: string;
}

interface IFavState {
  favs: IFav[];
  isLoading: boolean;
  error: string;
  refresh: boolean;
}

const initialState: IFavState = {
  favs: [],
  isLoading: false,
  error: "",
  refresh: false,
};

const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch favs
      .addCase(fetchFavs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavs.fulfilled, (state, action: PayloadAction<IFav[]>) => {
        state.favs = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFavs.rejected, (state, action) => {
        state.isLoading = false;
        // TODO: this seems messy! what does the docs say?
        if (action.payload && typeof action.payload == "string") {
          state.error = action.payload;
        }
      })
      // add fav
      .addCase(addFav.fulfilled, (state) => {
        state.refresh = !state.refresh;
      })
      .addCase(addFav.rejected, (state, action) => {
        // TODO: this seems messy! what does the docs say?
        if (action.payload && typeof action.payload == "string") {
          state.error = action.payload;
        }
      });
  },
});

export const fetchFavs = createAsyncThunk(
  "fav/fetchfavs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/favs");
      return res.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch favs");
    }
  }
);

export const addFav = createAsyncThunk(
  "fav/addFav",
  async (apiPayload: { text: string }, { rejectWithValue }) => {
    try {
      const res = await api.post("/favs", { ...apiPayload });
      return res.data;
    } catch (error) {
      return rejectWithValue("Failed to add fav");
    }
  }
);

export const { toggleLoading, setError } = favSlice.actions;

export default favSlice.reducer;
