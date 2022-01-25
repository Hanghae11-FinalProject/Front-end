import React from "react";
import styled from "styled-components";
import { Grid } from "../elements";
import { history } from "../redux/configureStore";
import Nav from "../shared/Nav";

const NoPost = () => {
  return (
    <LoginCkWrap>
      <Grid is_container="container" _className="container-border">
        <div className="modal-wrap">
          <AppImg>
            <img src="/static/ping.png" alt="logo" />
          </AppImg>
          <div className="title">
            <p>아직 카테고리와 일치하는 게시물이 없어요</p>
          </div>
        </div>
        <Nav />
      </Grid>
    </LoginCkWrap>
  );
};

export default NoPost;

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
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        span {
          font-size: 14px;
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
  width: 78px;
  margin: 0 auto;
  margin-bottom: 30px;
  img {
    width: 100%;
  }
`;
