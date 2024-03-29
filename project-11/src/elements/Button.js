import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    _onClick,
    fontSize,
    width,
    minHeight,
    padding,
    border,
    borderRadius,
    color,
    backGround,
    children,
    display,
    Btn,
    _className,
  } = props;

  const styles = {
    className: _className,
    fontSize: fontSize,
    width: width,
    minHeight: minHeight,
    padding: padding,
    border: border,
    borderRadius: borderRadius,
    color: color,
    backGround: backGround,
    display: display,
  };

  if (Btn) {
    return (
      <>
        <BTN type="button" {...styles} onClick={_onClick}>
          {children}
        </BTN>
      </>
    );
  }

  return (
    <React.Fragment>
      <DefaultBtn {...styles} onClick={_onClick}>
        {children}
      </DefaultBtn>
    </React.Fragment>
  );
};

Button.defaultProps = {
  children: null,
  fontSize: "16px",
  width: "100%",
  minHeight: "auto",
  padding: "10px 10px",
  border: "1px solid #ffffff",
  borderRadius: "40px",
  _onClick: () => {},
  Btn: false,
};

const DefaultBtn = styled.button`
  width: 150px;
  height: 50px;
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  color: ${(props) => props.color};
  display: ${(props) => props.display};
  background-color: ${(props) => props.backGround};
  box-sizing: boder-box;
  margin: 8px auto;
  /* text-align: center !important; */
  line-height: 24px;
  cursor: pointer;
  flex-grow: 1;
  &:hover {
    background-color: #ebebeb;
  }
`;

const BTN = styled.button`
  cursor: pointer;
  width: 120px;
  height: 40px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.6;
  }
`;

export default Button;
