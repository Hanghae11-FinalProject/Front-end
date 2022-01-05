import React from "react";
import styled from "styled-components";

const NotMyChat = (props) => {
  return (
    <>
      <NotMineBox>{props.data.message}</NotMineBox>
    </>
  );
};

const NotMineBox = styled.div`
  width: 300px !important;
  height: 100px !important;
  color: black !important;
  background-color: green;
`;
export default NotMyChat;
