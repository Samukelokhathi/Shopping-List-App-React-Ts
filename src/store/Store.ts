import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Login/LoginSlice";
import signUpReducer from "./Signup/SignUpSlice";
// import loginReducer from "./LoginSlice"
export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    auth: authReducer,
    // login: loginReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
