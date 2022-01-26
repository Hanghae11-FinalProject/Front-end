import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { Grid } from "../elements/index";
import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie";
import CommentInput from "./CommentInput";
import Reply from "./Reply";
import { axiosInstance } from "../shared/api";

import styled from "styled-components";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoPaperPlane } from "react-icons/io5";
import { GrClose } from "react-icons/gr";
import { BsArrowReturnRight } from "react-icons/bs";

const CommentList = ({ comment, postid, postuser, comcnt }) => {
  const token = getCookie("Token");
  const curUserId = getCookie("Id");

  const dispatch = useDispatch();

  const [is_login, setIs_login] = useState(token ? true : false);
  const [is_name, setIs_Name] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [Newcomment, setNewComment] = useState();
  const commentData = comment;
  let nickChange = commentData.nickname;

  //댓글 쓰기
  const writeCommentBtn = () => {
    if (!token) {
      window.alert("로그인을 안 하셨군요! 로그인부터 해주세요 😀");
      history.push("/");
    }
    if (is_name === false) {
      // is_name은 대댓글의 id 존재유무
      setIs_Name(true);
    } else if (is_name === true) {
      setIs_Name(false);
    }
  };

  //댓글 삭제
  const deleteComment = () => {
    let ok = window.confirm("정말 삭제하시겠어요?");
    if (ok) {
      dispatch(postActions.del_comment(commentData.id, postid, comcnt));
    }
  };

  //버튼메뉴 클릭이벤트
  const Clickbtn = () => {
    if (!token) {
      window.alert("로그인을 안 하셨군요! 로그인부터 해주세요 😀");
      history.push("/");
    }

    if (btnActive) {
      setBtnActive(false);
    } else {
      setBtnActive(true);
    }
  };

  //댓글 쓰기 onChange
  const writeComment = (e) => {
    if (!token) {
      window.alert("로그인을 안 하셨군요! 로그인부터 해주세요 😀");
      history.push("/");
    }
    setNewComment(e.target.value);
  };

  // 대댓글 추가
  const addChildComment = () => {
    if (!token) {
      window.alert("로그인을 안 하셨군요! 로그인부터 해주세요 😀");
      history.push("/");
    }

    if (!Newcomment) {
      return;
    }
    dispatch(
      postActions.add_childcomment(postid, commentData.id, Newcomment, comcnt)
    );
    setNewComment("");
    setIs_Name(false);
  };

  // 댓글 취소 (삭제아님)
  const cancleReply = () => {
    setIs_Name(false);
  };

  // 채팅하기
  const goChat = () => {
    if (!token) {
      window.alert("로그인을 안 하셨군요! 로그인부터 해주세요 😀");
      history.push("/");
    }

    axiosInstance
      .post(
        `/api/room`,
        {
          postId: postid,
          toUserId: comment.userId,
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
        // console.log(err, "에러");
      });
  };

  return (
    <>
      <>
        <CommentBox key={commentData.id}>
          <Grid is_container _className="comments-box">
            <Grid is_flex flex_align="center" _className="user">
              <Profile>
                <img src={commentData.profileImg} alt="UserImg" />
              </Profile>
              {commentData.nickname === postuser ? (
                <p>
                  {commentData.nickname} <span className="chip">작성자</span>
                </p>
              ) : (
                <p>{commentData.nickname}</p>
              )}
              <Grid _className="modal-menu">
                <BiDotsVerticalRounded
                  className={btnActive ? "icon" : "inactive-icon"}
                  onClick={Clickbtn}
                />
                <Grid
                  _className={btnActive ? "inner-menu active" : "inner-menu"}
                  _onClick={Clickbtn}
                >
                  {/* 현재 로그인 유저아이디와 댓글작성 유저 아이디가 다르다면 모달 메뉴가 달라짐 */}
                  {is_login && Number(curUserId) === commentData.userId ? (
                    <>
                      <li onClick={deleteComment}>삭제하기</li>
                    </>
                  ) : (
                    <>
                      <li onClick={writeCommentBtn}>댓글달기</li>
                      <li onClick={goChat}>채팅하기</li>
                      <li>신고하기</li>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Comment>{commentData.content}</Comment>
            <Grid is_flex>
              <span>{commentData.createdAt}</span>
            </Grid>
            {/* 부모 댓글에 속해 있는 자식 댓글들 */}
            {commentData.children ? (
              <>
                {commentData.children.map((reply, idx) => {
                  return (
                    <>
                      <Reply
                        parentid={commentData.id}
                        reply={reply}
                        key={reply.id}
                        postuser={postuser}
                        comcnt={comcnt}
                        postid={postid}
                      />
                    </>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </Grid>
          {/* 댓글의 아이디를 넘겨 받으면 대댓글 인풋창 오픈 */}
          {is_name === true && (
            <>
              <ReplyInput>
                <BsArrowReturnRight className="arrow" />
                <Grid _className="reply-input-box">
                  <Grid
                    is_container
                    is_flex
                    flex_align="center"
                    flex_justify="space-between"
                    _className="reply-name"
                  >
                    <p>@{nickChange}님에게 답글다는 중...</p>
                    <span>
                      <GrClose className="close-btn" onClick={cancleReply} />
                    </span>
                  </Grid>
                  <Grid
                    is_container
                    is_flex
                    flex_align="center"
                    _className="reply-box"
                  >
                    <input
                      type="text"
                      placeholder={`댓글을 입력해주세요`}
                      onChange={writeComment}
                      disabled={token ? false : true}
                      onKeyPress={(e) => {
                        e.key === "Enter" && addChildComment();
                      }}
                    />

                    <IoPaperPlane
                      className="add-btn"
                      onClick={addChildComment}
                    />
                  </Grid>
                </Grid>
              </ReplyInput>
            </>
          )}
        </CommentBox>
      </>
      {/* 대댓글없이 쓰는 댓글 인풋창 */}
      <CommentInput postid={postid} comcnt={comcnt} />
    </>
  );
};

export default CommentList;

const CommentBox = styled.div`
  font-size: 14px;
  padding: 0 16px;

  .comments-box {
    .user {
      height: 40px;

      p {
        width: 85%;
      }

      .chip {
        font-size: 10px;
        padding: 3px 8px;
        background-color: var(--main-color);
        color: #fff;
        border-radius: 12px;
      }

      //단추메뉴 버튼
      .modal-menu {
        position: relative;
        .icon {
          font-size: 20px;
          cursor: pointer;
          color: var(--active-color);
        }

        .inactive-icon {
          font-size: 20px;
          cursor: pointer;
          color: var(--inactive-icon-color);
        }

        .inner-menu {
          position: absolute;
          top: 20px;
          right: -5px;
          width: 150px;

          background-color: #fff;
          border: 1px solid var(--help-color);
          display: none;
          border-radius: 4px;
          z-index: 5;
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
  background-color: var(--help-color);
  margin-right: 10px;
  background-color: #fff1f1;

  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
  }
`;

const Comment = styled.div`
  padding-left: 5px;
`;

// 대댓글 인풋
const ReplyInput = styled.div`
  display: flex;
  margin: 5px 0 10px 0;

  .reply-input-box {
    width: 95%;
    margin-left: 10px;
    padding: 5px 5px 5px 5px;
    background-color: var(--light-color);
    border-radius: 4px;

    .reply-name {
      padding: 5px 10px;
      p {
        color: var(--main-color);
        width: 95%;
      }

      .close-btn {
        cursor: pointer;
      }
    }

    .reply-box {
      padding: 0px 10px;
      background-color: rgba(255, 255, 255, 0.55);

      input {
        width: 100%;
        height: 40px;
        border: 0;
        outline: 0;
        background-color: transparent;
      }

      .add-btn {
        color: var(--main-color);
        font-size: 26px;
        height: 40px;
        cursor: pointer;
      }
    }
  }
`;
