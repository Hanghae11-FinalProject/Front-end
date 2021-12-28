import React from "react";

import { Grid } from "../elements/index";
import styled from "styled-components";

const SearchHIstory = ({ list, onRemoveKeyword }) => {
  if (list.length === 0) {
    return <HistoryContainer>최근 검색된 기록이 없습니다.</HistoryContainer>;
  }
  return (
    <KeywordBox>
      <p>최근 검색어</p>
      <Grid is_flex _className="recommend-box">
        {list.map((item, i) => {
          return (
            <>
              <Keyword key={i}>
                {item}
                <span onClick={() => onRemoveKeyword(i)}> x</span>
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
  padding: 20px 30px;
`;
const KeywordBox = styled.div`
  padding: 20px 10px;
  p {
    margin: 10px 0;
  }

  .recommend-box {
    display: flex;
    flex-wrap: wrap;
  }
`;
const Keyword = styled.div`
  padding: 5px 10px;
  background-color: var(--help-color);
  border-radius: 16px;
  margin: 10px 10px 0 0;
  font-size: 14px;
  cursor: pointer;
  span {
    cursor: pointer;
  }
`;
