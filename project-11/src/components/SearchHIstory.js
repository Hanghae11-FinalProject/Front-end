import React, { useState } from "react";
import { Grid } from "../elements/index";
import styled from "styled-components";

import { MdOutlineClose } from "react-icons/md";

const SearchHIstory = ({ list, onRemoveKeyword }) => {
  if (list.length === 0) {
    return <HistoryContainer>최근 검색된 기록이 없습니다.</HistoryContainer>;
  }
  return (
    <KeywordBox>
      <p>최근 검색어</p>
      <Grid is_flex _className="recent-keyword-box">
        {list.map((item, i) => {
          return (
            <>
              <Keyword key={i}>
                {item}
                <span
                  onClick={() => {
                    onRemoveKeyword(i);
                  }}
                >
                  <MdOutlineClose />
                </span>
              </Keyword>
            </>
          );
        })}
      </Grid>
    </KeywordBox>
  );
};

export default SearchHIstory;

const HistoryContainer = styled.div`
  padding: 40px 16px;
`;
const KeywordBox = styled.div`
  padding: 10px 16px 30px 16px;

  p {
    margin: 10px 0;
  }

  .recent-keyword-box {
    display: flex;
    flex-wrap: wrap;
  }
`;
const Keyword = styled.div`
  padding: 5px 10px;
  background-color: var(--light-color);
  border-radius: 16px;
  margin: 10px 10px 0 0;
  font-size: 14px;

  display: flex;
  align-items: center;

  span {
    margin-top: 2px;
    cursor: pointer;
  }
`;
