import {createSelector} from "reselect";
import {RootState} from "../../reducer";

export const selectTopics = createSelector(
    (state: RootState) => state.topic,
    (topic) => topic.topicIds.map(topicId => topic.topics[topicId])
)

export const selectSubtopics = createSelector(
    (state: RootState) => state.topic,
    (_: RootState, topicId: string) => topicId,
    (topic, topicId) => topic.topics[topicId].subtopics.map(subtopicId => topic.subTopics[subtopicId])
)

export const selectCompletedSubtopicCount = createSelector(
    (state: RootState) => state.topic,
    (_: RootState, topicId: string) => topicId,
    (topic, topicId) => topic.topics[topicId].subtopics.map(subtopicId => topic.subTopics[subtopicId])
        .filter(subtopic => subtopic.isCompleted).length
)
