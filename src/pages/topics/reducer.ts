import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialState} from "./state";
import {normalize} from "normalizr";
import {topicSchemaList} from "../../models/schemas";

export const fetchTopics = createAsyncThunk('topic/fetch', async () => {
    // return await getTop
    const data = [{
        'id': '1',
        'name': 'Limits',
        'isCollapsed': false,
        'subtopics': [
            {
                'id': '10',
                'name': 'Topic 1',
                'isCompleted': true,
                'score': 90
            },
            {
                'id': '11',
                'name': 'Topic 2',
                'isCompleted': true,
                'score': 60
            },
            {
                'id': '12',
                'name': 'Topic 3',
                'isCompleted': false,
                'score': 0
            },
            {
                'id': '13',
                'name': 'Review',
                'isCompleted': false,
                'score': 0
            }
        ]
    },
        {
            'id': '2',
            'name': 'Derivatives',
            'isCollapsed': true,
            'subtopics': [
                {
                    'id': '20',
                    'name': 'Topic 1',
                    'isCompleted': true,
                    'score': 60
                },
                {
                    'id': '21',
                    'name': 'Topic 2',
                    'isCompleted': true,
                    'score': 90
                },
                {
                    'id': '22',
                    'name': 'Topic 3',
                    'isCompleted': true,
                    'score': 34
                },
                {
                    'id': '23',
                    'name': 'Review',
                    'isCompleted': false,
                    'score': 0
                }
            ]
        },
        {
            'id': '3',
            'name': 'Applications',
            'isCollapsed': true,
            'subtopics': [
                {
                    'id': '30',
                    'name': 'Topic 1',
                    'isCompleted': false,
                    'score': 60
                },
                {
                    'id': '31',
                    'name': 'Topic 2',
                    'isCompleted': false,
                    'score': 90
                },
                {
                    'id': '32',
                    'name': 'Topic 3',
                    'isCompleted': false,
                    'score': 34
                },
                {
                    'id': '33',
                    'name': 'Review',
                    'isCompleted': false,
                    'score': 0
                }
            ]
        }]

    const normalized = normalize(data, topicSchemaList)
    return normalized.entities
})

const slice = createSlice({
    name: 'topic',
    initialState: initialState,
    reducers: {
        toggleTopicCollapse: (state, action: PayloadAction<string>) => {
            state.topics[action.payload].isCollapsed = !state.topics[action.payload].isCollapsed
        },
        setSubtopic: (state, action: PayloadAction<string>) => {
            state.selectedSubtopicId = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTopics.fulfilled, (state, action: any) => {
            state.topicIds = Object.keys(action.payload.topic)
            state.topics = action.payload.topic
            state.subTopicIds = Object.keys(action.payload.subtopic)
            state.subTopics = action.payload.subtopic
        })
    }
})

export const topicActions = slice.actions
export const topicReducer = slice.reducer
