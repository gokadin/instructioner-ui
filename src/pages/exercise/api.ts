import {API} from "aws-amplify";

const API_NAME = 'exerciseApi'
const EXERCISE_API_PATH = 'exercises'

export const getExercises = (subtopicId: string) => {
    return API.get(API_NAME, `/${EXERCISE_API_PATH}/${subtopicId}`, null)
}
