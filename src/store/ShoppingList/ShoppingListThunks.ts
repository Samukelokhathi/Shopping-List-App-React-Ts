import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { User, ShoppingList } from "../../types/User";

interface AddListData {
  userId: string;
  list: ShoppingList;
}

export const addShoppingList = createAsyncThunk(
  "shoppingList/add",

  async ({ userId, list }: AddListData, { rejectWithValue }) => {
    try {
      // Get the logged-in user
      const response = await axios.get<User>(
        `http://localhost:3000/users/${userId}`,
      );

      const user = response.data;

      // add the new list to user's lists

      const updateUser = {
        ...user,
        lists: [...user.lists, list],
      };

      // Update that specific user
      const updateResponse = await axios.put<User>(
        `http://localhost:3000/users/${userId}`,
        updateUser,
      );

      return updateResponse.data;
    } catch (err) {
      console.error(err);

      return rejectWithValue("Failed to create shopping list");
    }
  },
);
