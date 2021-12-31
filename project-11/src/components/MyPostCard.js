import React from "react";
import styled from "styled-components";
import { Grid } from "../elements";
import { FiStar } from "react-icons/fi";
import { BsChat } from "react-icons/bs";

const MyPostCard = () => {
  return (
    <PostDiv>
      <div className="top-side">
        <ChipDiv>
          <Grid _className="ing">거래중</Grid>
        </ChipDiv>
        <div className="time-Location">
          <p>12/29 · 동대문구</p>
        </div>
      </div>
      <div className="title-box">
        <h1 className="title">제목입니당</h1>
      </div>
      <div className="contents-box">
        <p className="contents">
          내용입니당당당당당당당당당당당당당당당당당당당당당당당당당당당당당당
        </p>
      </div>
      <Grid is_flex padding="10px 5px" _className="btn-box">
        <Grid is_flex _className="like-btn" flex_align="center">
          <FiStar className="icon" />
          <span>2</span>
        </Grid>
        <Grid is_flex _className="chat-btn" flex_align="center">
          <BsChat className="icon" />
          <span>3</span>
        </Grid>
      </Grid>
    </PostDiv>
  );
};

const PostDiv = styled.div`
  height: 125px;
  margin: 0 16px;
  /* background-color: green; */
  border-bottom: 2px solid #eee;
  .top-side {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;

    .time-Location {
      display: flex;
      font-size: 14px;
      color: var(--help-color);
    }
  }

  .title-box {
    display: flex;
    margin: 8px 0px;
    .title {
      font-size: 18px;
    }
  }

  .contents-box {
    display: flex;
    width: 100%;
    .contents {
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }

  .btn-box {
    padding-left: 15px;
    font-size: 10px;
    .like-btn,
    .chat-btn {
      display: flex;
      margin-right: 10px;
      cursor: pointer;
      color: var(--inactive-text-color);

      .icon {
        font-size: 14px;
      }
      span {
        margin-left: 5px;
        font-size: 12px;
        color: var(--inactive-text-color);
        margin-right: 5px;
      }
    }
  }
`;

const ChipDiv = styled.div`
  /* position: absolute; */
  /* top: 5px; */
  /* left: 5px; */
  display: flex;
  /* justify-content: flex-start; */

  div {
    padding: 5px 10px;
    font-size: 12px;
    border-radius: 12px;
    text-align: center;
    color: #fff;
  }

  .ing {
    background-color: var(--main-color);
  }

  .stop {
    background-color: var(--inactive-icon-color);
  }
`;

export default MyPostCard;
