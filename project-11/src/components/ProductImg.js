import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import "swiper/css";

import styled from "styled-components";

//install Swiper modules
SwiperCore.use([Pagination]);

const ProductImg = (props) => {
  return (
    <ProductImgBox>
      <Swiper modueles={[Pagination]} pagination={true} className="mySwiper">
        {props.img.map((url, i) => {
          return (
            <SwiperSlide key={i}>
              <img src={url} alt="product" />
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
  .mySwiper {
    border-radius: 6px;
    img {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 6px;
    }
  }
`;
