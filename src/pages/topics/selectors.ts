import {createSelector} from "reselect";
import {RootState} from "../../reducer";

export const selectTopics = createSelector(
    (state: RootState) => state.topic,
    (topic) => topic.topicIds.map(topicId => topic.topics[topicId])
)

export const selectIsTopicsLoaded = createSelector(
    (state: RootState) => state.topic,
    (topic) => topic.isTopicsLoaded
)

export const selectSubtopics = createSelector(
    (state: RootState) => state.topic,
    (_: RootState, topicId: string) => topicId,
    (state, topicId) => state.subtopicIds.map(subtopicId => state.subtopics[subtopicId])
        .filter(subtopic => subtopic.topicId === topicId)
)

export const selectSelectedSubtopic = createSelector(
    (state: RootState) => state.topic,
    (state) => state.selectedSubtopicId === '' ? undefined : state.subtopics[state.selectedSubtopicId]
)
