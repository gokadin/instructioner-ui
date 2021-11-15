import React, {useEffect} from "react";
import {Box} from "@chakra-ui/react";
import {Header} from "../components/header/header";
import {Route, useHistory} from "react-router-dom";
import {LoginPage} from "../pages/login/login.page";
import {SignupPage} from "../pages/signup/signup.page";
import {VerificationPage} from "../pages/verification/verification.page";
import {useSelector} from "react-redux";
import {selectIsLoaded, selectIsLoggedIn} from "../pages/account/selectors";
import {LoadingUser} from "../utils/LoadingUser";

export const AccountModule = () => {
    const isUserLoaded = useSelector(selectIsLoaded);
    const isUserLoggedIn = useSelector(selectIsLoggedIn);
    const history = useHistory()

    useEffect(() => {
        if (isUserLoaded && isUserLoggedIn) {
            history.push('/topics')
        }
    }, [isUserLoggedIn, isUserLoaded, history])

    if (!isUserLoaded) {
        return <LoadingUser/>
    }

    return (
        <>
            <Box bg={'black'} marginBottom={2}>
                <Header/>
            </Box>
            <Route path="/account/login" component={LoginPage}/>
            <Route path="/account/signup" component={SignupPage}/>
            <Route path="/account/verify" component={VerificationPage}/>
        </>
    )
}
