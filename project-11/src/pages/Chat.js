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
import Spinner2 from "../components/Spinner2";

let List = [];

const Chat = (data) => {
  const nickName = decodeURIComponent(getCookie("Name"));
  const token = getCookie("Token");
  const myUserId = getCookie("Id");

  const [stompClient, setStompClient] = useState();

  const [optionOne, setOptionOne] = useState(false);
  const [optionTwo, setOptionTwo] = useState(false);
  const [optionThree, setOptionThree] = useState(false);
  const [is_open, setIs_open] = useState(false);
  const [active, setActive] = useState(false);
  const [is_exit, setIs_exit] = useState(false);
  const [is_loading, setIs_Loading] = useState(false);

  const scrollRef = useRef();
  const [currentMes, setCurrentMes] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [items, setItems] = useState([]);

  const receiverId = data.location.state.sender.userId;
  // console.log(data);
  const roomName = data.location.state.roomName;
  const sender = data.location.state.sender;
  const nicknames = {
    senderName: data.location.state.sender.nickname,
    nickName: nickName,
  };
  // console.log(data.location);
  React.useEffect(() => {
    axios
      .post(
        `https://whereshallwemeet.shop/api/message`,
        {
          roomName: roomName,
          postId: data.location.state.postId,
          toUserId: receiverId,
          userId: myUserId,
        },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        // console.log(res.data, "성공");
        // console.log(x);
        setMessageList(res.data.message);
        setItems(res.data.post);
        setIs_Loading(true);
      })
      .catch((err) => {
        console.log(err);
      });
    let sockjs = new SockJS("https://whereshallwemeet.shop/webSocket");
    let stompClient = Stomp.over(sockjs);
    stompClient.connect({}, () => {
      stompClient.send("/pub/join", {}, JSON.stringify(`${roomName}`));

      stompClient.subscribe(`/sub/${roomName}`, (data) => {
        // console.log(JSON.parse(data.body).type);
        const onMessage = JSON.parse(data.body);
        setMessageList((messageList) => messageList.concat(onMessage));
        if (onMessage.type === "Exit") {
          setActive(true);
          setIs_exit(true);
        }
        // console.log(messageList);
      });
    });
    setStompClient(stompClient);
  }, []); // setSearches(searches => searches.concat(query))

  const sendMessage = () => {
    // console.log(receiverId);
    const box = {
      type: "Talk", //타입
      message: currentMes, //메세지
      roomName: roomName, //채팅방넘버
      senderId: myUserId, // 내 userId
      receiverId: receiverId, // 상대방 userId
    };
    if (currentMes === "") {
      return;
    } else if (active === true) {
      return; // 이렇게하면 그 다음에 다시 채팅방 들어오면 다시 채팅 가능할듯?(다시 한번 체크)
    }
    stompClient.send("/pub/message", {}, JSON.stringify(box));
    setCurrentMes("");
    // console.log(is_exit, active);
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
    history.replace("/chatting");
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
        <Grid is_container _className="border-background">
          {is_loading === false && <Spinner2 />}
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
              {items.myItem === "" && items.exchangeItem === "" ? (
                <p>이미 삭제된 게시물 입니다</p>
              ) : (
                <p>
                  {items.myItem} <CgArrowsHAlt size="12" />
                  {items.exchangeItem}
                </p>
              )}
            </div>
          </div>
          {/* </Header> */}

          <ChatBox ref={scrollRef}>
            <div className="inner-chat-box">
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
              {is_exit === true ? (
                <div className="exit-chat-box">
                  <span className="exit-chat">
                    {data.location.state.sender.nickname}님이 채팅방을
                    나갔습니다.
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
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
  .border-background {
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
    .item-bar {
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
  .inner-chat-box {
    margin-bottom: 52px;
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
  .exit-chat-box {
    display: flex;
    justify-content: center;
    margin-top: 5vh;
    .exit-chat {
      font-size: 14px;
      color: var(--main-color);
    }
  }
  .message {
    margin: 15px 0;
  }
`;

const ChatInput = styled.div`
  position: fixed;
  bottom: 50px;
  .input-inner {
    display: flex;
    align-items: center;
    background-color: black;
    justify-content: space-between;
    input {
      width: 305px;
      height: 40px;
      border: none;
      border-radius: 20px;
      padding: 5px 10px;
      background-color: #0000000d;
      @media screen and (max-width: 415px) {
        width: 293px;
      }
      @media screen and (max-width: 405px) {
        width: 280px;
      }
      @media screen and (max-width: 390px) {
        width: 266px;
      }
      @media screen and (max-width: 375px) {
        width: 250px;
      }
      @media screen and (max-width: 320px) {
        width: 200px;
      }
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
