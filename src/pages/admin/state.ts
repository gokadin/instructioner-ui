import {SubjectEntity} from "../../models/subject.entity";
import {CourseEntity} from "../../models/course.entity";
import {TopicEntity} from "../../models/topic.entity";
import {SubtopicEntity} from "../../models/subtopic.entity";
import {ExerciseEntity} from "../../models/exercise.entity";

export interface AdminState {
    subjectIds: string[]
    subjects: Record<string, SubjectEntity>
    selectedSubjectId: string
    courseIds: string[]
    courses: Record<string, CourseEntity>
    selectedCourseId: string
    topicIds: string[]
    topics: Record<string, TopicEntity>
    selectedTopicId: string
    subtopicIds: string[]
    subtopics: Record<string, SubtopicEntity>
    selectedSubtopicId: string
    exerciseIds: string[]
    exercises: Record<string, ExerciseEntity>
}

export const initialState: AdminState = {
    subjectIds: [],
    subjects: {},
    selectedSubjectId: '',
    courseIds: [],
    courses: {},
    selectedCourseId: '',
    topicIds: [],
    topics: {},
    selectedTopicId: '',
    subtopicIds: [],
    subtopics: {},
    selectedSubtopicId: '',
    exerciseIds: [],
    exercises: {},
}
