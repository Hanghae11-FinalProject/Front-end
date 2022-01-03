import React, { useState } from "react";
import { axiosInstance } from "../shared/api";
import { Grid } from "../elements/index";
import styled from "styled-components";

const SearchHIstory = ({ list, onRemoveKeyword }) => {
  const [key, setKey] = useState();
  const [search_data, setSearch_data] = useState([]);

  //최근 검색어 클릭해서 가져오기
  const keywordSearch = () => {
    //검색리스트 가져오는 api
    axiosInstance
      .post(`api/search`, { keyword: [key] })
      .then((res) => {
        console.log("검색완료", res);
        setSearch_data(res.data.data);
        setKey("");
      })
      .catch((err) => {
        console.log("검색실패", err);
      });
  };
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
                  x
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
  padding: 20px 16px;

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
  cursor: pointer;
  span {
    cursor: pointer;
  }
`;
