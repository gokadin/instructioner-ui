import {configureStore} from "@reduxjs/toolkit";
import {topicReducer} from "./pages/topics/reducer";
import {exerciseReducer} from "./pages/exercise/reducer";
import {adminReducer} from "./pages/admin/reducer";

export const store = configureStore({
    reducer: {
        topic: topicReducer,
        exercise: exerciseReducer,
        admin: adminReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
