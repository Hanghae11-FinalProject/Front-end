import React from "react";
import { Grid } from "../elements/index";

import styled from "styled-components";
import { IoPaperPlane } from "react-icons/io5";

const CommentInput = ({ name }) => {
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
                tpye="texy"
                placeholder={`@${name}님에게 답글을 입력해주세요`}
              />
            ) : (
              <input tpye="texy" placeholder="댓글을 입력해주세요" />
            )}

            <IoPaperPlane className="add-btn" />
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
