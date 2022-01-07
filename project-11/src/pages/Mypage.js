import React, { useState } from "react";
import Nav from "../shared/Nav";
import { history } from "../redux/configureStore";

import { Grid, Button } from "../elements/index";
import styled from "styled-components";
import UserModal from "../components/UserModal";
import {
  MdLock,
  MdFeedback,
  MdPersonRemoveAlt1,
  MdExitToApp,
} from "react-icons/md";
import { BsQuestionCircleFill } from "react-icons/bs";
import { IoIosArrowForward, IoMdSettings } from "react-icons/io";
import { deleteCookie } from "../shared/Cookie";
import Permit from "../shared/Permit";

const Mypage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("Shiba");

  const handleClose = () => {
    setModalOpen(false);
  };
  return (
    <Permit>
      <>
        <MypageBox>
          <Grid is_container _className="border">
            <Header>
              <Grid _className="inner" is_container is_flex flex_align="center">
                <p>마이 페이지</p>
              </Grid>
            </Header>
            <UserInfo>
              <IconBox>
                <Grid _className="icon-img">
                  <img
                    src="https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/06/urbanbrush-20200615000825087215.jpg"
                    alt="icon"
                  />
                </Grid>
                <div className="profile">
                  <p className="profile-name">{name}</p>
                  <p className="profile-email">siba@naver.com</p>
                </div>
              </IconBox>
              <Button Btn _className="btn" _onClick={() => setModalOpen(true)}>
                <p>프로필 수정</p>
              </Button>
            </UserInfo>

            <UserModal isOpen={modalOpen} onCancel={handleClose} name={name} />

            <Grid _className="menu-wrap" padding="30px 0;">
              <Grid
                _className="menu"
                _onClick={() => {
                  history.push("/mypost");
                }}
              >
                내가 작성한 글
                <IoIosArrowForward style={{ width: "24px", height: "24px" }} />
              </Grid>

              <Grid
                _className="menu"
                _onClick={() => {
                  history.push("/favorite");
                }}
              >
                즐겨찾기
                <IoIosArrowForward style={{ width: "24px", height: "24px" }} />
              </Grid>
            </Grid>

            <ul className="icon-wrap">
              <li>
                <p>
                  <MdLock
                    style={{
                      width: "24px",
                      height: "24px",
                      marginBottom: "16px",
                      cursor: "pointer",
                    }}
                  />
                </p>
                <span>계정</span>
              </li>
              <li>
                <p>
                  <IoMdSettings
                    style={{
                      width: "24px",
                      height: "24px",
                      marginBottom: "16px",
                      cursor: "pointer",
                    }}
                  />
                </p>
                <span>앱 설정</span>
              </li>
              <li>
                <p>
                  <BsQuestionCircleFill
                    style={{
                      width: "24px",
                      height: "24px",
                      marginBottom: "16px",
                      cursor: "pointer",
                    }}
                  />
                </p>
                <span>이용안내</span>
              </li>
              <li>
                <p>
                  <MdFeedback
                    style={{
                      width: "24px",
                      height: "24px",
                      marginBottom: "16px",
                      cursor: "pointer",
                    }}
                  />
                </p>
                <span>피드백</span>
              </li>
              <li
                onClick={() => {
                  deleteCookie("OK");
                  window.alert("로그아웃 되었습니다.");
                  history.push("/intro");
                }}
              >
                <p>
                  <MdExitToApp
                    style={{
                      width: "24px",
                      height: "24px",
                      marginBottom: "16px",
                      cursor: "pointer",
                    }}
                  />
                </p>
                <span>로그아웃</span>
              </li>
              <li>
                <p>
                  <MdPersonRemoveAlt1
                    onClick={() => {
                      window.alert("응 못나가");
                    }}
                    style={{
                      width: "24px",
                      height: "24px",
                      marginBottom: "16px",
                      cursor: "pointer",
                    }}
                  />
                </p>
                <span>회원탈퇴</span>
              </li>
            </ul>
            <Nav mypage={"mypage"} />
          </Grid>
        </MypageBox>
      </>
    </Permit>
  );
};

export default Mypage;

const MypageBox = styled.div`
  .border {
    height: 100vh;
    /* border-right: 1px solid var(--help-color);
    border-left: 1px solid var(--help-color); */
    text-align: center;
    background-color: #fff;
    .menu-wrap {
      margin-bottom: 20px;
      padding: 30px 16px;
      .menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        margin: 5px 0;

        border-radius: 6px;
        box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
          rgba(17, 17, 26, 0.1) 0px 0px 8px;
        /* border: 1px solid var(--help-color); */
        cursor: pointer;
        &:hover {
          background-color: var(--main-color);
          color: #fff;
        }
      }
    }
  }
  .icon-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    li {
      margin-bottom: 32px;
      text-align: center;
      width: 25%;
      cursor: pointer;

      span {
        font-size: 14px;
      }
    }
  }
`;

const Header = styled.div`
  width: 100%;
  max-width: 428px;
  height: 50px;
  position: fixed;
  top: 0;

  /* border-bottom: 1px solid var(--help-color); */
  background-color: #fff;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1);
  z-index: 10;
  .inner {
    height: 50px;
    margin: 0 auto;

    p {
      width: 100%;
      position: absolute;
      left: 0;
      text-align: center;

      font-size: 20px;
      font-weight: bold;
    }
  }
`;

const UserInfo = styled.div`
  padding: 30px 16px 0 16px;
  .btn {
    background-color: white;
    border: 1px solid var(--main-color);
    border-radius: 18px;
    width: 100%;
    height: 36px;
    p {
      color: var(--main-color);
    }
  }
`;

const IconBox = styled.div`
  padding: 50px 0 20px 0;
  display: flex;
  align-items: center;
  .icon-img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-right: 15px;
    border: 3px solid var(--main-color);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .profile {
    display: flex;
    flex-direction: column;
    text-align: left;
    .profile-name {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .profile-email {
      font-size: 16px;
      color: gray;
    }
  }
`;
