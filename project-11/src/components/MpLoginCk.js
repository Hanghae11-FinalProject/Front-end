import React from "react";
import styled from "styled-components";
import { Grid } from "../elements";
import { history } from "../redux/configureStore";
import Nav from "../shared/Nav";

const MpLoginCk = () => {
  return (
    <LoginCkWrap>
      <Grid is_container="container" _className="container-border">
        <div className="modal-wrap">
          <AppImg>
            <img src="/static/pingpong00.png" alt="logo" />
          </AppImg>
          <div className="title">
            <p>내가 작성한 글이 없어요</p>
            <span style={{ fontColor: "#00000099" }}>
              새로운 글을 작성해 보세요
            </span>
          </div>
          <div className="subtitle">
            <span
              onClick={() => {
                history.push("/write");
              }}
            >
              글 작성하러 가기
            </span>
          </div>
        </div>
        <Nav />
      </Grid>
    </LoginCkWrap>
  );
};

export default MpLoginCk;

const LoginCkWrap = styled.div`
  .container-border {
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #fff;
    .modal-wrap {
      text-align: center;
      width: 100%;

      .title {
        margin-bottom: 80px;
        p {
          font-size: 24px;
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
        span {
          cursor: pointer;
          font-size: 16px;
          color: white;
        }
      }
    }
  }
`;
const AppImg = styled.div`
  img {
    width: 90%;
  }
`;
