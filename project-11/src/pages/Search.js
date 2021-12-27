import React, { useState, useEffect } from "react";
import Nav from "../shared/Nav";
import PostCard from "../components/PostCard";
import { BiSearch } from "react-icons/bi";
import { Grid } from "../elements/index";
import styled from "styled-components";
import SearchHIstory from "../components/SearchHIstory";

import { PostData } from "../shared/PostTest";

const Search = () => {
  const preWord = JSON.parse(localStorage.getItem("recent"));
  const [recent, setRecent] = useState(preWord || []);
  const [key, setKey] = useState("");
  const [search_data, setSearch_data] = useState(null);

  useEffect(() => {
    localStorage.setItem("recent", JSON.stringify(recent));
  }, [recent]);

  const recommend = [
    "nintendo",
    "pengsoo",
    "nike",
    "nintendo",
    "pengsoo",
    "nike",
  ];

  const handlekeyup = (e) => {
    if (key && e.key === "Enter") {
      console.log(e.target.value);
      setRecent([e.target.value, ...preWord]);
      setKey("");
    }
  };
  const list = recent.slice(0, 5);

  //검색어 삭제
  const handleRemoveKeyword = (i) => {
    console.log("click", i);
    const nextKeyword = list.filter((word, idx) => {
      return list.indexOf(word) !== i;
    });
    setRecent(nextKeyword);
  };

  return (
    <>
      <SearchList>
        <Grid is_container _className="border">
          <Grid _className="inputform" is_flex flex_align="center">
            <InputForm
              type="text"
              onKeyPress={handlekeyup}
              onChange={(e) => setKey(e.target.value)}
            />
            <BiSearch className="icon" />
          </Grid>
          {!search_data ? (
            <>
              <SearchHIstory
                list={list}
                onRemoveKeyword={handleRemoveKeyword}
              />
              <RemcommendBox>
                <p>추천 검색어</p>
                <Grid is_flex is_container _className="recommend-box">
                  {recommend.map((item, idx) => {
                    return (
                      <>
                        <Keyword key={idx}>{item}</Keyword>
                      </>
                    );
                  })}
                </Grid>
              </RemcommendBox>
            </>
          ) : (
            <>
              <PostList>
                {PostData.map((item, idx) => {
                  return <PostCard key={idx} item={item} />;
                })}
              </PostList>
            </>
          )}
        </Grid>
      </SearchList>
      <Nav search={"search"} />
    </>
  );
};

export default Search;

const SearchList = styled.div`
  .border {
    height: 100vh;
    border-right: 1px solid var(--border-color);
    border-left: 1px solid var(--border-color);
    padding: 20px 16px;

    .inputform {
      width: 100%;
      padding: 5px 10px;
      margin: 0 auto;
      border-radius: 16px;
      background-color: var(--border-color);
    }

    .recommend-box {
      display: flex;
      flex-wrap: wrap;
    }

    .icon {
      font-size: 20px;
    }
  }
`;

const InputForm = styled.input`
  width: 90%;
  padding: 8px 10px;
  border: 0;
  background-color: transparent;
`;

const Keyword = styled.div`
  padding: 5px 10px;
  background-color: var(--border-color);
  border-radius: 16px;
  margin: 10px 10px 0 0;
  font-size: 14px;
  cursor: pointer;
  span {
    cursor: pointer;
  }
`;

const RemcommendBox = styled.div`
  padding: 20px 25px;
  p {
    margin: 10px 0;
  }
`;

const PostList = styled.div`
  padding-top: 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
`;
