import { createSlice } from "@reduxjs/toolkit";

interface SignInState {
    name: string,
    surname: string,
    number: number,
    email: string, 
    password: string
}

const initialState : SignInState = {
    name: "",
    surname: "",
    number: 0,
    email: "",
    password: ""
}

const SignInState = createSlice({
    name: "signup page",
    initialState,
    reducers: {

    }
})
 





export default SignInState.reducer