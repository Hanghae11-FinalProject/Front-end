import React, { useState, useEffect } from "react";
import { axiosInstance } from "../shared/api";
import Nav from "../shared/Nav";
import SearchHIstory from "../components/SearchHIstory";
import PostCard from "../components/PostCard";
import { getCookie } from "../shared/Cookie";

import { Grid } from "../elements/index";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const token = getCookie("Token");
  const preWord = JSON.parse(localStorage.getItem("recent"));
  const [recent, setRecent] = useState(preWord || []);
  const [key, setKey] = useState("");
  const [search_data, setSearch_data] = useState([]);
  const [page, setPage] = useState(1);
  const [recommend, setRecommend] = useState([]);
  const [postcnt, setPostcnt] = useState(0);

  const getTrendKeyword = () => {
    //인기검색어 가져오는 api
    axiosInstance
      .get(`api/search/rank`)
      .then((res) => {
        console.log("인기검색어", res);
        setRecommend(res.data.searchRankList);
      })
      .catch((err) => {
        console.log("인기검색어 조회 실패", err);
      });
  };

  const handlekeyup = (e) => {
    if (key && e.key === "Enter") {
      console.log(e.target.value);
      setRecent([e.target.value, ...preWord]);
      //검색리스트 가져오는 api
      axiosInstance
        .post(`api/search`, { keyword: [key] })
        .then((res) => {
          console.log("검색완료", res);
          setSearch_data(res.data.data.posts);
          setPostcnt(res.data.data.postCnt);
          setKey("");
        })
        .catch((err) => {
          console.log("검색실패", err);
        });
      setKey("");
    }

    if (!key) {
      setSearch_data([]);
    }
  };

  //최근 검색어 5개 제한
  const list = recent.slice(0, 5);

  //검색어 삭제
  const handleRemoveKeyword = (i) => {
    console.log("click", i);
    const nextKeyword = list.filter((word, idx) => {
      return list.indexOf(word) !== i;
    });
    setRecent(nextKeyword);
  };

  useEffect(() => {
    localStorage.setItem("recent", JSON.stringify(recent));
    getTrendKeyword();
  }, [recent]);

  //인기 검색어 나누기
  const recommendkeywordTop = recommend.slice(0, 5);
  const recommendkeywordBottom = recommend.slice(5, 10);

  return (
    <>
      <SearchList>
        <Grid is_container _className="border">
          {/* header */}
          {token ? (
            <>
              <Header>
                <Grid
                  _className="inner"
                  is_container
                  is_flex
                  flex_align="center"
                >
                  <IoIosArrowBack
                    style={{
                      width: "30px",
                      height: "30px",
                    }}
                  />
                  <p>검색</p>
                </Grid>
              </Header>
            </>
          ) : (
            <>
              <Header>
                <Grid
                  _className="logout-inner"
                  is_container
                  is_flex
                  flex_align="center"
                >
                  <IoIosArrowBack
                    style={{
                      width: "30px",
                      height: "30px",
                    }}
                  />
                  <p>검색</p>
                  <button>로그인</button>
                </Grid>
              </Header>
            </>
          )}

          <SearchInput>
            <Grid
              _className="input-form"
              is_container
              is_flex
              flex_align="center"
            >
              <InputForm
                type="text"
                onKeyUp={handlekeyup}
                onChange={(e) => setKey(e.target.value)}
              />
              <BiSearch className="search-icon" />
            </Grid>
          </SearchInput>
          {/* 검색할 데이터가 없을 경우 */}
          {search_data.length === 0 ? (
            <>
              <SearchHIstory
                list={list}
                onRemoveKeyword={handleRemoveKeyword}
              />

              {recommend ? (
                <>
                  <RemcommendBox>
                    <Title>인기 검색어</Title>
                    <Grid is_flex>
                      <Grid is_container _className="recommend-box">
                        {recommendkeywordTop.map((item, idx) => {
                          return (
                            <>
                              <Grid is_flex _className="recommend-list">
                                <p
                                  className={
                                    idx < 3 ? "hot-keyword" : "default"
                                  }
                                >
                                  {idx + 1}
                                </p>
                                <Keyword key={idx}>{item}</Keyword>
                              </Grid>
                            </>
                          );
                        })}
                      </Grid>
                      <Grid is_container _className="recommend-box">
                        {recommendkeywordBottom.map((item, idx) => {
                          return (
                            <>
                              <Grid
                                is_flex
                                _className="recommend-list"
                                key={idx}
                              >
                                <p
                                  className={
                                    idx < 0 ? "hot-keyword" : "default"
                                  }
                                >
                                  {idx + 6}
                                </p>
                                <Keyword key={idx}>{item}</Keyword>
                              </Grid>
                            </>
                          );
                        })}
                      </Grid>
                    </Grid>
                  </RemcommendBox>
                </>
              ) : (
                <>
                  <RemcommendBox>
                    <Title>인기 검색어</Title>
                    <EmptyBox>인기 검색어가 없습니다</EmptyBox>
                  </RemcommendBox>
                </>
              )}
            </>
          ) : (
            <>
              {/* 검색한 데이터가 있을 경우 */}
              <Grid is_container padding="30px 16px 0 16px">
                <Result>검색 결과 총 {postcnt}건</Result>
                <PostList>
                  {search_data.map((item, idx) => {
                    return <PostCard key={idx} item={item} />;
                  })}
                </PostList>
              </Grid>
            </>
          )}
          <Nav search={"search"} />
        </Grid>
      </SearchList>
    </>
  );
};

