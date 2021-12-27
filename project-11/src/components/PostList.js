import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

import PostCard from "./PostCard";
import LocationSelectBox from "./LocationSelectBox";

import { Grid } from "../elements/index";

import styled from "styled-components";

import { PostData } from "../shared/PostTest";

const PostList = () => {
  // const dispatch = useDispatch();
  // const posts = useSelector((state) => state.post);

  return (
    <React.Fragment>
      <MainContainer>
        <MainHead>
          <LocationSelectBox />
        </MainHead>
        <Grid _className="post-list">
          {PostData.map((item, idx) => {
            return <PostCard key={idx} item={item} />;
          })}
        </Grid>
      </MainContainer>
    </React.Fragment>
  );
};

const MainContainer = styled.div`
  padding: 0 0px 60px 0px;

  .post-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
`;

const MainHead = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export default PostList;
