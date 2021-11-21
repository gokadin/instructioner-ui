import React, {useEffect} from "react";
import {Box} from "@chakra-ui/react";
import {Header} from "../components/header/header";
import {Route, useHistory} from "react-router-dom";
import {AdminPage} from "../pages/admin/admin.page";
import {ExerciseListPage} from "../pages/exerciseList/exerciseList.page";
import {BuilderPage} from "../pages/builder/builder.page";
import {useSelector} from "react-redux";
import {selectIsLoaded, selectIsLoggedIn} from "../pages/account/selectors";
import {LoadingUser} from "../utils/LoadingUser";

export const AdminModule = () => {
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
            <Box bg={'black'} marginBottom={2}>
                <Header/>
            </Box>
            <Route path="/admin/topics" component={AdminPage} exact/>
            <Route path="/admin/:subtopicId/exercises" component={ExerciseListPage}/>
            <Route path="/admin/builder" component={BuilderPage}/>
        </>
    )
}
