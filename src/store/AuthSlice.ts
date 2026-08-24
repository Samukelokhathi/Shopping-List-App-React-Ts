import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../store/loginSlice";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

const savedUser = localStorage.getItem("user");

const initialState: AuthState = {
    user: savedUser ? JSON.parse(savedUser) : null,
    isAuthenticated: savedUser !== null,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.isAuthenticated = true;

            localStorage.setItem(
                "user",
                JSON.stringify(action.payload)
            );
        },

        logout(state) {
            state.user = null;
            state.isAuthenticated = false;

            localStorage.removeItem("user");
        },
    },
});

export const {
    setUser,
    logout,
} = authSlice.actions;

export default authSlice.reducer;