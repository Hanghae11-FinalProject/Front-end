import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Nav from "../shared/Nav";
import ProductImg from "../components/ProductImg";

import { useParams } from "react-router-dom";

import CommentList from "../components/CommentList";
import CommentInput from "../components/CommentInput";
import { axiosInstance } from "../shared/api";
import { data } from "../shared/util";
import { Grid } from "../elements/index";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import styled from "styled-components";
import { axiosInstance } from "../shared/api";
import { FiStar } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsChat } from "react-icons/bs";

import { getCookie } from "../shared/Cookie";
import post from "../redux/modules/post";

// install Swiper modules
SwiperCore.use([FreeMode, Pagination]);

const Detail = () => {
  const params = useParams();
  const [user_id, setUser_id] = useState(false);
  const [PostData, setPostdata] = useState();
  const [like, setLike] = useState(false);

  const params = useParams();

  const userId = getCookie("Id");
  console.log(userId);

  // 포스트id로 포스트 가져오기
  const getPostData = () => {
    axiosInstance
      .get(`/api/posts/${params.id}`)
      .then((res) => {
        console.log(res);
        // setPostdata(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getPostData();
  }, []);

  const [btnActive, setBtnActive] = useState(false);
  const token = getCookie("Token");

  // 포스트id로 포스트 가져오기
  const getPostData = async () => {
    try {
      const res = await axiosInstance.get(`/api/posts/${params.id}`);
      console.log(res);
      setPostdata(res.data);
    } catch (err) {
      console.log("상세 페이지 조회 실패", err);
    }
  };

  useEffect(() => {
    getPostData();
    console.log("hello");
  }, []);


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
                  <Grid
                    _className={btnActive ? "inner-menu active" : "inner-menu"}
                    _onClick={() => setBtnActive(false)}
                  >
                    <li>채팅하기</li>
                    <li>공유하기</li>
                    <li>신고하기</li>
                  </Grid>
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
                    {like && user_id ? (
                      <FaStar className="icon active" />
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
              {PostData.comments.map((comment, i) => {
                return <CommentList key={comment.id} comment={comment} />;
              })}
            </Grid>
          </DetailBox>
        </>
      )}

      <Nav />
    </>
  );
};

export default Detail;
const DetailBox = styled.div`
  padding-bottom: 60px;

  .border {
    height: 100vh;
    padding-top: 60px;

    border-right: 1px solid var(--help-color);
    border-left: 1px solid var(--help-color);
  }
  /* .like-btn,
  .dislike-btn {
    border: 0;
    outline: 0;
    background-color: transparent;
    width: 60px;
    color: var(--main-color);
    .icon {
      font-size: 22px;
    }
  } */

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
    font-size: 24px;
  }
`;

const Content = styled.div`
  max-height: 100px;
  margin-bottom: 20px;
`;

// 이미지 슬라이더
const ProductImgBox = styled.div`
  margin: 10px 0;

  /* swiper */
  .swiper {
    width: 100%;
    height: 150px;
    border-radius: 4px;
  }

  .swiper-slide {
    text-align: center;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }

  .swiper-pagination.swiper-pagination-clickable {
    display: none;
  }
`;
