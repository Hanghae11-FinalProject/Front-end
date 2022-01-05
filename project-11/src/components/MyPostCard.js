import React from "react";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import { Grid } from "../elements";
import { FiStar } from "react-icons/fi";
import { BsChat } from "react-icons/bs";

const MyPostCard = (my_List) => {
  const myList = my_List.my_List;
  const postId = myList.postId;

  return (
    <PostDiv
      onClick={() => {
        history.push(`/detail/${postId}`);
      }}
    >
      <div className="top-side">
        <ChipDiv>
          <Grid _className="ing">
            {myList.currentState === "Proceeding" ? "거래중" : "거래완료"}
          </Grid>
        </ChipDiv>
        <div className="time-Location">
          <p>
            {myList.createdAt} · {myList.address}
          </p>
        </div>
      </div>
      <div className="title-box">
        <h1 className="title">{myList.title}</h1>
      </div>
      <div className="contents-box">
        <p className="contents">{myList.content}</p>
      </div>
      <Grid is_flex padding="10px 5px" _className="btn-box">
        <Grid is_flex _className="like-btn" flex_align="center">
          <FiStar className="icon" />
          <span>{myList.bookmarkCnt}</span>
        </Grid>
        <Grid is_flex _className="chat-btn" flex_align="center">
          <BsChat className="icon" />
          <span>{myList.commentCnt}</span>
        </Grid>
      </Grid>
    </PostDiv>
  );
};

const PostDiv = styled.div`
  height: 125px;
  margin: 0 16px;
  cursor: pointer;
  /* background-color: green; */
  border-bottom: 2px solid #eee;
  cursor: pointer;
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
