import {RootState} from "../../reducer";
import {createSelector} from "reselect";

export const selectCurrentExercise = createSelector(
    (state: RootState) => state.exercise,
    (state) => state.exercises[state.currentExerciseId]
)

export const selectSelectedAnswerFieldId = createSelector(
    (state: RootState) => state.exercise,
    (_: RootState, exerciseId: string) => exerciseId,
    (state, exerciseId) => state.exercises[exerciseId].selectedAnswerId
)

export const selectShowSuccess = createSelector(
    (state: RootState) => state.exercise,
    (_: RootState, exerciseId: string) => exerciseId,
    (state, exerciseId) => state.exercises[exerciseId].isCompleted && state.exercises[exerciseId].answerFields.find(answerField => answerField.id === state.exercises[exerciseId].selectedAnswerId)?.isCorrect
)

export const selectShowFailure = createSelector(
    (state: RootState) => state.exercise,
    (_: RootState, exerciseId: string) => exerciseId,
    (state, exerciseId) => state.exercises[exerciseId].isCompleted && !state.exercises[exerciseId].answerFields.find(answerField => answerField.id === state.exercises[exerciseId].selectedAnswerId)?.isCorrect
)
