import React from "react";
import { Grid } from "../elements";

import styled from "styled-components";

const SearchEmpty = (props) => {
  console.log(props);
  return (
    <>
      <SearchEmptyBox>
        <Grid is_container _className="container-border">
          <div className="modal-wrap">
            <div className="icon-wrap">
              <img src="/static/핑이 기본.png" alt="default" />
              <img src="/static/핑이 분노.png" alt="default" />
              <img src="/static/핑이 행복.png" alt="default" />
            </div>
            <div className="title">
              {props.result === "검색중입니다" ? (
                <>
                  <p>{props.result}</p>
                </>
              ) : (
                <>
                  <Grid>
                    <p>{props.result}</p>
                    <span>다시 검색해 주세요</span>
                  </Grid>
                </>
              )}
            </div>
          </div>
        </Grid>
      </SearchEmptyBox>
    </>
  );
};

export default SearchEmpty;

const SearchEmptyBox = styled.div`
  .container-border {
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
    }
  }
`;
