import React from "react";
import { Grid } from "../elements";
import styled from "styled-components";

const SearchEmpty = (props) => {
  return (
    <>
      <SearchEmptyBox>
        <Grid is_container _className="container-border">
          <div className="modal-wrap">
            <AppImg>
              <img src="/static/ping.png" alt="logo" />
            </AppImg>
            <div className="title">
              {props.result === "검색어를 입력해주세요" ? (
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
    height: 75vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    .modal-wrap {
      text-align: center;
      width: 100%;
      .title {
        margin-bottom: 50px;
        p {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        span {
          font-size: 14px;
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
