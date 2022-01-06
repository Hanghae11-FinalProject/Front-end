import React from "react";
import styled from "styled-components";
import { Grid } from "../elements";
import { history } from "../redux/configureStore";
import Nav from "../shared/Nav";

const MpLoginCk = () => {
  return (
    <LoginCkWrap>
      <Grid is_container="container" _className="border">
        <div className="modal-wrap">
          <div className="icon-wrap">
            <img src="/static/핑이 기본.png" />
            <img src="/static/핑이 분노.png" />
            <img src="/static/핑이 행복.png" />
          </div>
          <div className="title">
            <p>작성한 글이 없어요</p>
          </div>
          <div className="subtitle">
            <span
              onClick={() => {
                history.push("/write");
              }}
            >
              게시물 쓰러가기!
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
  .border {
    /* border: 1px solid var(--help-color); */
    height: 90vh;
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
          font-size: 24px;
          font-weight: bold;
        }
      }
      .subtitle {
        line-height: 48px;
        width: 90%;
        height: 48px;
        border-radius: 50px;
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
