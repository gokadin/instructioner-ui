import {configureStore} from "@reduxjs/toolkit";
import {topicReducer} from "./pages/topics/reducer";
import {exerciseReducer} from "./pages/exercise/reducer";
import {adminReducer} from "./pages/admin/reducer";
import {builderReducer} from "./pages/builder/reducer";
import {accountReducer} from "./pages/account/reducer";
import {userSubtopicReducer} from "./pages/userSubtopic/reducer";

export const store = configureStore({
    reducer: {
        account: accountReducer,
        topic: topicReducer,
        exercise: exerciseReducer,
        admin: adminReducer,
        builder: builderReducer,
        userSubtopic: userSubtopicReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
