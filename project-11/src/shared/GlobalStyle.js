import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap');
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
    font-family: 'Noto Sans KR', sans-serif;
  }
  body {
    color: var(--active-color);
    overflow-x: hidden;
    font-family: 'NanumSquareRound';
    
  }

  :root {
  --main-color: #FF626F;
  --disabled-color:#00000008;
  --wrong-color: #FF0000;
  --active-color: #323232;
  --inactive-text-color: #666666;
  --help-color: #CDCDCD;
  --inactive-icon-color: #9A9A9A;
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
