import React, { useState } from "react";
import { history } from "../redux/configureStore";
import { Grid } from "../elements";
import { MdHome } from "react-icons/md";
import { BsChat, BsPlusLg, BsSearch } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { RiUserFill } from "react-icons/ri";
import { HiOutlineChatAlt2 } from "react-icons/hi";

import styled from "styled-components";

const Nav = (props) => {
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
                history.push("/");
              }}
            />
          </Menu>
          <Menu>
            <BsSearch
              className={props.search === "search" ? "active" : "icon"}
              onClick={() => {
                history.push("/search");
              }}
            />
          </Menu>
          <PlusMenu>
            <BsPlusLg
              className="plus-icon"
              onClick={() => {
                history.push("/write");
              }}
            />
          </PlusMenu>
          <Menu>
            <HiOutlineChatAlt2
              size="24"
              className={props.chatting === "chatting" ? "active" : "icon"}
              onClick={() => {
                history.push("/chatting");
              }}
            />
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
  height: 50px;
  padding: 10px 0;
  text-align: center;
  color: var(--inactive-icon-color);

  position: fixed;
  bottom: 0;
  border-top: 1px solid var(--help-color);
  background-color: #fff;
  z-index: 9999;
`;

const PlusMenu = styled.div`
  width: 20%;

  .plus-icon {
    padding: 8px 0;
    font-weight: bold;
    width: 30px;
    height: 30px;
    background-color: var(--main-color);
    color: #fff;
    border-radius: 30px;
    cursor: pointer;
  }
`;
const Menu = styled.div`
  width: 20%;
  font-size: 20px;
  .icon {
    cursor: pointer;
  }

  .home {
    font-size: 26px;
  }

  .active {
    color: var(--main-color);
  }
`;
