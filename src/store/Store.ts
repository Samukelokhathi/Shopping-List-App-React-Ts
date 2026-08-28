import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/Login";
import signUpReducer from "./Signup/SignUp";
import shoppingListReducer from "./ShoppingList/ShoppingList";

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    login: authReducer,
    shoppingList: shoppingListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
