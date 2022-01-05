import React from "react";
import styled from "styled-components";

const NotMyChat = (props) => {
  return (
    <>
      <NotMineBox>
        <p className="messages">{props.data.message}</p>
      </NotMineBox>
    </>
  );
};

const NotMineBox = styled.div`
  display: flex;
  justify-content: start;
  margin: 12px 0px;
  .messages {
    display: inline-block;
    padding: 8px 12px;
    border-radius: 12px;
    text-align: left;
    line-height: 24px;
    background-color: var(--help-color);
    font-size: 14px;
    color: black;
    max-width: 278px;
    word-break: break-all;
  }
`;
export default NotMyChat;
