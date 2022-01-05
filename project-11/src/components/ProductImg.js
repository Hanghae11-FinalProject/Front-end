import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import styled from "styled-components";

// install Swiper modules
SwiperCore.use([FreeMode, Pagination]);

const ProductImg = ({ img }) => {
  return (
    <ProductImgBox>
      <Swiper
        slidesPerView={2.5}
        spaceBetween={10}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {img.map((url, i) => {
          return (
            <SwiperSlide key={url.id}>
              <img src={url.imageUrl} alt="product" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </ProductImgBox>
  );
};

export default ProductImg;

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
