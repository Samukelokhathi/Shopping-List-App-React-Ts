import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { addShoppingList } from "../ShoppingList/ShoppingListThunks";
import axios from "axios";
import type { User } from "../../types/User";

// LOGIN DATA
export interface LoginData {
  email: string;
  password: string;
}
// AUTH STATE
interface LogInState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: LogInState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// LOGIN THUNK

export const login = createAsyncThunk<User, LoginData, { rejectValue: string }>(
  "auth/login",

  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>("http://localhost:3000/users");

      const loggedUser = response.data.find(
        (user) =>
          user.email === loginData.email &&
          user.password === loginData.password,
      );

      if (!loggedUser) {
        return rejectWithValue("Invalid email or password");
      }

      // Save logged-in user's ID
      // so we can find this user again
      // after refreshing the page.

      localStorage.setItem("userId", loggedUser.id);

      return loggedUser;
    } catch (error) {
      console.error(error);

      return rejectWithValue("Unable to connect to server");
    }
  },
);

// GET LOGGED-IN USER

export const getLoggedInUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>(
  "auth/getLoggedInUser",

  async (_, { rejectWithValue }) => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        return rejectWithValue("No logged-in user");
      }

      const response = await axios.get<User>(
        `http://localhost:3000/users/${userId}`,
      );

      return response.data;
    } catch (error) {
      console.error(error);

      localStorage.removeItem("userId");

      return rejectWithValue("Unable to restore user");
    }
  },
);

// AUTH SLICE

const Login = createSlice({
  name: "login",

  initialState,

  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;

      // Remove saved user
      localStorage.removeItem("userId");
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;

        state.user = action.payload;
        console.log(state.user);

        state.isAuthenticated = true;

        state.error = null;
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;

        state.user = null;

        state.isAuthenticated = false;

        state.error = action.payload || "Login failed";
      })

      //  RESTORE USER
      .addCase(getLoggedInUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getLoggedInUser.fulfilled, (state, action) => {
        state.isLoading = false;

        state.user = action.payload;

        state.isAuthenticated = true;

        state.error = null;
      })

      .addCase(getLoggedInUser.rejected, (state) => {
        state.isLoading = false;

        state.user = null;

        state.isAuthenticated = false;
      })

      // ADD SHOPPING LIST
      .addCase(addShoppingList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(addShoppingList.fulfilled, (state, action) => {
        state.isLoading = false;

        // Updated user contains new list
        state.user = action.payload;

        state.error = null;
      })

      .addCase(addShoppingList.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload || "Failed to create shopping list";
      });
  },
});

export const { logout } = Login.actions;

export default Login.reducer;
