import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { User, ShoppingList } from "../../types/User";

// DATA NEEDED TO ADD A SHOPPING LIST

interface AddListData {
  userId: string;
  list: ShoppingList;
}

// SHOPPING LIST STATE

interface ShoppingListState {
  lists: ShoppingList[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ShoppingListState = {
  lists: [],
  isLoading: false,
  error: null,
};

// ADD SHOPPING LIST THUNK

export const addShoppingList = createAsyncThunk<
  User,
  AddListData,
  { rejectValue: string }
>(
  "shoppingList/add",

  async ({ userId, list }, { rejectWithValue }) => {
    try {
      // Get the logged-in user
      const response = await axios.get<User>(
        `http://localhost:3000/users/${userId}`,
      );

      const user = response.data;

      // Add the new list to that user's lists
      const updatedUser: User = {
        ...user,

        lists: [...user.lists, list],
      };

      // Save the updated user
      const updateResponse = await axios.put<User>(
        `http://localhost:3000/users/${userId}`,
        updatedUser,
      );

      return updateResponse.data;
    } catch (error) {
      console.error(error);

      return rejectWithValue("Failed to create shopping list");
    }
  },
);

// GET SHOPPING LISTS THUNK

export const getShoppingLists = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>(
  "shoppingList/getAll",

  async (userId, { rejectWithValue }) => {
    try {
      // Get the specific logged-in user
      const response = await axios.get<User>(
        `http://localhost:3000/users/${userId}`,
      );

      return response.data;
    } catch (error) {
      console.error(error);

      return rejectWithValue("Failed to fetch shopping lists");
    }
  },
);

// SHOPPING LIST SLICE

const ShoppingListSlice = createSlice({
  name: "shoppingList",

  initialState,

  reducers: {
    clearLists(state) {
      state.lists = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getShoppingLists.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(getShoppingLists.fulfilled, (state, action) => {
        state.isLoading = false;

        state.lists = action.payload.lists;
        state.error = null;
      })

      .addCase(getShoppingLists.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload || "Failed to fetch shopping lists";
      });
    // ADD SHOPPING LIST

    builder

      .addCase(addShoppingList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(addShoppingList.fulfilled, (state, action) => {
        state.isLoading = false;

        // The API returns the updated user.
        // Get the updated lists from that user.

        state.lists = action.payload.lists;

        state.error = null;
      })

      .addCase(addShoppingList.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload || "Failed to create shopping list";
      });
    // ADD SHOPPING LIST
  },
});

export const { clearLists } = ShoppingListSlice.actions;

export default ShoppingListSlice.reducer;
