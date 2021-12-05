import React, {useEffect} from "react";
import {Header} from "../components/header/header";
import {Route, useHistory} from "react-router-dom";
import {LoginPage} from "../pages/login/login.page";
import {SignupPage} from "../pages/signup/signup.page";
import {VerificationPage} from "../pages/verification/verification.page";
import {useSelector} from "react-redux";
import {LoadingUser} from "../utils/LoadingUser";
import {selectUserLoadState} from "../pages/account/selectors";

export const AccountModule = () => {
    const userLoadState = useSelector(selectUserLoadState);
    const history = useHistory()

    useEffect(() => {
        if (userLoadState.isReady()) {
            history.push('/topics')
        }
    }, [userLoadState, history])

    if (userLoadState.isLoading()) {
        return <LoadingUser/>
    }

    if (userLoadState.hasFailed()) {
        return (
            <>
                <Header/>
                <Route path="/account/login" component={LoginPage}/>
                <Route path="/account/signup" component={SignupPage}/>
                <Route path="/account/verify" component={VerificationPage}/>
            </>
        )
    }

    return <></>
}
