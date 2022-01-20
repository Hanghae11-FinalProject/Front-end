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

    appearance: none;
  -webkit-appearance: none;

  }

  body {
    color: var(--active-color);
    overflow-x: hidden;
    font-family: 'Noto Sans KR', sans-serif; 
    background: #FFDADA;

    
  }

  :root {
  --main-color: #FF626F;
  --main-light-color :rgba(255, 98, 111, 0.05);
  --disabled-color:#dadada;
  --wrong-color: #FF0000;
  --active-color: #323232;
  --inactive-text-color: #666666;
  --help-color: #CDCDCD;
  --inactive-icon-color: #9A9A9A;
  --light-color: #F3F3F3 ;
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


@media screen and (max-width: 1023px) {
  .bg,
  .landing-logo,
  .landing-btn-box{
    display:none;
  }

  .page-container{
    left: 0%;
  }
}

  

@media screen and (min-width: 1024px) {
    body{background: transparent};
    .background{
      box-shadow: rgba(255, 98, 111, 0.25) 0px 7px 29px 0px;
    }
    .bg {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 0;
    width: 100%;
    height: 100vh;
    background: url('/static/bg-original.png');
    background-size: 150%;
    background-position-y: 0px;
    
  }

  .page-container{
    position: relative;
    left: 23%;
    top: 0;
    z-index: 1;
   
  }

  .landing-logo{
    position:fixed;
    top: 40px;
    left:5.5%;
    z-index: 1;

    width: 176px;


    img {
      width:100%;
    }

    .symbol{
      width: 60%;
      margin-left: 20%;
    }
  }

  .landing-btn-box{
    position:fixed;
top: 150px;
left: 6.5%;
z-index: 1;
font-family: 'NanumSquareRound';


display: flex;
flex-direction: column;

p{
  color:#FF626F;
  font-size: 24px;
  margin-bottom: 30px;
  margin-top: 50px;

  span{
    font-weight: bold;
  }
}
button{
  width: 242px;
  height: 50px;
  color:#FF626F;
  background-color:#fff;
  font-size: 16px;
  border: 0;
  outline:0;
  box-shadow: rgba(255, 98, 111, 0.3) 0px 7px 29px 0px;
  margin: 10px 0;
  cursor:pointer;
  font-family: 'NanumSquareRound';
  border-radius: 4px;
}
  }
}

@media screen and (min-width: 1440px) {
  body{background: transparent};
  .bg {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 0;
    width: 100%;
    height: 100vh;
    background: url('/static/bg-original.png');
    background-size: 100%;
    background-position-y: 0px;
    
  }

  .page-container{
    position: relative;
    left: 23%;
    top: 0;
    z-index: 1;
  }

  .landing-logo{
    position:fixed;
    top: 40px;
    left:7.5%;
    z-index: 1;
    width:176px;

    img {
      width:100%;
    
    }

    .symbol{
      width: 60%;
      margin-left: 20%;
    }
  }

  .landing-btn-box{
    position:fixed;
    top: 150px;
    left: 8%;
    z-index:1;
    font-family: 'NanumSquareRound';

    display: flex;
    flex-direction: column;

    p{
      color:#FF626F;
      font-size: 24px;
      margin-bottom: 30px;
      margin-top: 50px;

      span{
        font-weight: bold;
      }
}
    button{
      width:242px;
      height: 50px;
      color:#FF626F;
      background-color:#fff;
      font-size: 16px;
      border: 0;
      outline:0;
      box-shadow: rgba(255, 98, 111, 0.3) 0px 7px 29px 0px;
      margin: 10px 0;
      cursor:pointer;
      font-family: 'NanumSquareRound';
      border-radius: 4px;
    }
      }
 
}

@media screen and (min-width: 1920px) {
  body{background: transparent};
  .bg {
    background-position-y: -120px;
  }

  .landing-logo{
    position:fixed;
    top: 40px;
    left:7.5%;
    z-index: 1;
    width:180px;

    img {
      width:100%;
    
    }

    .symbol{
      width: 60%;
      margin-left: 20%;
    }
  }

  .landing-btn-box{
    position:fixed;
    top: 150px;
    left: 8%;
    z-index:1;
    font-family: 'NanumSquareRound';

    display: flex;
    flex-direction: column;

    p{
      color:#FF626F;
      font-size: 24px;
      margin-bottom: 30px;
      margin-top: 50px;

      span{
        font-weight: bold;
      }
}
    button{
      width:242px;
      height: 50px;
      color:#FF626F;
      background-color:#fff;
      font-size: 16px;
      border: 0;
      outline:0;
      box-shadow: rgba(255, 98, 111, 0.3) 0px 7px 29px 0px;
      margin: 10px 0;
      cursor:pointer;
      font-family: 'NanumSquareRound';
      border-radius: 4px;
    }
      }
 
}

`;

export default GlobalStyles;
