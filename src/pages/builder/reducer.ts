import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialState} from "./state";
import {VariableEntity} from "../../models/variable.entity";
import {deleteExercise, postExercise} from "./api";
import {RootState} from "../../reducer";
import {ExerciseEntity} from "../../models/exercise.entity";

const VARIABLE_SYMBOL = '@var'
const VARIABLE_REGEX = `${VARIABLE_SYMBOL}\\((\\w+)\\)`

export const createExercise = createAsyncThunk('builder/createExercise', async (_, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState
    return await postExercise({
        subtopicId: state.admin.selectedSubtopicId,
        name: state.builder.name,
        difficulty: state.builder.difficulty,
        question: state.builder.question,
        answerFields: state.builder.answerFields,
        hints: state.builder.hints,
        variables: state.builder.variableIds.map(variableId => state.builder.variables[variableId])
    })
})

export const removeExercise = createAsyncThunk('builder/removeExercise', async (exercise: ExerciseEntity) => {
    const data = await deleteExercise({subtopicId: exercise.subtopicId, id: exercise.id})
    console.log('exercise deleted', exercise.id, data)
})

const slice = createSlice({
    name: 'builder',
    initialState: initialState,
    reducers: {
        parseVariables: (state) => {
            let content = state.question
            state.hints.forEach(hint => content += hint.content)
            state.answerFields.forEach(answerField => content += answerField.content)

            const regex = new RegExp(VARIABLE_REGEX, 'gm')
            let match
            while ((match = regex.exec(content)) !== null) {
                if (!state.variableIds.includes(match[1])) {
                    const variable: VariableEntity = {
                        name: match[1],
                        type: 'integer',
                        rangeStart: '0',
                        rangeEnd: '9',
                        default: '5'
                    }
                    state.variableIds.push(variable.name)
                    state.variables = {...state.variables, [variable.name]: variable}
                }
            }
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        setDifficulty: (state, action: PayloadAction<number>) => {
            state.difficulty = action.payload
        },
        setQuestionContent: (state, action: PayloadAction<string>) => {
            state.question = action.payload
        },
        setHintContent: (state, action: PayloadAction<{ index: number, content: string }>) => {
            state.hints[action.payload.index].content = action.payload.content
        },
        setAnswerFieldContent: (state, action: PayloadAction<{ index: number, content: string }>) => {
            state.answerFields[action.payload.index].content = action.payload.content
        },
        addVariable: (state, action: PayloadAction<VariableEntity>) => {
            if (state.variableIds.includes(action.payload.name)) {
                return
            }

            state.variableIds.push(action.payload.name)
            state.variables = {...state.variables, [action.payload.name]: action.payload}
        },
        removeVariable: (state, action: PayloadAction<string>) => {
            if (state.variableIds.includes(action.payload)) {
                state.variableIds.splice(state.variableIds.indexOf(action.payload), 1)
                delete state.variables[action.payload]
            }
        },
        setVariableRangeStart: (state, action: PayloadAction<{ name: string, value: string }>) => {
            state.variables[action.payload.name].rangeStart = action.payload.value
        },
        setVariableRangeEnd: (state, action: PayloadAction<{ name: string, value: string }>) => {
            state.variables[action.payload.name].rangeEnd = action.payload.value
        },
        setVariableDefault: (state, action: PayloadAction<{ name: string, value: string }>) => {
            state.variables[action.payload.name].default = action.payload.value
        },
        addAnswerField: (state) => {
            state.answerFields.push({
                isCorrect: false,
                content: ''
            })
        },
        removeAnswerField: (state, action: PayloadAction<number>) => {
            state.answerFields.splice(action.payload, 1)
        },
        addHint: (state) => {
            state.hints.push({content: ''})
        },
        removeHint: (state, action: PayloadAction<number>) => {
            state.hints.splice(action.payload, 1)
        },
        clearState: (state) => {
            state.name = initialState.name
            state.question = initialState.question
            state.difficulty = initialState.difficulty
            state.variableIds = initialState.variableIds
            state.variables = initialState.variables
            state.answerFields = initialState.answerFields
            state.hints = initialState.hints
        }
    },
    extraReducers: builder => {
        builder.addCase(createExercise.fulfilled, (state, action: any) => {
            console.log('exercise created', action)
        })
    }
})

export const builderActions = slice.actions
export const builderReducer = slice.reducer
