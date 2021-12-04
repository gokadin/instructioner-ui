import React, {useEffect} from "react";
import {Header} from "../components/header/header";
import {Route, useHistory} from "react-router-dom";
import {TopicPage} from "../pages/topics/topic.page";
import {useSelector} from "react-redux";
import {selectIsLoaded, selectIsLoggedIn} from "../pages/account/selectors";
import {LoadingUser} from "../utils/LoadingUser";
import {Auth} from "aws-amplify";

export const TopicModule = () => {
    const isUserLoaded = useSelector(selectIsLoaded);
    const isUserLoggedIn = useSelector(selectIsLoggedIn);
    const history = useHistory()

    useEffect(() => {
        Auth.currentSession()
            .then((x) => {
                console.log('cs', x)
            })
            .catch((x) => {
                console.log('cs err', x)
            })

        Auth.currentCredentials()
            .then((x) => {
                console.log('cc', x)
            })
            .catch((x) => {
                console.log('cc err', x)
            })

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
