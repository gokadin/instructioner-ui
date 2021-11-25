import {createSelector} from "reselect";
import {RootState} from "../../reducer";

export const selectVariables = createSelector(
    (state: RootState) => state.builder,
    (state) => state.variableIds.map(variableId => state.variables[variableId])
)

export const selectAnswerFields = createSelector(
    (state: RootState) => state.builder,
    (state) => state.answerFields
)

export const selectCorrectAnswerFieldIndex = createSelector(
    (state: RootState) => state.builder,
    (state) => {
        let index = 0
        state.answerFields.forEach((answerField, i) => {
            if (answerField.isCorrect) {
                index = i
                return
            }
        })
        return index
    }
)

export const selectHints = createSelector(
    (state: RootState) => state.builder,
    (state) => state.hints
)

export const selectName = createSelector(
    (state: RootState) => state.builder,
    (state) => state.name
)

export const selectQuestion = createSelector(
    (state: RootState) => state.builder,
    (state) => state.question
)

export const selectDifficulty = createSelector(
    (state: RootState) => state.builder,
    (state) => state.difficulty
)
