import React, {useEffect} from "react";
import {Header} from "../components/header/header";
import {Route, useHistory} from "react-router-dom";
import {TopicPage} from "../pages/topics/topic.page";
import {useSelector} from "react-redux";
import {selectIsLoaded, selectIsLoggedIn} from "../pages/account/selectors";
import {LoadingUser} from "../utils/LoadingUser";

export const TopicModule = () => {
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
            <Header/>
            <Route path="" exact={true} component={TopicPage}/>
        </>
    )
}
