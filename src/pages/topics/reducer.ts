import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialState} from "./state";
import {normalize} from "normalizr";
import {subtopicSchemaList, topicSchemaList} from "../../models/schemas";
import {getSubtopics, getTopics} from "./api";
import {LoadState} from "../../utils/loadState";

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
        toggleTopicCollapse: (state, action: PayloadAction<string>) => {
            state.topics[action.payload].isOpen = !state.topics[action.payload].isOpen
        },
        setSubtopic: (state, action: PayloadAction<string>) => {
            state.selectedSubtopicId = action.payload
        },
        setTopic: (state, action: PayloadAction<string>) => {
            state.selectedSubtopicId = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTopics.pending, (state) => {
            state.topicsLoadState = LoadState.getLoadState()
        })
        builder.addCase(fetchTopics.rejected, (state) => {
            state.topicsLoadState = LoadState.getRejectStae()
        })
        builder.addCase(fetchTopics.fulfilled, (state, action: any) => {
            state.topicIds = Object.keys(action.payload.topic)
            state.topics = action.payload.topic
            state.topicsLoadState = LoadState.getSucceedState()
        })
        builder.addCase(fetchSubtopics.pending, (state, action: any) => {
            state.topics[action.meta.arg].isSubtopicsLoaded = false
            state.topics[action.meta.arg].isSubtopicsLoading = true
        })
        builder.addCase(fetchSubtopics.rejected, (state, action: any) => {
            state.topics[action.meta.arg].isSubtopicsLoaded = true
            state.topics[action.meta.arg].isSubtopicsLoading = false
        })
        builder.addCase(fetchSubtopics.fulfilled, (state, action: any) => {
            state.topics[action.meta.arg].isSubtopicsLoading = false
            state.subtopicIds.push(...Object.keys(action.payload.subtopic))
            state.subtopics = {...state.subtopics, ...action.payload.subtopic}
            state.topics[action.meta.arg].isSubtopicsLoaded = true
        })
    }
})

export const topicActions = slice.actions
export const topicReducer = slice.reducer
