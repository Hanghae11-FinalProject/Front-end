import React, { useEffect } from "react";
import { history } from "../redux/configureStore";
import { Grid } from "../elements";
import { MdHome } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { RiUserFill } from "react-icons/ri";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { axiosInstance } from "./api";
import { getCookie } from "./Cookie";

import styled from "styled-components";

const Nav = (props) => {
  const [MsgCnt, setMsgCnt] = React.useState(0);
  const token = getCookie("Token");
  useEffect(() => {
    axiosInstance
      .get("/api/messageCount", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log(res);
        setMsgCnt(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(MsgCnt);
  return (
    <>
      <NavBox>
        <Grid
          is_container
          is_flex
          flex_align="center"
          flex_justify="space-between"
        >
          <Menu>
            <MdHome
              className={props.home === "home" ? "active home" : "icon home"}
              onClick={() => {
                history.push("/main");
              }}
            />
          </Menu>
          <Menu>
            <BiSearch
              size="24"
              className={props.search === "search" ? "active" : "icon"}
              onClick={() => {
                history.push("/search");
              }}
            />
          </Menu>
          <PlusMenu>
            <BsPlusLg
              className={
                props.write !== "write"
                  ? "plus-icon inactive"
                  : "plus-icon active"
              }
              onClick={() => {
                history.push("/write");
              }}
            />
          </PlusMenu>
          <Menu style={{ position: "relative" }}>
            <HiOutlineChatAlt2
              size="24"
              className={props.chatting === "chatting" ? "active" : "icon"}
              onClick={() => {
                history.push("/chatting");
              }}
            />
            <div
              className={MsgCnt !== 0 ? "chatting-cnt" : "cnt-zero"}
              onClick={() => {
                history.push("/chatting");
              }}
            >
              {MsgCnt !== 0 ? MsgCnt : ""}
            </div>
          </Menu>
          <Menu>
            <RiUserFill
              className={props.mypage === "mypage" ? "active" : "icon"}
              onClick={() => {
                history.push("/mypage");
              }}
            />
          </Menu>
        </Grid>
      </NavBox>
    </>
  );
};

export default Nav;

const NavBox = styled.div`
  width: 100%;
  max-width: 428px;
  height: 50px;
  padding: 10px 0;
  text-align: center;
  color: var(--inactive-icon-color);

  position: fixed;
  bottom: 0;
  border-top: 1px solid var(--help-color);

  background-color: #fff;
  z-index: 7000;
`;

const PlusMenu = styled.div`
  width: 20%;

  .plus-icon {
    padding: 8px 0;
    font-weight: bold;
    width: 30px;
    height: 30px;
    color: #fff;
    border-radius: 30px;
    cursor: pointer;
  }

  .inactive {
    background-color: var(--inactive-icon-color);
  }

  .active {
    background-color: var(--main-color);
  }
`;
const Menu = styled.div`
  width: 20%;
  font-size: 20px;
  .chatting-cnt {
    position: absolute;
    bottom: 20px;
    left: 45px;
    background-color: #ff626f;
    width: 22px;
    height: 22px;
    color: white;
    font-size: 12px;
    font-weight: bold;
    line-height: 22px;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    z-index: 9999;
  }
  .cnt-zero {
    display: none;
  }
  .icon {
    cursor: pointer;
  }

  .home {
    font-size: 26px;
  }

  .active {
    color: var(--main-color);
    animation: 0.6s ease-in-out loadEffect3;
  }
  @keyframes loadEffect3 {
    0% {
      opacity: 0;
      transform: scale(0.7);
    }
    65% {
      opacity: 0.65;
      transform: scale(1.01);
    }
    85% {
      opacity: 0.85;
      transform: scale(0.97);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
