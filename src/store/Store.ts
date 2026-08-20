
import { configureStore } from "@reduxjs/toolkit";
import signUp from "../store/SignUpSlice"

export const store = configureStore({
    reducer: {
        signUp
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;