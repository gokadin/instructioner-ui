import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ChakraProvider, ColorModeScript} from "@chakra-ui/react"
import theme from "./theme"
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import {store} from "./reducer";
import {Provider} from "react-redux";
import './i18n';
import {BrowserRouter} from "react-router-dom";

const isLocalhost = !!(window.location.hostname === "localhost");
const [
    productionRedirectSignIn,
    localRedirectSignIn] = awsExports.oauth.redirectSignIn.split(",");
const [
    productionRedirectSignOut,
    localRedirectSignOut] = awsExports.oauth.redirectSignOut.split(",");

const updatedAwsConfig = {
    ...awsExports,
    oauth: {
        ...awsExports.oauth,
        redirectSignIn: isLocalhost
            ? localRedirectSignIn
            : productionRedirectSignIn,
        redirectSignOut: isLocalhost
            ? localRedirectSignOut
            : productionRedirectSignOut,
    }
}

Amplify.configure(updatedAwsConfig);

ReactDOM.render(
    <>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <ChakraProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        </ChakraProvider>
    </>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
