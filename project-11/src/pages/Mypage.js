import React, { useState } from "react";
import Nav from "../shared/Nav";

import { Grid, Button } from "../elements/index";
import styled from "styled-components";
import UserModal from "../components/UserModal";

const Mypage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("Shiba");

  const handleClose = () => {
    setModalOpen(false);
  };
  return (
    <>
      <MypageBox>
        <Grid is_container padding="16px" _className="border">
          <UserInfo>
            <IconBox>
              <Grid _className="icon-img">
                <img
                  src="https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/06/urbanbrush-20200615000825087215.jpg"
                  alt="icon"
                />
              </Grid>
            </IconBox>
            <UserName>{name}</UserName>
            <Button Btn _className="btn" _onClick={() => setModalOpen(true)}>
              회원정보수정
            </Button>
          </UserInfo>
          <UserModal isOpen={modalOpen} onCancel={handleClose} name={name} />
          <Grid padding="30px 0;">
            <Grid _className="menu">내가 쓴 글</Grid>
            <Grid _className="menu"> 즐겨찾기</Grid>
            <hr />
            <Grid _className="menu">계정</Grid>
            <Grid _className="menu">앱 설정</Grid>
            <Grid _className="menu">이용 안내</Grid>
          </Grid>
        </Grid>
      </MypageBox>
      <Nav mypage={"mypage"} />
    </>
  );
};

export default Mypage;

const MypageBox = styled.div`
  .border {
    height: 100vh;
    border-right: 1px solid var(--border-color);
    border-left: 1px solid var(--border-color);
    text-align: center;
    .menu {
      text-align: left;
      padding: 15px 0 15px 15px;
      margin: 5px 0;
      border-radius: 6px;
      background-color: #eee;
      cursor: pointer;

      &:hover {
        background-color: var(--point-color);
        color: #fff;
      }
    }

    hr {
      width: 70%;
      margin: 30px auto;
      border: 1px solid #eee;
    }

    .inputform {
      padding: 5px 10px;
    }
  }
`;
const UserInfo = styled.div`
  margin-bottom: 40px;
  .btn {
    margin: 0 auto;
  }
`;

const IconBox = styled.div`
  padding: 50px 0 20px 0;
  .icon-img {
    margin: 0 auto;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid var(--point-color);

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
`;

const UserName = styled.div`
  font-size: 18px;
  margin: 10px 0 30px 0;
`;
