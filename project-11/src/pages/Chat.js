import React, { useState, useRef, useEffect } from "react";
import { Grid } from "../elements/index";
import styled from "styled-components";
import { IoPaperPlane } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { CgArrowsHAlt } from "react-icons/cg";
import { getCookie } from "../shared/Cookie";
import MyChat from "../components/MyChat";
import NotMyChat from "../components/NotMyChat";
import axios from "axios";
import { history } from "../redux/configureStore";
import Nav from "../shared/Nav";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";

const Chat = (data) => {
  const stompClient = useSelector((state) => state.chat.stompClient); // 리덕스에서 선언한 client 객체
  const nickName = decodeURIComponent(getCookie("Name"));
  const token = getCookie("Token");
  const myUserId = getCookie("Id");
  const chat = "chat"; // 채팅방 들어왔는지 인식하기 위한 변수(Nav에 넘겨줄것)

  const messageCnt = data.location.state.roomData?.notReadingMessageCount;

  // 모달창 버튼 클릭시 모달창 닫아주기 위한 state
  const [optionTwo, setOptionTwo] = useState(false);
  const [optionThree, setOptionThree] = useState(false);
  const [is_open, setIs_open] = useState(false);

  const [active, setActive] = useState(false); // 인풋 액티브
  const [is_exit, setIs_exit] = useState(false); // 상대방 나갔는지 판단
  const [is_loading, setIs_Loading] = useState(false); // 스피너
  const scrollRef = useRef();
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

  useEffect(() => {
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
        setMessageList(res.data.message);
        setItems(res.data.post);
        setIs_Loading(true);
      })
      .catch((err) => {
        // console.log(err);
      });
    // 새 메시지가 올때마다 onMessage에 담겨서 온다
    stompClient.unsubscribe(`/sub/${myUserId}`);
    stompClient.send("/pub/join", {}, JSON.stringify(`${roomName}`));
    stompClient.subscribe(`/sub/${roomName}`, (data) => {
      const onMessage = JSON.parse(data.body);
      setMessageList((messageList) => messageList.concat(onMessage));
      if (onMessage.type === "Exit") {
        setActive(true);
        setIs_exit(true);
      }
    });
    return () => {
      stompClient.unsubscribe(`/sub/${roomName}`);
    };
  }, []);

  const sendMessage = () => {
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
      return;
    }
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
    history.replace("/chatting");
  };

  const OptionTwoControl = () => {
    setOptionThree(false);
    if (optionTwo) {
      setOptionTwo(false);
    } else {
      setOptionTwo(true);
    }
  };

  const OptionThreeControl = () => {
    setOptionTwo(false);
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
          {is_loading === false && <Spinner />}
          <div className="chatting-wrap">
            <div className="chatting-header">
              <div className="chatting-header-wrap">
                <div className="arrow-back">
                  <IoIosArrowBack
                    size="30"
                    style={{
                      marginLeft: "6px",
                    }}
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
                    marginRight: "12px",
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
              {items?.myItem === "" && items.exchangeItem === "" ? (
                <p>이미 삭제된 게시물 입니다</p>
              ) : (
                <p>
                  {items?.myItem} <CgArrowsHAlt size="12" />{" "}
                  {items?.exchangeItem}
                </p>
              )}
            </div>
          </div>
          {/* </Header> */}

          <ChatBox ref={scrollRef}>
            <div className="inner-chat-box">
              {messageList?.length === 0 ? (
                <div className="enter-chat-box">
                  <span className="enter-chat">
                    {data.location.state.sender.nickname}님과 {nickName}님이
                    채팅을 시작하였습니다.
                  </span>
                </div>
              ) : (
                ""
              )}
              {messageList?.map((message, idx) => {
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
                  size="30"
                  onClick={sendMessage}
                />
              </Grid>
            </ChatInput>
          </ChatBox>
          <Nav chat={chat} messageCnt={messageCnt} />
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
          margin-left: 12px;
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
          margin-left: 6px;
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
    margin-top: 12px;
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
  padding: 6px 16px;
  margin-left: -16px;
  background-color: white;
  .input-inner {
    display: flex;
    align-items: center;

    justify-content: space-between;

    input {
      width: 355px;
      height: 40px;
      border: none;
      border-radius: 4px;
      padding: 5px 10px;
      background-color: #0000000d;
      @media screen and (max-width: 415px) {
        width: 345px;
      }
      @media screen and (max-width: 405px) {
        width: 340px;
      }
      @media screen and (max-width: 390px) {
        width: 320px;
      }
      @media screen and (max-width: 375px) {
        width: 305px;
      }
      @media screen and (max-width: 320px) {
        width: 250px;
      }
    }
    .send-chat-icon {
      margin: 0 0 4px 8px;
      color: var(--main-color);
      cursor: pointer;
    }
  }
`;
