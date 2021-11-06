import {AnswerFieldEntity} from "./answerField.entity";
import {VariableEntity} from "./variable.entity";
import {HintEntity} from "./hint.entity";

export interface ExerciseEntity {
    subtopicId: string
    id: string
    name: string
    question: string
    variables: VariableEntity[]
    answerType: string
    selectedAnswerIndex: number
    answerFields: AnswerFieldEntity[]
    hints: HintEntity[]
    isCompleted: boolean
}
