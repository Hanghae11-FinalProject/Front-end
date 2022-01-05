import React, { useState } from "react";
import { Grid } from "../elements/index";
import styled from "styled-components";
import { FaLocationArrow } from "react-icons/fa";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getCookie } from "../shared/Cookie";
import MyChat from "../components/MyChat";
import NotMyChat from "../components/NotMyChat";

let sockjs = new SockJS("http://15.164.222.25:8080/webSocket");
let stompClient = Stomp.over(sockjs);
let List = [];

const Chat = (data) => {
  const myUserId = getCookie("Id");

  const [currentMes, setCurrentMes] = useState("");
  const [messageList, setMessageList] = useState([]);
  // console.log(myUserId);
  const roomName = data.location.state.roomName;
  const sender = data.location.state.sender;
  // console.log(sender.profileImg);

  React.useEffect(() => {
    stompClient.connect({}, () => {
      stompClient.send("/pub/join", {}, JSON.stringify("room1"));
      stompClient.subscribe(`/sub/${roomName}`, (data) => {
        // console.log(data);
        const onMessage = JSON.parse(data.body);
        setMessageList((messageList) => messageList.concat(onMessage));
        // console.log(messageList);
      });
    });
  }, []); // setSearches(searches => searches.concat(query))

  const sendMessage = () => {
    const box = {
      type: "Talk", //타입
      message: currentMes, //메세지
      roomName: roomName, //채팅방넘버
      senderId: myUserId, // 내 userId
    };
    stompClient.send("/pub/message", {}, JSON.stringify(box));
  };

  return (
    <>
      <Container>
        <Grid is_container _className="border">
          <Header>
            <Grid _className="inner" is_container is_flex flex_align="center">
              <p>Joo</p>
            </Grid>
          </Header>
          <ChatBox>
            {messageList.map((message, idx) => {
              console.log(message.senderId, parseInt(myUserId));
              if (parseInt(myUserId) === message.senderId) {
                console.log("dd");
                return <MyChat key={idx} data={message} />;
              } else {
                console.log("ss");
                return <NotMyChat key={idx} data={message} />;
              }
            })}

            <ChatInput>
              <Grid is_flex _className="input-inner">
                <input
                  type="text"
                  value={currentMes}
                  placeholder="hey.."
                  onChange={(e) => setCurrentMes(e.target.value)}
                  onKeyPress={(e) => {
                    e.key === "Enter" && sendMessage(e);
                  }}
                />
                <button className="chat-btn" onClick={sendMessage}>
                  <FaLocationArrow />
                </button>
              </Grid>
            </ChatInput>
          </ChatBox>
        </Grid>
      </Container>
    </>
  );
};

export default Chat;

const Container = styled.div`
  margin: 0 auto;
  .border {
    height: 100vh;
    padding-top: 70px;
    border: 1px solid var(--help-color);
  }
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid var(--help-color);
  background-color: #fff;
  z-index: 10;
  .inner {
    height: 50px;
    margin: 0 auto;

    p {
      width: 100%;
      position: absolute;
      left: 0;
      text-align: center;
      font-weight: bold;
    }
  }
`;

const ChatBox = styled.div`
  padding: 0 16px;

  .message {
    margin: 15px 0;
  }
  .profileimg {
    width: 40px;
    height: 40px;
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .chat-mes {
    padding: 8px 10px;
    border-radius: 12px;
    /* color: black; */
  }

  .chat-info {
    span {
      font-size: 14px;
      margin: 5px 5px;
    }
  }
  #you .chat-mes {
    background-color: var(--main-color);
    /* color: #fff; */
  }

  #me .chat-line {
    display: flex;

    justify-content: end;
  }

  #me .profileimg {
    order: 1;
  }
  #me .chat-mes {
    background-color: var(--help-color);
    color: var(--active-color);

    order: 2;
  }
`;

const ChatInput = styled.div`
  position: fixed;
  bottom: 15px;

  .input-inner {
    input {
      width: 350px;
      padding: 5px 10px;
    }

    button {
      width: 40px;
      height: 40px;
    }
  }
`;
