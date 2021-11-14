import React from "react";
import {Route} from "react-router-dom";
import {ExercisePage} from "../pages/exercise/exercise.page";
import {CompletePage} from "../pages/complete/complete.page";

export const SessionModule = () => {
    return (
        <>
            {/*<Box bg={'black'} marginBottom={2}>*/}
            {/*    <Header/>*/}
            {/*</Box>*/}
            <Route path="/session" exact component={ExercisePage}/>
            <Route path="/session/complete" component={CompletePage}/>
        </>
    )
}
