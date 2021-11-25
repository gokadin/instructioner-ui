import {VariableEntity} from "../../models/variable.entity";
import {AnswerFieldEntity} from "../../models/answerField.entity";
import {HintEntity} from "../../models/hint.entity";

export interface BuilderState {
    name: string
    question: string
    difficulty: number
    variableIds: string[],
    variables: Record<string, VariableEntity>
    answerFields: AnswerFieldEntity[]
    hints: HintEntity[]
}

export const initialState: BuilderState = {
    question: '',
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
