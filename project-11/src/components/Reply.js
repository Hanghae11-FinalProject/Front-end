import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";

import { Grid } from "../elements";
import { getCookie } from "../shared/Cookie";
import { axiosInstance } from "../shared/api";

import styled from "styled-components";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsArrowReturnRight } from "react-icons/bs";

const Reply = ({ reply, parentid, postuser, comcnt, postid }) => {
  const token = getCookie("Token");
  const curUserId = getCookie("Id");
  const dispatch = useDispatch();
  const [is_login, setIs_login] = useState(token ? true : false);
  const [btn, setBtn] = useState(false);
  const replyData = reply;
  //댓글 삭제
  const deleteComment = () => {
    let ok = window.confirm("정말 삭제하시겠어요?");
    if (ok) {
      dispatch(
        postActions.del_childcomment(replyData.id, parentid, postid, comcnt)
      );
    }
  };

  const Clickbtn = () => {
    if (!token) {
      window.alert("로그인을 안 하셨군요! 로그인부터 해주세요 😀");
      history.push("/");
    }

    if (btn) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  };

  const goChat = () => {
    axiosInstance
      .post(
        `/api/room`,
        {
          postId: postid,
          toUserId: replyData.userId,
        },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        if (res.data.message === "same room") {
          window.alert("이미 상대방과의 채팅방이 있습니다.");
          history.push("/chatting");
        } else {
          history.push({
            pathname: `/chat`,
            state: {
              roomName: res.data.roomName,
              sender: res.data.user,
              postId: postid,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err, "에러");
      });
  };

  return (
    <>
      <ReplyBox key={replyData.id}>
        <Grid is_flex is_container>
          <BsArrowReturnRight className="arrow" />
          <Grid _className="reply-box">
            <Grid is_flex flex_align="center" _className="user">
              <Profile>
                <img
                  className="profile-img"
                  src={replyData.profileImg}
                  alt="profileImg"
                />
              </Profile>
              {replyData.nickname === postuser ? (
                <p>
                  {replyData.nickname} <span className="chip">작성자</span>
                </p>
              ) : (
                <p>{replyData.nickname}</p>
              )}

              <Grid _className="modal-menu">
                <BiDotsVerticalRounded
                  className={btn ? "btn-icon" : "btn-inactive-icon"}
                  onClick={Clickbtn}
                />
                <Grid
                  _className={btn ? "inner-menu active" : "inner-menu"}
                  _onClick={Clickbtn}
                >
                  {is_login && Number(curUserId) === replyData.userId ? (
                    <>
                      <li onClick={deleteComment}>삭제하기</li>
                    </>
                  ) : (
                    <>
                      <li onClick={goChat}>채팅하기</li>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Comment>{replyData.content}</Comment>
            <Grid padding="5px 0">
              <span>{replyData.createdAt}</span>
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
      margin: 0px 0;

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

        .btn-icon {
          font-size: 20px;
          cursor: pointer;
          color: var(--active-color);
        }

        .btn-inactive-icon {
          font-size: 20px;
          cursor: pointer;
          color: var(--inactive-icon-color);
        }

        .inner-menu {
          position: absolute;
          right: -5px;
          top: 20px;
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
  width: 30px;
  height: 30px;
  border-radius: 50%;
  /* background-color: var(--help-color); */
  margin-right: 10px;
  background-color: #ffd8d8;
  display: flex;
  justify-content: center;
  align-items: center;
  .profile-img {
    width: 24px;
    height: 24px;
  }
`;

const Comment = styled.div`
  padding-left: 5px;
`;
