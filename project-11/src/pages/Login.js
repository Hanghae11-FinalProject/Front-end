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
        const loginInfo = `userId=${response.data.userId}userImg=${response.data.profileImg}userName=${response.data.nickName}userToken=${response.headers.authorization}`;
        setCookie("OK", loginInfo);
        history.push("/");
      })
      .catch((error) => {
        window.alert('뭐가 틀렸는지 한번 더 생각해보세요', error)
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
            <IoIosArrowBack
              style={{
                width: "30px",
                height: "30px",
              }}
            />
            <span className="header-title">로그인</span>
          </div>
          <div className="login-input-wrap">
            <span>이메일</span>
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
              가입하기
            </button>
          </div>
        </div>
      </Grid>
    </LoginWrap>
  );
};

export default Login;

const LoginWrap = styled.div`
  .grid-border {
    width: 100%;
    height: 100vh;
    border: 1px solid var(--help-color);
    .login-wrap {
      .login-header-wrap {
        height: 50px;

        display: flex;
        align-items: center;

        position: relative;
        border-bottom: 1px solid var(--help-color);
        .header-title {
          position: absolute;
          left: 45%;
          font-size: 20px;
          font-weight: bold;
        }
      }

      .login-input-wrap {
        display: flex;
        flex-direction: column;
        padding: 0 16px;
        span {
          margin-bottom: 4px;
          margin-top: 32px;
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
      border-radius: 50px;
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
