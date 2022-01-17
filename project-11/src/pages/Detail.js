import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { getCookie } from "../shared/Cookie";
import { axiosInstance } from "../shared/api";
import { Grid } from "../elements/index";
import { history } from "../redux/configureStore";

import Nav from "../shared/Nav";
import ProductImg from "../components/ProductImg";
import CommentList from "../components/CommentList";
import CommentInput from "../components/CommentInput";
import Spinner from "../components/Spinner";
import ScaleLoader from "react-spinners/ScaleLoader";

import styled from "styled-components";
import { FiStar } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsChat } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { createAction } from "redux-actions";

const Detail = () => {
  const token = getCookie("Token");
  const curUserName = getCookie("Name");
  const curUserId = getCookie("Id");
  const params = useParams();
  const dispatch = useDispatch();
  const [is_loading, setIs_loading] = useState(false);

  const [items, setItems] = useState(); // 지우면 안대용~ for Write page
  const [user_id, setUser_id] = useState(false);

  //게시글 전체 데이터 저장
  const [PostData, setPostdata] = useState();

  //리덕스에서 댓글가져오기
  const commentlist = useSelector((state) => state.post.post.comments);

  //즐겨찾기 state관리
  const [bmCnt, setBmCnt] = useState();
  const [bookmark, setBookmark] = useState();
  const [bm, setCheckBm] = useState([]);

  //댓글 갯수 관리
  const [comCnt, setcomCnt] = useState();

  const [productId, setProductId] = useState();
  const [btnActive, setBtnActive] = useState(false);
  const [state, setState] = useState();

  // 포스트id로 포스트 가져오기
  const getPostData = async () => {
    try {
      setIs_loading(true);
      const res = await axiosInstance.get(`/api/posts/${params.id}`);
      console.log("상세 페이지 조회 성공", res);
      setPostdata(res.data);
      setItems(res.data);
      setCheckBm(res.data.bookMarks);
      setBmCnt(res.data.bookMarkCount);
      setProductId(res.data.postId);
      setState(res.data.currentState);
      setcomCnt(res.data.commentCount);
    } catch (err) {
      console.log("상세 페이지 조회 실패", err);
    }
  };

  //포스트 삭제하기
  const deletePost = () => {
    if (window.confirm("게시물을 삭제 하시겠습니까?")) {
      dispatch(postActions.del_onepost(params.id));
    } else {
      return;
    }
  };

  //로그인된 유저가 즐겨찾기 한 포스트인지 비교하기
  const has_bookmarks = () => {
    if (bm.length > 0) {
      const bookmarkState = bm.filter((user) => {
        return user.userId === Number(curUserId);
      });

      if (bookmarkState.length === 1) {
        setUser_id(true);
        setBookmark(true);
      }
    }
  };

  //즐겨찾기 버튼
  const addBookmark = () => {
    if (!token) {
      window.alert("로그인을 안 하셨군요! 로그인부터 해주세요 😀");
      history.push("/login");
    }

    if (curUserName === PostData.nickname) {
      window.alert("자신의 게시물은 즐겨찾기를 누르실 수 없어요😀");
    } else {
      setBmCnt(bmCnt + 1);
      setBookmark(true);
      setUser_id(true);
      axiosInstance
        .post(
          `/api/bookmark/${params.id}`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          dispatch(postActions.editStar(res.data));
        })
        .catch((err) => console.log(err));
    }
  };
  //즐겨찾기 버튼 취소
  const cancelBookmark = () => {
    if (!token) {
      window.alert("로그인을 안 하셨군요! 로그인부터 해주세요 😀");
      history.push("/login");
    }
    setBmCnt(bmCnt - 1);
    setBookmark(false);
    setUser_id(false);
    axiosInstance
      .delete(`api/bookmark/${params.id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(postActions.editStar(res.data));
      })
      .catch((err) => console.log(err));
  };

  //거래완료버튼 변경
  const completeExchange = () => {
    dispatch(postActions.exchange_state(params.id));
  };

  const goChat = () => {
    if (PostData.currentState === "Complete") {
      window.alert("이미 거래가 완료된 게시글 입니다.");
      return;
    }
    axiosInstance
      .post(
        `/api/room`,
        {
          postId: PostData.postId,
          toUserId: PostData.userId,
        },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        // console.log(res, "성공");
        if (res.data.message === "same room") {
          window.alert("이미 상대방과의 채팅방이 있습니다.");
          history.push("/chatting");
        } else {
          history.push({
            pathname: `/chat`,
            state: {
              roomName: res.data.roomName,
              sender: res.data.user,
              postId: PostData.postId,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err, "에러");
      });
  };

  //버튼메뉴 클릭이벤트
  const Clickbtn = () => {
    if (btnActive) {
      setBtnActive(false);
    } else {
      setBtnActive(true);
    }
  };

  useEffect(() => {
    getPostData();
    //댓글 개수를 실시간 체크하기 위해서 의존값으로 댓글리스트를 걸어뒀습니다
  }, [commentlist]);

  useEffect(() => {
    has_bookmarks();
  }, [bm]);

  useEffect(() => {
    dispatch(postActions.get_onepost(params.id));
  }, []);

  return (
    <>
      {!PostData ? (
        <>
          <Spin>
            <ScaleLoader
              height="50px"
              width="10px"
              color="#FF626F"
              radius="8px"
            />
          </Spin>
        </>
      ) : (
        <>
          <DetailBox key={PostData.postId}>
            <Grid is_container _className="border background">
              {/* header */}
              {token ? (
                <>
                  <Header>
                    <Grid
                      _className="inner"
                      is_container
                      is_flex
                      flex_align="center"
                    >
                      <IoIosArrowBack
                        style={{
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                        onClick={() => history.goBack()}
                      />
                      <p>자세히 보기</p>
                    </Grid>
                  </Header>
                </>
              ) : (
                <>
                  <Header>
                    <Grid
                      _className="logout-inner"
                      is_container
                      is_flex
                      flex_align="center"
                    >
                      <IoIosArrowBack
                        style={{
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                        onClick={() => history.goBack()}
                      />
                      <p>자세히 보기</p>
                      <button onClick={() => history.push("/login")}>
                        로그인
                      </button>
                    </Grid>
                  </Header>
                </>
              )}

              {/* 카테고리 */}
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
                    className={btnActive ? "icon" : "inactive-icon"}
                    onClick={Clickbtn}
                  />
                  {Number(curUserId) === PostData.userId ? (
                    <>
                      {state === "Proceeding" ? (
                        <>
                          <Grid
                            _className={
                              btnActive ? "inner-menu active" : "inner-menu"
                            }
                            _onClick={Clickbtn}
                          >
                            <li
                              onClick={() => {
                                history.push({
                                  pathname: `/write/${PostData.postId}`,
                                  state: { items: items },
                                });
                              }}
                            >
                              수정하기
                            </li>
                            <li onClick={completeExchange}>
                              거래완료로 변경하기
                            </li>
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
                            _onClick={Clickbtn}
                          >
                            <li
                              onClick={() => {
                                history.push({
                                  pathname: `/write/${PostData.postId}`,
                                  state: { items: items },
                                });
                              }}
                            >
                              수정하기
                            </li>
                            <li>공유하기</li>
                            <li onClick={deletePost}>삭제하기</li>
                          </Grid>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Grid
                        _className={
                          btnActive ? "inner-menu active" : "inner-menu"
                        }
                        _onClick={Clickbtn}
                      >
                        <li onClick={goChat}>채팅하기</li>
                        <li>공유하기</li>
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
                    {user_id ? (
                      <FaStar
                        className="icon bookmark-active"
                        onClick={cancelBookmark}
                      />
                    ) : (
                      <FiStar className="icon" onClick={addBookmark} />
                    )}

                    <span>즐겨찾기 {bmCnt}</span>
                  </Grid>
                  <Grid is_flex _className="chat-btn" flex_align="center">
                    <BsChat className="icon" />
                    {/* <span>댓글 {commentlist?.length}</span> */}
                    <span>댓글 {comCnt}</span>
                  </Grid>
                </Grid>
              </Grid>
              {/* 댓글 리스트 */}
              {commentlist ? (
                <>
                  {commentlist.map((comment, i) => {
                    return (
                      <CommentList
                        key={comment.id}
                        comment={comment}
                        postid={params.id}
                        postuser={PostData.nickname}
                        comcnt={comCnt}
                      />
                    );
                  })}
                </>
              ) : (
                <></>
              )}

              {/* 댓글이 없을 때 나타나는 댓글 인풋창, 부모댓글이라 포스트 아이디만 넘겨줌*/}
              {PostData.comments.length === 0 && (
                <Grid is_container>
                  <CommentInput postid={params.id} comcnt={comCnt} />
                </Grid>
              )}
              <Nav />
            </Grid>
          </DetailBox>
        </>
      )}
    </>
  );
};

export default Detail;
const DetailBox = styled.div`
  .border {
    padding-top: 60px;
    /* border-right: 1px solid var(--help-color);
    border-left: 1px solid var(--help-color); */
    height: 100vh;
    padding-bottom: 110px;
    background-color: #fff;
    overflow-y: auto;
    -ms-overflow-style: none; // IE and Edge
    scrollbar-width: none; // Firefox
    ::-webkit-scrollbar {
      display: none; // Chrome, Safari, Opera
    }
  }
  .user-info {
    width: 94%;
    margin: 0 auto;
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
  max-width: 428px;
  height: 50px;
  position: fixed;
  top: 0;
  /* border-bottom: 1px solid var(--help-color); */
  background-color: #fff;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1);
  z-index: 10;
  .inner {
    height: 50px;
    margin: 0 auto;
    p {
      width: 90%;
      position: absolute;
      left: 5%;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .logout-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    margin: 0 auto;
    p {
      width: 90%;
      position: absolute;
      left: 5%;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
    button {
      border: 0;
      color: var(--main-color);
      outline: none;
      background-color: transparent;
      font-size: 16px;
      margin-right: 16px;
      cursor: pointer;
      z-index: 9;
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

//spinner
const Spin = styled.div`
  width: 100%;
  max-width: 429px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;
