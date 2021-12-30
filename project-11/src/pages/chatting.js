import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { Grid } from "../elements";
import axios from "axios";
import Chattingitem from "../components/Chattingitem";

const Chatting = () => {
  return (
    <ChattingWrap>
      <Grid is_container="is_container" _className="grid-border">
        <div className="chatting-wrap">
          <div className="chatting-header-wrap">
            <IoIosArrowBack
              style={{
                width: "30px",
                height: "30px",
              }}
            />
            <p className="header-title">채팅</p>
          </div>
          <div className="line" />
          <Chattingitem />
          <Chattingitem />
          <Chattingitem />
          <Chattingitem />
          <Chattingitem />
          <Chattingitem />
          <Chattingitem />
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
      </Grid>
    </ChattingWrap>
  );
};

export default Chatting;

const ChattingWrap = styled.div`
  .grid-border {
    width: 100%;
    min-height: 926px;
    border: 1px solid #ededed;

    .chatting-wrap{
        .chatting-header{
            width: 100%;
            height: 50px;
            background-color: white;
            border-bottom: 3px solid #ededed;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 50;
            .chatting-header-wrap{
            display: flex;
            align-items: center;
            position: relative;
            max-width: 429px;
            margin: 0 auto;
        .header-title{
          position: absolute;
          left: 50%;
          font-size: 25px;
          margin-left: -22.5px;
        }
        }
        }
      .chat-item{
          margin-top: 50px;
      }
    }
  }
`;
