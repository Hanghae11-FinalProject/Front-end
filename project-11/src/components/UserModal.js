import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { icons } from "../shared/util";
import { Image, Grid } from "../elements/index";
import { axiosInstance } from "../shared/api";
import { getCookie } from "../shared/Cookie";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import styled from "styled-components";

const UserModal = (props) => {
  const { name, isOpen, onCancel } = props;
  console.log(props);
  const [editName, setEditName] = useState(`${name}`);

  const username = useSelector((state) => state.post.profile.username);

  const [nickDoubleChk, setNickDoubleChk] = useState("");
  const [active, setActive] = useState(true);
  const dispatch = useDispatch();
  const [img, setImg] = useState("");
  const token = getCookie("Token");

  const CheckActive = () => {
    editName !== name && editName !== ""
      ? nickDoubleChk === "사용 가능한 닉네임 입니다."
        ? setActive(false)
        : setActive(true)
      : setActive(true);
  };

  useEffect(() => {
    CheckActive();
  }, [nickDoubleChk]);

  useEffect(() => {
    if (editName === name) {
      setActive(false);
    }
  }, []);

  // 프로필 수정
  const EditProfile = () => {
    dispatch(postActions.editProfileDB(img, editName, username)); // 수정된 값을 보내줘야한다.
    onCancel();
  };

  // 닉네임 중복확인
  const nicknameCheck = () => {
    let RegNick = /^[a-zA-Zㄱ-힣0-9][a-zA-Zㄱ-힣0-9]{2,10}$/;
    const check = RegNick.test(editName);
    if (!check) {
      console.log(check, "유효성 노 통과");
      setNickDoubleChk("한글, 영문, 숫자 조합 2~10자로 입력하세요");
      return;
    } else {
      console.log(check, "유효성 통과");

      axiosInstance
        .post("/user/nicknameCheck", {
          nickname: editName,
        })
        .then((response) => {
          console.log("닉넴 중복확인 성공!", response.data);
          if (response.data === "") {
            console.log("사용가능한 닉네임");
            setNickDoubleChk("사용 가능한 닉네임 입니다.");
          } else {
            console.log(response.data.message);
            setNickDoubleChk(response.data.message);
          }
        });
    }
  };

  const handleClose = () => {
    onCancel();
  };
  return (
    <>
      <ReactModal
        isOpen={isOpen}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            width: "410px",
            height: "430px",
            position: "absolute",
            top: "40%",
            left: " 50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid #eee",
            borderRadius: "15px",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            outline: "none",
            padding: "20px",
            textAlign: "center",
          },
        }}
      >
        <TitleWrap>
          <p className="title">프로필 수정</p>
          <p className="nickname">닉네임</p>
        </TitleWrap>
        <BtnInputWrap>
          <input
            type="text"
            className="inputform"
            defaultValue={name}
            placeholder="한글 또는 영문 10자이내"
            onKeyUp={CheckActive}
            onChange={(e) => setEditName(e.target.value)}
          />
          <button className="btnck" onClick={nicknameCheck}>
            중복확인
          </button>
        </BtnInputWrap>
        {nickDoubleChk && (
          <span
            style={{
              display: "flex",
              marginTop: "5px",
              color: "red",
              fontSize: "13px",
            }}
          >
            {nickDoubleChk}
          </span>
        )}
        <div>
          <IconTitleWrap>
            <p className="icontitle">프로필 아이콘</p>
          </IconTitleWrap>
        </div>
        <ExtraIcon>
          {icons.map((item, i) => {
            return (
              <Grid
                _onClick={() => {
                  setImg(item);
                }}
              >
                <Image
                  size="50"
                  shape="circle"
                  src={item}
                  key={i}
                  _className="icons"
                />
              </Grid>
            );
          })}
        </ExtraIcon>

        <BtnBox>
          <Btn onClick={EditProfile} disabled={active}>
            완료
          </Btn>

          <Btn onClick={handleClose}>닫기</Btn>
        </BtnBox>
      </ReactModal>
    </>
  );
};

export default UserModal;

const ExtraIcon = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  .icons {
    cursor: pointer;
  }
`;

const TitleWrap = styled.div`
  .title {
    margin-bottom: 10px;
    display: flex;
    font-size: 16px;
    font-weight: bold;
  }
  .nickname {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
    display: flex;
  }
`;

const BtnBox = styled.div`
  width: 50%;
  padding: 20px 0;
  margin: 0 auto;
`;

const Btn = styled.button`
  padding: 10px 15px;
  background-color: var(--main-color);
  color: #fff;
  border-radius: 6px;
  margin: 0 5px;
  border: 0;
  outline: 0;
  cursor: pointer;
  :disabled {
    cursor: not-allowed;
    pointer-events: none;
    background-color: var(--disabled-color);
  }
`;

const BtnInputWrap = styled.div`
  display: flex;
  .inputform {
    width: 85%;
    padding: 10px 10px;
    outline: 0;
    border: 1px solid var(--help-color);
  }
  .btnck {
    width: 15%;
    height: 40px;
    background-color: var(--main-color);
    color: #fff;
    border-radius: 6px;
    margin: 0 5px;
    border: 0;
    outline: 0;
    font-size: 12px;
    cursor: pointer;
  }
`;
const IconTitleWrap = styled.div`
  margin-top: 20px;
  .icontitle {
    display: flex;
    font-size: 14px;
    font-weight: bold;
  }
`;
