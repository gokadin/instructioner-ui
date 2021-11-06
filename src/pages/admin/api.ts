import {API} from "aws-amplify";

const PROGRAM_ID = '1'
const API_NAME = 'subjectApi'
const SUBJECT_API_PATH = 'subjects'
const COURSE_API_PATH = 'courses'
const TOPIC_API_PATH = 'topics'
const SUBTOPIC_API_PATH = 'subtopics'

export const getSubjects = () => {
    return API.get(API_NAME, `/${SUBJECT_API_PATH}/${PROGRAM_ID}`, null)
}

export const getCourses = (subjectId: string) => {
    return API.get(API_NAME, `/${COURSE_API_PATH}/${subjectId}`, null)
}

export const getTopics = (courseId: string) => {
    return API.get(API_NAME, `/${TOPIC_API_PATH}/${courseId}`, null)
}

export const getSubtopics = (topicId: string) => {
    return API.get(API_NAME, `/${SUBTOPIC_API_PATH}/${topicId}`, null)
}

export interface PostSubjectRequest {
    name: string
    displayName: string
}

export const postSubject = (payload: PostSubjectRequest) => {
    return API.post(API_NAME, `/${SUBJECT_API_PATH}`, {body: payload})
}

export interface PostCourseRequest {
    subjectId: string
    name: string
    displayName: string
}

export const postCourse = (payload: PostCourseRequest) => {
    return API.post(API_NAME, `/${COURSE_API_PATH}`, {body: payload})
}

export interface PostTopicRequest {
    courseId: string
    name: string
    displayName: string
}

export const postTopic = (payload: PostTopicRequest) => {
    return API.post(API_NAME, `/${TOPIC_API_PATH}`, {body: payload})
}

export interface PostSubtopicRequest {
    topicId: string
    name: string
    displayName: string
}

export const postSubtopic = (payload: PostSubtopicRequest) => {
    return API.post(API_NAME, `/${SUBTOPIC_API_PATH}`, {body: payload})
}
