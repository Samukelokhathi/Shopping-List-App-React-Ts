import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/AuthSlice";
import signUpReducer from "./Signup/SignUpSlice";

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
