import {createSelector} from "reselect";
import {RootState} from "../../reducer";

export const selectSubjects = createSelector(
    (state: RootState) => state.admin,
    (state) => state.subjectIds.map(subjectId => state.subjects[subjectId])
)

export const selectSelectedSubject = createSelector(
    (state: RootState) => state.admin,
    (state) => state.selectedSubjectId === '' ? undefined : state.subjects[state.selectedSubjectId]
)
