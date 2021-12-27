import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`


@font-face {
    font-family: 'NanumSquareRound';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  button, input{
    outline: 0;
    font-family: 'NanumSquareRound';
  }
  body {
    color: #222222;
    overflow-x: hidden;
    font-family: 'NanumSquareRound';
    
  }

  :root {
  --point-color: #FF626F;
  --main-font-color: #212529;
  --sub-font-color: #999999;
  --border-color: #dddddd;
}

  ol, ul, li {
    list-style-type: none;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
    border-radius: 10px;
  }

  ::-webkit-scrollbar {
    width: 6px;
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #aaa;
  }

`;

export default GlobalStyles;
