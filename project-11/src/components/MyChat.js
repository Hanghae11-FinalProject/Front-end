import React from "react";
import styled from "styled-components";

const MyChat = (props) => {
  return (
    <React.Fragment>
      <MyChatBox>
        <p className="messages">{props.data.message}</p>
      </MyChatBox>
    </React.Fragment>
  );
};

const MyChatBox = styled.div`
  display: flex;
  justify-content: end;
  margin: 12px 0px;
  .messages {
    display: inline-block;
    padding: 8px 12px;
    border-radius: 12px;
    text-align: left;
    line-height: 24px;
    background-color: var(--main-color);
    font-size: 14px;
    color: white;
    max-width: 278px;
    word-break: break-all;
  }
`;
export default MyChat;
