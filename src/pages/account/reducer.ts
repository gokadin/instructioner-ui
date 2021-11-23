import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {initialState} from "./state";
import {amplifyCurrentUser, amplifySignIn, amplifySignOut, amplifySignUp, SignInPayload, SignUpPayload} from "./api";

export const getCurrentUser = createAsyncThunk('account/getCurrentUser', async (_, thunkAPI) => {
    try {
        return await amplifyCurrentUser()
    } catch (error) {
        return thunkAPI.rejectWithValue(null)
    }
})

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

export const signOut = createAsyncThunk('account/signOut', async () => {
    try {
        return await amplifySignOut()
    } catch (error) {
        console.log('sign out failed')
    }
})

const slice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getCurrentUser.pending, (state) => {
            state.isUserLoading = true
            state.isUserLoaded = false
        })
        builder.addCase(getCurrentUser.rejected, (state) => {
            state.isUserLoading = false
            state.isUserLoaded = true
            console.log('user is not authenticated')
        })
        builder.addCase(getCurrentUser.fulfilled, (state, action: any) => {
            console.log('got signed in user', action)
            state.isUserLoading = false
            state.isUserLoaded = true
            if (action.payload.attributes) {
                state.user = {
                    email: action.payload.attributes.email
                }
            } else {
                state.user = {
                    email: action.payload.email
                }
            }
        })
        builder.addCase(signIn.fulfilled, (state, action: any) => {
            console.log('user signed in', action)
            state.user = {
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
            console.log('user sign in failed')
            state.isLoggingIn = false
            state.loginError = 'Invalid email or password'
        })
        builder.addCase(signUp.fulfilled, (state) => {
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
        builder.addCase(signOut.fulfilled, (state) => {
            state.user = {email: ''}
            console.log('user signed out')
        })
    }
})

export const accountActions = slice.actions
export const accountReducer = slice.reducer
