import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { User, ShoppingList } from "../../types/User";

// =====================================================
// INTERFACES & STATE
// =====================================================

interface AddListData {
  userId: string;
  list: ShoppingList;
}

interface DeleteListData {
  userId: string;
  listId: string;
}

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

// =====================================================
// ASYNC THUNKS
// =====================================================

export const addShoppingList = createAsyncThunk<
  User,
  AddListData,
  { rejectValue: string }
>("shoppingList/add", async ({ userId, list }, { rejectWithValue }) => {
  try {
    const response = await axios.get<User>(
      `http://localhost:3000/users/${userId}`,
    );
    const user = response.data;

    const updatedUser: User = {
      ...user,
      lists: [...user.lists, list],
    };

    const updateResponse = await axios.put<User>(
      `http://localhost:3000/users/${userId}`,
      updatedUser,
    );
    return updateResponse.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue("Failed to create shopping list");
  }
});

export const getShoppingLists = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("shoppingList/getAll", async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.get<User>(
      `http://localhost:3000/users/${userId}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue("Failed to fetch shopping lists");
  }
});

export const deleteShoppingList = createAsyncThunk<
  User,
  DeleteListData,
  { rejectValue: string }
>("shoppingList/delete", async ({ userId, listId }, { rejectWithValue }) => {
  try {
    const response = await axios.get<User>(
      `http://localhost:3000/users/${userId}`,
    );
    const user = response.data;

    const updatedLists = user.lists.filter((list) => list.id !== listId);

    const updatedUser: User = {
      ...user,
      lists: updatedLists,
    };

    const updateResponse = await axios.put<User>(
      `http://localhost:3000/users/${userId}`,
      updatedUser,
    );
    return updateResponse.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue("Failed to delete shopping list");
  }
});

// =====================================================
// SLICE
// =====================================================

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
      // GET SHOPPING LISTS
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
      })

      // ADD SHOPPING LIST
      .addCase(addShoppingList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addShoppingList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lists = action.payload.lists;
        state.error = null;
      })
      .addCase(addShoppingList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to create shopping list";
      })

      // DELETE SHOPPING LIST
      .addCase(deleteShoppingList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteShoppingList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lists = action.payload.lists;
        state.error = null;
      })
      .addCase(deleteShoppingList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to delete shopping list";
      });
  },
});

// =====================================================
// EXPORTS
// =====================================================

export const { clearLists } = ShoppingListSlice.actions;
export default ShoppingListSlice.reducer;
