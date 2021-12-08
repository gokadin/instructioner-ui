import {ExerciseEntity} from "../../models/exercise.entity";
import {LoadState} from "../../utils/loadState";

export interface ExerciseListState {
    exerciseIds: string[]
    exercises: Record<string, ExerciseEntity>
    loadState: LoadState
}

export const initialState: ExerciseListState = {
    exerciseIds: [],
    exercises: {},
    loadState: LoadState.getInitialState()
}
