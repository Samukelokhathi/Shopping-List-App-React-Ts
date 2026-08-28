import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { User } from "../../types/User";

export interface SignUpData {
  name: string;
  surname: string;
  email: string;
  number: string;
  password: string;
  confirmPassword: string;
}

export const signup = createAsyncThunk<
  User,
  SignUpData,
  { rejectValue: string }
>(
  "signup/create",

  async (userData, { rejectWithValue }) => {
    try {
      // Check if email already exists
      const existingUsers = await axios.get<User[]>(
        "http://localhost:3000/users",
        {
          params: {
            email: userData.email,
          },
        },
      );

      if (existingUsers.data.length > 0) {
        return rejectWithValue("Email is already registered");
      }

      // Check passwords
      if (userData.password !== userData.confirmPassword) {
        return rejectWithValue("Passwords do not match");
      }

      const response = await axios.post<User>("http://localhost:3000/users", {
        name: userData.name,
        surname: userData.surname,
        number: userData.number,
        email: userData.email,
        password: userData.password,

        // Every new user starts with no lists
        lists: [],
      });

      return response.data;
    } catch (error) {
      console.error(error);

      return rejectWithValue("Unable to create account");
    }
  },
);
