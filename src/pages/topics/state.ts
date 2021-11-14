import {TopicEntity} from "../../models/topic.entity";
import {SubtopicEntity} from "../../models/subtopic.entity";

export interface TopicState {
    topicIds: string[]
    topics: Record<string, TopicEntity>
    isTopicsLoaded: boolean
    subtopicIds: string[]
    subtopics: Record<string, SubtopicEntity>
    selectedSubtopicId: string
}

export const initialState: TopicState = {
    topicIds: [],
    topics: {},
    isTopicsLoaded: false,
    subtopicIds: [],
    subtopics: {},
    selectedSubtopicId: '',
}
