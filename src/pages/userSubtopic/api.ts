import {API} from "aws-amplify";
import {UserSubtopicEntity} from "../../models/userSubtopic.entity";

const API_NAME = 'userSubtopicApi'
const USER_SUBTOPIC_API_PATH = 'user-subtopics'

export const getUserSubtopics = (subtopicIds: string[]) => {
    return API.get(API_NAME, `/${USER_SUBTOPIC_API_PATH}/object/${subtopicIds}`, null)
}

export const putUserSubtopic = (payload: UserSubtopicEntity) => {
    return API.put(API_NAME, `/${USER_SUBTOPIC_API_PATH}`, {body: payload})
}
