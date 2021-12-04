import {TopicEntity} from "../../models/topic.entity";
import {SubtopicEntity} from "../../models/subtopic.entity";
import {LoadState} from "../../utils/loadState";

export interface TopicState {
    topicIds: string[]
    topics: Record<string, TopicEntity>
    topicsLoadState: LoadState
    subtopicIds: string[]
    subtopics: Record<string, SubtopicEntity>
    selectedSubtopicId: string
}

export const initialState: TopicState = {
    topicIds: [],
    topics: {},
    topicsLoadState: new LoadState(),
    subtopicIds: [],
    subtopics: {},
    selectedSubtopicId: '',
}
