import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./index";

const Input = (props) => {
  const { maxLength, placeholder, _onChange, _onKeyUp, type, value, onSubmit } =
    props;

  return (
    <React.Fragment>
      <ElInput
        maxLength={maxLength}
        type={type}
        placeholder={placeholder}
        onKeyUp={_onKeyUp}
        onChange={_onChange}
        value={value}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onSubmit(e);
          }
        }}
      />
      )
    </React.Fragment>
  );
};

Input.defaultProps = {};

const ElInput = styled.input`
  ${(props) => (props.height ? `height : ${props.height};` : "")}
`;

export default Input;
