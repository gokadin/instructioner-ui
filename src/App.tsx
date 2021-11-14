import React, {useEffect} from 'react';
import './App.css';
import {Box, Grid} from "@chakra-ui/react"
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Auth} from "aws-amplify";
import {accountActions} from "./pages/account/reducer";
import {TopicModule} from "./modules/topic.module";
import {SessionModule} from "./modules/session.module";
import {AccountModule} from "./modules/account.module";
import {AdminModule} from "./modules/admin.module";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then(user => {
                console.log(user)
                dispatch(accountActions.setUser(user))
            })
            .catch(err => console.log(err));
    }, [dispatch])

    return (
        <Grid className={'App'} minHeight={'100vh'}>
            <Box mt={'0px !important'} h={'full'}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/account" component={AccountModule}/>
                        <Route path="/topics" component={TopicModule}/>
                        <Route path="/session" component={SessionModule}/>
                        <Route path="/admin" component={AdminModule}/>
                    </Switch>
                </BrowserRouter>
            </Box>
        </Grid>
    );
}

export default App;
