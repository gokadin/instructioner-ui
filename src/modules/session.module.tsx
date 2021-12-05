import React, {useEffect} from "react";
import {Route, useHistory} from "react-router-dom";
import {ExercisePage} from "../pages/exercise/exercise.page";
import {CompletePage} from "../pages/complete/complete.page";
import {useSelector} from "react-redux";
import {selectUserLoadState} from "../pages/account/selectors";
import {LoadingUser} from "../utils/LoadingUser";

export const SessionModule = () => {
    const userLoadState = useSelector(selectUserLoadState)
    const history = useHistory()

    useEffect(() => {
        if (userLoadState.hasFailed()) {
            history.push('/account/login')
        }
    }, [userLoadState, history])

    if (userLoadState.isLoading()) {
        return <LoadingUser/>
    }

    if (userLoadState.isReady()) {
        return (
            <>
                <Route path="/session" exact component={ExercisePage}/>
                <Route path="/session/complete" component={CompletePage}/>
            </>
        )
    }

    return <></>
}
