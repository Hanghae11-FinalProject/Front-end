import React from "react";
import { history } from "../redux/configureStore";
import { Grid } from "../elements/index";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay, Navigation } from "swiper";
import Login from "./Login";

import "swiper/css";
import "swiper/css/pagination";

SwiperCore.use([Pagination, Autoplay, Navigation]);

const Landing = () => {
  const swiperStyle = {
    position: "relative",
    width: "429px",
    height: "100vh",
  };

  return (
    <Intro>
      <Grid is_container _className="intro-box">
        <div
          className="title-wrap"
          onClick={() => {
            history.push("/login");
          }}
        >
          <p>SKIP</p>
        </div>
        <Swiper
          style={swiperStyle}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2200 }}
        >
          <SwiperSlide>
            <img
              src="/static/Landing1.gif"
              style={{ width: "429px", height: "100vh" }}
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/static/Landing2.gif"
              style={{ width: "429px", height: "100vh" }}
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/static/Landing3.gif"
              style={{ width: "429px", height: "100vh" }}
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </Grid>
    </Intro>
  );
};

export default Landing;

const Intro = styled.div`
  .swiper-pagination-bullet-active {
    background-color: var(--main-color) !important;
    width: 16px !important;
    border-radius: 4px !important;
  }
  .intro-box {
    background-color: white;
    width: 100%;
    height: 100vh;
    position: relative;
    .title-wrap {
      display: flex;
      text-align: center;
      justify-content: center;
      width: 70px;
      height: 29px;
      border: 1px solid black;
      /* background-color:rgba(255, 255, 255, 0.5); */
      border-radius: 17px;
      position: absolute;
      top: 7%;
      left: 75%;
      z-index: 2;
      cursor: pointer;
    }
  }
`;
