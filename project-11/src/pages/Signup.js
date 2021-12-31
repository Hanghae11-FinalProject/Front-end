import React, { useState, useRef } from "react";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { Grid } from "../elements";
import { useForm } from "react-hook-form";
import axios from "axios";
import { IoMdArrowDropdown } from "react-icons/io";

const Signup = () => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const password = useRef();

  const [is_open, setIs_open] = useState(false);
  const [is_location, setIs_Location] = useState("시/군/구");
  const locations = ["동대문구", "마포구", "서대문구", "성북구"];

  const checkemail = watch("email");
  const checknickname = watch("nickname");
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
        profileImg:
          "https://i.pinimg.com/564x/36/d5/a6/36d5a6aaf858916199e15fded53b698e.jpg",
      })
      .then((response) => {
        console.log("회원가입 성공", response);
      })
      .catch((err) => {
        console.log("회원가입 실패", err);
      });
  };
  const idCheck = () => {
    console.log(checkemail);

    axios
      .post("http://15.164.222.25/user/idCheck", { username: checkemail })
      .then((response) => {
        console.log("아이디중복", response);
      });
  };
  const nicknameCheck = () => {
    axios
      .post("http://15.164.222.25/user/nicknameCheck", {
        nickname: checknickname,
      })
      .then((response) => {
        console.log("닉네임중복", response);
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
              <span className="header-title">회원가입</span>
            </div>

            <div className="signup-input-wrap">
              <span>이메일</span>
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
              <span>비밀번호</span>
              <input
                type="password"
                name="password"
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
                })}
                placeholder="영문, 숫자 포함 8자 이상"
              />
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
              <span>비밀번호 재확인</span>
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
              <span>닉네임</span>
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
              <span>주소</span>
              <div className="address-wrap">
                <div className="select-wrap">
                  <span>서울시</span>
                  <IoMdArrowDropdown />
                </div>

                <LocationWrap>
                  <Grid _className={is_open ? "active" : "default"}>
                    <div
                      className="select-city-wrap"
                      onClick={() => {
                        setIs_open(true);
                      }}
                    >
                      {is_location}
                      <IoMdArrowDropdown />
                    </div>
                  </Grid>

                  {is_open && (
                    <>
                      <Grid _className="drop-location">
                        {locations.map((op, i) => {
                          return (
                            <p
                              className="loc-wrap"
                              key={i}
                              onClick={() => {
                                setIs_open(false);
                                setIs_Location(op);
                              }}
                            >
                              {op}
                            </p>
                          );
                        })}
                      </Grid>
                    </>
                  )}
                </LocationWrap>
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
        span {
          margin-bottom: 4px;
          margin-top: 32px;
        }
        input {
          width: 100%;
          height: 48px;
          padding-left: 10px;
          margin-bottom: 16px;
          border-radius: 4px;
          border: 1px solid var(--help-color);
        }
        input:focus {
          outline: 1px solid var(--main-color);
        }

        .doubleinput {
          max-width: 100%;
          justify-content: space-between;
          input {
            width: 80%;
          }
          input:focus {
            outline: 1px solid var(--main-color);
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
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        cursor: pointer;
      }
      .select-city-wrap {
        width: 191px;
        height: 48px;
        outline: none;
        border: 1px solid var(--help-color);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        cursor: pointer;
      }
      .drop-location {
        width: 191px;
        height: 144px;
        border: 1px solid var(--help-color);
        border-radius: 5px;
        position: absolute;
        cursor: pointer;
        .loc-wrap {
          padding: 8px 8px;
          &:hover {
            background-color: var(--disabled-color);
          }
        }
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

const LocationWrap = styled.div`
  position: relative;
  .default {
    border: 1px solid var(--disabled-color);
  }
  .active {
    border: 1px solid var(--main-color);
  }
`;
