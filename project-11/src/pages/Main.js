import React, { useState } from "react";
import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie";
import { Grid } from "../elements/index";
import PostList from "../components/PostList";
import Nav from "../shared/Nav";

// 카테고리 carousel
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import { ImSpoonKnife } from "react-icons/im";
import { MdMenuBook } from "react-icons/md";
import { FaCouch, FaMapMarkerAlt } from "react-icons/fa";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { RiCupFill } from "react-icons/ri";
import { IoExtensionPuzzle, IoShirt } from "react-icons/io5";
import { BiSmile } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";

import styled from "styled-components";

SwiperCore.use([Pagination, Autoplay]);

const Main = () => {
  const token = getCookie("Token");

  //지역 카테고리 선택
  const [is_open, setIs_open] = useState(false);
  const [is_location, setIs_Location] = useState("위치 설정하기");
  const [is_cate, setIs_Cate] = useState("");
  const [selected, setSelected] = useState(false);

  //지역 옵션
  const locations = [
    { id: 1, locationName: "전체" },
    { id: 2, locationName: "동대문구" },
    { id: 3, locationName: "마포구" },
    { id: 4, locationName: "서대문구" },
    { id: 5, locationName: "성북구" },
  ];

  return (
    <>
      <Container>
        <Grid is_container _className="border">
          <Grid _className="background"></Grid>
          {token ? (
            <>
              <Header>
                <Grid
                  _className="inner"
                  is_container
                  is_flex
                  flex_align="center"
                >
                  <p>전체 글 보기</p>
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
                  <p>전체 글 보기</p>
                  <button onClick={() => history.push("/")}>로그인</button>
                </Grid>
              </Header>
            </>
          )}
          <div className="scroll-from-cate">
            <Category>
              <Slider>
                <Swiper
                  className="CateBtn-Container"
                  spaceBetween={10}
                  slidesPerView={4.3}
                  pagination={{ clickable: true }}
                  // autoplay={{ delay: 50000 }}
                >
                  <SwiperSlide>
                    <CateBtn
                      onClick={() => {
                        is_cate === "식품"
                          ? setIs_Cate("")
                          : setIs_Cate("식품");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={
                          is_cate === "식품" ? "default active" : "default"
                        }
                      >
                        <ImSpoonKnife className="icon" />
                        <p>식품</p>
                      </Grid>
                    </CateBtn>
                  </SwiperSlide>
                  <SwiperSlide>
                    <CateBtn
                      onClick={() => {
                        is_cate === "도서"
                          ? setIs_Cate("")
                          : setIs_Cate("도서");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={is_cate === "도서" ? "active" : "default"}
                      >
                        <MdMenuBook className="icon" />
                        <p>도서</p>
                      </Grid>
                    </CateBtn>
                  </SwiperSlide>
                  <SwiperSlide>
                    <CateBtn
                      onClick={() => {
                        is_cate === "의류"
                          ? setIs_Cate("")
                          : setIs_Cate("의류");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={is_cate === "의류" ? "active" : "default"}
                      >
                        <IoShirt className="icon" size={28} />
                        <p>의류</p>
                      </Grid>
                    </CateBtn>
                  </SwiperSlide>

                  <SwiperSlide>
                    <CateBtn
                      onClick={() => {
                        is_cate === "가구"
                          ? setIs_Cate("")
                          : setIs_Cate("가구");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={is_cate === "가구" ? "active" : "default"}
                      >
                        <FaCouch className="icon" />
                        <p>가구</p>
                      </Grid>
                    </CateBtn>
                  </SwiperSlide>
                  <SwiperSlide>
                    <CateBtn
                      onClick={() => {
                        is_cate === "가전"
                          ? setIs_Cate("")
                          : setIs_Cate("가전");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={is_cate === "가전" ? "active" : "default"}
                      >
                        <CgSmartHomeRefrigerator className="icon" />
                        <p>가전</p>
                      </Grid>
                    </CateBtn>
                  </SwiperSlide>
                  <SwiperSlide>
                    <CateBtn
                      onClick={() => {
                        is_cate === "생활"
                          ? setIs_Cate("")
                          : setIs_Cate("생활");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={is_cate === "생활" ? "active" : "default"}
                      >
                        <RiCupFill className="icon" />
                        <p>생활</p>
                      </Grid>
                    </CateBtn>
                  </SwiperSlide>
                  <SwiperSlide>
                    <CateBtn
                      onClick={() => {
                        is_cate === "취미"
                          ? setIs_Cate("")
                          : setIs_Cate("취미");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={is_cate === "취미" ? "active" : "default"}
                      >
                        <IoExtensionPuzzle className="icon" />
                        <p>취미</p>
                      </Grid>
                    </CateBtn>
                  </SwiperSlide>
                  <SwiperSlide>
                    <CateBtn
                      onClick={() => {
                        is_cate === "재능교환"
                          ? setIs_Cate("")
                          : setIs_Cate("재능교환");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={
                          is_cate === "재능교환" ? "active" : "default"
                        }
                      >
                        <BiSmile className="icon" />
                        <p>재능교환</p>
                      </Grid>
                    </CateBtn>
                  </SwiperSlide>
                  <SwiperSlide>
                    <CateBtn
                      onClick={() => {
                        is_cate === "기타"
                          ? setIs_Cate("")
                          : setIs_Cate("기타");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={is_cate === "기타" ? "active" : "default"}
                      >
                        <BsThreeDots className="icon" />
                        <p>기타</p>
                      </Grid>
                    </CateBtn>
                  </SwiperSlide>
                </Swiper>
              </Slider>
            </Category>
            {/* 지역 설정 */}
            <LocationBox>
              <Grid
                is_flex
                flex_align="center"
                _onClick={() => setIs_open(true)}
                _className={
                  is_location === "위치 설정하기" ? "default" : "active"
                }
              >
                <FaMapMarkerAlt className="icon" />
                <Grid is_flex flex_align="center">
                  {is_location}
                </Grid>
              </Grid>
              {is_open && (
                <>
                  <Grid _className="location-option">
                    {locations.map((loc, i) => {
                      return (
                        <p
                          key={loc.id}
                          onClick={() => {
                            setIs_Location(loc.locationName);
                            setIs_open(false);
                            setSelected(true);
                          }}
                        >
                          {loc.locationName}
                        </p>
                      );
                    })}
                  </Grid>
                </>
              )}
            </LocationBox>

            {/* 상품 리스트 */}
            <PostList
              location={is_location}
              category={is_cate}
              selected={selected}
            />
          </div>
          {/* 메뉴 */}
          <Nav home={"home"} />
        </Grid>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 0 auto;

  .border {
    background: #fff;
    padding-top: 50px;

    .background {
      width: 100%;
      max-width: 429px;
      height: 100vh;
      background-color: #fff;

      position: fixed;
      top: 0;
      z-index: -10;
    }
  }
`;

const Header = styled.div`
  width: 100%;
  max-width: 426px;
  height: 50px;
  position: fixed;
  top: 0;
  background-color: #fff;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1);
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
  .logout-inner {
    height: 50px;
    line-height: 50px;
    p {
      width: 100%;
      position: absolute;
      left: 0;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
    button {
      margin-left: 85%;
      border: 0;
      color: var(--main-color);
      outline: none;
      background-color: transparent;
      font-size: 16px;
      cursor: pointer;
      z-index: 9;
    }
  }
`;

const Slider = styled.div`
  height: 80px;
  margin: 15px 0px;
  display: flex;

  .CateBtn-Container {
    padding-right: 12px;
  }
  .swiper-slide:nth-child(1) {
    margin-left: 12px;
  }

  .CateBtn-Container {
    padding-right: 10px;
  }

  .swiper-pagination.swiper-pagination-clickable {
    display: none;
  }
  .swiper-pagination-bullet-active {
    background-color: var(--main-color) !important;
    width: 16px !important;
    border-radius: 4px !important;
  }
`;

const Category = styled.div``;
const CateBtn = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  .default {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid var(--disabled-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .icon {
      font-size: 32px;
      color: var(--inactive-text-color);
    }
    p {
      font-size: 12px;
      margin-top: 5px;
      color: var(--inactive-text-color);
    }
  }
  .active {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid var(--disabled-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    background-color: var(--main-color);
    animation: 0.6s ease-in-out loadEffect3;
    .icon {
      color: #fff;
      font-size: 32px;
    }
    p {
      font-size: 12px;
      margin-top: 5px;
      color: #fff;
    }
  }
  @keyframes loadEffect3 {
    0% {
      opacity: 0;
      transform: scale(0.7);
    }
    65% {
      opacity: 0.65;
      transform: scale(1.01);
    }
    85% {
      opacity: 0.85;
      transform: scale(0.97);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .inactive {
    .icon {
      color: var(--help-color);
      font-size: 32px;
    }
    p {
      font-size: 12px;
      margin-top: 5px;
      color: var(--help-color);
    }
  }
`;

const LocationBox = styled.div`
  position: relative;
  color: var(--inactive-text-color);
  padding: 0px 16px 16px 16px;
  cursor: pointer;
  .icon {
    margin-right: 5px;
  }
  .active {
    color: var(--main-color);
    animation: 0.6s ease-in-out loadEffect3;
  }
  @keyframes loadEffect3 {
    0% {
      opacity: 0;
      transform: scale(0.7);
    }
    65% {
      opacity: 0.65;
      transform: scale(1.01);
    }
    85% {
      opacity: 0.85;
      transform: scale(0.97);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .location-option {
    width: 140px;
    position: absolute;
    top: 45px;
    left: 25px;
    color: var(--active-color);
    background-color: #ffffff;
    border: 1px solid var(--disabled-color);
    border-radius: 6px;
    z-index: 15;
    cursor: pointer;
    p {
      padding: 10px 10px;
      &:hover {
        background-color: var(--main-light-color);
      }
    }
  }
`;
export default Main;
