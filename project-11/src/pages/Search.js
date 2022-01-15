import React, { useState, useEffect, useRef } from "react";
import { axiosInstance } from "../shared/api";
import Nav from "../shared/Nav";
import SearchHIstory from "../components/SearchHIstory";
import PostCard from "../components/PostCard";
import SearchEmpty from "../components/SearchEmpty";
import InfiniteScroll from "react-infinite-scroll-component";
import { getCookie } from "../shared/Cookie";
import { history } from "../redux/configureStore";
import { Grid } from "../elements/index";

import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";

const Search = () => {
  const token = getCookie("Token");
  const preWord = JSON.parse(localStorage.getItem("recent"));
  const [recent, setRecent] = useState(preWord || []);
  const [key, setKey] = useState("");
  const [search_data, setSearch_data] = useState([]);
  const [noresult, setNoresult] = useState();
  const [recommend, setRecommend] = useState([]);
  const [postcnt, setPostcnt] = useState(0);
  const inputRef = useRef(null);
  //무한 스크롤 동작을 감지 하기 위한 상태값 관리
  const [hasMore, sethasMore] = useState(true);
  const [page, setPage] = useState(1);

  const getTrendKeyword = () => {
    //인기검색어 가져오는 api
    axiosInstance
      .get(`api/search/rank`)
      .then((res) => {
        console.log("인기검색어", res);
        setRecommend(res.data);
      })
      .catch((err) => {
        console.log("인기검색어 조회 실패", err);
      });
  };

  //onkeyup event
  const handlekeyup = (e) => {
    setNoresult("검색중입니다");
    if (key && e.key === "Enter") {
      setRecent([e.target.value, ...preWord]);

      //검색리스트 가져오는 api
      //처음 검색어가 검색되었을 때 처음 로드되는 0번 페이지 데이터
      let searchdata;
      axiosInstance
        .post(`api/search?page=0`, { keyword: [key] })
        .then((res) => {
          console.log("검색완료", res);
          searchdata = res.data.data.posts;
          setPostcnt(res.data.data.postCnt);
          setSearch_data(searchdata);
          if (res.data.data.postCnt === 0) {
            setNoresult("일치하는 내용이 없어요");
          }
        })
        .catch((err) => {
          console.log("검색실패", err);
        });
    }

    if (!key) {
      setSearch_data([]);
    }
  };

  //무한 스크롤을 동작과 데이터 로드를 위한 함수
  //스크롤 동작이 들어갔을 때부터 받아와지는 페이지 0번 이후의 데이터들
  const onScroll = () => {
    let searchdata;
    let count;

    axiosInstance
      .post(`api/search?page=${page}`, { keyword: [key] })
      .then((res) => {
        console.log("검색완료", res);
        searchdata = res.data.data.posts;
        setSearch_data(searchdata);
        //데이터가 사이즈보다 작을 경우
        if (searchdata.length === 0 || searchdata.length < 6) {
          sethasMore(false);
          setSearch_data([...search_data, ...searchdata]);
        } else {
          //데이터가 사이즈만큼 넘어왔을 때
          setSearch_data([...search_data, ...searchdata]);
          count = page + 1;
        }
        setPage(count);
      })
      .catch((err) => {
        console.log("검색실패", err);
      });
  };
  //최근 검색어 5개 제한 (중복되는 단어도 제거)
  const set = new Set(recent);
  const list = [...set].slice(0, 5);

  //검색어 삭제
  const handleRemoveKeyword = (i) => {
    const nextKeyword = list.filter((word, idx) => {
      return list.indexOf(word) !== i;
    });
    setRecent(nextKeyword);
  };

  //검색바에 입력한 검색어를 초기화 시키는 부분
  const reset = () => {
    setKey("");
    inputRef.current.value = "";
    setSearch_data([]);
  };

  useEffect(() => {
    localStorage.setItem("recent", JSON.stringify(list));
    getTrendKeyword();
  }, [recent]);

  //인기 검색어 리스트가 양사이드로 나뉘어 들어가져서 5개로 나눴음
  const recommendkeywordTop = recommend.slice(0, 5);
  const recommendkeywordBottom = recommend.slice(5, 10);

  return (
    <>
      <SearchList>
        <Grid is_container _className="border">
          <Grid _className="background"></Grid>
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
                      cursor: "pointer",
                    }}
                    onClick={() => history.goBack()}
                  />
                  <p>검색</p>
                  <button onClick={() => history.push("/")}>로그인</button>
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
              <Grid _className="input-form-inner">
                <InputForm
                  type="text"
                  onKeyUp={handlekeyup}
                  onChange={(e) => setKey(e.target.value)}
                  max-length={25}
                  ref={inputRef}
                />

                <MdOutlineClose
                  className={key ? "close-btn btn-active" : "close-btn "}
                  onClick={reset}
                />
              </Grid>
              <BiSearch className="search-icon" />
            </Grid>
          </SearchInput>
          <Grid
            _className={key.length > 0 ? "display-inactive" : "display-active"}
          >
            <SearchHIstory list={list} onRemoveKeyword={handleRemoveKeyword} />

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
                                className={idx < 3 ? "hot-keyword" : "default"}
                              >
                                {idx + 1}
                              </p>
                              <Keyword key={idx}>{item.rank_Keyword}</Keyword>
                            </Grid>
                          </>
                        );
                      })}
                    </Grid>
                    <Grid is_container _className="recommend-box">
                      {recommendkeywordBottom.map((item, idx) => {
                        return (
                          <>
                            <Grid is_flex _className="recommend-list" key={idx}>
                              <p
                                className={idx < 0 ? "hot-keyword" : "default"}
                              >
                                {idx + 6}
                              </p>
                              <Keyword key={idx}>{item.rank_Keyword}</Keyword>
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
          </Grid>

          {/* 검색할 데이터가 없을 경우 */}
          {search_data.length === 0 ? (
            // 검색바에 검색어가 입력되어있을 때 서치 중이라고 떴다가, onkeyup 일어난 후 결과가 없다면 없다고 나옵니다
            <>{key.length > 0 && <SearchEmpty result={noresult} />}</>
          ) : (
            <>
              {/* 검색한 데이터가 있을 경우 */}
              <Grid is_container padding="30px 16px 0 16px">
                <Result>검색 결과 총 {postcnt}건</Result>
                <InfiniteScroll
                  dataLength={search_data.length} //This is important field to render the next data
                  next={onScroll}
                  hasMore={hasMore}
                >
                  <PostList>
                    {search_data.map((item, idx) => {
                      return <PostCard key={idx} item={item} />;
                    })}
                  </PostList>
                </InfiniteScroll>
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
    background-color: #fff;
    padding: 60px 0px 10px 0px;

    .background {
      width: 100%;
      max-width: 429px;
      height: 100vh;
      background-color: #fff;

      position: fixed;
      top: 0;
      z-index: -10;
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

    .display-active {
      display: block;
    }

    .display-inactive {
      display: none;
    }
  }
`;

// 헤더
const Header = styled.div`
  width: 100%;
  max-width: 428px;
  height: 50px;

  background-color: #fff;
  position: fixed;
  top: 0;
  z-index: 10;
  .inner {
    height: 50px;
    margin: 0 auto;
    box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1);
    /* border-right: 1px solid var(--help-color);
    border-left: 1px solid var(--help-color); */
    background-color: #fff;

    p {
      width: 90%;
      position: absolute;
      left: 5%;
      text-align: center;

      font-size: 20px;
      font-weight: bold;
    }
  }

  .logout-inner {
    height: 50px;
    margin: 0 auto;

    /* border-right: 1px solid var(--help-color);
    border-left: 1px solid var(--help-color); */
    box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;

    p {
      width: 90%;
      position: absolute;
      left: 5%;
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

const SearchInput = styled.div`
  .input-form {
    width: 98%;
    padding: 10px 10px;
    margin: 0px auto;
    background-color: #fff;

    .input-form-inner {
      width: 95%;
      display: flex;
      align-items: center;
      background-color: var(--light-color);
      border-radius: 4px;
      padding-right: 10px;
      margin-right: 10px;
      .close-btn {
        color: #000;
        font-size: 18px;
        cursor: pointer;
        display: none;
      }

      .btn-active {
        display: block;
      }
    }
  }
`;
const InputForm = styled.input`
  width: 95%;
  padding: 8px 10px;
  border: 0;
  background-color: var(--light-color);
  border-radius: 4px;
`;

const Title = styled.div`
  padding-left: 16px;
  margin: 5px 0;
`;
const Keyword = styled.div`
  padding: 0px 10px;
  margin: 10px 10px 0 0;
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
