import React, { useState } from "react";
import { axiosInstance } from "../shared/api";
import { Grid } from "../elements";
import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie";

import styled from "styled-components";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsArrowReturnRight } from "react-icons/bs";

const Reply = ({ reply, postid, postuser }) => {
  const token = getCookie("Token");
  const curUserId = getCookie("Id");
  const [is_login, setIs_login] = useState(token ? true : false);
  const [btn, setBtn] = useState(false);
  const replyData = reply;

  //댓글 삭제
  const deleteComment = () => {
    axiosInstance
      .delete(`/api/comments/${replyData.id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => console.log("delete reply sucess", res))
      .catch((err) => console.log("delete reply fail", err));
  };
  return (
    <>
      <ReplyBox key={replyData.id}>
        <Grid is_flex is_container>
          <BsArrowReturnRight className="arrow" />
          <Grid _className="reply-box">
            <Grid is_flex flex_align="center" _className="user">
              <Profile></Profile>
              {replyData.nickname === postuser ? (
                <p>
                  {replyData.nickname} <span className="chip">작성자</span>
                </p>
              ) : (
                <p>{replyData.nickname}</p>
              )}

              <Grid _className="modal-menu">
                <BiDotsVerticalRounded
                  className="icon"
                  onClick={() => setBtn(true)}
                />
                <Grid
                  _className={btn ? "inner-menu active" : "inner-menu"}
                  _onClick={() => setBtn(false)}
                >
                  {is_login && curUserId === replyData.userId ? (
                    <>
                      <li onClick={deleteComment}>삭제하기</li>
                    </>
                  ) : (
                    <>
                      <li>채팅하기</li>
                      <li>신고하기</li>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Comment>{replyData.content}</Comment>
            <Grid>
              <span>{replyData.createAt}</span>
            </Grid>
          </Grid>
        </Grid>
      </ReplyBox>
    </>
  );
};

export default Reply;

const ReplyBox = styled.div`
  margin: 10px 0;

  font-size: 14px;

  .arrow {
    color: var(--help-color);
    margin-right: 10px;
    font-size: 14px;
  }
  //답글 박스
  .reply-box {
    width: 100%;
    background-color: var(--light-color);
    border-radius: 6px;
    padding: 5px 5px;

    //글 작성자 인포부분
    .user {
      height: 30px;
      margin: 5px 0;

      p {
        width: 85%;

        display: flex;
        align-items: center;

        .chip {
          font-size: 10px;
          padding: 3px 8px;
          background-color: var(--main-color);
          color: #fff;
          border-radius: 12px;
        }
      }

      //단추메뉴 버튼
      .modal-menu {
        position: relative;

        .inner-menu {
          position: absolute;
          right: -5px;
          top: -70px;
          width: 150px;

          background-color: #fff;
          border: 1px solid var(--help-color);
          display: none;
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
