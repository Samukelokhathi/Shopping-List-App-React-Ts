import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/User"
import { login } from "./AuthThunks"


interface LoginState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: LoginState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
}

const AuthSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        logout(state) {
            state.user = null;
            state.isAuthenticated = false
            state.error = null
        }
    },

    extraReducers: (builder) => {
        builder

            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })

    },
});

