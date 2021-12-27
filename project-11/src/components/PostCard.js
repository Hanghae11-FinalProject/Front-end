import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Image } from "../elements/index";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { FiStar } from "react-icons/fi";
import { HiOutlineChatAlt2 } from "react-icons/hi";

const PostCard = ({ item }) => {
  const [state, setState] = useState("거래중");
  const p = item;
  return (
    <React.Fragment>
      <Grid is_flex>
        <Post>
          <Grid is_flex flex_align="center">
            <Image shape="circle" size="34px;">
              icon
            </Image>
            <Grid padding="0 5px;">
              <PostTitle>{p.title}</PostTitle>
              <Grid is_flex>
                <span>동대문구</span>
                <span>15분전</span>
              </Grid>
            </Grid>
          </Grid>
          <PostImg>
            <img src={p.images} alt="PostImg" />
          </PostImg>

          <PostContent>
            <ChipDiv>
              <Grid _className={state === p.currentState ? "ing" : "stop"}>
                {p.currentState}
              </Grid>
            </ChipDiv>
            <Grid _className="post-content">{p.content}</Grid>
            <Grid is_flex _className="hashtag">
              <RiArrowLeftRightLine className="icon" />
              <span>#음료수</span>
              <span>#비비고</span>
            </Grid>
          </PostContent>
          <Grid is_flex padding="15px 5px" _className="btn-box">
            <Grid is_flex _className="like-btn" flex_align="center">
              <FiStar />
              <span>즐겨찾기</span>
            </Grid>
            <Grid is_flex _className="chat-btn" flex_align="center">
              <HiOutlineChatAlt2 />
              <span>채팅하기</span>
            </Grid>
          </Grid>
        </Post>
      </Grid>
    </React.Fragment>
  );
};

const Post = styled.div`
  width: 100%;
  border: 1px solid var(--border-color);
  padding-top: 5px;

  span {
    font-size: 10px;
    color: var(--sub-font-color);
    margin-right: 5px;
  }

  .btn-box {
    border-top: 1px solid var(--border-color);

    .like-btn,
    .chat-btn {
      margin-right: 10px;
      cursor: pointer;
      span {
        margin-left: 5px;
      }
    }
  }
`;

const PostTitle = styled.p`
  font-size: 14px;
  font-weight: bold;
`;
const PostImg = styled.div`
  width: 100%;
  height: 130px;
  margin-top: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PostContent = styled.p`
  padding: 5px 5px;

  .post-content {
    margin: 10px 0;
    font-size: 14px;
    height: 28px;
    overflow: hidden;
    padding: 5px 0;
    width: 100%;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .hashtag {
    font-size: 12px;
    display: flex;
    align-items: center;

    .icon {
      margin: 10px;
      font-size: 14px;
      font-weight: bold;
    }

    span {
      padding: 3px 8px;
      border: 1px solid var(--point-color);
      border-radius: 16px;
      color: var(--point-color);
    }
  }
`;

const ChipDiv = styled.div`
  display: flex;
  justify-content: flex-end;

  div {
    padding: 5px 10px;
    font-size: 12px;
    border-radius: 6px;
    text-align: center;
    color: #fff;
  }

  .ing {
    background-color: var(--point-color);
  }

  .stop {
    background-color: var(--sub-font-color);
  }
`;

export default PostCard;
