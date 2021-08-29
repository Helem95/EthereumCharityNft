import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {MoralisProvider} from "react-moralis";
import {BrowserRouter} from "react-router-dom";
import "./index.css";

const theme = extendTheme({
    config: {
        initialColorMode: "light"
    }
});

const {REACT_APP_APP_ID, REACT_APP_SERVER_URL} = process.env;

ReactDOM.render(
    <React.StrictMode>
        <MoralisProvider appId={REACT_APP_APP_ID} serverUrl={REACT_APP_SERVER_URL}>
            <ChakraProvider theme={theme}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ChakraProvider>
        </MoralisProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
