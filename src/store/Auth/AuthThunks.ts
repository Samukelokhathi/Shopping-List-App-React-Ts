import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { User } from "../../types/User"

export interface LoginData {
    email: string;
    password: string;

}

export const login = createAsyncThunk(
    "auth/login",

    async (loginData: LoginData) => {
        try {
            const response = await axios.get<User[]>("http://localhost:3000/users",
                {
                    params: {
                        email: loginData.email,
                        password: loginData.password,
                    }
                })


            if (response.data.length === 0) {
                return "Invalid email or password"
            }

            return response.data[0]

        } catch (error) {
            console.error(error)
            return "Unable to connect to server"

        }

    },
);

