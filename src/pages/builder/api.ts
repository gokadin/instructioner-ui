import {API} from "aws-amplify";
import {HintEntity} from "../../models/hint.entity";
import {AnswerFieldEntity} from "../../models/answerField.entity";
import {VariableEntity} from "../../models/variable.entity";

const API_NAME = 'exerciseApi'
const EXERCISE_API_PATH = 'exercises'

export interface PostExercisePayload {
    subtopicId: string
    name: string
    question: string
    hints: HintEntity[]
    answerFields: AnswerFieldEntity[]
    variables: VariableEntity[]
}

export const postExercise = (payload: PostExercisePayload) => {
    return API.post(API_NAME, `/${EXERCISE_API_PATH}`, {body: payload})
}

export interface DeleteExercisePayload {
    subtopicId: string
    id: string
}

export const deleteExercise = (payload: DeleteExercisePayload) => {
    return API.del(API_NAME, `/${EXERCISE_API_PATH}/object/${payload.subtopicId}/${payload.id}`, null)
}
