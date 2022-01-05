import React from 'react';
import styled from 'styled-components';
import { Grid } from '../elements';
import { history } from '../redux/configureStore';

const LoginCheck = () => {
    return (
        <Grid is_container='is_container'>
        <LoginCkWrap>
            <div className="modal-back"></div>
            <div className='modal-wrap'>
            <div className='icon-wrap'>
            <img src='/static/핑이 기본.png'/>
            <img src='/static/핑이 분노.png'/>
            <img src='/static/핑이 행복.png'/>
            </div>
            <div className='title'>
            <p>먼저 로그인이 필요해요!</p>
            </div>
            <hr className='line'/>
            <div className='subtitle'>
               <span onClick={()=>{history.push('/login')}}>로그인하러 가기</span> 
            </div>
            </div>
        </LoginCkWrap>
        </Grid>
    );
};

export default LoginCheck;

const LoginCkWrap = styled.div`
position: relative;
.modal-wrap{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 260px;
    height: 194px;
    border-radius: 20px;
    background-color: white;
    margin: 0 auto;
    position: absolute;
    top: 100%;
    left: 0%;
    transform: translate(25%, 150%);
    .icon-wrap{
        max-width: 92px;
        height: 50px;
        margin-bottom: 16px;
        img{
            width: 30px;
                height: 30px;
            }
        }
        .title{
            p{
                margin-bottom: 16px;
                font-size: 16px;
                font-weight: bold;
            }
        }
        .line{
            width: 100%;
            border: 0.5px solid var(--help-color);
            margin-bottom: 16px;
        }
        .subtitle{
            span{
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                color: var(--main-color);
            }
        }
    }
    .modal-back{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.25);
    }
    
    `