import React from "react";
import styled from "styled-components";

const MyChat = (props) => {
  return (
    <React.Fragment>
      <MyChatBox>{props.data.message}</MyChatBox>
    </React.Fragment>
  );
};

const MyChatBox = styled.div`
  width: 300px;
  height: 100px;
  background-color: yellow;
`;
export default MyChat;
