import { createGlobalStyle } from "styled-components"


export const GlobalStyle = createGlobalStyle`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    }

    html, body {
    width: 100vw;
    height: 100vh;
    max-width: 100%;
    max-height: 100%;
    }
`