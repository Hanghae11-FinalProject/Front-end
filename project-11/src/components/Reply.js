import React, { useState } from "react";
import { Grid } from "../elements";
import CommentInput from "./CommentInput";
import styled from "styled-components";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsArrowReturnRight } from "react-icons/bs";

const Reply = ({ name }) => {
  const [btn, setBtn] = useState(false);
  const urname = name;
  return (
    <>
      <ReplyBox>
        <Grid is_flex is_container>
          <BsArrowReturnRight className="arrow" />
          <Grid _className="reply-box">
            <Grid is_flex flex_align="center" _className="user">
              <Profile></Profile>
              <p>
                맷돌이 <span className="chip">작성자</span>
              </p>
              <Grid _className="modal-menu">
                <BiDotsVerticalRounded
                  className="icon"
                  onClick={() => setBtn(true)}
                />
                <Grid
                  _className={btn ? "inner-menu active" : "inner-menu"}
                  _onClick={() => setBtn(false)}
                >
                  <li>수정하기</li>
                  <li>삭제하기</li>
                </Grid>
              </Grid>
            </Grid>
            <Comment>1개면 충분할 것 같아요</Comment>
            <Grid is_flex flex_align="center">
              <span>12.29</span>
              <span>20분전</span>
            </Grid>
          </Grid>
        </Grid>
      </ReplyBox>
      {/* 코멘트 인풋창 */}
      {btn && <CommentInput name={urname} />}
    </>
  );
};

export default Reply;

const ReplyBox = styled.div`
  margin: 10px 0;

  font-size: 14px;

  .arrow {
    color: var(--help-color);
    margin-right: 10px;
    font-size: 14px;
  }
  //답글 박스
  .reply-box {
    width: 100%;
    background-color: var(--light-color);
    border-radius: 6px;
    padding: 5px 5px;

    //글 작성자 인포부분
    .user {
      height: 30px;
      margin: 5px 0;

      p {
        width: 85%;

        display: flex;
        align-items: center;

        .chip {
          font-size: 10px;
          padding: 3px 8px;
          background-color: var(--main-color);
          color: #fff;
          border-radius: 12px;
        }
      }

      //단추메뉴 버튼
      .modal-menu {
        position: relative;

        .inner-menu {
          position: absolute;
          right: -5px;
          top: -70px;
          width: 150px;

          background-color: #fff;
          border: 1px solid var(--help-color);
          display: none;
          li {
            color: var(--active-color);
            padding: 8px 10px;
            cursor: pointer;

            &:hover {
              background-color: var(--main-light-color);
            }
          }
        }

        .active {
          display: block;
        }
      }
    }

    span {
      margin: 5px 5px;
      font-size: 12px;
      color: var(--help-color);
    }
  }
`;

const Profile = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--help-color);
  margin-right: 10px;
`;

const Comment = styled.div`
  padding-left: 5px;
`;
