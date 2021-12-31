import React, { useState } from "react";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import { Grid, Image } from "../elements/index";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { FiStar } from "react-icons/fi";
import { BsChat } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

const PostCard = ({ item }) => {
  const [state, setState] = useState(
    item.currentState === "Proceeding" ? "거래중" : "거래완료"
  );
  const [like, setLike] = useState(false);
  const [user_id, setUser_id] = useState(false);

  const MoveToDetail = () => {
    history.push(`/detail/${item.postId}`);
  };

  return (
    <React.Fragment>
      <Grid is_flex>
        <Post onClick={MoveToDetail}>
          <Grid is_flex flex_align="center">
            <Image shape="circle" size="34px;">
              icon
            </Image>
            <Grid padding="5px 0px;" _className="title-box">
              <PostTitle>
                <p>{item.title}</p>
              </PostTitle>
              <Grid is_flex _className="info-box">
                <span>{item.address}</span>
                <span>{item.createdAt}</span>
              </Grid>
            </Grid>
          </Grid>
          <PostImg>
            <Grid _className="imgbox">
              <img src={item.images[0].imageUrl} alt="PostImg" />
            </Grid>
            <ChipDiv>
              <Grid _className={state === "거래중" ? "ing" : "stop"}>
                {state}
              </Grid>
            </ChipDiv>
          </PostImg>

          <PostContent>
            <Grid is_flex _className="exchange-box">
              <span>{item.myItem}</span>
              <RiArrowLeftRightLine className="icon" />
              <span>{item.exchangeItem}</span>
            </Grid>
          </PostContent>
          <Grid is_flex padding="10px 5px" _className="btn-box">
            <Grid is_flex _className="like-btn" flex_align="center">
              {like && user_id ? (
                <FaStar className="icon active" />
              ) : (
                <FiStar className="icon" />
              )}
              <span>2</span>
            </Grid>
            <Grid is_flex _className="chat-btn" flex_align="center">
              <BsChat className="icon" />
              <span>3</span>
            </Grid>
          </Grid>
        </Post>
      </Grid>
    </React.Fragment>
  );
};

const Post = styled.div`
  width: 100%;
  border: 1px solid var(--help-color);
  padding-top: 5px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  .info-box {
    span {
      font-size: 12px;
      color: var(--help-color);
      margin-right: 5px;
    }
  }

  .title-box {
    width: 100%;
  }
  .btn-box {
    border-top: 1px solid var(--help-color);
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

const PostTitle = styled.div`
  font-size: 14px;
  font-weight: bold;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;
const PostImg = styled.div`
  width: 100%;
  height: 130px;
  margin-top: 10px;

  position: relative;

  .imgbox {
    height: 130px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const PostContent = styled.div`
  padding: 15px 5px;

  .post-content {
    margin: 10px 0;
    overflow: hidden;
    padding: 5px 0;
    width: 100%;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .exchange-box {
    display: flex;
    align-items: center;
    padding-left: 5px;

    .icon {
      margin: 5px;
      font-size: 14px;
      font-weight: bold;
    }

    span {
      font-size: 14px;
      color: var(--main-font-color);
      /* width: 47%;
      text-align: center; */
    }
  }
`;

const ChipDiv = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  display: flex;
  justify-content: flex-end;

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

export default PostCard;
