import React from "react";
import styled from "styled-components";

import PostCard from "./PostCard";

const PostList = () => {
  return (
    <React.Fragment>
      <MainContainer>
        <MainHead>
          <Text>전체글 - </Text>
        </MainHead>
        <PostCard />
      </MainContainer>
    </React.Fragment>
  );
};

const MainContainer = styled.div`
  width: 400px;
  height: 700px;
  padding: 16px;
  margin: auto;
  /* display: flex; */
  /* background-color: green; */
`;

const MainHead = styled.div`
  height: 30px;
  display: flex;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

export default PostList;
