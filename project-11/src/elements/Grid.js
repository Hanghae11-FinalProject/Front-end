import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_container,
    children,
    is_flex,
    flex_align,
    flex_justify,
    padding,
    _className,
    margin,
    box_shadow,
    text_overflow,
    overFlow,
    _onClick,
    _width,
  } = props;
  const styles = {
    is_container,
    is_flex,
    flex_align,
    flex_justify,
    padding,
    className: _className,
    margin,
    box_shadow,
    text_overflow,
    overFlow,
    onClick: _onClick,
    _width,
  };
  return <GridBox {...styles}>{children}</GridBox>;
};

Grid.defaultProps = {
  is_container: false,
  is_flex: false,
  flex_align: false,
  flex_justify: false,
  padding: false,
  className: "",
  margin: false,
  box_shadow: false,
  text_overflow: false,
  overFlow: false,
  _width: false,
};
const GridBox = styled.div`
  ${(props) => props.padding && `padding:   ${props.padding};`}
  ${(props) => props.is_container && `max-width: 428px; margin: 0 auto;`}
  ${(props) => props.is_flex && `display: flex;`}
  ${(props) => props.flex_align && `align-items: ${props.flex_align};`} 
  ${(props) => props.flex_justify && `justify-contents: ${props.flex_justify};`}
  ${(props) => props.margin && `margin: ${props.margin};`}
  ${(props) => props.box_shadow && `box-shadow: ${props.box_shadow};`}
  ${(props) => props.overFlow && `overflow: ${props.overFlow};`}
  ${(props) => props.text_overflow && `text-overflow : ${props.text_overflow}`}
  ${(props) => props.width && `width : ${props.width}`}
`;

export default Grid;
