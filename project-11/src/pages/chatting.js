import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { Grid } from "../elements";
import Chattingitem from "../components/Chattingitem";
import Nav from "../shared/Nav";
import { BiDotsVerticalRounded } from "react-icons/bi";

const Chatting = () => {
  const [is_open, setIs_open] = useState(false);

  const [optionOne, setOptionOne] = useState(false);
  const [optionTwo, setOptionTwo] = useState(false);
  const [optionThree, setOptionThree] = useState(false);

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
    <ChattingWrap>
      <Grid is_container="is_container" _className="grid-border">
        <div className="chatting-wrap">
          <div className="chatting-header">
            <div className="chatting-header-wrap">
              <IoIosArrowBack
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
              <p className="header-title">전체</p>
              <Grid>
                <div className="ct-wrap">
                  <BiDotsVerticalRounded
                    onClick={ModalControl}
                    style={{
                      width: "25px",
                      height: "25px",
                    }}
                    className="point-icon"
                  />
                </div>
              </Grid>

              {is_open && (
                <>
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
          </div>
          <div className="chat-item">
            <Chattingitem />
            <Chattingitem />
            <Chattingitem />
            <Chattingitem />
            <Chattingitem />
            <Chattingitem />
            <Chattingitem />
            <Chattingitem />
            <Chattingitem />
          </div>
        </div>
      </Grid>
      <Nav chatting={"chatting"} />
    </ChattingWrap>
  );
};

export default Chatting;

const ChattingWrap = styled.div`
  .grid-border {
    width: 100%;
    min-height: 926px;
    border: 1px solid #ededed;
    .chatting-wrap {
      .chatting-header {
        width: 100%;
        height: 50px;
        background-color: white;
        border-bottom: 3px solid #ededed;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 50;
        .chatting-header-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 429px;
          margin: 0 auto;
          position: relative;
          .header-title {
            font-size: 20px;
          }
          .drop-chat {
            height: 207px;
            width: 303px;
            border-radius: 24px;
            background-color: white;
            position: absolute;
            top: 30vh;
            left: 15%;
            display: flex;
            flex-direction: column;
            align-items: center;
            filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
            cursor: pointer;
            .active {
              padding: 8px 8px;
              font-size: 16px;
              margin-top: 25px;
              color: var(--main-color);
            }
            .unactive {
              padding: 8px 8px;
              font-size: 16px;
              margin-top: 25px;
            }
          }
          .point-icon {
            cursor: pointer;
          }
        }
      }
    }
    .chat-item {
      margin-top: 50px;
    }
  }
`;
