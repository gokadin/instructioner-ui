import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {initialState} from "./state";
import {testCreateSubject} from "./api";

export const createSubject = createAsyncThunk('admin/createSubject', async (name: string) => {
    console.log('creating', name)
    const result = await testCreateSubject()
    console.log('created subject', result)
})

const slice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
    }
})

export const adminActions = slice.actions
export const adminReducer = slice.reducer
