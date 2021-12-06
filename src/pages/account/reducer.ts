import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {initialState} from "./state";
import {amplifyCurrentUser, amplifySignIn, amplifySignOut, amplifySignUp, SignInPayload, SignUpPayload} from "./api";
import {LoadState} from "../../utils/loadState";

export const getCurrentUser = createAsyncThunk('account/getCurrentUser', async (_, thunkAPI) => {
    try {
        return await amplifyCurrentUser()
    } catch (error) {
        console.log(error)
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
            state.user = {email: ''}
            state.userLoadState = LoadState.getLoadState()
        })
        builder.addCase(getCurrentUser.rejected, (state) => {
            console.log('user is not authenticated')
            state.userLoadState = LoadState.getRejectStae()
        })
        builder.addCase(getCurrentUser.fulfilled, (state, action: any) => {
            console.log('got signed in user', action)
            state.userLoadState = LoadState.getSucceedState()
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
        builder.addCase(signIn.pending, (state) => {
            state.userLoginState = LoadState.getLoadState()
        })
        builder.addCase(signIn.rejected, (state) => {
            console.log('user sign in failed')
            state.userLoginState = LoadState.getRejectStae('Invalid email of password')
        })
        builder.addCase(signIn.fulfilled, (state, action: any) => {
            console.log('user signed in', action)
            state.userLoginState = LoadState.getSucceedState()
            state.userLoadState = LoadState.getSucceedState()
            state.user = {
                email: action.payload.attributes.email
            }
        })
        builder.addCase(signUp.pending, (state) => {
            state.userSignUpState = LoadState.getLoadState()
        })
        builder.addCase(signUp.rejected, (state, action: any) => {
            state.userSignUpState = LoadState.getRejectStae(action.payload)
        })
        builder.addCase(signUp.fulfilled, (state) => {
            state.userSignUpState = LoadState.getSucceedState()
        })
        builder.addCase(signOut.fulfilled, (state) => {
            console.log('user signed out')
            state.user = {email: ''}
            state.userLoadState = LoadState.getRejectStae()
        })
    }
})

export const accountActions = slice.actions
export const accountReducer = slice.reducer
