import React from "react";
import styled from "styled-components";

import MainCategory from "../components/MainCategory";
import PostList from "../components/PostList";
import Nav from "../shared/Nav";

const Main = () => {
  return (
    <React.Fragment>
      <Container>
        <MainCategory />
        <PostList />
      </Container>
      <Nav />
    </React.Fragment>
  );
};

const Container = styled.div`
  max-width: 429px;
  min-height: 926px;
  background-color: #eee;
  padding: 16px;
  margin: auto;
  border-radius: 50px;
  border: 1px solid #ddd;
`;

export default Main;
