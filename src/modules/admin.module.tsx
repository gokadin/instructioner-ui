import React from "react";
import {Box} from "@chakra-ui/react";
import {Header} from "../components/header/header";
import {Route} from "react-router-dom";
import {AdminPage} from "../pages/admin/admin.page";
import {ExerciseListPage} from "../pages/exerciseList/exerciseList.page";
import {BuilderPage} from "../pages/builder/builder.page";

export const AdminModule = () => {
    return (
        <>
            <Box bg={'black'} marginBottom={2}>
                <Header/>
            </Box>
            <Route path="/admin/topics" component={AdminPage} exact/>
            <Route path="/admin/exercises" component={ExerciseListPage}/>
            <Route path="/admin/builder" component={BuilderPage}/>
        </>
    )
}
