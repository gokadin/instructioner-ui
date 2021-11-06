import React from 'react';
import './App.css';
import {Box, ChakraProvider, VStack} from "@chakra-ui/react"
import theme from './theme'
import {ExercisePage} from "./pages/exercise/exercise.page";
import {Header} from "./components/header/header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {TopicPage} from "./pages/topics/topic.page";
import {Provider} from "react-redux";
import {store} from "./reducer";
import {AdminPage} from "./pages/admin/admin.page";
import {BuilderPage} from "./pages/builder/builder.page";
import {ExerciseListPage} from "./pages/exerciseList/exerciseList.page";

function App() {

    return (
        <ChakraProvider theme={theme}>
            <Provider store={store}>
                <div className="App">
                    <VStack align={'stretch'}>
                        <Box bg={'black'}>
                            <Header/>
                        </Box>
                        <Box mt={'0px !important'}>
                            <BrowserRouter>
                                <Switch>
                                    <Route path="/topics" exact={true}>
                                        <TopicPage/>
                                    </Route>
                                    <Route path="/session" exact={true}>
                                        <ExercisePage/>
                                    </Route>
                                    <Route path="/admin" exact={true}>
                                        <AdminPage/>
                                    </Route>
                                    <Route path="/admin/exercises" exact={true}>
                                        <ExerciseListPage/>
                                    </Route>
                                    <Route path="/admin/exercises/builder" exact={true}>
                                        <BuilderPage/>
                                    </Route>
                                </Switch>
                            </BrowserRouter>
                        </Box>
                    </VStack>
                </div>
            </Provider>
        </ChakraProvider>
    );
}

export default App;
