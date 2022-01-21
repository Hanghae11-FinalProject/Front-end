import React from "react";
import styled from "styled-components";
import { Grid } from "../elements";
import { history } from "../redux/configureStore";
import Nav from "../shared/Nav";

const LoginCheck = () => {
  return (
    <LoginCkWrap>
      <Grid is_container="container" _className="border background">
        <div className="modal-wrap">
          <AppImg>
            <img src="/static/ping.png" alt="logo" />
          </AppImg>
          <div className="title">
            <p>서비스를 이용하려면</p>
            <p>먼저 로그인이 필요해요!</p>
          </div>
          <div
            className="subtitle"
            onClick={() => {
              history.push("/");
            }}
          >
            <span>로그인하러 가기</span>
          </div>
        </div>
        <Nav />
      </Grid>
    </LoginCkWrap>
  );
};

export default LoginCheck;

const LoginCkWrap = styled.div`
  .border {
    height: 100vh;
    background-color: #fff;

    display: flex;
    justify-content: center;
    align-items: center;
    .modal-wrap {
      text-align: center;
      width: 100%;
      .icon-wrap {
        margin-bottom: 40px;
        img {
          width: 63px;
          height: 63px;
        }
      }
      .title {
        margin-bottom: 80px;
        p {
          font-size: 20px;
          font-weight: bold;
        }
      }
      .subtitle {
        line-height: 48px;
        width: 90%;
        height: 48px;
        border-radius: 4px;
        background-color: var(--main-color);
        margin: 0 auto;
        cursor: pointer;
        span {
          font-size: 16px;
          color: white;
        }
      }
    }
  }
`;
const AppImg = styled.div`
  width: 80px;
  margin: 0 auto;
  margin-bottom: 30px;
  img {
    width: 100%;
  }
`;
