import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #111111;
    color: white;
    font-family: transat-text, Helvetica, Arial, sans-serif;
  }
  .roc-grotesk {
    font-family: roc-grotesk-wide, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
`;

export default GlobalStyle;
