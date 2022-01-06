import React from "react";

import { Grid, Button } from "../elements/index";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { KAKAO_AUTH_URL } from "../shared/OAuth";

const Landing = () => {
  const ClikKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <>
      <Intro>
        <Grid is_container padding="16px" _className="intro-box">
          <Grid _className="intro-anime">how to use this service</Grid>
          <BTN>
            <Button
              _onClick={() => {
                history.push("/login");
              }}
            >
              로그인
            </Button>
            <Button
              _onClick={() => {
                history.push("/signup");
              }}
            >
              회원가입
            </Button>
            <Button _onClick={ClikKakao}>kakakoTalk</Button>
            <Button>Naver</Button>
          </BTN>
        </Grid>
      </Intro>
    </>
  );
};

export default Landing;

const Intro = styled.div`
  .intro-box {
    padding-top: 50px;
    height: 100vh;
    background: linear-gradient(to bottom, #ff626f, #ffeecd);

    .intro-anime {
      height: 400px;
      margin: 30px auto;
      border-radius: 20px;
      background-color: #fff;
      text-align: center;
    }
  }
`;

const BTN = styled.div`
  padding-top: 30px;
  button {
    width: 100%;
    border: 20px;
    height: 40px;
  }

  button:nth-child(1) {
    background-color: #fff;
    color: var(--point-color);
  }
  button:nth-child(2) {
    background-color: #fff;
    color: var(--point-color);
  }
`;
