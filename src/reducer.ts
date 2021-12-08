import {configureStore} from "@reduxjs/toolkit";
import {topicReducer} from "./pages/topics/reducer";
import {exerciseReducer} from "./pages/exercise/reducer";
import {adminReducer} from "./pages/admin/reducer";
import {builderReducer} from "./pages/builder/reducer";
import {accountReducer} from "./pages/account/reducer";
import {userSubtopicReducer} from "./pages/userSubtopic/reducer";
import {exerciseListReducer} from "./pages/exerciseList/reducer";

export const store = configureStore({
    reducer: {
        account: accountReducer,
        topic: topicReducer,
        exercise: exerciseReducer,
        userSubtopic: userSubtopicReducer,
        admin: adminReducer,
        builder: builderReducer,
        exerciseList: exerciseListReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
