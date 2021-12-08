import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialState} from "./state";
import {VariableEntity} from "../../models/variable.entity";
import {getExerciseDefinition, GetExerciseDefinitionPayload, putExercise} from "./api";
import {RootState} from "../../reducer";
import {formatContent, parseVariables} from "./utils";
import {v4 as uuidv4} from 'uuid'
import {LoadState} from "../../utils/loadState";

export const fetchExerciseDefinition = createAsyncThunk('admin/fetchExerciseDefinition', async (payload: GetExerciseDefinitionPayload) => {
    return await getExerciseDefinition(payload)
})

export const createExercise = createAsyncThunk('builder/createExercise', async (_, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState
    return await putExercise({
        subtopicId: state.admin.selectedSubtopicId,
        id: (!state.builder.id || state.builder.id === '') ? uuidv4() : state.builder.id,
        name: state.builder.name,
        difficulty: state.builder.difficulty,
        question: state.builder.question,
        answerFields: state.builder.answerFields,
        hints: state.builder.hints,
        variables: state.builder.variableIds.map(variableId => state.builder.variables[variableId])
    })
})

const slice = createSlice({
    name: 'builder',
    initialState: initialState,
    reducers: {
        togglePreview: (state) => {
            state.isInPreview = !state.isInPreview
        },
        parseVariables: (state) => {
            let content = state.question
            state.hints.forEach(hint => content += hint.content)
            state.answerFields.forEach(answerField => content += answerField.content)

            parseVariables(content).forEach((variable: VariableEntity) => {
                if (!state.variableIds.includes(variable.name)) {
                    state.variableIds.push(variable.name)
                    state.variables = {...state.variables, [variable.name]: variable}
                }
            })
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        setDifficulty: (state, action: PayloadAction<number>) => {
            state.difficulty = action.payload
        },
        setQuestionContent: (state, action: PayloadAction<string>) => {
            state.question = action.payload
            state.questionFormatted = formatContent(action.payload)
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
            state.isInPreview = initialState.isInPreview
            state.name = initialState.name
            state.question = initialState.question
            state.questionFormatted = initialState.questionFormatted
            state.difficulty = initialState.difficulty
            state.variableIds = initialState.variableIds
            state.variables = initialState.variables
            state.answerFields = initialState.answerFields
            state.hints = initialState.hints
            state.editExerciseLoadState = initialState.editExerciseLoadState
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchExerciseDefinition.pending, (state) => {
            state.editExerciseLoadState = LoadState.getLoadState()
        })
        builder.addCase(fetchExerciseDefinition.rejected, (state) => {
            state.editExerciseLoadState = LoadState.getRejectStae()
        })
        builder.addCase(fetchExerciseDefinition.fulfilled, (state, action: any) => {
            state.editExerciseLoadState = LoadState.getSucceedState()
            state.id = action.payload.id
            state.name = action.payload.name
            state.question = action.payload.question
            state.questionFormatted = formatContent(action.payload.question)
            state.difficulty = action.payload.difficulty
            state.hints = action.payload.hints
            state.answerFields = action.payload.answerFields
            state.variableIds = action.payload.variables.map((variable: VariableEntity) => variable.name)
            action.payload.variables.forEach((variable: VariableEntity) => state.variables[variable.name] = variable)
        })
        builder.addCase(createExercise.fulfilled, (state, action: any) => {
            console.log('exercise created', action)
        })
    }
})

export const builderActions = slice.actions
export const builderReducer = slice.reducer
