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
      const response = await axios.get<User[]>("http://localhost:3000/users", {
        params: {
          email: LoginData.email,
          password: LoginData.password,
        },
      });

      if (response.data.length === 0) {
        return rejectWithValue("Invalid email or password");
      }

      return response.data[0];
    } catch (error) {
      console.error(error);
      return rejectWithValue("Unable to connect to server");
    }
  },
);
