import {ExerciseEntity} from "../../models/exercise.entity";

export interface ExerciseState {
    exerciseIds: string[]
    exercises: Record<string, ExerciseEntity>
    currentExerciseId: string
    currentExerciseIndex: number
    isExercisesLoaded: boolean
    loadedSubtopicId: string
}

export const initialState: ExerciseState = {
    exerciseIds: [],
    exercises: {},
    currentExerciseId: '',
    currentExerciseIndex: 0,
    isExercisesLoaded: false,
    loadedSubtopicId: ''
}
