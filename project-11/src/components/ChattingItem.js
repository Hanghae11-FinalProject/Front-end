import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie";

const ChattingItem = (p) => {
  const stompClient = p.stompClient;
  const myUserId = getCookie("Id");
  React.useEffect(() => {
    p.testOne();
  }, [p]);
  const roomData = p.roomData; // Chat.js에 채팅카운트 넘겨주기 위한 props

  const goChat = () => {
    stompClient.unsubscribe(`/sub/${myUserId}`);
    history.push({
      pathname: `/chat`,
      state: {
        roomName: p.roomData.roomName,
        sender: p.roomData.user,
        postId: p.roomData.postId,
        roomData: roomData,
      },
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
          <p className="content">{p.roomData.lastMessage.content}</p>
        </div>
        <div
          className={
            p.roomData.notReadingMessageCount ? "chatting-cnt" : "cnt-zero"
          }
        >
          {p.roomData.notReadingMessageCount !== 0
            ? p.roomData.notReadingMessageCount
            : ""}
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
  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .chatting-item-wrap {
    display: flex;
    align-items: center;
    .profile-img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
      border-radius: 50%;
      /* background-color: black; */
      /* border: 1px solid gray; */
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
    .cnt-zero {
      background-color: #fff;
      width: 22px;
      height: 22px;
    }
  }
`;
