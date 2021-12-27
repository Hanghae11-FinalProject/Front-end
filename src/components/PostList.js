import React from "react";
import styled from "styled-components";

import LocationSelectBox from "./LocationSelectBox";

const PostList = () => {
  return (
    <React.Fragment>
      <MainContainer>
        <Text>전체글 - </Text>
        <LocationSelectBox />
      </MainContainer>
    </React.Fragment>
  );
};

const MainContainer = styled.div`
  height: 600px;
  padding: 16px;
  margin: auto;
  display: flex;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

export default PostList;
