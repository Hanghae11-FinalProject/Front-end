import React from "react";
import styled from "styled-components";

const NotMyChat = (props) => {
  return (
    <>
      <NotMineBox>
        <div className="imgBox">
          <img
            src={props.sender.profileImg}
            className="profileImg"
            alt="profileImg"
          ></img>
        </div>
        <p className="messages">{props.data.message}</p>
        <span className="createdAt">{props.data.createdAt}</span>
      </NotMineBox>
    </>
  );
};

const NotMineBox = styled.div`
  display: flex;
  justify-content: start;
  margin: 12px 0px;
  .imgBox {
    width: 43px;
    height: 43px;
    border-radius: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff1f1;
    .profileImg {
      width: 35px;
      height: 35px;
    }
  }

  .messages {
    display: inline-block;
    margin-left: 13px;
    padding: 8px 12px;
    border-radius: 12px;
    text-align: left;
    line-height: 24px;
    background-color: var(--help-color);
    font-size: 16px;
    color: black;
    max-width: 278px;
    word-break: break-all;
  }
  .createdAt {
    font-size: 12px;
    display: flex;
    align-items: flex-end;
    margin-left: 6px;
    color: var(--help-color);
  }
`;
export default NotMyChat;
