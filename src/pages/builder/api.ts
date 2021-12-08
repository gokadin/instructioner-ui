import {API} from "aws-amplify";
import {HintEntity} from "../../models/hint.entity";
import {AnswerFieldEntity} from "../../models/answerField.entity";
import {VariableEntity} from "../../models/variable.entity";

const API_NAME = 'exerciseApi'
const EXERCISE_API_PATH = 'exercises'

export interface PutExercisePayload {
    subtopicId: string
    id: string
    name: string
    difficulty: number
    question: string
    hints: HintEntity[]
    answerFields: AnswerFieldEntity[]
    variables: VariableEntity[]
}

export const putExercise = (payload: PutExercisePayload) => {
    return API.put(API_NAME, `/${EXERCISE_API_PATH}`, {body: payload})
}

export interface DeleteExercisePayload {
    subtopicId: string
    id: string
}

export const deleteExercise = (payload: DeleteExercisePayload) => {
    return API.del(API_NAME, `/${EXERCISE_API_PATH}/object/${payload.subtopicId}/${payload.id}`, null)
}

export interface GetExerciseDefinitionPayload {
    subtopicId: string
    exerciseId: string
}
export const getExerciseDefinition = (payload: GetExerciseDefinitionPayload) => {
    return API.get(API_NAME, `/${EXERCISE_API_PATH}/object/${payload.subtopicId}/${payload.exerciseId}`, null)
}
