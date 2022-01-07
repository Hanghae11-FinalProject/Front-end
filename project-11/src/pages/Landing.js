import React from "react";
import { history } from "../redux/configureStore";
import { Grid } from "../elements/index";
import { RiKakaoTalkFill } from "react-icons/ri";
import styled from "styled-components";

import { KAKAO_AUTH_URL } from "../shared/OAuth";

const Landing = () => {
  const ClikKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <>
      <Intro>
        <Grid is_container padding="16px" _className="intro-box">
          <Grid _className="intro-anime">
            <Logo>
              <img src="/static/logo.png" alt="logo" />
            </Logo>
            <AppImg>
              <img src="/static/pingpong00.png" alt="logo" />
            </AppImg>
          </Grid>
          <BTNS>
            <button
              onClick={() => {
                history.push("/login");
              }}
            >
              로그인
            </button>
            <button
              onClick={() => {
                history.push("/signup");
              }}
            >
              회원가입
            </button>
            <button
              onClick={() => {
                history.push("/");
              }}
            >
              둘러보기
            </button>
            <KakaoBtn onClick={ClikKakao}>
              <RiKakaoTalkFill size="38" />
            </KakaoBtn>
          </BTNS>
        </Grid>
      </Intro>
    </>
  );
};

export default Landing;

const Intro = styled.div`
  .intro-box {
    padding: 80px 0 30px 0;
    background: #fff1f1;
    .intro-anime {
      text-align: center;
    }
  }
`;

const Logo = styled.div`
  img {
    width: 60%;
  }
`;
const AppImg = styled.div`
  img {
    width: 90%;
  }
`;
const KakaoBtn = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 64px;
  background-color: rgba(255, 255, 255, 0.3);
  background-color: #ffd600;
  /* border: 1px solid var(--help-color); */
  /* box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1); */
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.15) 0px 0px 8px;

  margin: 20px auto;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const BTNS = styled.div`
  margin-top: 40px;
  padding: 0 40px;
  button {
    width: 100%;
    border-radius: 24px;
    height: 48px;
    background-color: var(--main-color);
    color: #fff;
    font-size: 16px;

    outline: 0;
    border: 0;
    margin: 5px 0;
    cursor: pointer;
  }
`;
