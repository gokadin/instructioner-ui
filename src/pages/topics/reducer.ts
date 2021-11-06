import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialState} from "./state";
import {normalize} from "normalizr";
import {subtopicSchemaList, topicSchemaList} from "../../models/schemas";
import {getSubtopics, getTopics} from "./api";

export const fetchTopics = createAsyncThunk('topic/fetchTopics', async (courseId: string) => {
    const data = await getTopics(courseId)
    const normalized = normalize(data, topicSchemaList)
    return normalized.entities
})

export const fetchSubtopics = createAsyncThunk('topic/fetchSubtopics', async (topicId: string) => {
    const data = await getSubtopics(topicId)
    const normalized = normalize(data, subtopicSchemaList)
    return normalized.entities
})

const slice = createSlice({
    name: 'topic',
    initialState: initialState,
    reducers: {
        // toggleTopicCollapse: (state, action: PayloadAction<string>) => {
        //     state.topics[action.payload].isCollapsed = !state.topics[action.payload].isCollapsed
        // },
        setSubtopic: (state, action: PayloadAction<string>) => {
            state.selectedSubtopicId = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTopics.fulfilled, (state, action: any) => {
            state.topicIds = Object.keys(action.payload.topic)
            state.topics = action.payload.topic
        })
        builder.addCase(fetchSubtopics.fulfilled, (state, action: any) => {
            state.subtopicIds.push(...Object.keys(action.payload.subtopic))
            state.subtopics = {...state.subtopics, ...action.payload.subtopic}
        })
    }
})

export const topicActions = slice.actions
export const topicReducer = slice.reducer
