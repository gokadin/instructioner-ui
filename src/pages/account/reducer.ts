import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialState} from "./state";
import {amplifySignIn, amplifySignUp, SignInPayload, SignUpPayload} from "./api";

export const signIn = createAsyncThunk('account/login', async (payload: SignInPayload, thunkAPI) => {
    try {
        return await amplifySignIn(payload)
    } catch (error) {
        console.log('login failed')
        return thunkAPI.rejectWithValue(null)
    }
})

export const signUp = createAsyncThunk('account/signUp', async (payload: SignUpPayload, thunkAPI) => {
    try {
        return await amplifySignUp(payload)
    } catch (error) {
        console.log('sign up failed', error)
        if (JSON.stringify(error).includes('UsernameExists')) {
            return thunkAPI.rejectWithValue('Email address already in use')
        }
        return thunkAPI.rejectWithValue('Could not sign up, please retry')
    }
})

const slice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.user = {
                id: action.payload.attributes.sub,
                email: action.payload.attributes.email
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(signIn.fulfilled, (state, action: any) => {
            state.user = {
                id: action.payload.attributes.sub,
                email: action.payload.attributes.email
            }
            state.isLoggingIn = false
            state.loginError = ''
        })
        builder.addCase(signIn.pending, (state) => {
            state.isLoggingIn = true
            state.loginError = ''
        })
        builder.addCase(signIn.rejected, (state) => {
            state.isLoggingIn = false
            state.loginError = 'Invalid email or password'
        })
        builder.addCase(signUp.fulfilled, (state, action: any) => {
            state.isSignUpSuccess = true
            state.isSigningUp = false
            state.signUpError = ''
        })
        builder.addCase(signUp.pending, (state) => {
            state.isSignUpSuccess = false
            state.isSigningUp = true
            state.signUpError = ''
        })
        builder.addCase(signUp.rejected, (state, action: any) => {
            state.isSignUpSuccess = false
            state.isSigningUp = false
            state.signUpError = action.payload
        })
    }
})

export const accountActions = slice.actions
export const accountReducer = slice.reducer
