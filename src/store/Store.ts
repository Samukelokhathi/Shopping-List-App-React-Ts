import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/Login";
import signUpReducer from "./Signup/SignUp";

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    login: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
