import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialState} from "./state";
import {getUserSubtopics, putUserSubtopic} from "./api";
import {RootState} from "../../reducer";
import {normalize} from "normalizr";
import {userSubtopicSchemaList} from "../../models/schemas";

export const fetchUserSubtopics = createAsyncThunk('userSubtopic/fetchUserSubtopic', async (subtopicIds: string[], thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const data = await getUserSubtopics({subtopicIds: subtopicIds, userId: state.account.user.id})
    const normalized = normalize(data, userSubtopicSchemaList)
    if (!normalized.entities.userSubtopic) {
        return thunkAPI.rejectWithValue(null)
    }
    return normalized.entities
})

export const completeSession = createAsyncThunk('userSubtopic/completeSession', (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    return putUserSubtopic({
        userId: state.account.user.id,
        subtopicId: state.topic.selectedSubtopicId,
        exerciseCount: state.userSubtopic.currentSession.exerciseCount,
        correctExerciseCount: state.userSubtopic.currentSession.correctExerciseCount,
        duration: state.userSubtopic.currentSession.duration,
        score: state.userSubtopic.currentSession.score
    })
})

const slice = createSlice({
    name: 'userSubtopic',
    initialState: initialState,
    reducers: {
        beginSession: (state, action: PayloadAction<{ userId: string, subtopicId: string }>) => {
            state.currentSession = {
                userId: action.payload.userId,
                subtopicId: action.payload.subtopicId,
                exerciseCount: 0,
                correctExerciseCount: 0,
                duration: 0,
                score: 0
            }
        },
        completeExercise: (state, action: PayloadAction<{ duration: number, isCorrect: boolean }>) => {
            state.currentSession.exerciseCount++
            if (action.payload.isCorrect) {
                state.currentSession.correctExerciseCount++
            }
            state.currentSession.duration += action.payload.duration
            state.currentSession.score = Math.round(100 * state.currentSession.correctExerciseCount / state.currentSession.exerciseCount)
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchUserSubtopics.pending, (state, action: any) => {
            action.meta.arg.forEach((id: string) => state.isUserSubtopicsLoading[id] = true)
            action.meta.arg.forEach((id: string) => state.isUserSubtopicsLoaded[id] = false)
        })
        builder.addCase(fetchUserSubtopics.rejected, (state, action: any) => {
            action.meta.arg.forEach((id: string) => state.isUserSubtopicsLoading[id] = false)
            action.meta.arg.forEach((id: string) => state.isUserSubtopicsLoaded[id] = true)
        })
        builder.addCase(fetchUserSubtopics.fulfilled, (state, action: any) => {
            action.meta.arg.forEach((id: string) => state.isUserSubtopicsLoading[id] = false)
            action.meta.arg.forEach((id: string) => state.isUserSubtopicsLoaded[id] = true)
            state.userSubtopicIds.push(...Object.keys(action.payload.userSubtopic))
            state.userSubtopics = {...state.userSubtopics, ...action.payload.userSubtopic}
        })
        builder.addCase(completeSession.fulfilled, (state) => {
            if (!state.userSubtopicIds.includes(state.currentSession.subtopicId)) {
                state.userSubtopicIds.push(state.currentSession.subtopicId)
            }
            state.userSubtopics[state.currentSession.subtopicId] = state.currentSession
        })
    }
})

export const userSubtopicActions = slice.actions
export const userSubtopicReducer = slice.reducer
