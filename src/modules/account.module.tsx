import React from "react";
import {Box} from "@chakra-ui/react";
import {Header} from "../components/header/header";
import {Route} from "react-router-dom";
import {LoginPage} from "../pages/login/login.page";
import {SignupPage} from "../pages/signup/signup.page";
import {VerificationPage} from "../pages/verification/verification.page";

export const AccountModule = () => {
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
