import {TopicEntity} from "../../models/topic.entity";
import {SubtopicEntity} from "../../models/subtopic.entity";

export interface TopicState {
    topicIds: string[]
    topics: Record<string, TopicEntity>
    subTopicIds: string[]
    subTopics: Record<string, SubtopicEntity>
    selectedSubtopicId: string
}

export const initialState: TopicState = {
    topicIds: [],
    topics: {},
    subTopicIds: [],
    subTopics: {},
    selectedSubtopicId: ''
}
