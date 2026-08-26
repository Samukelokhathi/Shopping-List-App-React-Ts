import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/User";
import { login } from "./AuthThunks";

import { addShoppingList } from "../ShoppingList/ShoppingListThunks";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;

        state.error = (action.payload as string) || "Login failed";
      })

      // Add shopping list

      .addCase(addShoppingList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(addShoppingList.fulfilled, (state, action) => {
        state.isLoading = false;

        // replace current user with update user
        state.user = action.payload;

        state.error = null;
      })

      .addCase(addShoppingList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to create shopping list";
      });
  },
});

export const { logout } = AuthSlice.actions;

export default AuthSlice.reducer;
