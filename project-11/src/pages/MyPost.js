import React, { useEffect } from "react";
import styled from "styled-components";
import { actionCreators as postActions } from "../redux/modules/post";

import { CgChevronLeft } from "react-icons/cg";
import { Grid } from "../elements";
import Nav from "../shared/Nav";
import MyPostCard from "../components/MyPostCard";
import { useDispatch } from "react-redux";

const MyPost = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postActions.getMyPosts());
  }, []);
  return (
    <>
      <MyPostBox>
        <Grid is_container _className="border">
          <MainTop>
            <CgChevronLeft size="30" className="icon" />
            <TopText style={{ marginLeft: "6px" }}>내가 작성한 글</TopText>
          </MainTop>
          <MyPostCard />
          <MyPostCard />
        </Grid>
      </MyPostBox>
      <Nav />
    </>
  );
};

const MyPostBox = styled.div`
  .border {
    height: 100vh;
    border-right: 1px solid var(--help-color);
    border-left: 1px solid var(--help-color);
    text-align: center;
  }
`;

const MainTop = styled.div`
  height: 44px;
  margin: 0 8px;
  border-bottom: 2px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .icon {
    position: absolute;
    left: 0;
    cursor: pointer;
  }
`;

const TopText = styled.p`
  font-size: 20px;
`;

export default MyPost;
