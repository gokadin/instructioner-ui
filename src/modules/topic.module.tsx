import React from "react";
import {Box} from "@chakra-ui/react";
import {Header} from "../components/header/header";
import {Route} from "react-router-dom";
import {TopicPage} from "../pages/topics/topic.page";

export const TopicModule = () => {
    return (
        <>
            <Box bg={'black'} marginBottom={2}>
                <Header/>
            </Box>
            <Route path="" exact={true} component={TopicPage}/>
        </>
    )
}
