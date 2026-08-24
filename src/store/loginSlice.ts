import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
    id: string;
    name: string;
    surname: string;
    number: string;
    email: string;
    password: string;
}

interface LoginState {
    email: string;
    password: string;
    isLoading: boolean;
    error: string | null;
}

const initialState: LoginState = {
    email: "",
    password: "",
    isLoading: false,
    error: null,
};

export const loginUser = createAsyncThunk<
    User,
    { email: string; password: string },
    { rejectValue: string }
>("login/loginUser", async (loginData, { rejectWithValue }) => {
    try {
        const response = await axios.get<User[]>(
            "http://localhost:3000/users",
            {
                params: {
                    email: loginData.email,
                    password: loginData.password,
                },
            }
        );

        // User does not exist
        if (response.data.length === 0) {
            return rejectWithValue("Invalid email or password");
        }

        // User exists
        return response.data[0];
    } catch (error) {
        return rejectWithValue(
            "Something went wrong. Please try again."
        );
    }
});

const loginSlice = createSlice({
    name: "login",

    initialState,

    reducers: {
        setEmail(state, action) {
            state.email = action.payload;
        },

        setPassword(state, action) {
            state.password = action.payload;
        },

        resetLogin(state) {
            state.email = "";
            state.password = "";
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(loginUser.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error =
                    action.payload || "Login failed";
            });
    },
});

export const {
    setEmail,
    setPassword,
    resetLogin,
} = loginSlice.actions;

export default loginSlice.reducer;