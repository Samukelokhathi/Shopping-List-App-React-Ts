import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { ShoppingList } from "../../types/User";

interface ShoppingListState {
  lists: ShoppingList[];
}

const initialState: ShoppingListState = {
  lists: [],
};

const ShoppingListSlice = createSlice({
  name: "shoppingList",

  initialState,

  reducers: {
    addList(state, action: PayloadAction<ShoppingList>) {
      state.lists.push(action.payload);
    },
  },
});

export const { addList } = ShoppingListSlice.actions;

export default ShoppingListSlice.reducer;