export default Search;

const SearchList = styled.div`
  .border {
    height: 100vh;
    border-right: 1px solid var(--help-color);
    border-left: 1px solid var(--help-color);

    padding: 60px 0px 10px 0px;

    .input-form {
      width: 98%;
      padding: 10px 10px;
      margin: 0px auto;
      background-color: #fff;
    }

    .recommend-box {
      width: 100%;
      .recommend-list {
        width: 100%;

        p {
          width: 50px;
          text-align: center;
        }

        .hot-keyword {
          color: var(--main-color);
        }
      }
    }

    .search-icon {
      font-size: 26px;
      color: var(--main-color);
    }
  }
`;

// 헤더
const Header = styled.div`
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;

  background-color: #fff;
  z-index: 10;
  .inner {
    height: 50px;
    margin: 0 auto;
    box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1);
    border-right: 1px solid var(--help-color);
    border-left: 1px solid var(--help-color);

    p {
      width: 100%;
      position: absolute;
      left: 0;
      text-align: center;

      font-size: 20px;
      font-weight: bold;
    }
  }

  .logout-inner {
    height: 50px;
    margin: 0 auto;
    border-right: 1px solid var(--help-color);
    border-left: 1px solid var(--help-color);
    box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;

    p {
      width: 100%;
      position: absolute;
      left: 0;
      text-align: center;

      font-size: 20px;
      font-weight: bold;
    }

    button {
      border: 0;
      color: var(--main-color);
      outline: none;
      background-color: transparent;
      font-size: 16px;
      margin-right: 16px;
      cursor: pointer;
      z-index: 9;
    }
  }
`;

const SearchInput = styled.div``;
const InputForm = styled.input`
  width: 95%;
  padding: 8px 10px;
  border: 0;
  background-color: var(--light-color);
  border-radius: 16px;
  margin-right: 5px;
`;

const Title = styled.div`
  padding-left: 16px;
  margin: 5px 0;
`;
const Keyword = styled.div`
  padding: 5px 10px;

  border-radius: 16px;
  margin: 10px 10px 0 0;
  font-size: 14px;
  cursor: pointer;
  span {
    cursor: pointer;
  }
`;

const RemcommendBox = styled.div`
  padding: 20px px;
  p {
    margin: 10px 0;
  }
`;

const PostList = styled.div`
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
`;

const Result = styled.div``;
const EmptyBox = styled.div`
  width: 100%;
  padding: 50px 0;
  text-align: center;
`;
