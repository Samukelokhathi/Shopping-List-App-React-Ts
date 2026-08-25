import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store/Auth/AuthSlice'
import signUpReducer from "./Signup/SignUpSlice";
import loginReducer from "./LoginSlice"
export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    auth: authReducer,
    login: loginReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
