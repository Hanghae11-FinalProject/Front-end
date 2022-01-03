import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { Grid } from "../elements";
import { useForm } from "react-hook-form";
import {axiosInstance } from "../shared/api";
import {IoMdArrowDropdown} from 'react-icons/io'
import { history } from "../redux/configureStore";

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
  
  const [idDoubleChk, setIsDoubleChk] = useState("");
  const [nickDoubleChk, setNickDoubleChk] = useState("");
  const [pwDoubleChk, setPwDoubleChk] = useState("");
  const [pwChk, setPwChk] = useState("");
  // disabled 활성화 여부
  const [active, setActive] = useState(true);
  const [actId, setActId] = useState(false);
  const [actNic, setActNic] = useState(false);

  const checkemail = watch("email");
  const checknickname = watch('nickname')
  const checkpw = watch('password')
  const checkpwconfirm = watch('password_confirm')


  // useRef 특정 돔을 선택할때 사용하는데 엘리먼트 크기를 가져올때, 스크롤바 위치를 가져올때, 엘리먼트 포커스를 설정해줘야 할 때 등..
  password.current = watch("password");

  // disabled 체크
  const checkActive = () => {
    actNic&&
    actId &&
    checkemail !== "" &&
    checknickname !== "" &&
    checkpw !== "" &&
    checkpwconfirm !== "" &&
    checkpw === checkpwconfirm && is_location !== "시/군/구"
      ? setActive(false)
      : setActive(true);
  };

 useEffect(()=> {
    checkActive()
  },[is_location])

  const onSubmit = (data) => {
    console.log(is_location)
    axiosInstance
      .post("user/signup", {
        username: data.email,
        password: data.password,
        passwordCheck: data.password_confirm,
        nickname: data.nickname,
        address: is_location,
        profileImg: 
          "https://i.pinimg.com/564x/36/d5/a6/36d5a6aaf858916199e15fded53b698e.jpg",
      })
      .then((response) => {
        console.log(response)
        if(!response.data.code){
          window.alert('축하합니다 회원가입에 성공하셨습니다.')
          history.push('/login')
        }else{
          window.alert('아이디,닉네임 중복확인을 해주세요')
        }
      })
      .catch((err) => {
        console.log("회원가입 실패", err);
      });
  };

  const idCheck = () => {
    let RegId = /^\S+@\S+$/i;
    const check = RegId.test(checkemail)
    setActId(true)
    if(!check){
      // 유효성 통과 못 한거
      console.log(check, "유효성 노 통과")
      setIsDoubleChk('이메일 형식에 맞지 않습니다.')
      return;
    }else{
       console.log(check, "유효성 통과") 
      //유효성 통과 한거
      //axios
      axiosInstance
      .post("/user/idCheck", { username: checkemail })
      .then((response) => {
        console.log("중복확인 성공!", response);
        if(response.data === ""){
          console.log("사용가능한 이메일" )
          setIsDoubleChk('사용 가능한 이메일 입니다.')
        }else{
          console.log(response.data.message)
          setIsDoubleChk(response.data.message)
        }   
      })
    }


  };
  const nicknameCheck = () => {
    let RegNick = /^[a-zA-Zㄱ-힣0-9][a-zA-Zㄱ-힣0-9]{2,10}$/;
    const check = RegNick.test(checknickname)
    setActNic(true)
    if(!check){
      // 유효성 통과 못 한거
      console.log(check, "유효성 노 통과")
      setNickDoubleChk('한글, 영문, 숫자 조합 2~10자로 입력하세요')
      return;
    }else{
       console.log(check, "유효성 통과")
      //유효성 통과 한거
      //axios

    axiosInstance
      .post("/user/nicknameCheck", {
        nickname: checknickname,
      })
      .then((response) => {
        console.log("닉넴 중복확인 성공!", response.data);
        if(response.data === "") {
          console.log('사용가능한 닉네임')
          setNickDoubleChk('사용 가능한 닉네임 입니다.')
        }else {
          console.log(response.data.message)
          setNickDoubleChk(response.data.message)
        }
      })}
  };



  const passwordCheck = () => {
    let RegPw = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    const check = RegPw.test(checkpw)
     
    if(!check){
      console.log(check, "유효성 노 통과")
      setPwDoubleChk('영문, 숫자, 특수문자 포함 8~16자로 입력해주세요')
    }else{ 
      setPwDoubleChk('')
       console.log(check, "유효성 통과")
   }
  };

  const pwCheck = () => {
    if(checkpw===checkpwconfirm){
      setPwChk('비밀번호가 일치합니다.')
    }else{
      setPwChk('비밀번호가 일치하지 않습니다.')
    }
  }



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
                  placeholder="이메일을 입력하세요"
                  onKeyUp={checkActive}
                />
                <button type="button" className="doublecheck" onClick={idCheck}>
                  중복확인
                </button>
              </Grid>
              {idDoubleChk && (
                <>
                <p
                  style={{
                    color: "red",
                    fontSize: "13px",
                  }}
                >
                  {idDoubleChk}
                </p> 
                </>
              )}
              <span>비밀번호</span>
              <input
              onKeyUp={checkActive,passwordCheck}
                type="password"
                name="password"
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
                })}
                placeholder="영문, 숫자, 특수문자 포함 8~16자 이상"
              />{pwDoubleChk && <p className="password">{pwDoubleChk}</p>}
              <span>비밀번호 재확인</span>
              <input
              onKeyUp={checkActive,pwCheck}
                type="password"
                name="password_confirm"
                {...register("password_confirm", {
                  required: true,
                  validate: (value) => value === password.current,
                })}
                placeholder="영문, 숫자, 특수문자 포함 8~16자 이상"
              />
              {pwChk && <p className="password-confirm">{pwChk}</p>}
              <span>닉네임</span>
              <Grid
                is_flex="is_flex"
                flex_align="center"
                _className="doubleinput"
              >
                <input
                onKeyUp={checkActive}
                  name="nickname"
                  {...register("nickname", {
                    required: true,
                    pattern:  /^[a-zA-Zㄱ-힣0-9][a-zA-Zㄱ-힣0-9]{2,10}$/,
                  })}
                  placeholder="한글, 영문, 숫자 조합 2~10자 이상"
                />
                <button type="button" className="doublecheck" onClick={nicknameCheck}>
                  중복확인
                </button>
              </Grid>
              {nickDoubleChk &&  (
                <p
                  style={{
                    color: "red",
                    fontSize: "13px",
                  }}
                >
                  {nickDoubleChk}
                </p>
              )}
      
              <span>주소</span>
              <div className="address-wrap">
                <div className="select-wrap">
                  <span className="select-address-wrap">서울시</span><IoMdArrowDropdown/>
                </div>


                  <LocationWrap>
                <Grid _className={
                is_open ? "active" : "default"
              }>
                  <div className="select-city-wrap" onClick={()=>{
                  setIs_open(true);
                }}>
                  {is_location}<IoMdArrowDropdown/>
                </div>
                </Grid>
      
                {is_open && (
                  <>
                  <Grid _className='drop-location'>
                    {locations.map((op, i)=>{
                   
                      return (
                      <p
                      className="loc-wrap"
                      key={i}
                      onClick={() => {     
                        setIs_open(false);
                        setIs_Location(op)}}
                      >
                        {op}
                      </p> 
                      )
                    })}                  
                      </Grid>
                    </>
                  )}
                </LocationWrap>
                </div>
                      
              <button  disabled={active} className="sign-btn" >
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
          left: 40%;
          font-size: 20px;
          font-weight: bold;
        }
      }
      .signup-input-wrap {
        display: flex;
        flex-direction: column;
        padding: 0 16px;
        .password-confirm{
          color: red;
          font-size: 13px;
        }
        .password{
          color: red;
          font-size: 13px;
        }
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
        input:focus{
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
        .select-address-wrap{
          margin: 0;
        }
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
