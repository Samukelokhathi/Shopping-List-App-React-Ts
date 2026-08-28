import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { User } from "../../types/User";

export interface LoginData {
  email: string;
  password: string;
}

export const login = createAsyncThunk<User, LoginData, { rejectValue: string }>(
  "auth/login",

  async (LoginData, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>("http://localhost:3000/users");
      const loggedUser = response.data.find(
        (user) =>
          user.email === LoginData.email &&
          user.password === LoginData.password,
      );

      if (!loggedUser) {
        return rejectWithValue("Invalid email or password");
      }

      return loggedUser;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Unable to connect to server");
    }
  },
);
