import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { Grid } from "../elements/index";
import { getCookie } from "../shared/Cookie";
import { history } from "../redux/configureStore";

import styled from "styled-components";
import { IoPaperPlane } from "react-icons/io5";

const CommentInput = ({ name, postid, commentid, comcnt }) => {
  const token = getCookie("Token");
  const dispatch = useDispatch();
  const [Newcomment, setNewComment] = useState();
  const [replyId, setReplyId] = useState(commentid);

  //댓글 쓰기
  const writeComment = (e) => {
    if (!token) {
      window.alert("로그인을 안 하셨군요! 로그인부터 해주세요 😀");
      history.push("/");
    }
    setNewComment(e.target.value);
  };

  // 새 댓글 쓰기
  const postComment = () => {
    if (!token) {
      window.alert("로그인을 안 하셨군요! 로그인부터 해주세요 😀");
      history.push("/");
    }
    if (!Newcomment) {
      return;
    }
    dispatch(postActions.add_comment(postid, replyId, Newcomment, comcnt));
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
              onKeyPress={(e) => {
                e.key === "Enter" && postComment();
              }}
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
    z-index: 9999;

    .reply-name {
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
      border-radius: 4px;

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
