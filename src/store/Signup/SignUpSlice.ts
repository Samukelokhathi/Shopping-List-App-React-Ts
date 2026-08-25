import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";

import { signup, type SignUpData } from "../Signup/SignUpThunk"
interface SignUpState extends SignUpData {
  isLoading: boolean;
  error: string | null;
}

const initialState: SignUpState = {
  name: "",
  surname: "",
  number: "",
  email: "",
  password: "",
  confirmPassword: "",

  isLoading: false,
  error: null,
}

const SignUpSlice = createSlice({
  name: "signup",

  initialState,

  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setSurname(state, action: PayloadAction<string>) {
      state.surname = action.payload;
    },
    setNumber(state, action: PayloadAction<string>) {
      state.number = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setConfirmPassword(state, action: PayloadAction<string>) {
      state.confirmPassword = action.payload;
    },

    resetForm(state) {
      Object.assign(state, initialState);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;

        state.error = (action.payload as string) || "Signup failed";
      });
  },
});

export const {
  setName,
  setSurname,
  setNumber,
  setEmail,
  setPassword,
  setConfirmPassword,
  resetForm,
} = SignUpSlice.actions;

export default SignUpSlice.reducer;
