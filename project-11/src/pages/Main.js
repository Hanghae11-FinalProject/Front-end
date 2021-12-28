import React from "react";
import styled from "styled-components";
import { Grid } from "../elements/index";
import MainCategory from "../components/MainCategory";
import PostList from "../components/PostList";
import Nav from "../shared/Nav";

import { IoIosArrowBack } from "react-icons/io";

const Main = () => {
  return (
    <>
      <Container>
        <Grid is_container padding="16px" _className="border">
          <Header>
            <Grid _className="inner" is_container is_flex flex_align="center">
              <Backbtn>
                <IoIosArrowBack className="icon" />
              </Backbtn>
              <p>전체 글 보기</p>
            </Grid>
          </Header>

          <MainCategory />
          <PostList />
        </Grid>
      </Container>
      <Nav home={"home"} />
    </>
  );
};

const Container = styled.div`
  margin: 0 auto;
  .border {
    padding-top: 50px;
    border: 1px solid var(--border-color);
  }
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid var(--border-color);
  background-color:#fff;
  z-index: 10;
  .inner {
    height: 50px;
    margin: 0 auto;

    p {
      width: 100%;
      position: absolute;
      left:0;
      text-align:center;
      font-weight: bold;
      }
  }
`;

const Backbtn = styled.div`
  width: 50px;
  text-align: center;
  cursor: pointer;
  z-index: 15;
  .icon {
    font-size: 20px;
    margin-top: 5px;
    font-weight: bold;
  }
`;
export default Main;
