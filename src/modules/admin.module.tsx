import React, {useEffect} from "react";
import {Header} from "../components/header/header";
import {Route, useHistory} from "react-router-dom";
import {AdminPage} from "../pages/admin/admin.page";
import {ExerciseListPage} from "../pages/exerciseList/exerciseList.page";
import {BuilderPage} from "../pages/builder/builder.page";
import {useSelector} from "react-redux";
import {selectUser, selectUserLoadState} from "../pages/account/selectors";
import {LoadingUser} from "../utils/LoadingUser";

export const AdminModule = () => {
    const userLoadState = useSelector(selectUserLoadState)
    const user = useSelector(selectUser);
    const history = useHistory()

    useEffect(() => {
        if (userLoadState.hasFailed() || (userLoadState.isReady() && user.email !== 'admin@instructioner.com')) {
            history.push('/account/login')
        }
    }, [userLoadState, history, user])

    if (userLoadState.isLoading()) {
        return <LoadingUser/>
    }

    if (userLoadState.isReady()) {
        return (
            <>
                <Header/>
                <Route path="/admin" component={AdminPage} exact/>
                <Route path="/admin/:subtopicId/exercises" component={ExerciseListPage}/>
                <Route path="/admin/:subtopicId/builder" component={BuilderPage}/>
            </>
        )
    }

    return <></>
}
