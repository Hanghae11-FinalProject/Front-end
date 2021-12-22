import React from "react";
import { Grid } from "../elements";
import { AiOutlineHome } from "react-icons/ai";
import { BiSearch, BiUser } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { RiWechatLine } from "react-icons/ri";

import styled from "styled-components";

const Nav = () => {
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
            <AiOutlineHome className="icon" />
          </Menu>
          <Menu>
            <BiSearch className="icon" />
          </Menu>
          <CenterMenu>
            <BsPlusLg className="icon" />
          </CenterMenu>
          <Menu>
            <RiWechatLine className="icon" />
          </Menu>
          <Menu>
            <BiUser className="icon" />
          </Menu>
        </Grid>
      </NavBox>
    </>
  );
};

export default Nav;

const NavBox = styled.div`
  width: 100%;
  height: 60px;
  padding: 10px 0;
  text-align: center;

  position: fixed;
  bottom: 0;
  border-top: 1px solid var(--border-color);
  background-color: #fff;
  z-index: 9999;
`;

const Menu = styled.div`
  width: 20%;
  font-size: 22px;
  .icon {
    cursor: pointer;
  }
`;

const CenterMenu = styled.div`
  width: 20%;
  background-color: var(--point-color);
  color: #fff;
  padding: 10px 0;
  border-radius: 30px;
  cursor: pointer;
`;
