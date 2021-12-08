import {VariableEntity} from "../../models/variable.entity";
import {AnswerFieldEntity} from "../../models/answerField.entity";
import {HintEntity} from "../../models/hint.entity";
import {LoadState} from "../../utils/loadState";

export interface BuilderState {
    editExerciseLoadState: LoadState
    isInPreview: boolean
    id: string
    name: string
    question: string
    questionFormatted: string
    difficulty: number
    variableIds: string[],
    variables: Record<string, VariableEntity>
    answerFields: AnswerFieldEntity[]
    hints: HintEntity[]
}

export const initialState: BuilderState = {
    editExerciseLoadState: LoadState.getInitialState(),
    isInPreview: false,
    id: '',
    question: '',
    questionFormatted: '',
    name: '',
    difficulty: 0,
    variableIds: [],
    variables: {},
    answerFields: [{
        isCorrect: true,
        content: ''
    }, {
        isCorrect: false,
        content: ''
    }, {
        isCorrect: false,
        content: ''
    }, {
        isCorrect: false,
        content: ''
    }],
    hints: [{
        content: ''
    }]
}
