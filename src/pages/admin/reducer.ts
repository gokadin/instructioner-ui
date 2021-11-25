import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialState} from "./state";
import {
    getCourses,
    getSubjects,
    getSubtopics,
    getTopics,
    postCourse,
    PostCourseRequest,
    postSubject,
    PostSubjectRequest,
    postSubtopic,
    PostSubtopicRequest,
    postTopic,
    PostTopicRequest
} from "./api";
import {normalize} from "normalizr";
import {courseSchemaList, subjectSchemaList, subtopicSchemaList, topicSchemaList} from "../../models/schemas";

export const fetchSubjects = createAsyncThunk('admin/fetchSubject', async () => {
    const data = await getSubjects()
    const normalized = normalize(data, subjectSchemaList)
    return normalized.entities
})

export const fetchCourses = createAsyncThunk('admin/fetchCourses', async (subjectId: string) => {
    const data = await getCourses(subjectId)
    const normalized = normalize(data, courseSchemaList)
    return normalized.entities
})

export const fetchTopics = createAsyncThunk('admin/fetchTopics', async (courseId: string) => {
    const data = await getTopics(courseId)
    const normalized = normalize(data, topicSchemaList)
    return normalized.entities
})

export const fetchSubtopics = createAsyncThunk('admin/fetchSubtopics', async (topicId: string) => {
    const data = await getSubtopics(topicId)
    const normalized = normalize(data, subtopicSchemaList)
    return normalized.entities
})

export const createSubject = createAsyncThunk('admin/createSubject', async (request: PostSubjectRequest) => {
    return await postSubject(request)
})

export const createCourse = createAsyncThunk('admin/createCourse', async (request: PostCourseRequest) => {
    return await postCourse(request)
})

export const createTopic = createAsyncThunk('admin/createTopic', async (request: PostTopicRequest) => {
    return await postTopic(request)
})

export const createSubtopic = createAsyncThunk('admin/createSubtopic', async (request: PostSubtopicRequest) => {
    return await postSubtopic(request)
})

const slice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers: {
        setSubject: (state, action: PayloadAction<string>) => {
            state.selectedSubjectId = action.payload
        },
        setCourse: (state, action: PayloadAction<string>) => {
            state.selectedCourseId = action.payload
        },
        setTopic: (state, action: PayloadAction<string>) => {
            state.selectedTopicId = action.payload
        },
        setSubtopic: (state, action: PayloadAction<string>) => {
            state.selectedSubtopicId = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchSubjects.fulfilled, (state, action: any) => {
            if (action.payload.subject) {
                state.subjectIds = Object.keys(action.payload.subject)
                state.subjects = action.payload.subject
            }
        })
        builder.addCase(fetchCourses.fulfilled, (state, action: any) => {
            if (action.payload.course) {
                state.courseIds = Object.keys(action.payload.course)
                state.courses = action.payload.course
            }
        })
        builder.addCase(fetchTopics.fulfilled, (state, action: any) => {
            if (action.payload.topic) {
                state.topicIds = Object.keys(action.payload.topic)
                state.topics = action.payload.topic
            }
        })
        builder.addCase(fetchSubtopics.fulfilled, (state, action: any) => {
            if (action.payload.subtopic) {
                state.subtopicIds = Object.keys(action.payload.subtopic)
                state.subtopics = action.payload.subtopic
            }
        })
        builder.addCase(createSubject.fulfilled, (state, action: any) => {
            console.log('created subject', action.payload)
        })
        builder.addCase(createCourse.fulfilled, (state, action: any) => {
            console.log('created course', action.payload)
        })
        builder.addCase(createTopic.fulfilled, (state, action: any) => {
            console.log('created topic', action.payload)
        })
        builder.addCase(createSubtopic.fulfilled, (state, action: any) => {
            console.log('created subtopic', action.payload)
        })
    }
})

export const adminActions = slice.actions
export const adminReducer = slice.reducer
