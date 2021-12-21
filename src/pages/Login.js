import React from 'react';
import Grid from "../elements/Grid"
import styled from 'styled-components';
import {BsPerson} from 'react-icons/bs'
import {BsLock} from 'react-icons/bs'


const Login = () => {
    return (
        <LoginWrap>
            <Grid is_container='is_container'_className='wrapborder'>
                <div className='login-wrap'>
                    <h1>로그인</h1>
                    <img className='login-logo' src='static/로고.png'/>
                    <input placeholder='아이디'/>
                    <input placeholder='비밀번호'/>
                    <button className='loginBtn'>로그인</button>
                    <button className='signUpBtn'>회원가입</button>
                </div>
            </Grid>

        </LoginWrap>
    );
};

export default Login;

const LoginWrap = styled.div `
  .wrapborder{
    min-height: 926px;
    border: 1px solid #ededed;
  }
  .login-wrap{
    display: flex;
    flex-direction: column;
    align-items: center;
    h1{
      padding: 20px;
    }
    .login-logo{
      width: 150px;
      height: 150px;
      margin-bottom: 60px;
    }
    input{
      background-color: #E2E2E2;
      border: 0;
      width: 400px;
      height: 50px;
      margin-bottom: 20px;
      border-radius: 20px;
    }
    .loginBtn{
      color: white;
      width: 400px;
      border: 0px;
      height: 50px;
      border-radius: 20px;
      background-color: coral;
      margin-bottom: 10px;
      cursor: pointer;
      &:hover{
      background-color: #fc6d3a;
    }
    }
    .signUpBtn{
      color: black;
      width: 400px;
      border: 1px solid coral;
      height: 50px;
      border-radius: 20px;
      background-color: white;
      margin-bottom: 30px;
      cursor: pointer;
      &:hover{
      background-color: #fc6d3a;
    }
    }
    .line{
      width: 100%;
      height: 1px;
      background-color: coral;
      margin-bottom: 20px;
    }
    text{
      font-size: 12px;
      margin-bottom: 20px;
    }
    .snsIconWrap{
      display: flex;
      img{
        width: 60px;
        margin: 0px 20px 0px 20px;
        cursor: pointer;
      }
    }
  }
`