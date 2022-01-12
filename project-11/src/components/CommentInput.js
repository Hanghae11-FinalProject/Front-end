import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { Grid } from "../elements/index";
import { axiosInstance } from "../shared/api";
import { getCookie } from "../shared/Cookie";
import { history } from "../redux/configureStore";

import styled from "styled-components";
import { IoPaperPlane } from "react-icons/io5";
import { GrClose } from "react-icons/gr";

const CommentInput = ({ name, postid, commentid }) => {
  const token = getCookie("Token");
  const dispatch = useDispatch();
  const [Newcomment, setNewComment] = useState();
  const [replyId, setReplyId] = useState(commentid);
  console.log(name);

  //댓글 쓰기
  const writeComment = (e) => {
    if (!token) {
      window.alert("로그인을 안 하셨군요! 로그인부터 해주세요 😀");
      history.push("/login");
    }
    setNewComment(e.target.value);
  };

  // 새 댓글 서버로 보내기
  const postComment = () => {
    if (!token) {
      window.alert("로그인을 안 하셨군요! 로그인부터 해주세요 😀");
      history.push("/login");
    }
    dispatch(postActions.add_comment(postid, replyId, Newcomment));
    setNewComment("");
  };

  return (
    <>
      <CommentInputBox>
        <Grid is_container _className="out-box">
          <Grid
            is_container
            is_flex
            flex_align="center"
            _className="comment-box"
          >
            <input
              type="text"
              placeholder="댓글을 입력해주세요"
              value={Newcomment}
              onChange={writeComment}
              disabled={token ? false : true}
            />
            <IoPaperPlane className="add-btn" onClick={postComment} />
          </Grid>
        </Grid>
      </CommentInputBox>
    </>
  );
};

export default CommentInput;

// 코멘트 인풋
const CommentInputBox = styled.div`
  .out-box {
    position: fixed;
    bottom: 50px;
    width: 100%;
    max-width: 428px;
    background-color: #fff;
    padding: 10px 16px;
    box-sizing: border-box;

    /* border-right: 1px solid var(--help-color);
    border-left: 1px solid var(--help-color); */

    .reply-name {
      /* padding-bottom: 10px; */
      width: 100%;
      height: 30px;
      font-size: 14px;
      color: var(--main-color);
      background-color: #fff;

      p {
        width: 95%;
      }

      span {
        width: 5%;
        height: 20px;
        color: var(--inactive-icon-color);

        .close-btn {
          font-size: 10px;
          color: var(--inactive-icon-color);
          cursor: pointer;
        }
      }
    }

    .comment-box {
      margin: 0 auto;
      padding: 3px 10px;
      background-color: var(--light-color);
      border-radius: 18px;

      input {
        width: 92%;
        padding: 5px 10px;
        outline: none;
        border: 0;
        background-color: transparent;
      }

      .add-btn {
        color: var(--main-color);
        font-size: 26px;

        cursor: pointer;
      }
    }

    .comment-box-active {
      display: block;
    }
    .comment-box-inactive {
      display: none;
    }
  }
`;
