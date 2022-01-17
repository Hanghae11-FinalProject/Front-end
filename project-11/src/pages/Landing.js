import React from "react";
import { history } from "../redux/configureStore";
import { Grid } from "../elements/index";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay, Navigation } from "swiper";
import { KAKAO_AUTH_URL } from "../shared/OAuth";
import "swiper/css";
import "swiper/css/pagination";

SwiperCore.use([Pagination, Autoplay, Navigation]);

const Landing = () => {
  const swiperStyle = {
    position: "relative",
    width: "100%",
    height: "auto",
  };

  const ClickKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Intro>
      <Grid is_container _className="intro-box background">
        <div className="imgwrap">
          <img
            src="/static/landinglogo.png"
            alt=""
            style={{ height: "50px" }}
          />
        </div>
        <Swipercontainer>
          <SwiperCustom
            style={swiperStyle}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2200 }}
          >
            <SwiperSlide>
              <img
                src="/static/Landing1.gif"
                style={{ width: "100%", height: "auto" }}
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/static/Landing2.gif"
                style={{ width: "100%", height: "auto" }}
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/static/Landing3.gif"
                style={{ width: "100%", height: "auto" }}
                alt=""
              />
            </SwiperSlide>
          </SwiperCustom>
        </Swipercontainer>
        <div className="login-input-wrap">

          <button
            className="login-btn"
            onClick={() => {
              history.push("/login");
            }}
          >
            로그인하러가기
          </button>
          <div className="kakaobtn">
            <div className="kakaobubblewrap" onClick={ClickKakao}>
              <img
                className="kakaobubble"
                src="/static/kakaobubble.png"
                alt=""
              />
              <p className="kakaotext">카카오계정으로 로그인</p>
            </div>
            <div className="bottomtext">
              <span
                className="signupbtn"
                onClick={() => {
                  history.push("/signup");
                }}
              >
                회원가입
              </span>
              <span
                onClick={() => {
                  history.push("/main");
                }}
              >
                둘러보기
              </span>
            </div>
          </div>
        </div>
      </Grid>
    </Intro>
  );
};

export default Landing;

const Intro = styled.div`
  .swiper-pagination-bullet-active {
    background-color: var(--main-color);
    width: 16px;
    border-radius: 4px;
  }
  .intro-box {
    background-color: white;
    width: 100%;
    height: 100vh;
    position: relative;

    .imgwrap {
      display: flex;
      justify-content: center;
      padding: 55px 20px 40px 20px;
    }
    .login-input-wrap {
      display: flex;
      flex-direction: column;
      padding: 0 16px 50px 16px;
      background-color: white;
      .login-btn {
        background-color: var(--main-color);
        text-align: center;
        width: 100%;
        max-width: 397px;
        height: 48px;
        border-radius: 4px;
        color: white;
        margin-top: 20px;
        border: 0px;
        cursor: pointer;
      }
      .kakaobtn {
        display: flex;
        text-align: center;
        flex-direction: column;
        cursor: pointer;
        .kakaobubblewrap {
          width: 100%;
          height: 48px;
          background-color: #fee500;
          border-radius: 4px;
          display: flex;
          align-items: center;
          position: relative;
          margin-top: 12px;
          .kakaobubble {
            width: 20px;
            height: 20px;
            margin-left: 16px;
          }
          .kakaotext {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            color: #41231f;
            font-size: 14px;
            font-weight: 600;
          }
        }
        .bottomtext {
          display: flex;
          max-width: 429px;
          margin: 0 auto;
          margin-top: 20px;
          span {
            padding: 0px 25px;
            color: var(--help-color);
          }
          span:nth-child(1) {
            border-right: 1px solid var(--help-color);
            cursor: pointer;
          }
          span:nth-child(2) {
            cursor: pointer;
          }
        }
      }
    }
  }
`;

const Swipercontainer = styled.div`
  width: calc(100% - 32px);
  max-height: 650px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 4px;
`;

const SwiperCustom = styled(Swiper)`
  &.swiper {
    /* margin-top:-20px; */
  }
  .swiper-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-bullets .swiper-pagination-horizontal,
  .swiper-pagination-custom,
  .swiper-pagination-fraction {
    bottom: 10px;
  }
`;
