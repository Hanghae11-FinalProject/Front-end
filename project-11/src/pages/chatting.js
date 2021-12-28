import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {IoIosArrowBack} from 'react-icons/io'
import {Grid} from '../elements';
import axios from 'axios'
import Chattingitem from '../components/chattingitem';


const chatting = () => {



    return (
            <ChattingWrap>
                <Grid is_container='is_container' _className='grid-border'>
                    <div className='chatting-wrap'>
                        <div className='chatting-header-wrap'>
                            <IoIosArrowBack
                                style={{
                                    width: "30px",
                                    height: "30px"
                                }}/>
                            <text className='header-title'>채팅</text>
                        </div>
                        <div className='line'/>
                        <Chattingitem/>
                        <Chattingitem/>
                        <Chattingitem/>
                        <Chattingitem/>
                        <Chattingitem/>
                        <Chattingitem/>
                        <Chattingitem/>
                        <Chattingitem/>
                        <Chattingitem/>
                        <Chattingitem/>
                        <Chattingitem/>
                        <Chattingitem/>
                        <Chattingitem/>
                        <Chattingitem/>
                        <Chattingitem/>
                        <Chattingitem/>

                    </div>
                </Grid>
            </ChattingWrap>
    );
};

export default chatting;

const ChattingWrap = styled.div `
  .grid-border{
    width: 100%;
    min-height: 926px;
    border: 1px solid #ededed;
    .chatting-wrap{
      .chatting-header-wrap{
        display: flex;
        align-items: center;
        margin: 20px 0 20px 0;
        position: relative;
        .header-title{
          position: absolute;
          left: 50%;
          font-size: 25px;
          margin-left: -22.5px;
        }
      }
    .line{
          width: 100%;
          height: 3px;
          background-color: #ededed;
      }
    }
  }
`