import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { shape, src, size, cursor, _onClick, _className } = props;
  const styles = {
    src: src,
    size: size,
    cursor: cursor,
    onClick: _onClick,
    className: _className,
  };

  if (shape === "circle") {
    return <ImageCircle {...styles}></ImageCircle>;
  }
  return <Image {...styles}></Image>;
};

export default Image;

Image.defaultProps = {
  shape: "circle",
  src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc5sXof%2FbtrpQSjrN1i%2FK5lwGk9FVONRvTksAYvyJ1%2Fimg.png",
  size: 34,
  direction: "center",
  cursor: "pointer",
};

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  cursor: "pointer";
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 0.5em;
`;
