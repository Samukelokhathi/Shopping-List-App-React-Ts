import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { User } from "../../types/User"

export interface SignUpData {
    name: string;
    surname: string;
    email: string;
    number: string;
    password: string;
    confirmPassword: string;
}



export const signup = createAsyncThunk(
    "signup",
    async (userData: SignUpData) => {
        try {
            const response = await axios.post<User>("http://localhost:3000/users",
                {
                    name: userData.name,
                    surname: userData.surname,
                    number: userData.number,
                    email: userData.email,
                    password: userData.password,
                })
            return response.data;

        } catch (error) {
            console.error(error)
        }

    },
);

