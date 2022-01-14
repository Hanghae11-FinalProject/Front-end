import React, { useState, useEffect } from "react";
import { history } from "../redux/configureStore";
import { axiosInstance } from "../shared/api";
import { setCookie } from "../shared/Cookie";

import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { Grid } from "../elements";
import { KAKAO_AUTH_URL } from "../shared/OAuth";

const Login = () => {
  const [login_disabled, setLoginDisabled] = useState(true);
  const [input_values, setInputValues] = useState({ user_id: "", user_pw: "" });
  const [loginTrue, setLoginTrue] = useState(true);

  const ClickKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

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
        const loginInfo = `userId=${response.data.userId}userImg=${response.data.profileImg}userName=${response.data.nickName}userToken=${response.headers.authorization}`;
        setCookie("OK", loginInfo);
        history.push("/");
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
      <Grid is_container="is_container" _className="grid-border">
        <div className="login-wrap">
          <div className="login-header-wrap">
            <span className="header-title">로그인</span>
          </div>
          <LogoWrap>
            <div className="logowrap">
              <img className="logo" src="/static/logo.png" alt=""/>
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
              <div className="kakaobtn">
                <div className="kakaobubblewrap" onClick={ClickKakao}>
                  <img className="kakaobubble" src="/static/kakaobubble.png" alt=""/>
                  <p className="kakaotext">카카오계정으로 로그인</p>
                </div>
                <div className="bottomtext">
                  <span 
                  className="signupbtn"
                  onClick={() => {
                history.push("/signup");
              }}>회원가입</span>
                  <span onClick={() => {
                history.push("/");
              }}>둘러보기</span>
                </div>
              </div>
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
    /* border: 1px solid var(--help-color); */
    .login-wrap {
      .login-header-wrap {
        height: 50px;
        display: flex;
        align-items: center;
        position: relative;
        /* border-bottom: 1px solid var(--help-color); */
        box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1);
        .header-title {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          font-size: 20px;
          font-weight: bold;
        }
      }

      .login-input-wrap {
        display: flex;
        flex-direction: column;
        padding: 0 16px;
        .emailtext{
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
        .kakaobtn{
          display: flex;
          text-align: center;
          flex-direction: column;
          cursor: pointer;
          .kakaobubblewrap{
            width: 100%;
            height: 48px;
            background-color: #FEE500;
            border-radius: 4px;
            display: flex;
            align-items: center;
            position: relative;
            margin-top: 12px;
            .kakaobubble{
              width: 20px;
              height: 20px;
              margin-left: 16px;
          }
          .kakaotext{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            color: #41231F;
            font-size: 14px;
            font-weight: 600;
          }
          }
          .bottomtext{
            display: flex;
            max-width: 429px;
            margin: 0 auto;
            margin-top: 20px;
            span{
              padding: 0px 25px;
              color: var(--help-color);
            }
            span:nth-child(1){
              border-right: 1px solid var(--help-color);
              cursor: pointer;
            }
            span:nth-child(2){
              cursor: pointer;
            }
          }
        }
      }
    }
    .address-wrap {
      display: flex;
      justify-content: space-between;
      .select-wrap {
        width: 191px;
        height: 48px;
        outline: none;
        border: 1px solid var(--help-color);
      }
      .select-city-wrap {
        width: 191px;
        height: 48px;
        outline: none;
        border: 1px solid var(--help-color);
      }
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
`;

const LogoWrap = styled.div`
  .logowrap{
    display: flex;
    justify-content: center;
    margin-top: 50px;
    .logo{
    max-width: 170px;
  }
  }
  
`