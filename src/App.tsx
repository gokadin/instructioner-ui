import React, {useEffect} from 'react';
import './App.css';
import {Box, Grid} from "@chakra-ui/react"
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getCurrentUser} from "./pages/account/reducer";
import {TopicModule} from "./modules/topic.module";
import {SessionModule} from "./modules/session.module";
import {AccountModule} from "./modules/account.module";
import {AdminModule} from "./modules/admin.module";
import {LandingPage} from "./pages/landing/landing.page";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrentUser())
    }, [dispatch])

    return (
        <Grid className={'App'} minHeight={'100%'}>
            <Box mt={'0px !important'} h={'full'}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={LandingPage} exact/>
                        <Route path="/account" component={AccountModule}/>
                        <Route path="/topics" component={TopicModule}/>
                        <Route path="/session" component={SessionModule}/>
                        <Route path="/admin" component={AdminModule}/>
                        <Redirect to={'/'}/>
                    </Switch>
                </BrowserRouter>
            </Box>
        </Grid>
    );
}

export default App;
