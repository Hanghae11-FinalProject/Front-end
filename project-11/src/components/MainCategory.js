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
  margin: 15px 0;
  display: flex;
  .swiper-pagination.swiper-pagination-clickable {
    display: none;
  }
  .swiper-pagination-bullet-active {
    background-color: var(--point-color) !important;
    width: 16px !important;
    border-radius: 4px !important;
  }
`;

const CateBtn = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 50px;
  background-color: var(--point-color);
`;

export default MainCategory;
