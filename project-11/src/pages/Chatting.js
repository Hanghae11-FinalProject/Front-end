import React, { useState } from "react";
import Permit from "../shared/Permit";
import ChattingItem from "../components/ChattingItem";
import Nav from "../shared/Nav";
import { Grid } from "../elements";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { history } from "../redux/configureStore";

import styled from "styled-components";
import { BiDotsVerticalRounded } from "react-icons/bi";

import { axiosInstance } from "../shared/api";
import { getCookie } from "../shared/Cookie";

const Chatting = () => {
  let sockjs = new SockJS("https://whereshallwemeet.shop/webSocket");
  let stompClient = Stomp.over(sockjs);
  const myUserId = getCookie("Id");
  const token = getCookie("Token");
  const [is_open, setIs_open] = useState(false);
  const [rooms, setRooms] = useState([]); // 전체
  const [ingRooms, setIngRooms] = useState([]); // 거래중
  const [completeRooms, setCompleteRooms] = useState([]); // 거래완료
  const [is_every, setIs_Every] = useState(true); // 전체 클릭 감지
  const [is_ing, setIs_Ing] = useState(false); // 거래중 클릭 감지
  const [is_complete, setIs_Complete] = useState(false); // 거래완료 클릭 감지
  const [optionOne, setOptionOne] = useState(false);
  const [optionTwo, setOptionTwo] = useState(false);
  const [optionThree, setOptionThree] = useState(false);
  const [newMsgData, setNewMsgData] = useState("");
  const [test, setTest] = useState(true);
  const [stomp, setStomp] = useState();

  const testOne = () => {
    setTest(false);
  };

  React.useEffect(() => {
    setTest(true);
  }, [test]);

  React.useEffect(() => {
    let data = rooms;
    for (let i = 0; i < data.length; i++) {
      if (data[i].roomName === newMsgData.roomName) {
        data[i].notReadingMessageCount = data[i].notReadingMessageCount + 1;
        data[i].lastMessage.content = newMsgData.message;
        data[i].lastMessage.createdAt = newMsgData.createdAt;
      }
    }
    // console.log(newMsgData);
    setRooms(data); // 여기서 거래중 거래완료 따로 저장 안하면? 일단은 문제 없는듯??
  }, [newMsgData]); // 혹시라도 채팅방 들어갈때 문제생기면 여기부터 체크하기
  // console.log(rooms);
  React.useEffect(() => {
    axiosInstance
      .get(`/api/room`, { headers: { Authorization: token } })
      .then((res) => {
        console.log(res);
        setRooms(res.data);
        let ing = [];
        let com = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].currentState === "Proceeding") {
            ing = [...ing, res.data[i]];
            setIngRooms(ing);
          } else if (res.data[i].currentState === "Complete") {
            com = [...com, res.data[i]];
            setCompleteRooms(com);
          }
        }
      })
      .catch((err) => {
        console.log(err, "에러");
      });
    stompClient.connect({}, () => {
      stompClient.send("/pub/join", {}, JSON.stringify(`${myUserId}`));
      setStomp(
        stompClient.subscribe(`/sub/${myUserId}`, (data) => {
          const onMessage = JSON.parse(data.body);
          setNewMsgData(onMessage);
          // console.log(onMessage);
          axiosInstance
            .post(
              `/api/roomcount`,
              { roomName: onMessage.roomName, userId: myUserId },
              { headers: { Authorization: token } }
            )
            .then((res) => {
              console.log(res, "성공");
            })
            .catch((err) => {
              console.log(err, "에러");
            });
        })
      );
    });
  }, []);

  const OptionOneControl = () => {
    setOptionTwo(false);
    setOptionThree(false);
    if (optionOne) {
      setOptionOne(false);
    } else {
      setOptionOne(true);
    }
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
    <Permit>
      <ChattingWrap>
        <Grid is_container="is_container" _className="grid-border background">
          <div className="chatting-wrap">
            <div className="chatting-header">
              <div className="chatting-header-wrap">
                <p className="header-title">채팅</p>
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
                    <p
                      className={optionOne ? "active" : "unactive"}
                      onClick={() => {
                        OptionOneControl();
                        ModalControl();
                        setIs_Every(true);
                        setIs_Ing(false);
                        setIs_Complete(false);
                      }}
                    >
                      전체
                    </p>

                    <p
                      className={optionTwo ? "active" : "unactive"}
                      onClick={() => {
                        ModalControl();
                        OptionTwoControl();
                        setIs_Every(false);
                        setIs_Ing(true);
                        setIs_Complete(false);
                      }}
                    >
                      거래중
                    </p>

                    <p
                      className={optionThree ? "active" : "unactive"}
                      onClick={() => {
                        ModalControl();
                        OptionThreeControl();
                        setIs_Every(false);
                        setIs_Ing(false);
                        setIs_Complete(true);
                      }}
                    >
                      거래완료
                    </p>
                  </Grid>
                </>
              )}
            </div>
            <div className="chat-item">
              {is_every &&
                rooms.map((p, idx) => {
                  return (
                    <ChattingItem
                      testOne={testOne}
                      stompClient={stompClient}
                      stomp={stomp}
                      roomData={p}
                      key={idx}
                    />
                  );
                })}
              {is_ing &&
                ingRooms.map((p, idx) => {
                  return (
                    <ChattingItem
                      testOne={testOne}
                      stompClient={stompClient}
                      stomp={stomp}
                      roomData={p}
                      key={idx}
                    />
                  );
                })}
              {is_complete &&
                completeRooms.map((p, idx) => {
                  return (
                    <ChattingItem
                      testOne={testOne}
                      stompClient={stompClient}
                      stomp={stomp}
                      roomData={p}
                      key={idx}
                    />
                  );
                })}
            </div>
          </div>
          <Nav chatting={"chatting"} />
        </Grid>
      </ChattingWrap>
    </Permit>
  );
};

export default Chatting;

const ChattingWrap = styled.div`
  .grid-border {
    width: 100%;
    height: 120vh;
    background-color: white;
    position: relative;

    .chatting-wrap {
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
          /* position: relative; */

          .header-title {
            font-size: 20px;
            font-weight: bold;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .point-icon {
            cursor: pointer;
            position: absolute;
            left: 90%;
            top: 50%;
            transform: translate(0, -50%);
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
          top: 150%;
          left: 50%;
          transform: translate(-50%, 150%);
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
          cursor: pointer;
          .active {
            padding: 8px 8px;
            font-size: 16px;
            color: var(--main-color);
          }
          .unactive {
            padding: 8px 8px;
            font-size: 16px;
          }
        }
      }
    }
    .chat-item {
      margin-top: 50px;
    }
  }
`;
