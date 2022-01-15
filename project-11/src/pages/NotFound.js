import React from "react";
import styled from "styled-components";
import { Grid } from "../elements";
import { history } from "../redux/configureStore";

const NotFound = () => {
  return (
    <NotFoundWrap>
      <Grid is_container="container" _className="container-border">
        <div className="modal-wrap">
          <AppImg>
            <img src="/static/logo.png" alt="logo" />
          </AppImg>
          <div className="title">
            <p>잘못된 경로로 접근하셨어요</p>
            <span style={{ fontColor: "#00000099" }}>
              주소를 다시 확인하고 이용해 주시길 바랍니다
            </span>
          </div>
          <div className="subtitle"
          onClick={() => {
            history.push("/main");
          }}
          >
            <span
            >
              메인으로 가기
            </span>
          </div>
        </div>
      </Grid>
    </NotFoundWrap>
  );
};

const NotFoundWrap = styled.div`
  .container-border {
    height: 100vh;
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
  img {
    width: 200px;
    height: 200px;
  }
`;

export default NotFound;
