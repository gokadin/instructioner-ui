import React, {useEffect} from "react";
import {Box} from "@chakra-ui/react";
import {Header} from "../components/header/header";
import {Route, useHistory} from "react-router-dom";
import {AdminPage} from "../pages/admin/admin.page";
import {ExerciseListPage} from "../pages/exerciseList/exerciseList.page";
import {BuilderPage} from "../pages/builder/builder.page";
import {useSelector} from "react-redux";
import {selectIsLoaded, selectIsLoggedIn, selectUser} from "../pages/account/selectors";
import {LoadingUser} from "../utils/LoadingUser";

export const AdminModule = () => {
    const isUserLoaded = useSelector(selectIsLoaded);
    const isUserLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);
    const history = useHistory()

    useEffect(() => {
        if (isUserLoaded && (!isUserLoggedIn || user.email !== 'admin@instructioner.com')) {
            history.push('/account/login')
        }
    }, [isUserLoggedIn, isUserLoaded, history, user])

    if (!isUserLoaded) {
        return <LoadingUser/>
    }

    return (
        <>
            <Header/>
            <Route path="/admin" component={AdminPage} exact/>
            <Route path="/admin/:subtopicId/exercises" component={ExerciseListPage}/>
            <Route path="/admin/:subtopicId/builder" component={BuilderPage}/>
        </>
    )
}
