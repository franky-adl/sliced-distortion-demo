import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import siteTheme from "./theme";
import GlobalStyle from "./globalCss";
import { ThemeProvider } from "styled-components";
import App from "./app";

const root = ReactDOM.createRoot(document.querySelector("#root"));

const Container = () => {
    return (
        <ThemeProvider theme={siteTheme}>
            <GlobalStyle />
            <App />
        </ThemeProvider>
    );
};

root.render(<Container />);
