import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store/AuthSlice'
import signUpReducer from "../store/SignUpSlice";
import loginReducer from "../store/loginSlice"
export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    auth: authReducer,
    login: loginReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
