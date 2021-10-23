import {ExerciseEntity} from "../../models/exercise.entity";

export interface ExerciseState {
    exerciseIds: string[]
    exercises: Record<string, ExerciseEntity>
    currentExerciseId: string
}

export const initialState: ExerciseState = {
    exerciseIds: [],
    exercises: {},
    currentExerciseId: ''
}
