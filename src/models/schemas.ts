import {schema} from "normalizr";
import {TopicEntity} from "./topic.entity";
import {SubtopicEntity} from "./subtopic.entity";
import {AnswerFieldEntity} from "./answerField.entity";
import {VariableEntity} from "./variable.entity";
import {ExerciseEntity} from "./exercise.entity";
import {SubjectEntity} from "./subject.entity";
import {CourseEntity} from "./course.entity";

export const subjectSchema = new schema.Entity<SubjectEntity>('subject')
export const subjectSchemaList = new schema.Array(subjectSchema)

export const courseSchema = new schema.Entity<CourseEntity>('course')
export const courseSchemaList = new schema.Array(courseSchema)

export const subtopicSchema = new schema.Entity<SubtopicEntity>('subtopic')
export const subtopicSchemaList = new schema.Array(subtopicSchema)

export const topicSchema = new schema.Entity<TopicEntity>('topic', {
    subtopics: [subtopicSchema]
})
export const topicSchemaList = new schema.Array(topicSchema)

// ***

export const answerFieldSchema = new schema.Entity<AnswerFieldEntity>('answerField')

export const variableSchema = new schema.Entity<VariableEntity>('variable')

export const exerciseSchema = new schema.Entity<ExerciseEntity>('exercise')
export const exerciseSchemaList = new schema.Array(exerciseSchema)
