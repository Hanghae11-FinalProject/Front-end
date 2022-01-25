import React from "react";
import styled from "styled-components";

const MyChat = (props) => {
  return (
    <React.Fragment>
      <MyChatBox>
        <div></div>
        <div className="chat-box">
          <span className="createdAt">{props.data.createdAt}</span>
          <p className="messages">{props.data.message}</p>
        </div>
      </MyChatBox>
    </React.Fragment>
  );
};

const MyChatBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 12px 0px;

  .chat-box {
    display: flex;
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
