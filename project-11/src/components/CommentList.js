import React, { useState } from "react";
import { Grid } from "../elements/index";
import CommentInput from "./CommentInput";
import Reply from "./Reply";

import styled from "styled-components";
import { BiDotsVerticalRounded } from "react-icons/bi";

const CommentList = () => {
  const [btnActive, setBtnActive] = useState(false);
  const username = "min";
  return (
    <>
      <CommentBox>
        <Grid is_container _className="comment-box">
          <Grid is_flex flex_align="center" _className="user">
            <Profile></Profile>
            <p>{username}</p>
            <Grid _className="modal-menu">
              <BiDotsVerticalRounded
                className="icon"
                onClick={() => setBtnActive(true)}
              />
              <Grid
                _className={btnActive ? "inner-menu active" : "inner-menu"}
                _onClick={() => setBtnActive(false)}
              >
                <li>댓글달기</li>
                <li>채팅하기</li>
                <li>신고하기</li>
              </Grid>
            </Grid>
          </Grid>
          <Comment>저 순두부를 갖고 있어요! 몇 개 필요하신가요?</Comment>
          <Grid is_flex flex_align="center">
            <span>12.29</span>
            <span>25분전</span>
          </Grid>
          <Reply name={username} />
        </Grid>
      </CommentBox>
    </>
  );
};

export default CommentList;

const CommentBox = styled.div`
  font-size: 14px;

  .comment-box {
    .user {
      height: 40px;

      p {
        width: 85%;
      }

      //단추메뉴 버튼
      .modal-menu {
        position: relative;

        .icon {
          font-size: 20px;
          cursor: pointer;
        }

        .inner-menu {
          position: absolute;
          top: 20px;
          right: -5px;
          width: 150px;

          background-color: #fff;
          border: 1px solid var(--help-color);
          display: none;
          z-index: 10;
          li {
            color: var(--active-color);
            padding: 8px 10px;
            cursor: pointer;

            &:hover {
              background-color: var(--main-light-color);
            }
          }
        }

        .active {
          display: block;
        }
      }
    }

    span {
      margin: 5px 5px;
      font-size: 12px;
      color: var(--help-color);
    }
  }
`;

const Profile = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--help-color);
  margin-right: 10px;
`;

const Comment = styled.div`
  padding-left: 5px;
`;
