import {RootState} from "../../reducer";
import {createSelector} from "reselect";

export const selectExercises = createSelector(
    (state: RootState) => state.exercise,
    (_: RootState, selectedSubtopicId: string | undefined) => selectedSubtopicId,
    (state, selectedSubtopicId) => state.exerciseIds.map(exerciseId => state.exercises[exerciseId])
        .filter(exercise => {
            return exercise.subtopicId === selectedSubtopicId
        })
)

export const selectCurrentExercise = createSelector(
    (state: RootState) => state.exercise,
    (state) => state.exercises[state.currentExerciseId]
)

export const selectSessionLoadState = createSelector(
    (state: RootState) => state.exercise,
    (state) => state.sessionLoadState
)

export const selectExerciseCount = createSelector(
    (state: RootState) => state.exercise,
    (state) => state.exerciseIds.length
)

export const selectCurrentExerciseIndex = createSelector(
    (state: RootState) => state.exercise,
    (state) => state.currentExerciseIndex
)

export const selectHints = createSelector(
    selectCurrentExercise,
    (exercise) => exercise ? exercise.hints : []
)

export const selectSelectedAnswerFieldIndex = createSelector(
    selectCurrentExercise,
    (exercise) => exercise.selectedAnswerIndex
)

export const selectAnswerIsSelected = createSelector(
    selectCurrentExercise,
    (exercise) => exercise.selectedAnswerIndex >= 0
)

export const selectExerciseIsCompleted = createSelector(
    selectCurrentExercise,
    (exercise) => exercise.isCompleted
)

export const selectIsLastExercise = createSelector(
    selectCurrentExerciseIndex,
    selectExerciseCount,
    (currentIndex, totalCount) => currentIndex + 1 === totalCount
)

export const selectAreHintsShown = createSelector(
    selectCurrentExercise,
    (exercise) => exercise.areHintsShown
)

export const selectCurrentHintIndex = createSelector(
    selectCurrentExercise,
    (exercise) => exercise.currentHintIndex
)

export const selectCorrectAnswerFieldIndex = createSelector(
    selectCurrentExercise,
    (exercise) => {
        let index = 0
        exercise.answerFields.forEach((answerField, i) => {
            if (answerField.isCorrect) {
                index = i
                return
            }
        })
        return index
    }
)

export const selectIsCorrect = createSelector(
    selectCurrentExercise,
    selectSelectedAnswerFieldIndex,
    (exercise, selectedAnswerFieldIndex) => selectedAnswerFieldIndex in exercise.answerFields &&
        exercise.answerFields[selectedAnswerFieldIndex].isCorrect,
)
