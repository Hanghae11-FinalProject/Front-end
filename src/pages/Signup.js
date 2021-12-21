import React from 'react';
import styled from 'styled-components';
import Grid from '../elements/Grid';

const Signup = () => {
    return (
        <SignWrap>
            <Grid is_container='is_container' _className='wrap-border'>
                <div className='signup-wrap'>
                    <h1>회원가입</h1>
                    <div className='email-wrap'>
                    <input className='email' placeholder='이메일'/><button>중복확인</button>
                    </div>
                    <input placeholder='비밀번호'/>
                    <input placeholder='비밀번호 확인'/>
                    <input placeholder='닉네임'/>
                    <div className='address-wrap'>
                    <input className='address'placeholder='주소'/><button>검색</button>
                    </div>
                    <button>회원가입</button>
                </div>

            </Grid>
        </SignWrap>
    );
};

export default Signup;

const SignWrap = styled.div `
  .wrap-border{
    min-height: 926px;
    border: 1px solid #ededed;
  }
  .signup-wrap{
    display: flex;
    flex-direction: column;
    align-items: center;
    h1{
      padding: 20px;
      margin-bottom: 50px;
    }
    .email-wrap{
      display: flex;
      .email{
      width: 340px;
      height: 50px;
      border: 0px;
      background-color: #E2E2E2;
      border-radius: 20px 0px 0px 20px;
    }
    button{
      color: white;
      border-radius: 0 20px 20px 0;
      width: 60px;
      height: 50px;
      border: 0px;
      background-color: coral;
      cursor: pointer;
          &:hover{
            background-color: #fc6d3a;
          }
    }
    }
    
    input{
      width: 400px;
      height: 50px;
      border: 0px;
      background-color: #E2E2E2;
      border-radius: 20px;
      margin-bottom: 20px;
      outline: 0;
    }
    .address-wrap{
      display: flex;
      margin-bottom: 50px;
      .address{
        width: 350px;
        border-radius: 20px 0px 0px 20px;
      }
      button{
          color: white;
          height: 50px;
          width: 50px;
          border: 0;
          background-color: coral;
          border-radius: 0 20px 20px 0;
          cursor: pointer;
          &:hover{
            background-color: #fc6d3a;
          }
        }
    }
    button{
      width: 400px;
      height: 50px;
      border: 0px;
      background-color: coral;
      color: white;
      border-radius: 50px;
      cursor: pointer;
      &:hover{
        background-color: #fc6d3a;
      }
    }
  }


`