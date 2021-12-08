import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {initialState} from "./state";
import {normalize} from "normalizr";
import {exerciseSchemaList} from "../../models/schemas";
import {getExercises} from "../exercise/api";
import {LoadState} from "../../utils/loadState";
import {ExerciseEntity} from "../../models/exercise.entity";
import {deleteExercise} from "../builder/api";

export const fetchExercises = createAsyncThunk('admin/fetchExercises', async (subtopicId: string) => {
    const data = await getExercises(subtopicId)
    const normalized = normalize(data, exerciseSchemaList)
    return normalized.entities
})

export const removeExercise = createAsyncThunk('builder/removeExercise', async (exercise: ExerciseEntity) => {
    return await deleteExercise({subtopicId: exercise.subtopicId, id: exercise.id})
})

const slice = createSlice({
    name: 'exerciseList',
    initialState: initialState,
    reducers: {
        invalidateList: (state) => {
            state.loadState = initialState.loadState
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchExercises.pending, (state) => {
            state.loadState = LoadState.getLoadState()
        })
        builder.addCase(fetchExercises.rejected, (state) => {
            state.loadState = LoadState.getRejectStae()
        })
        builder.addCase(fetchExercises.fulfilled, (state, action: any) => {
            state.loadState = LoadState.getSucceedState()
            if (!action.payload.exercise) {
                return
            }
            state.exerciseIds = Object.keys(action.payload.exercise)
            state.exercises = action.payload.exercise
        })
        builder.addCase(removeExercise.fulfilled, (state, action: any) => {
            console.log('exercise deleted', action.meta.arg.id)
            state.exerciseIds = state.exerciseIds.filter(id => id !== action.meta.arg.id)
            delete state.exercises[action.meta.arg.id]
        })
    }
})

export const exerciseListActions = slice.actions
export const exerciseListReducer = slice.reducer
