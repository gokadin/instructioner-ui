import {createSelector} from "reselect";
import {RootState} from "../../reducer";
import {selectSubtopics} from "../topics/selectors";

export const selectCurrentUserSession = createSelector(
    (state: RootState) => state.userSubtopic,
    (state) => state.currentSession
)

export const selectUserSubtopic = createSelector(
    (state: RootState) => state.userSubtopic,
    (_: RootState, subtopicId: string) => subtopicId,
    (state, subtopicId) => state.userSubtopics[subtopicId]
)

export const selectIsUserSubtopicsLoading = createSelector(
    (state: RootState) => state.userSubtopic,
    (state) => state.isUserSubtopicsLoading
)

export const selectLoadedUserSubtopicIds = createSelector(
    (state: RootState) => state.userSubtopic,
    (state) => state.isUserSubtopicsLoaded
)

export const selectUserSubtopics = createSelector(
    (state: RootState) => state.userSubtopic,
    (state) => state.userSubtopicIds.map(userSubtopicId => state.userSubtopics[userSubtopicId])
)

export const selectTopicCompletedSubtopics = createSelector(
    (state: RootState) => state.userSubtopic,
    selectSubtopics,
    (state, subtopics) => {
        let count = 0;
        subtopics.forEach(subtopic => {
            if (!(subtopic.id in state.userSubtopics)) {
                return;
            }
            count++;
        })
        return count
    }
)

export const selectTopicScore = createSelector(
    (state: RootState) => state.userSubtopic,
    selectSubtopics,
    (state, subtopics) => {
        let averageScore = 0;
        let count = 0;
        subtopics.forEach(subtopic => {
            if (!(subtopic.id in state.userSubtopics)) {
                return;
            }
            averageScore += state.userSubtopics[subtopic.id].score;
            count++;
        })
        return Math.round(averageScore / count);
    }
)
