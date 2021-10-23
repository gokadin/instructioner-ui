import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialState} from "./state";
import {normalize} from "normalizr";
import {exerciseSchemaList} from "../../models/schemas";

export const fetchExercises = createAsyncThunk('exercise/fetch', async () => {
    // return await getTop
    const data = [
        {
            id: '1',
            name: 'name',
            question: 'Find the derivative of $$f(x) = 28$$',
            variables: [
                {
                    id: '10',
                    name: 'x',
                    type: 'integer',
                    rangeStart: '2',
                    rangeEnd: '7',
                    default: '5'
                }
            ],
            answerType: 'MULTIPLE_CHOICE',
            answerFields: [
                {
                    id: '100',
                    isCorrect: true,
                    content: '$1$'
                },
                {
                    id: '101',
                    isCorrect: false,
                    content: '$x$'
                },
                {
                    id: '102',
                    isCorrect: false,
                    content: '$5x$'
                },
                {
                    id: '103',
                    isCorrect: false,
                    content: '$5$'
                }
            ]
        }
    ]

    const normalized = normalize(data, exerciseSchemaList)
    return normalized.entities
})

const slice = createSlice({
    name: 'exercise',
    initialState: initialState,
    reducers: {
        setSelectedAnswerField: (state, action: PayloadAction<{exerciseId: string, answerFieldId: string}>) => {
            state.exercises[action.payload.exerciseId].selectedAnswerId = action.payload.answerFieldId
            state.exercises[action.payload.exerciseId].isCompleted = false
        },
        markCompleted: (state, action: PayloadAction<string>) => {
            state.exercises[action.payload].isCompleted = true
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchExercises.fulfilled, (state, action: any) => {
            const exerciseIds = Object.keys(action.payload.exercise)
            state.exerciseIds = exerciseIds
            state.exercises = action.payload.exercise
            state.currentExerciseId = exerciseIds[0]
        })
    }
})

export const exerciseActions = slice.actions
export const exerciseReducer = slice.reducer
