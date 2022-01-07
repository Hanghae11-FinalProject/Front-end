import React, { useState } from "react";
import Permit from "../shared/Permit";
import ChattingItem from "../components/ChattingItem";
import Nav from "../shared/Nav";
import { Grid } from "../elements";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { BiDotsVerticalRounded } from "react-icons/bi";

import { axiosInstance } from "../shared/api";
import { getCookie } from "../shared/Cookie";
import axios from "axios";

const Chatting = () => {
  let sockjs = new SockJS("http://13.125.250.43:8080/webSocket");
  let stompClient = Stomp.over(sockjs);

  const myUserId = getCookie("Id");
  const token = getCookie("Token");
  const [is_open, setIs_open] = useState(false);
  const [rooms, setRooms] = useState([]);
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
    console.log(newMsgData);
    console.log(rooms);
    let data = rooms;
    for (let i = 0; i < data.length; i++) {
      if (data[i].roomName === newMsgData.roomName) {
        data[i].notReadingMessageCount = data[i].notReadingMessageCount + 1;
        data[i].lastMessage.content = newMsgData.message;
      }
    }
    setRooms(data);
  }, [newMsgData]);

  React.useEffect(() => {
    axiosInstance
      .get(`/api/room`, { headers: { Authorization: token } })
      .then((res) => {
        console.log(res);
        setRooms(res.data);
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
          console.log(onMessage);
          axiosInstance
            .post(
              `/api/roomcount`,
              { roomName: onMessage.roomName, toUserId: onMessage.senderId },
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
        <Grid is_container="is_container" _className="grid-border">
          <div className="chatting-wrap">
            <div className="chatting-header">
              <div className="chatting-header-wrap">
                <p className="header-title">채팅</p>
                <Grid _className="ct-wrap">
                  <BiDotsVerticalRounded
                    onClick={ModalControl}
                    style={{
                      width: "25px",
                      height: "25px",
                    }}
                    className="point-icon"
                  />
                </Grid>
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
                      }}
                    >
                      전체
                    </p>

                    <p
                      className={optionTwo ? "active" : "unactive"}
                      onClick={() => {
                        ModalControl();
                        OptionTwoControl();
                      }}
                    >
                      거래중
                    </p>

                    <p
                      className={optionThree ? "active" : "unactive"}
                      onClick={() => {
                        ModalControl();
                        OptionThreeControl();
                      }}
                    >
                      거래완료
                    </p>
                  </Grid>
                </>
              )}
            </div>
            <div className="chat-item">
              {rooms.map((p, idx) => {
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
    height: 100vh;
    background-color: white;
    /* min-height: 926px; */
    /* border: 1px solid var(--help-color); */
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
          line-height: 50px;
          max-width: 429px;
          margin: 0 auto;
          position: relative;

          .header-title {
            width: 88%;
            padding-left: 45%;
            position: absolute;
            left: 0;

            font-size: 20px;
            font-weight: bold;
          }

          .ct-wrap {
            width: 30px;
            padding-top: 5px;
            margin-left: 92%;
            cursor: pointer;

            .point-icon {
            }
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
          height: 207px;
          width: 303px;
          border-radius: 24px;
          background-color: white;
          position: absolute;
          top: 110%;
          left: 50%;
          transform: translate(-50%, 110%);
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
