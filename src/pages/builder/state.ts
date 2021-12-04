import {VariableEntity} from "../../models/variable.entity";
import {AnswerFieldEntity} from "../../models/answerField.entity";
import {HintEntity} from "../../models/hint.entity";

export interface BuilderState {
    isInPreview: boolean
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
    isInPreview: false,
    question: '',
    questionFormatted: '',
    name: '',
    difficulty: 0,
    variableIds: [],
    variables: {},
    answerFields: [{
        isCorrect: true,
        content: ''
    },{
        isCorrect: false,
        content: ''
    },{
        isCorrect: false,
        content: ''
    },{
        isCorrect: false,
        content: ''
    }],
    hints: [{
        content: ''
    }]
}
