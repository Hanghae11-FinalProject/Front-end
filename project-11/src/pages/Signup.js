import React, { useState, useRef } from "react";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { Grid } from "../elements";
import { useForm } from "react-hook-form";
import axios from "axios";

const Signup = () => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const password = useRef();

  const checkemail = watch("email");
  // useRef 특정 돔을 선택할때 사용하는데 엘리먼트 크기를 가져올때, 스크롤바 위치를 가져올때, 엘리먼트 포커스를 설정해줘야 할 때 등..
  password.current = watch("password");

  const onSubmit = (data) => {
    axios
      .post("http://15.164.222.25/user/signup", {
        username: data.email,
        password: data.password,
        passwordCheck: data.password_confirm,
        nickname: data.nickname,
        address: "동대문구",
      })
      .then((response) => {
        console.log("완료", response);
      });

    console.log("data", data);
  };
  const idCheck = (data) => {
    axios
      .post("http://15.164.222.25/user/idCheck", { username: data.email })
      .then((response) => {
        console.log("존재합니다", response);
      });
  };
  const nicknameCheck = (data) => {
    axios
      .post("http://15.164.222.25/user/nicknameCheck", {
        nickname: data.nickname,
      })
      .then((response) => {
        console.log("존재합니다", response);
      });
  };
  // watch는 name의 element를 관찰한다. 관찰을 하고자할때 register을 해당 인풋에 등록해주어야 한다. validate
  // current는 password와 값이 같을때 에러메세지를 보내주고자 사용한다.

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SignupWrap>
        <Grid is_container="is_container" _className="grid-border">
          <div className="signup-wrap">
            <div className="signup-header-wrap">
              <IoIosArrowBack
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
              <text className="header-title">회원가입</text>
            </div>

            <div className="signup-input-wrap">
              <text>이메일</text>
              <Grid
                is_flex="is_flex"
                flex_align="center"
                _className="doubleinput"
              >
                <input
                  name="email"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  placeholder="abc@email.com"
                />
                <button className="doublecheck" onClick={idCheck}>
                  중복확인
                </button>
              </Grid>
              {errors.email && (
                <p
                  style={{
                    color: "red",
                    fontSize: "13px",
                  }}
                >
                  이메일 주소를 다시 확인해주세요.
                </p>
              )}
              <text>비밀번호</text>
              <input
                type="password"
                name="password"
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
                })}
                placeholder="영문, 숫자 포함 8자 이상"
              />{" "}
              {errors.password && errors.password.type === "required" && (
                <p
                  style={{
                    color: "red",
                    fontSize: "13px",
                  }}
                >
                  비밀번호는 필수 정보입니다.
                </p>
              )}
              {errors.password && errors.password.type === "pattern" && (
                <p
                  style={{
                    color: "red",
                    fontSize: "13px",
                  }}
                >
                  8자이내로 입력해주세요
                </p>
              )}
              <text>비밀번호 재확인</text>
              <input
                type="password"
                name="password_confirm"
                {...register("password_confirm", {
                  required: true,
                  validate: (value) => value === password.current,
                })}
                placeholder="영문, 숫자 포함 8자 이상"
              />{" "}
              {errors.password_confirm &&
                errors.password_confirm.type === "required" && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "13px",
                    }}
                  >
                    비밀번호를 입력해주세요.
                  </p>
                )}
              {errors.password_confirm &&
                errors.password_confirm.type === "validate" && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "13px",
                    }}
                  >
                    비밀번호가 일치하지 않습니다.
                  </p>
                )}
              <text>닉네임</text>
              <Grid
                is_flex="is_flex"
                flex_align="center"
                _className="doubleinput"
              >
                <input
                  name="nickname"
                  {...register("nickname", {
                    required: true,
                    minLength: 2,
                    maxLength: 6,
                  })}
                  placeholder=" 한글 또는 영문 6자 이하"
                />
                <button className="doublecheck" onClick={nicknameCheck}>
                  중복확인
                </button>
              </Grid>
              {errors.nickname && errors.nickname.type === "required" && (
                <p
                  style={{
                    color: "red",
                    fontSize: "13px",
                  }}
                >
                  한글 또는 영문 6자 이하
                </p>
              )}
              {errors.nickname && errors.nickname.type === "maxLength" && (
                <p
                  style={{
                    color: "red",
                    fontSize: "13px",
                  }}
                >
                  6자 이내로 작성해주세요
                </p>
              )}
              <text>주소</text>
              <div className="address-wrap">
                <select className="select-wrap">
                  <option
                    disabled="disabled"
                    selected="selected"
                    hidden="hidden"
                  >
                    시/도
                  </option>
                  <option>서울시</option>
                </select>
                <select className="select-city-wrap">
                  <option
                    disabled="disabled"
                    selected="selected"
                    hidden="hidden"
                  >
                    시/군/구
                  </option>
                  <option>동대문구</option>
                  <option>마포구</option>
                  <option>서대문구</option>
                  <option>성북구</option>
                </select>
              </div>
              <button disabled={!checkemail} className="sign-btn">
                가입하기
              </button>
            </div>
          </div>
        </Grid>
      </SignupWrap>
    </form>
  );
};

export default Signup;

const SignupWrap = styled.div`
  .grid-border {
    width: 100%;
    height: 100vh;
    border: 1px solid var(--help-color);
    .signup-wrap {
      .signup-header-wrap {
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

      .signup-input-wrap {
        display: flex;
        flex-direction: column;

        padding: 0 16px;
        text {
          margin-bottom: 4px;
          margin-top: 32px;
        }
        input {
          width: 100%;
          height: 48px;
          padding-left: 10px;
          margin-bottom: 16px;
          border-radius: 4px;
          outline: none;
          border: 1px solid var(--help-color);
        }

        .doubleinput {
          max-width: 100%;
          justify-content: space-between;
          input {
            width: 80%;
          }
        }
        .doublecheck {
          background-color: white;
          border: 1px solid var(--inactive-text-color);
          outline: none;
          width: 70px;
          height: 48px;
          border-radius: 4px;
          cursor: pointer;
          margin-bottom: 16px;
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
    .sign-btn {
      background-color: var(--main-color);
      text-align: center;
      width: 100%;
      max-width: 397px;
      height: 48px;
      border-radius: 50px;
      color: white;
      margin-top: 150px;
      border: 0px;
      cursor: pointer;
      opacity: 0.8;
      :disabled {
        cursor: not-allowed;
        pointer-events: none;
        background-color: var(--disabled-color);
      }
      &:hover {
        opacity: 1;
      }
    }
  }
`;
