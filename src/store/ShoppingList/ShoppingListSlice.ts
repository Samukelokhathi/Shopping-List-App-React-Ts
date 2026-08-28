import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { getShoppingLists } from "./ShoppingListThunks";

export interface ShoppingList {
  lists: [];
}
const initialState: ShoppingList = {
  lists: [],
};

const ShoppingListSlice = createSlice({
  name: "shoppingList",

  initialState,

  reducers: {
    addList(state, action: PayloadAction<ShoppingList>) {
      state.lists.push(action.payload.lists);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getShoppingLists.fulfilled, (state, action) => {
      state.lists = action.payload.lists; // Updates the user state with the latest fetched profile and lists
    });
    // ... your other cases
  },
});

export const { addList } = ShoppingListSlice.actions;

export default ShoppingListSlice.reducer;
