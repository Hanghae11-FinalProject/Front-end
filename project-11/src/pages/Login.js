import React, { useState, useEffect } from "react";
import { history } from "../redux/configureStore";
import { axiosInstance } from "../shared/api";
import { setCookie } from "../shared/Cookie";

import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { Grid } from "../elements";

const Login = () => {
  const [login_disabled, setLoginDisabled] = useState(true);
  const [input_values, setInputValues] = useState({ user_id: "", user_pw: "" });
  const [loginTrue, setLoginTrue] = useState(true);

  const handleChangeInput = (e) => {
    setInputValues({
      ...input_values,
      [e.target.name]: e.target.value,
    });
  };
  const handleClickLoginBtn = () => {
    console.log(input_values.user_pw);
    axiosInstance
      .post("user/login", {
        username: input_values.user_id,
        password: input_values.user_pw,
      })
      .then((response) => {
        console.log("로그인 완료", response);
        // const loginInfo = `userId=${response.data.userId}userImg=${response.data.profileImg}
        // userName=${response.data.nickName}userToken=${response.headers.authorization}`;
        // setCookie("OK", loginInfo);

        setCookie("userId", response.data.userId);
        let profileImg = encodeURIComponent(response.data.profileImg);
        setCookie("userImg", profileImg);
        let name = encodeURIComponent(response.data.nickName);
        setCookie("userName", name);
        setCookie("userToken", response.headers.authorization);
        history.push("/main");
      })
      .catch((error) => {
        window.alert("이메일 또는 비밀번호를 다시 확인해주세요", error);
      });
    setLoginDisabled(true);
    setLoginTrue(true);
    setLoginDisabled(false);
  };

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      handleClickLoginBtn();
    }
  };

  useEffect(() => {
    if (input_values.user_id !== "" && input_values.user_pw !== "") {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
    return () => {};
  }, [input_values]);

  return (
    <LoginWrap>
      <Grid is_container="is_container" _className="grid-border background">
        <div className="login-wrap">
          <div className="login-header-wrap">
            <IoIosArrowBack
              style={{
                width: "30px",
                height: "30px",
                cursor: "pointer",
              }}
              onClick={() => {
                history.push("/");
              }}
            />
            <span className="header-title">로그인</span>
          </div>
          <LogoWrap>
            <div className="logowrap">
              <img className="logo" src="/static/logo.png" alt="" />
            </div>
          </LogoWrap>
          <div className="login-input-wrap">
            <span className="emailtext">이메일</span>
            <input
              name="user_id"
              onChange={handleChangeInput}
              onKeyUp={handleKeyEnter}
              placeholder="abc@email.com"
            />
            <span>비밀번호</span>
            <input
              name="user_pw"
              onChange={handleChangeInput}
              onKeyUp={handleKeyEnter}
              type="password"
              placeholder="영문, 숫자 포함 8자 이상"
            />
            {!loginTrue && (
              <p className="alert-msg" style={{ color: "red" }}>
                로그인 정보가 일치하지 않습니다.
              </p>
            )}
            <button
              onClick={handleClickLoginBtn}
              disabled={login_disabled}
              className="login-btn"
            >
              로그인
            </button>
          </div>
        </div>
      </Grid>
    </LoginWrap>
  );
};

export default Login;

const LoginWrap = styled.div`
  position: relative;
  .grid-border {
    width: 100%;
    height: 100vh;
    background-color: #fff;

    .login-wrap {
      .login-header-wrap {
        height: 50px;
        display: flex;
        align-items: center;
        position: relative;

        box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1);
        .header-title {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 20px;
          font-weight: bold;
        }
      }

      .login-input-wrap {
        display: flex;
        flex-direction: column;
        padding: 0 16px 50px 16px;
        background-color: #fff;
        .emailtext {
          margin-top: 50px;
        }
        span {
          margin-bottom: 4px;
        }
        input {
          margin-bottom: 16px;
          border-radius: 4px;
          max-width: 397px;
          height: 48px;
          outline: none;
          border: 1px solid var(--help-color);
          padding-left: 10px;
        }
        .login-btn {
          background-color: var(--main-color);
          text-align: center;
          width: 100%;
          max-width: 397px;
          height: 48px;
          border-radius: 4px;
          color: white;
          margin-top: 48px;
          border: 0px;
          cursor: pointer;
          :disabled {
            cursor: not-allowed;
            pointer-events: none;
            background-color: var(--help-color);
          }
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
`;

const LogoWrap = styled.div`
  .logowrap {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    .logo {
      max-width: 170px;
    }
  }
`;
