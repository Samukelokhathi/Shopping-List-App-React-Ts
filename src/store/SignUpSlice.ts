import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

interface SignInState {
  name: string;
  surname: string;
  number: string;
  email: string;
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: SignInState = {
  name: "",
  surname: "",
  number: "",
  email: "",
  password: "",
  confirmPassword: "",
  isLoading: false,
  error: null,
};

export const signup = createAsyncThunk(
  "signup",
  async (userData: SignInState) => {
    const response = await axios.post("http://localhost:3000/users", {
      name: userData.name,
      surname: userData.surname,
      number: userData.number,
      email: userData.email,
      password: userData.password,
    });
    return response.data;
  },
);

const SignInSlice = createSlice({
  name: "signupPage",

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
    builder.addCase(signup.pending, (state) => {
      state.isLoading = true;
      state.error = null;
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
} = SignInSlice.actions;

export default SignInSlice.reducer;
