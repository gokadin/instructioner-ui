import React, {useEffect} from "react";
import {Route, useHistory} from "react-router-dom";
import {ExercisePage} from "../pages/exercise/exercise.page";
import {CompletePage} from "../pages/complete/complete.page";
import {useSelector} from "react-redux";
import {selectIsLoaded, selectIsLoggedIn} from "../pages/account/selectors";
import {LoadingUser} from "../utils/LoadingUser";

export const SessionModule = () => {
    const isUserLoaded = useSelector(selectIsLoaded);
    const isUserLoggedIn = useSelector(selectIsLoggedIn);
    const history = useHistory()

    useEffect(() => {
        if (isUserLoaded && !isUserLoggedIn) {
            history.push('/account/login')
        }
    }, [isUserLoggedIn, isUserLoaded, history])

    if (!isUserLoaded) {
        return <LoadingUser/>
    }

    return (
        <>
            <Route path="/session" exact component={ExercisePage}/>
            <Route path="/session/complete" component={CompletePage}/>
        </>
    )
}
