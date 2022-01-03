import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../shared/Cookie";
import { axiosInstance } from "../shared/api";
import { Grid } from "../elements/index";
import { history } from "../redux/configureStore";
import axios from "axios";

import Nav from "../shared/Nav";
import ProductImg from "../components/ProductImg";
import CommentList from "../components/CommentList";

import styled from "styled-components";
import { FiStar } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsChat } from "react-icons/bs";

import CommentInput from "../components/CommentInput";

const Detail = () => {
  const token = getCookie("Token");
  const curUserName = getCookie("Name");
  const curUserId = getCookie("Id");
  const params = useParams();
  const [is_loading, setIs_loading] = useState(false);
  const [user_id, setUser_id] = useState(false);
  const [PostData, setPostdata] = useState();
  const [bookmark, setBookmark] = useState();

  const [btnActive, setBtnActive] = useState(false);

  //로그인된 유저가 즐겨찾기 한 포스트인지 비교하기
  const has_bookmarks = () => {
    setIs_loading(true);
    if (PostData.bookMarks.length > 0) {
      const bookmarkState = PostData.bookMarks.filter((user) => {
        return user.userId === Number(curUserId);
      });

      if (bookmarkState.length === 1) {
        setBookmark(true);
        setIs_loading(false);
      }
    }
  };

  // 포스트id로 포스트 가져오기
  const getPostData = async () => {
    try {
      setIs_loading(true);
      const res = await axiosInstance.get(`/api/posts/${params.id}`);
      console.log("상세 페이지 조회 성공", res);
      console.log("reply", res.data.comments);
      setPostdata(res.data);
    } catch (err) {
      console.log("상세 페이지 조회 실패", err);
    }
    setIs_loading(false);
  };

  //포스트 삭제하기
  const deletePost = () => {
    axiosInstance
      .delete(`api/posts/${params.id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  //즐겨찾기 버튼
  const addBookmark = () => {
    console.log(token);

    setBookmark(true);
    axios
      .post(
        `http://15.164.222.25/api/bookmark/${params.id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => console.log("즐겨찾기 보내기 성공", res))
      .catch((err) => console.log(err));
  };

  //즐겨찾기 버튼 취소
  const cancelBookmark = () => {
    if (!token) {
      window.alert("로그인을 안 하셨군요! 로그인부터 해주세요 😀");
      history.push("/login");
    }
    setBookmark(false);
    axiosInstance
      .delete(`api/bookmark/${params.id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => console.log("즐겨찾기 취소 성공", res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPostData();

    return () => setIs_loading(false);
  }, []);

  console.log("data-comment", PostData);
  return (
    <>
      {!PostData ? (
        <></>
      ) : (
        <>
          <DetailBox key={PostData.postId}>
            <Grid is_container _className="border">
              {/* header */}
              <Header>
                <Grid
                  _className="inner"
                  is_container
                  is_flex
                  flex_align="center"
                >
                  <p>자세히 보기</p>
                </Grid>
              </Header>
              {/* 카테고리 라이크버튼  */}
              <Grid
                is_flex
                flex_align="center"
                flex_justify="space-between"
                padding="0 16px"
              >
                <Cate className="chip">
                  <span>{PostData.categoryName}</span>
                  <span>{PostData.address}</span>
                </Cate>
              </Grid>
              {/* 작성자 인포 */}
              <Grid
                is_flex
                flex_align="center"
                flex_justify="space-between"
                _className="user-info"
                padding="0 16px"
              >
                <Profile>
                  <img src={PostData.profileImg} alt="profile" />
                </Profile>
                <UserInfo>
                  <p className="name">{PostData.nickname}</p>
                  <p className="time">{PostData.createdAt}</p>
                </UserInfo>
                <Grid _className="modal-menu">
                  <BiDotsVerticalRounded
                    className="icon"
                    onClick={() => setBtnActive(true)}
                  />
                  {curUserName === PostData.nickname ? (
                    <>
                      <Grid
                        _className={
                          btnActive ? "inner-menu active" : "inner-menu"
                        }
                        _onClick={() => setBtnActive(false)}
                      >
                        <li>수정하기</li>
                        <li>거래완료로 변경하기</li>
                        <li>공유하기</li>
                        <li onClick={deletePost}>삭제하기</li>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid
                        _className={
                          btnActive ? "inner-menu active" : "inner-menu"
                        }
                        _onClick={() => setBtnActive(false)}
                      >
                        <li onClick={addBookmark}>공유하기</li>
                        <li>신고하기</li>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>

              {/* 컨텐츠 시작 */}
              <Grid padding="0 16px">
                <Title>
                  <h2>{PostData.title}</h2>
                </Title>
                <Content>{PostData.content}</Content>
                {/* 상품 이미지 슬라이더 */}
                <ProductImg img={PostData.images} />
                {/* 해시태그 */}
                <Grid is_flex _className="tag">
                  {PostData.tags.map((tag, i) => {
                    return (
                      <>
                        <span key={tag.id}>#{tag.tagName}</span>
                      </>
                    );
                  })}
                </Grid>
                {/* 라이크버튼  */}
                <Grid is_flex _className="btn-box">
                  <Grid is_flex _className="like-btn" flex_align="center">
                    {bookmark ? (
                      <FaStar
                        className="icon bookmark-active"
                        onClick={cancelBookmark}
                      />
                    ) : (
                      <FiStar className="icon" />
                    )}
                    <span>즐겨찾기 {PostData.bookMarks.length}</span>
                  </Grid>
                  <Grid is_flex _className="chat-btn" flex_align="center">
                    <BsChat className="icon" />
                    <span>댓글 {PostData.comments.length}</span>
                  </Grid>
                </Grid>
              </Grid>
              {/* 댓글 리스트 */}
              {/* {PostData.comments.map((comment, i) => {
                return (
                  <CommentList
                    key={comment.id}
                    comment={comment}
                    postid={params.id}
                    postuser={PostData.nickname}
                  />
                );
              })} */}
            </Grid>
            {/* 댓글이 없을 때 나타나는 댓글 인풋창, 부모댓글이라 포스트 아이디만 넘겨줌*/}
            {PostData.comments.length === 0 && (
              <Grid is_container>
                <CommentInput postid={params.id} />
              </Grid>
            )}
          </DetailBox>
        </>
      )}

      <Nav />
    </>
  );
};

export default Detail;
const DetailBox = styled.div`
  padding-bottom: 100px;

  .border {
    padding-top: 60px;
    border-right: 1px solid var(--help-color);
    border-left: 1px solid var(--help-color);
  }

  .user-info {
    padding-bottom: 15px;
    border-bottom: 1px solid var(--help-color);
    .name {
      width: 65%;
    }
    .time {
      color: var(--help-color);
      font-size: 14px;
    }

    .icon {
      font-size: 24px;
      color: var(--inactvie-icon-color);
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
        width: 170px;

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

  .tag {
    display: flex;
    flex-wrap: wrap;

    span {
      padding: 2px 10px;
      border: 1px solid var(--main-color);
      color: var(--main-color);
      margin: 5px 5px 5px 0;
      font-size: 16px;
      border-radius: 16px;
    }
  }

  /* 즐겨찾기 댓글 버튼 */

  .btn-box {
    border-top: 1px solid var(--help-color);
    border-bottom: 1px solid var(--help-color);
    padding: 15px 5px;
    margin: 20px 0;
    .like-btn {
      width: 100px;
    }
    .like-btn,
    .chat-btn {
      display: flex;
      margin-right: 10px;
      cursor: pointer;
      color: var(--inactive-text-color);

      .icon {
        font-size: 16px;
      }
      span {
        margin-left: 5px;
        /* figma 16px */
        font-size: 14px;
        color: var(--inactive-text-color);
        margin-right: 5px;
      }
      .bookmark-active {
        color: var(--main-color);
      }
    }
  }
`;

// 헤더
const Header = styled.div`
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;

  border-bottom: 1px solid var(--help-color);
  background-color: #fff;
  z-index: 10;
  .inner {
    height: 50px;
    margin: 0 auto;

    p {
      width: 100%;
      position: absolute;
      left: 0;
      text-align: center;

      font-size: 20px;
      font-weight: bold;
    }
  }
`;

// 카테고리
const Cate = styled.div`
  width: 100%;
  margin: 10px 0 20px 0;
  span {
    font-size: 14px;
    padding: 3px 8px;
    border-radius: 16px;
    background-color: var(--light-color);
    margin-right: 5px;
  }
`;

// 프로필
const Profile = styled.div`
  margin-right: 10px;
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const UserInfo = styled.div`
  width: 80%;
  padding-left: 5px;
`;

const Title = styled.div`
  margin: 20px 0;

  h2 {
    font-size: 20px;
  }
`;

const Content = styled.div`
  max-height: 100px;
  margin-bottom: 20px;
`;
