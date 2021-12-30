import React, { useState } from "react";
import Nav from "../shared/Nav";
import ProductImg from "../components/ProductImg";

import { Grid, Button } from "../elements/index";
import styled from "styled-components";
import { FiStar } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

import { data } from "../shared/util";
import { getCookie } from "../shared/Cookie";

const Detail = () => {
  const [user_id, setUser_id] = useState(false);
  const [like, setLike] = useState(false);

  const userId = getCookie("Id");
  console.log(userId);

  return (
    <>
      <DetailBox>
        <Grid is_container padding="16px" _className="border">
          {/* 카테고리 라이크버튼  */}
          <Grid is_flex flex_align="center" flex_justify="space-between">
            <Cate className="chip">
              <span>{data.category}</span>
            </Cate>
            {user_id ? (
              <Button Btn>판매 중</Button>
            ) : (
              <>
                {like ? (
                  <Button
                    Btn
                    _className="dislike-btn"
                    _onClick={() => setLike(false)}
                  >
                    <FaStar className="icon" />
                  </Button>
                ) : (
                  <Button
                    Btn
                    _className="like-btn"
                    _onClick={() => setLike(true)}
                  >
                    <FiStar className="icon" />
                  </Button>
                )}
              </>
            )}
          </Grid>
          {/* 상품 이미지 슬라이더 */}
          <ProductImg img={data.productImg} />
          {/* 컨텐츠 시작 */}
          <Title>
            <h2>{data.title}</h2>
          </Title>
          {/* 작성자 인포 */}
          <Grid
            is_flex
            flex_align="center"
            flex_justify="space-between"
            _className="user-info"
          >
            <Profile>
              <img
                src="https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/06/urbanbrush-20200615000825087215.jpg"
                alt="profile"
              />
            </Profile>
            <p className="name">{data.username}</p>
            <p className="time">{data.createdAt}</p>
          </Grid>
          <Content>{data.content}</Content>
          <Grid is_flex _className="tag chip">
            {data.tag.map((item, i) => {
              return (
                <>
                  <span key={i}>#{item}</span>
                </>
              );
            })}
          </Grid>
        </Grid>
      </DetailBox>
      <Nav />
    </>
  );
};

export default Detail;
const DetailBox = styled.div`
  .border {
    height: 100vh;
    border-right: 1px solid var(--border-color);
    border-left: 1px solid var(--border-color);
  }
  .like-btn,
  .dislike-btn {
    border: 0;
    outline: 0;
    background-color: transparent;
    width: 40px;
    color: var(--point-color);
    .icon {
      font-size: 22px;
    }
  }

  .user-info {
    .name {
      width: 65%;
    }
    .time {
      color: var(--sub-font-color);
      font-size: 14px;
    }
  }

  .tag {
    span {
      padding: 5px 13px;
      background-color: var(--point-color);
      color: #fff;
      margin-right: 10px;
      font-size: 14px;
      border-radius: 15px;
    }
  }
`;

const Cate = styled.div`
  width: 90%;
  span {
    border: 2px solid var(--point-color);
    background-color: rgba(255, 138, 61, 0.4);
    font-size: 14px;
    padding: 5px 10px;
    border-radius: 15px;
  }
`;

const Profile = styled.div`
  margin-right: 10px;
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Title = styled.div`
  margin: 15px 0;
`;

const Content = styled.div`
  padding: 16px;
  height: 230px;
`;
