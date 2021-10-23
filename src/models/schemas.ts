import {schema} from "normalizr";
import {TopicEntity} from "./topic.entity";
import {SubtopicEntity} from "./subtopic.entity";
import {AnswerFieldEntity} from "./answerField.entity";
import {VariableEntity} from "./variable.entity";
import {ExerciseEntity} from "./exercise.entity";

export const subtopicSchema = new schema.Entity<SubtopicEntity>('subtopic')

export const topicSchema = new schema.Entity<TopicEntity>('topic', {
    subtopics: [subtopicSchema]
})

export const topicSchemaList = new schema.Array(topicSchema)

// ***

export const answerFieldSchema = new schema.Entity<AnswerFieldEntity>('answerField')

export const variableSchema = new schema.Entity<VariableEntity>('variable')

export const exerciseSchema = new schema.Entity<ExerciseEntity>('exercise')

export const exerciseSchemaList = new schema.Array(exerciseSchema)
