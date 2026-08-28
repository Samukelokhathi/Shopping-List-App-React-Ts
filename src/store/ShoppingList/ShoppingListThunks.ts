import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { User, ShoppingList } from "../../types/User";

interface AddListData {
  userId: string;
  list: ShoppingList;
}

export const addShoppingList = createAsyncThunk<
  User,
  AddListData,
  { rejectValue: string }
>(
  "shoppingList/add",

  async ({ userId, list }, { rejectWithValue }) => {
    try {
      // Get specific logged-in user
      const response = await axios.get<User>(
        `http://localhost:3000/users/${userId}`,
      );

      const user = response.data;

      // Add list to THAT user's lists
      const updatedUser: User = {
        ...user,

        lists: [...user.lists, list],
      };

      // Save updated user
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

export const getShoppingLists = createAsyncThunk<
  User, // Expected return type on success
  string, // Type of the argument (userId)
  { rejectValue: string } // Type of the rejectWithValue payload
>("shoppingList/getAll", async (userId, { rejectWithValue }) => {
  try {
    // Fetch the specific user matching the ID
    const response = await axios.get<User>(
      `http://localhost:3000/users/${userId}`,
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue("Failed to fetch shopping lists");
  }
});
