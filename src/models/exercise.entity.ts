import {AnswerFieldEntity} from "./answerField.entity";
import {VariableEntity} from "./variable.entity";

export interface ExerciseEntity {
    id: string
    name: string
    question: string
    variables: VariableEntity[]
    answerType: string
    selectedAnswerId: string
    answerFields: AnswerFieldEntity[]
    isCompleted: boolean
}
