import React, { useState, useRef, useCallback, useEffect } from "react";
import { Grid } from "../elements/index";
import styled from "styled-components";
import { IoPaperPlane } from "react-icons/io5";
import { BsPlusLg } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { CgArrowsHAlt } from "react-icons/cg";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getCookie } from "../shared/Cookie";
import MyChat from "../components/MyChat";
import NotMyChat from "../components/NotMyChat";
import axios from "axios";
import { history } from "../redux/configureStore";
import Nav from "../shared/Nav";

let List = [];

const Chat = (data) => {
  const nickName = getCookie("Name");
  const token = getCookie("Token");
  let sockjs = new SockJS("http://52.78.32.4:8080/webSocket");
  let stompClient = Stomp.over(sockjs);

  const [optionOne, setOptionOne] = useState(false);
  const [optionTwo, setOptionTwo] = useState(false);
  const [optionThree, setOptionThree] = useState(false);
  const [is_open, setIs_open] = useState(false);

  const scrollRef = useRef();
  const myUserId = getCookie("Id");
  const [currentMes, setCurrentMes] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [items, setItems] = useState([]);

  const receiverId = data.location.state.sender.userId;
  const roomName = data.location.state.roomName;
  const sender = data.location.state.sender;
  const nicknames = {
    senderName: data.location.state.sender.nickname,
    nickName: nickName,
  };

  React.useEffect(() => {
    axios
      .post(
        `http://52.78.32.4/api/message`,
        {
          roomName: roomName,
          postId: data.location.state.postId,
          toUserId: receiverId,
          userId: myUserId,
        },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        setMessageList(res.data.message);
        setItems(res.data.post);
        console.log(res.data, "성공");
      })
      .catch((err) => {
        console.log(err);
      });
    stompClient.connect({}, () => {
      stompClient.send("/pub/join", {}, JSON.stringify(`${roomName}`));

      stompClient.subscribe(`/sub/${roomName}`, (data) => {
        console.log(data);
        const onMessage = JSON.parse(data.body);
        setMessageList((messageList) => messageList.concat(onMessage));
        console.log(messageList);
      });
    });
  }, []); // setSearches(searches => searches.concat(query))

  const sendMessage = () => {
    console.log(receiverId);
    const box = {
      type: "Talk", //타입
      message: currentMes, //메세지
      roomName: roomName, //채팅방넘버
      senderId: myUserId, // 내 userId
      receiverId: receiverId, // 상대방 userId
    };
    stompClient.send("/pub/message", {}, JSON.stringify(box));
    setCurrentMes("");
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const roomOut = () => {
    const box = {
      type: "Exit", //타입
      message: "", //메세지
      roomName: roomName, //채팅방넘버
      senderId: myUserId, // 내 userId
      receiverId: receiverId, // 상대방 userId
    };
    stompClient.send("/pub/message", {}, JSON.stringify(box));
    setCurrentMes("");
    history.push("/chatting");
  };

  const OptionTwoControl = () => {
    setOptionOne(false);
    setOptionThree(false);
    if (optionTwo) {
      setOptionTwo(false);
    } else {
      setOptionTwo(true);
    }
  };

  const OptionThreeControl = () => {
    setOptionTwo(false);
    setOptionOne(false);
    if (optionThree) {
      setOptionThree(false);
    } else {
      setOptionThree(true);
    }
  };

  const ModalControl = () => {
    if (is_open) {
      setIs_open(false);
      document.body.style.cssText = `
      position: none; 
      overflow-y: none;
      width: 100%;
      `;
    } else {
      setIs_open(true);
      document.body.style.cssText = `
      position: fixed; 
      overflow-y: scroll;
      width: 100%;
      `;
    }
  };

  return (
    <>
      <Container>
        <Grid is_container _className="border">
          <div className="chatting-wrap">
            <div className="chatting-header">
              <div className="chatting-header-wrap">
                <div className="arrow-back">
                  <IoIosArrowBack
                    size="30"
                    onClick={() => {
                      history.goBack();
                    }}
                  />
                </div>
                <p className="header-title">
                  {data.location.state.sender.nickname}
                </p>
                {/* <Grid _className="ct-wrap"> */}
                <BiDotsVerticalRounded
                  onClick={ModalControl}
                  style={{
                    width: "25px",
                    height: "25px",
                  }}
                  className="point-icon"
                />
                {/* </Grid> */}
              </div>
              {is_open && (
                <>
                  <div className="modal-back"></div>
                  <Grid _className="drop-chat">
                    <p className="unactive" onClick={roomOut}>
                      채팅방 나가기
                    </p>

                    <p
                      className="unactive"
                      onClick={() => {
                        ModalControl();
                        OptionTwoControl();
                      }}
                    >
                      신고하기
                    </p>

                    <p
                      className="unactive"
                      onClick={() => {
                        ModalControl();
                        OptionThreeControl();
                      }}
                    >
                      차단하기
                    </p>
                  </Grid>
                </>
              )}
            </div>
            <div className="item-bar">
              <p>
                {items.myItem ? items.myItem : ""} <CgArrowsHAlt size="12" />{" "}
                {items.exchangeItem ? items.exchangeItem : ""}
              </p>
            </div>
          </div>
          {/* </Header> */}
          <ChatBox ref={scrollRef}>
            {messageList.length === 0 ? (
              <div className="enter-chat-box">
                <span className="enter-chat">
                  {data.location.state.sender.nickname}님과 {nickName}님이
                  채팅을 시작하였습니다.
                </span>
              </div>
            ) : (
              ""
            )}
            {messageList.map((message, idx) => {
              if (parseInt(myUserId) === message.senderId) {
                return (
                  <MyChat key={idx} nicknames={nicknames} data={message} />
                );
              } else {
                return (
                  <NotMyChat
                    key={idx}
                    nicknames={nicknames}
                    data={message}
                    sender={sender}
                  />
                );
              }
            })}

            <ChatInput>
              <Grid is_flex _className="input-inner">
                <BsPlusLg className="plus-icon-active" />
                <input
                  type="text"
                  value={currentMes}
                  placeholder="메세지를 입력하세요."
                  onChange={(e) => setCurrentMes(e.target.value)}
                  onKeyPress={(e) => {
                    e.key === "Enter" && sendMessage(e);
                  }}
                />
                <IoPaperPlane
                  className="send-chat-icon"
                  size="34"
                  onClick={sendMessage}
                />
              </Grid>
            </ChatInput>
          </ChatBox>
          <Nav />
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
    background-color: white;
  }
  .chatting-wrap {
    margin-top: -20px;
      .chatting-header {
        width: 100%;
        max-width: 428px;
        height: 50px;
        background-color: white;
        box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1);
        position: fixed;
        top: 0;
        z-index: 10;

        .chatting-header-wrap {
          height: 50px;
          max-width: 429px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .header-title {
            font-size: 20px;
            font-weight: bold;
          }
          .point-icon {
            cursor: pointer;
          }
          .arrow-back {
            width: 30px;
            height: 50px;
            display: flex;
            align-items: center;
            cursor: pointer;
          }
        }

        .modal-back {
          position: absolute;
          top: 50px;
          left: 0;
          width: 100%;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.25);
        }
        .drop-chat {
          height: 165px;
          width: 260px;
          border-radius: 12px;
          background-color: white;
          position: absolute;
          top: 300%;
          left: 50%;
          transform: translate(-50%, 110%);
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
          cursor: pointer;
          .unactive {
            padding: 8px 8px;
            font-size: 16px;
          }
        }
      }
      .item-bar{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        background-color: #00000005;
        padding: 4px;
      }
    }
    .chat-item {
      margin-top: 50px;
    }
  
`;

const ChatBox = styled.div`
  padding: 0 16px;
  max-height: 81vh;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  .enter-chat-box {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    .enter-chat {
      font-size: 14px;
      color: var(--main-color);
    }
  }
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
  bottom: 57px;

  .input-inner {
    display: flex;
    align-items: center;
    input {
      width: 305px;
      height: 40px;
      border: none;
      border-radius: 20px;
      padding: 5px 10px;
      background-color: #0000000d;
    }
    .plus-icon-active {
      padding: 8px 0;
      margin: 0 16px 0 0;
      font-weight: bold;
      width: 34px;
      height: 34px;
      color: #fff;
      border-radius: 36px;
      cursor: pointer;
      background-color: var(--main-color);
    }
    .send-chat-icon {
      margin: 0 0 4px 8px;
      color: var(--main-color);
      cursor: pointer;
    }
  }
`;
