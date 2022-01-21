import React from "react";
import styled from "styled-components";
import { Grid } from "../elements";
import { history } from "../redux/configureStore";
import Nav from "../shared/Nav";

const FvLoginCk = () => {
  return (
    <LoginCkWrap>
      <Grid is_container="container" _className="border">
        <div className="modal-wrap">
          <AppImg>
            <img src="/static/pong.png" alt="logo" />
          </AppImg>
          <div className="title">
            <p>즐겨찾기한 글이 없어요</p>
          </div>
          <div
            className="subtitle"
            onClick={() => {
              history.push("/main");
            }}
          >
            <span>메인으로 돌아가기</span>
          </div>
        </div>
        <Nav />
      </Grid>
    </LoginCkWrap>
  );
};

export default FvLoginCk;

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
  width: 78px;
  margin: 0 auto;
  margin-bottom: 30px;
  img {
    width: 100%;
  }
`;
