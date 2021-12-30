import React from "react";
import styled from "styled-components";

const ChattingItem = () => {
  return (
    <ChattingWrap>
      <div className="chatting-item-wrap">
        <div className="profile-img">
          <img src="/static/noimage2.gif" alt="roomImg" />
        </div>
        <div className="chat-info">
          <div className="nickname-time-wrap">
            <h1 className="nickname">정민경</h1>
            <span>하루전</span>
          </div>
          <p>상그리아 와인 최고...</p>
        </div>
        <div className="chatting-cnt">2</div>
      </div>
    </ChattingWrap>
  );
};

export default ChattingItem;

const ChattingWrap = styled.div`
  padding: 20px;
  max-width: 428px;
  border-bottom: 3px solid #ededed;
  .chatting-item-wrap {
    display: flex;
    align-items: center;
    .profile-img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
      border-radius: 50%;
      background-color: black;
      border: 1px solid gray;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }    
        .chat-info{
            width: 76%;
            .nickname-time-wrap{
            display: flex;
            .nickname{
            font-size: 17px;
            margin-right: 10px;
            }
            span{
                font-size: 12px;
                margin-top: 4px;
                }
            }
            p{
                font-size: 15px;
            }
        }
        .chatting-cnt{
            background-color: #FF626F;
            width: 22px;
            height: 22px;
            color: white;
            font-size: 12px;
            font-weight: bold;
            line-height: 22px;
            border-radius: 50%;
            text-align: center;

        }
      }
    }
    
  }
`;
