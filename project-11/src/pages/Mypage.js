import React, { useState, useEffect } from "react";
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

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

// useSelector 리덕스에서 저장한 데이터에 접근하기 위하여 사용한다.
// initialstate에 profile에 넣어둔 데이터

const Mypage = () => {
  const [shadowOpen, setShadowOpen] = useState(false);

  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.post.profile); // initatilstate에서 데이터를 가져오는 방법
  const name = userProfile.nickname;

  useEffect(() => {
    dispatch(postActions.getProfileDB());
  }, []);

  const handleClose = () => {
    setShadowOpen(false);
  };
  return (
    <Permit>
      <>
        <MypageBox>
          <Grid is_container _className="border background">
            <Header>
              <Grid _className="inner" is_container is_flex flex_align="center">
                <p>마이 페이지</p>
              </Grid>
            </Header>
            <UserInfo>
              <IconBox>
                <Grid _className="icon-img">
                  <img src={userProfile.profileImg} alt="icon" />
                </Grid>
                <div className="profile">
                  <p className="profile-name">{userProfile.nickname}</p>
                  <p className="profile-email">{userProfile.username}</p>
                </div>
              </IconBox>
              <Button
                Btn
                _className="btn"
                _onClick={() => {
                  setShadowOpen(true);
                }}
              >
                <p>프로필 수정</p>
              </Button>
            </UserInfo>

            {/* 프로필 수정 모달부분 */}
            <Grid _className={shadowOpen ? "shadow-active" : "shadow"}>
              <UserModal onCancel={handleClose} name={name} />
            </Grid>

            <Grid _className="menu-wrap" padding="30px 16px;">
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
              <li
                onClick={() => {
                  window.alert("Comming soon :)");
                }}
              >
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
              <li
                onClick={() => {
                  window.alert("Comming soon :)");
                }}
              >
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
              <li
                onClick={() => {
                  window.alert("Comming soon :)");
                }}
              >
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
              <li
                onClick={() => {
                  window.alert("Comming soon :)");
                }}
              >
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
                  history.push("/");
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
              <li
                onClick={() => {
                  window.alert("Comming soon :)");
                }}
              >
                <p>
                  <MdPersonRemoveAlt1
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
    text-align: center;
    background-color: #fff;
    padding-top: 30px;

    position: relative;

    .shadow {
      width: 100%;
      height: 100vh;
      background-color: rgba(255, 255, 255, 0.6);
      position: absolute;
      top: 0;

      display: none;
    }

    .shadow-active {
      width: 100%;
      height: 100vh;
      background-color: rgba(255, 255, 255, 0.6);
      position: absolute;
      top: 0;
      z-index: 2;
      display: block;
    }

    .menu-wrap {
      .menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        margin: 5px 0;
        border-radius: 6px;
        border: 1px solid var(--help-color);
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
    }
  }
`;

const Header = styled.div`
  width: 100%;
  max-width: 428px;
  height: 50px;
  position: fixed;
  top: 0;
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
  padding: 0 16px;
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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-right: 15px;
    background-color: #ffd8d8;

    img {
      width: 60px;
      height: 60px;
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
