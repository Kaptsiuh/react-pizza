import { createSlice } from "@reduxjs/toolkit";

type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: number;
  size: number;
  count: number;
}

interface CartSliceState {
  categoryId: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  categoryId: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.categoryId = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }
    },
    removeItems(state, action) {
      state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.categoryId = 0;
    },
  },
});

export const selectSort = (state) => state.filter.sort;

export const selectCartItemById = (id: string) => (state) =>
  state.cart.items.find((obj) => obj.id === id);

export const selectCart = (state) => state.cart;

export const { addItem, removeItems, minusItem, clearItems } =
  cartSlice.actions;

export default cartSlice.reducer;
