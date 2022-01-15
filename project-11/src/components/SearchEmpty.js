import React from "react";
import { Grid } from "../elements";

import styled from "styled-components";

const SearchEmpty = (props) => {
  // console.log(props);
  return (
    <>
      <SearchEmptyBox>
        <Grid is_container _className="container-border">
          <div className="modal-wrap">
            <AppImg>
              <img src="/static/pingpong00.png" alt="logo" />
            </AppImg>
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
const AppImg = styled.div`
  img {
    width: 90%;
  }
`;
