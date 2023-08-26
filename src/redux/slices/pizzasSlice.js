import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get(
      `http://localhost:3666/items?_page=${currentPage}&_limit=4&${category}&_sort=${sortBy}&_order=${order}&${search}`
    );

    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", // loading | success | error
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItem(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const selectPizzaItems = (state) => state.pizza;

export const { setItem } = pizzasSlice.actions;

export default pizzasSlice.reducer;
