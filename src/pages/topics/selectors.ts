import {createSelector} from "reselect";
import {RootState} from "../../reducer";

export const selectTopics = createSelector(
    (state: RootState) => state.topic,
    (topic) => topic.topicIds.map(topicId => topic.topics[topicId])
)

export const selectSubtopics = createSelector(
    (state: RootState) => state.topic,
    (_: RootState, topicId: string) => topicId,
    (state, topicId) => state.subtopicIds.map(subtopicId => state.subtopics[subtopicId])
        .filter(subtopic => subtopic.topicId === topicId)
)

export const selectCompletedSubtopicCount = createSelector(
    (state: RootState) => state.topic,
    (_: RootState, topicId: string) => topicId,
    (state, topicId) => 0
)

export const selectSelectedSubtopic = createSelector(
    (state: RootState) => state.topic,
    (state) => state.selectedSubtopicId === '' ? undefined : state.subtopics[state.selectedSubtopicId]
)
