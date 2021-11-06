import {ExerciseEntity} from "../../models/exercise.entity";

export interface ExerciseState {
    exerciseIds: string[]
    exercises: Record<string, ExerciseEntity>
    currentExerciseId: string
    currentExerciseIndex: number
}

export const initialState: ExerciseState = {
    exerciseIds: [],
    exercises: {},
    currentExerciseId: '',
    currentExerciseIndex: 0
}
