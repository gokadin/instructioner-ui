import {VariableEntity} from "../../models/variable.entity";
import {AnswerFieldEntity} from "../../models/answerField.entity";
import {HintEntity} from "../../models/hint.entity";

export interface BuilderState {
    name: string
    question: string
    variableIds: string[],
    variables: Record<string, VariableEntity>
    answerFields: AnswerFieldEntity[]
    hints: HintEntity[]
}

export const initialState: BuilderState = {
    question: '',
    name: '',
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
