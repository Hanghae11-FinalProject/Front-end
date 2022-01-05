import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

const ChattingItem = (p) => {
  const data = p;
  console.log(data);

  const goChat = () => {
    history.push({
      pathname: `/chat`,
      state: { roomName: data.roomData.roomName, sender: data.roomData.user },
    });
  };
  return (
    <ChattingWrap>
      <div className="chatting-item-wrap" onClick={goChat}>
        <div className="profile-img">
          <img src={p.roomData.user.profileImg} alt="room img" />
        </div>
        <div className="chat-info">
          <div className="nickname-time-wrap">
            <h1 className="nickname">{p.roomData.user.nickname}</h1>
            <span>{p.roomData.lastMessage.createdAt}</span>
          </div>
          <p>{p.roomData.lastMessage.content}</p>
        </div>
        <div className="chatting-cnt">
          {p.roomData.lastMessage.notReadingMessageCount}
        </div>
      </div>
    </ChattingWrap>
  );

};

export default ChattingItem;


const ChattingWrap = styled.div`
  padding: 20px;
  max-width: 428px;
  border-bottom: 3px solid #ededed;
  cursor: pointer;
  .chatting-item-wrap {
    display: flex;
    align-items: center;
    .profile-img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
      border-radius: 50%;
      background-color: black;
      border: 1px solid gray;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .chat-info {
      width: 76%;
      .nickname-time-wrap {
        display: flex;
        .nickname {
          font-size: 17px;
          margin-right: 10px;
        }
        span {
          font-size: 12px;
          margin-top: 4px;
        }
      }
      p {
        font-size: 15px;
      }
    }
    .chatting-cnt {
      background-color: #ff626f;
      width: 22px;
      height: 22px;
      color: white;
      font-size: 12px;
      font-weight: bold;
      line-height: 22px;
      border-radius: 50%;
      text-align: center;
    }
  }
`;
