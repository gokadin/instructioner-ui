import {createSelector} from "reselect";
import {RootState} from "../../reducer";

export const selectExercises = createSelector(
    (state: RootState) => state.exerciseList,
    (state) => state.exerciseIds.map(exerciseId => state.exercises[exerciseId])
)

export const selectLoadState = createSelector(
    (state: RootState) => state.exerciseList,
    (state) => state.loadState
)
