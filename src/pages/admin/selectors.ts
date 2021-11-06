import {createSelector} from "reselect";
import {RootState} from "../../reducer";

export const selectSubjects = createSelector(
    (state: RootState) => state.admin,
    (state) => state.subjectIds.map(subjectId => state.subjects[subjectId])
)

export const selectCourses = createSelector(
    (state: RootState) => state.admin,
    (state) => state.courseIds.map(courseId => state.courses[courseId])
        .filter(course => course.subjectId === state.selectedSubjectId)
)

export const selectTopics = createSelector(
    (state: RootState) => state.admin,
    (state) => state.topicIds.map(topicId => state.topics[topicId])
        .filter(topic => topic.courseId === state.selectedCourseId)
)

export const selectSubtopics = createSelector(
    (state: RootState) => state.admin,
    (state) => state.subtopicIds.map(subtopicId => state.subtopics[subtopicId])
        .filter(subtopic => subtopic.topicId === state.selectedTopicId)
)

export const selectSelectedSubject = createSelector(
    (state: RootState) => state.admin,
    (state) => state.selectedSubjectId === '' ? undefined : state.subjects[state.selectedSubjectId]
)

export const selectSelectedCourse = createSelector(
    (state: RootState) => state.admin,
    (state) => state.selectedCourseId === '' ? undefined : state.courses[state.selectedCourseId]
)

export const selectSelectedTopic = createSelector(
    (state: RootState) => state.admin,
    (state) => state.selectedTopicId === '' ? undefined : state.topics[state.selectedTopicId]
)

export const selectSelectedSubtopic = createSelector(
    (state: RootState) => state.admin,
    (state) => state.selectedSubtopicId === '' ? {
        id: '8822c8a6-71ac-4316-95a1-eea8a73990f9',
        name: 'test',
        displayName: 'test'
    } : state.subtopics[state.selectedSubtopicId]
)
