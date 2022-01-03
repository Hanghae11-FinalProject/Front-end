import React, { useState } from "react";
import { Grid } from "../elements/index";
import { axiosInstance } from "../shared/api";
import { getCookie } from "../shared/Cookie";
import { history } from "../redux/configureStore";

import styled from "styled-components";
import { IoPaperPlane } from "react-icons/io5";

const CommentInput = ({ name, postid, commentid }) => {
  const token = getCookie("Token");
  const [Newcomment, setNewComment] = useState();
  const [replyId, setReplyId] = useState(commentid);
  const id = postid;

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
    axiosInstance
      .post(
        `/api/comments/`,
        {
          postId: id,
          parentId: replyId,
          content: Newcomment,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log("댓글 쓰기 성공", res);
      })
      .catch((err) => {
        console.log("댓글 쓰기 실패", err);
      });
    window.location.reload();
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
            {name ? (
              <input
                type="text"
                placeholder={`@${name}님에게 답글 을 입력해주세요`}
                onChange={writeComment}
              />
            ) : (
              <input
                type="text"
                placeholder="댓글을 입력해주세요"
                onChange={writeComment}
                disabled={token ? false : true}
              />
            )}

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
    background-color: #fff;
    border: 0px solid red;
    padding: 10px 16px;
    box-sizing: border-box;

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
  }
`;
