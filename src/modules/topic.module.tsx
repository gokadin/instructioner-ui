import React, {useEffect} from "react";
import {Header} from "../components/header/header";
import {Route, useHistory} from "react-router-dom";
import {TopicPage} from "../pages/topics/topic.page";
import {useSelector} from "react-redux";
import {LoadingUser} from "../utils/LoadingUser";
import {selectUserLoadState} from "../pages/account/selectors";

export const TopicModule = () => {
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
                <Header/>
                <Route path="" exact={true} component={TopicPage}/>
            </>
        )
    }

    return <></>
}
