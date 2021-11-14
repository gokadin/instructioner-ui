import {UserSubtopicEntity} from "../../models/userSubtopic.entity";

export interface UserSubtopicState {
    userSubtopicIds: string[]
    userSubtopics: Record<string, UserSubtopicEntity>
    currentSession: UserSubtopicEntity
    isUserSubtopicsLoading: Record<string, boolean>
    isUserSubtopicsLoaded: Record<string, boolean>
}

export const initialState: UserSubtopicState = {
    userSubtopicIds: [],
    userSubtopics: {},
    currentSession: {
        userId: '',
        subtopicId: '',
        exerciseCount: 0,
        correctExerciseCount: 0,
        duration: 0,
        score: 0
    },
    isUserSubtopicsLoading: {},
    isUserSubtopicsLoaded: {}
}
