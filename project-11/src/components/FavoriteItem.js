import React from "react";
import styled from "styled-components";
import { Grid } from "../elements";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { history } from "../redux/configureStore";
import { axiosInstance } from "../shared/api";
import { getCookie } from "../shared/Cookie";

const FavoriteItem = (props) => {
  const token = getCookie("Token");
  const postId = props.postId;
  const toUserId = props.postUserId;

  const goChat = () => {
    if (props.currentState === "Complete") {
      window.alert("이미 거래가 완료된 게시글입니다.");
      return;
    }
    axiosInstance
      .post(
        `/api/room`,
        {
          postId: postId,
          toUserId: toUserId,
        },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        if (res.data.message === "same room") {
          window.alert("이미 상대방과의 채팅방이 있습니다.");
          history.push("/chatting");
        } else {
          history.push({
            pathname: `/chat`,
            state: {
              roomName: res.data.roomName,
              sender: res.data.user,
              postId: postId,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err, "에러");
        window.alert("이미 상대방과의 채팅방이 있습니다.");
      });
  };

  return (
    <FavoriteWrap
      onClick={() => {
        history.push(`/detail/${postId}`);
      }}
    >
      <Grid is_container="is_container" _className="itembox">
        <div className="deal-title">
          <div className="img-wrap">
            {props.image !== null ? (
              <img src={props.image} alt="" />
            ) : (
              <img src="/static/default.png" alt="" />
            )}
          </div>
          <div className="deal-content">
            <div className="deal-chip">
              {props.currentState === "Proceeding" ? (
                <p>거래중</p>
              ) : (
                <p style={{ background: "var(--help-color)" }}>거래완료</p>
              )}
            </div>
            <span>{props.title}</span>
            <span className="date-city">
              {props.createdAt}ㆍ{props.address}
            </span>
          </div>
          <div className="icon-wrap" onClick={goChat}>
            <HiOutlineChatAlt2 className="ms-icon" />
          </div>
        </div>
      </Grid>
    </FavoriteWrap>
  );
};

export default FavoriteItem;

const FavoriteWrap = styled.div`
  padding: 10px;
  cursor: pointer;
  .itembox {
    height: 100px;
    border-bottom: 1px solid var(--help-color);
    .deal-title {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex: 1;
      .img-wrap {
        margin: 0 15px;
        width: 78px;
        height: 78px;
        border: 1px solid var(--help-color);
        border-radius: 4px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }
      }
      .deal-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        .deal-chip {
          > p {
            display: inline-block;
            padding: 0 10px;
            border-radius: 12px;
            text-align: center;
            line-height: 24px;
            background-color: var(--main-color);
            font-size: 14px;
            color: white;
          }
        }
        .date-city {
          font-size: 14px;
          color: var(--help-color);
          margin-top: 10px;
        }
        span {
          font-size: 18px;
          margin-top: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
      .icon-wrap {
        display: flex;
        width: 53px;
        height: 53px;
        background-color: #fff7f8;
        border-radius: 50%;
        align-items: center;
        padding: 0 0 0 10px;
        margin: 0 10px;
        .ms-icon {
          width: 30px;
          height: 30px;
          color: var(--main-color);
          cursor: pointer;
        }
      }
    }
  }
`;
