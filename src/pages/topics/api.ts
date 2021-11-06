import {API} from "aws-amplify";

const API_NAME = 'subjectApi'
const TOPIC_API_PATH = 'topics'
const SUBTOPIC_API_PATH = 'subtopics'

export const getTopics = (courseId: string) => {
    return API.get(API_NAME, `/${TOPIC_API_PATH}/${courseId}`, null)
}

export const getSubtopics = (topicId: string) => {
    return API.get(API_NAME, `/${SUBTOPIC_API_PATH}/${topicId}`, null)
}
