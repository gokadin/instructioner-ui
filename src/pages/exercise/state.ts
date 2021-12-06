import {ExerciseEntity} from "../../models/exercise.entity";
import {LoadState} from "../../utils/loadState";

export interface ExerciseState {
    exerciseIds: string[]
    exercises: Record<string, ExerciseEntity>
    sessionLoadState: LoadState
    currentExerciseId: string
    currentExerciseIndex: number
    loadedSubtopicId: string
}

export const initialState: ExerciseState = {
    exerciseIds: [],
    exercises: {},
    sessionLoadState: LoadState.getInitialState(),
    currentExerciseId: '',
    currentExerciseIndex: 0,
    loadedSubtopicId: ''
}
