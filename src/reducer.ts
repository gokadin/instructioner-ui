import {configureStore} from "@reduxjs/toolkit";
import {topicReducer} from "./pages/topics/reducer";
import {exerciseReducer} from "./pages/exercise/reducer";
import {adminReducer} from "./pages/admin/reducer";
import {builderReducer} from "./pages/builder/reducer";

export const store = configureStore({
    reducer: {
        topic: topicReducer,
        exercise: exerciseReducer,
        admin: adminReducer,
        builder: builderReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
