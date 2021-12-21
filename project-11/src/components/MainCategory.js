import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";

// style
import "swiper/css";
import "swiper/css/pagination";

SwiperCore.use([Pagination, Autoplay]);

const MainCategory = () => {
  return (
    <React.Fragment>
      <Slider>
        <Swiper
          className="CateBtn-Container"
          spaceBetween={15}
          slidesPerView={5}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
        >
          <SwiperSlide>
            <CateBtn />
          </SwiperSlide>
          <SwiperSlide>
            <CateBtn />
          </SwiperSlide>
          <SwiperSlide>
            <CateBtn />
          </SwiperSlide>
          <SwiperSlide>
            <CateBtn />
          </SwiperSlide>
          <SwiperSlide>
            <CateBtn />
          </SwiperSlide>
          <SwiperSlide>
            <CateBtn />
          </SwiperSlide>
          <SwiperSlide>
            <CateBtn />
          </SwiperSlide>
          <SwiperSlide>
            <CateBtn />
          </SwiperSlide>
          <SwiperSlide>
            <CateBtn />
          </SwiperSlide>
        </Swiper>
      </Slider>
    </React.Fragment>
  );
};

const Slider = styled.div`
  height: 80px;
  margin: 15px;
  margin-top: 40px;
  display: flex;
  .swiper-pagination-bullet-active {
    background-color: #ff8a3d !important;
  }
`;

const CateBtn = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: var(--point-color);
`;

export default MainCategory;
