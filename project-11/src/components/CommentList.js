import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { Grid } from "../elements/index";
import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie";
import CommentInput from "./CommentInput";
import Reply from "./Reply";

import styled from "styled-components";
import { BiDotsVerticalRounded } from "react-icons/bi";

const CommentList = ({ comment, postid, postuser }) => {
  const token = getCookie("Token");
  const curUserId = getCookie("Id");
  const userProfile = useSelector((state) => state.post.profile);
  console.log(userProfile);
  const dispatch = useDispatch();

  const [is_login, setIs_login] = useState(token ? true : false);
  const [name, setName] = useState(false);
  const [btnActive, setBtnActive] = useState(false);

  const commentData = comment;
  console.log(commentData);
  //댓글 쓰기

  const writeComment = () => {
    if (!token) {
      window.alert("로그인을 안 하셨군요! 로그인부터 해주세요 😀");
      history.push("/intro");
    }
    setName(commentData.nickname);
  };

  //댓글 삭제
  const deleteComment = () => {
    let ok = window.confirm("정말 삭제하시겠어요?");
    if (ok) {
      dispatch(postActions.del_comment(commentData.id));
    }
  };

  //버튼메뉴 클릭이벤트
  const Clickbtn = () => {
    if (btnActive) {
      setBtnActive(false);
    } else {
      setBtnActive(true);
    }
  };

  return (
    <>
      <>
        <CommentBox key={commentData.id}>
          <Grid is_container _className="comment-box">
            <Grid is_flex flex_align="center" _className="user">
              <Profile>
                <img src={userProfile.profileImg} alt="UserImg" />
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
                      <li onClick={writeComment}>댓글달기</li>
                      <li>채팅하기</li>
                      <li onClick={deleteComment}>신고하기</li>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Comment>{commentData.content}</Comment>
            <Grid is_flex>
              <span>{commentData.createAt}</span>
            </Grid>
            {/* 부모 댓글에 속해 있는 자식 댓글들 */}
            {commentData.children ? (
              <>
                {commentData.children.map((reply, idx) => {
                  return (
                    <>
                      <Reply
                        postid={postid}
                        reply={reply}
                        key={reply.id}
                        postuser={postuser}
                      />
                    </>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </Grid>
        </CommentBox>
      </>

      {/* 코멘트 인풋창 */}
      {/* comment list가 있을때는 name이 붙는 인풋으로 아니면 디폴트 인풋창으로 */}
      {name && (
        <CommentInput
          name={commentData.nickname}
          postid={postid}
          // parent id
          commentid={commentData.id}
        />
      )}
      <CommentInput postid={postid} />
    </>
  );
};

export default CommentList;

const CommentBox = styled.div`
  font-size: 14px;
  padding: 0 16px;

  .comment-box {
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
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--help-color);
  margin-right: 10px;
  background-color: #ffd8d8;

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
