import {createSelector} from "reselect";
import {RootState} from "../../reducer";
import {parsePreviewContent} from "../../utils/builder.utils";

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

export const selectDifficulty = createSelector(
    (state: RootState) => state.builder,
    (state) => state.difficulty
)

export const selectQuestion = createSelector(
    (state: RootState) => state.builder,
    (state) => state.question
)

export const selectIsInPreview = createSelector(
    (state: RootState) => state.builder,
    (state) => state.isInPreview
)

const selectResolvedVariables = createSelector(
    (state: RootState) => state.builder,
    (state) => {
        let resolved: any = {}
        state.variableIds.forEach((variableId: string) => {
            resolved[variableId] = state.variables[variableId].default
        })
        return resolved
    }
)

export const selectQuestionPreview = createSelector(
    selectResolvedVariables,
    (state: RootState) => state.builder,
    (variables, state) => parsePreviewContent(state.question, variables)
)

export const selectHintsPreview = createSelector(
    selectResolvedVariables,
    (state: RootState) => state.builder,
    (variables, state) => state.hints.map(hint => {
        return {
            ...hint,
            isVisible: true,
            content: parsePreviewContent(hint.content, variables)
        }
    })
)

export const selectAnswerFieldsPreview = createSelector(
    selectResolvedVariables,
    (state: RootState) => state.builder,
    (variables, state) => state.answerFields.map(answerField => {
        return {
            ...answerField,
            content: parsePreviewContent(answerField.content, variables)
        }
    })
)
