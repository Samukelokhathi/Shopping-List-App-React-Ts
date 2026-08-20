import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SignInState {
    name: string,
    surname: string,
    number: string,
    email: string,
    password: string,
    confirmPassword: string
}

const initialState: SignInState = {
    name: "",
    surname: "",
    number: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignInSlice = createSlice({
    name: "signupPage",
    initialState,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload
        },
        setSurname(state, action: PayloadAction<string>) {
            state.surname = action.payload
        },
        setNumber(state, action: PayloadAction<string>) {
            state.number = action.payload
        },
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload
        },
        setConfirmPassword(state, action: PayloadAction<string>) {
            state.confirmPassword = action.payload
        },

        resetForm(state) {
            Object.assign(state, initialState)
        }


    }
})


export const { setName, setSurname, setNumber, setEmail, setPassword, setConfirmPassword, resetForm } = SignInSlice.actions

export default SignInSlice.reducer