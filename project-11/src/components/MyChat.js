import React from "react";
import styled from "styled-components";

const MyChat = (props) => {
  return (
    <React.Fragment>
      <MyChatBox>
        <span className="createdAt">{props.data.createdAt}</span>
        <p className="messages">{props.data.message}</p>
      </MyChatBox>
    </React.Fragment>
  );
};

const MyChatBox = styled.div`
  display: flex;
  justify-content: right;
  margin: 12px 0px;

  .out-chat-box {
    display: flex;
    justify-content: center;
    margin-top: 30px;

    .out-chat {
      font-size: 14px;
      color: var(--main-color);
    }
  }
  .messages {
    display: inline-block;
    padding: 8px 12px;
    border-radius: 12px;
    text-align: left;
    line-height: 24px;
    background-color: var(--main-color);
    font-size: 16px;
    color: white;
    max-width: 278px;
    word-break: break-all;
  }
  .createdAt {
    font-size: 12px;
    display: flex;
    align-items: flex-end;
    margin-right: 6px;
    color: var(--help-color);
  }
`;
export default MyChat;
