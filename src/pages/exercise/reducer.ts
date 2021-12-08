import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialState} from "./state";
import {normalize} from "normalizr";
import {exerciseSchemaList} from "../../models/schemas";
import {getExercises} from "./api";
import {LoadState} from "../../utils/loadState";

export const fetchExercises = createAsyncThunk('exercise/fetch', async (subtopicId: string) => {
    const data = await getExercises(subtopicId)
    const normalized = normalize(data, exerciseSchemaList)
    return normalized.entities
})

const slice = createSlice({
    name: 'exercise',
    initialState: initialState,
    reducers: {
        beginSession: (state) => {
            state.currentExerciseIndex = 0
            if (!state.sessionLoadState.isReady()) {
                return
            }

            state.currentExerciseId = state.exerciseIds[state.currentExerciseIndex]
            state.exerciseIds.forEach(exerciseId => {
                state.exercises[exerciseId].isCompleted = false
                state.exercises[exerciseId].selectedAnswerIndex = -1
                state.exercises[exerciseId].hints.forEach(hint => {
                    hint.isVisible = false
                })
            })
        },
        setSelectedAnswerField: (state, action: PayloadAction<{ exerciseId: string, answerFieldIndex: number }>) => {
            if (state.exercises[action.payload.exerciseId].isCompleted) {
                return
            }
            state.exercises[action.payload.exerciseId].selectedAnswerIndex = action.payload.answerFieldIndex
        },
        markCompleted: (state, action: PayloadAction<string>) => {
            state.exercises[action.payload].isCompleted = true
        },
        showAnswer: (state, action: PayloadAction<number>) => {
            state.exercises[state.currentExerciseId].selectedAnswerIndex = action.payload
            state.exercises[state.currentExerciseId].isCompleted = true
        },
        showNextHint: (state) => {
            let hint = state.exercises[state.currentExerciseId].hints.find(hint => !hint.isVisible)
            if (hint) {
                hint.isVisible = true
            }
        },
        next: (state) => {
            if (state.currentExerciseIndex >= state.exerciseIds.length - 1) {
                return
            }
            state.currentExerciseIndex++
            state.currentExerciseId = state.exerciseIds[state.currentExerciseIndex]
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchExercises.pending, (state) => {
            state.sessionLoadState = LoadState.getLoadState()
        })
        builder.addCase(fetchExercises.rejected, (state) => {
            state.sessionLoadState = LoadState.getRejectStae()
        })
        builder.addCase(fetchExercises.fulfilled, (state, action: any) => {
            state.sessionLoadState = LoadState.getSucceedState()
            if (!action.payload.exercise) {
                return
            }
            const exerciseIds = Object.keys(action.payload.exercise)
            state.exerciseIds = exerciseIds
            state.exercises = action.payload.exercise
            state.currentExerciseId = exerciseIds[state.currentExerciseIndex]
        })
    }
})

export const exerciseActions = slice.actions
export const exerciseReducer = slice.reducer
