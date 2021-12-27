import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {IoIosArrowBack} from 'react-icons/io'
import {Grid} from '../elements';


const Login = () => {
  const [login_disabled, setLoginDisabled] = useState(true);
  const [input_values, setInputValues] = useState({user_id:'', user_pw:''})
  const [loginTrue, setLoginTrue] = useState(true)

  const handleChangeInput = (e) =>{
    setInputValues({
      ...input_values,
      [e.target.name]: e.target.value
    })
  }
  const handleClickLoginBtn = () =>{
    setLoginDisabled(true)
    setLoginTrue(true)
    // setLoginDisabled(false)
  }

  const handleKeyEnter = (e) => {
    if (e.key === 'Enter') {
      handleClickLoginBtn()
    } 
  }

  useEffect(()=>{
    if(input_values.user_id !== '' && input_values.user_pw !== ''){
      setLoginDisabled(false)
    }else{
      setLoginDisabled(true)
    }
    return () =>{
    }
  },[input_values])



    return (
            <SignupWrap>
                <Grid is_container='is_container' _className='grid-border'>
                    <div className='signup-wrap'>
                        <div className='signup-header-wrap'>
                            <IoIosArrowBack
                                style={{
                                    width: "30px",
                                    height: "30px"
                                }}/>
                            <text className='header-title'>로그인</text>
                        </div>
                        <div className='line'/>
                        <div className='signup-input-wrap'>
                            <text>이메일</text>
                            <input name='user_id' onChange={handleChangeInput} onKeyUp={handleKeyEnter} placeholder='abc@email.com'/>   
                            <text>비밀번호</text>
                            <input naem='user_pw' onChange={handleChangeInput} onKeyUp={handleKeyEnter} type='password' placeholder='영문, 숫자 포함 8자 이상'/>
                            {!loginTrue && <p className='alert-msg' style={{color:'red'}}>로그인 정보가 일치하지 않습니다.</p>}
                            <button onClick={handleClickLoginBtn} disabled={login_disabled} className='sign-btn'>
                            가입하기
                            </button>
                        </div>
                    </div>
                </Grid>
            </SignupWrap>
    );
};

export default Login;

const SignupWrap = styled.div `
  .grid-border{
    width: 100%;
    min-height: 926px;
    border: 1px solid #ededed;
    .signup-wrap{
      .signup-header-wrap{
        display: flex;
        align-items: center;
        margin: 20px 0 20px 0;
        position: relative;
        .header-title{
          position: absolute;
          left: 50%;
          font-size: 25px;
          margin-left: -42.5px;
        }
      }
    .line{
          width: 100%;
          height: 3px;
          background-color: #ededed;
          margin-bottom: 96px;
      }
      .signup-input-wrap{
        display: flex;
        flex-direction: column;
        padding: 0 16px;
        text{
          margin-bottom: 4px;
          margin-top: 32px;
        }
        input{
          margin-bottom: 16px;
          border-radius: 4px;
          max-width: 397px;
          height: 48px;
          outline: none;
          border: 1px solid #ededed;
        }
      } 
    }
    .address-wrap{
      display: flex;
      justify-content: space-between;
      .select-wrap{
        width: 191px;
        height: 48px;
        outline: none;
        border: 1px solid #ededed;
      }
      .select-city-wrap{
        width: 191px;
        height: 48px;
        outline: none;
        border: 1px solid #ededed;
      }
    }
    .sign-btn{
      background-color: #FF626F;
      text-align: center;
      width: 100%;
      max-width: 397px;
      height: 48px;
      border-radius: 50px;
      color: white;
      margin-top: 48px;
      border: 0px;
      cursor: pointer;
      opacity: 0.8;
      :disabled{
        cursor: not-allowed; 
        pointer-events: none;
        background-color: gray;
      }
      &:hover{
        opacity: 1;
      }
    }
  }
`