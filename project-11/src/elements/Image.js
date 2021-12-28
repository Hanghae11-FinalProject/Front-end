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
  src: "https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/06/urbanbrush-20200615000825087215.jpg",
  size: 50,
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
