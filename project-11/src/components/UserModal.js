import React, { useState, useEffect } from "react";
import { icons } from "../shared/util";
import { Image, Grid } from "../elements/index";
import { axiosInstance } from "../shared/api";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import styled from "styled-components";
import "../shared/App.css";

const UserModal = (props) => {
  const dispatch = useDispatch();
  const { name, onCancel } = props;
  const [editName, setEditName] = useState("");
  const [iconList, setIconList] = useState([]);
  const [iconState, setIconState] = useState([]);
  const [nickDoubleChk, setNickDoubleChk] = useState("");
  const [active, setActive] = useState(true);
  const [img, setImg] = useState("");

  const CheckActive = () => {
    iconState.length !== 0 ||
    (editName !== "" && nickDoubleChk === "사용 가능한 닉네임 입니다.")
      ? setActive(false)
      : setActive(true);
  };

  // 프로필 수정
  const EditProfile = () => {
    if (editName !== name && nickDoubleChk !== "사용 가능한 닉네임 입니다.") {
      window.alert("중복확인을 해주세요");
      return;
    }
    setNickDoubleChk();
    const newList = icons.map((icon, i) => {
      const object = { icons: icon, active: false };
      return object;
    });
    setIconList(newList);
    dispatch(postActions.editProfileDB(img, editName)); // 수정된 값을 보내줘야한다.
    onCancel();
  };

  useEffect(() => {
    if (editName === name) {
      setActive(false);
    }
  }, []);

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
    const newList = icons.map((icon, i) => {
      const object = { icons: icon, active: false };
      return object;
    });
    setIconList(newList);
    setNickDoubleChk();
  };

  // 프로필 클릭 이벤트

  useEffect(() => {
    const newList = icons.map((icon, i) => {
      const object = { icons: icon, active: false };
      return object;
    });
    setIconList(newList);
  }, []);

  // 클릭했을때 해당 요소 -> if
  // 의 active 반대로 바꾸고 -> !ic.active
  //  배열을 리턴 받아야한다. -> {}

  //원본배열 작업 후 원본배열을 다시 받기
  const handleClick = (i) => {
    const newList = iconList.map((ic, idx) => {
      if (i === idx) {
        //만약 인자로 받아온 i가 newList의 idx번째와 같다면
        // return {icons:ic.icons, active:!ic.active} //액티브를 반대값으로 리턴
        return {
          ...ic,
          active: !ic.active,
        };
      } else {
        //인덱스가 같지 않다면
        // return {icons:ic.icons, active:false} //원래 액티브값을 리턴
        return {
          ...ic,
          active: false,
        };
      }
    });
    setIconList(newList);

    const arr = newList.filter((item) => {
      return item.active === true;
    });
    setIconState(arr);
    if (editName === "") {
      setEditName(name);
    }
  };

  useEffect(() => {
    CheckActive();
  }, [handleClick]);

  return (
    <>
      <Modal>
        <Grid _className="modal-box">
          {/* <ReactModal
          isOpen={isOpen}
          // 모달 css는 shared folder-App.css 에 포함되어있습니다
          className="modal-box"
          overlayClassName="Overlay"
        > */}
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
            {iconList &&
              iconList.map((item, i) => {
                return (
                  <Grid>
                    <Image
                      size="50"
                      shape="circle"
                      src={item.icons}
                      key={i}
                      _className={item.active ? "icon" : "noneicon"}
                      _onClick={() => {
                        setImg(item);
                        handleClick(i);
                      }}
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
          {/* </ReactModal> */}
        </Grid>
      </Modal>
    </>
  );
};

export default UserModal;

const Modal = styled.div`
  max-width: 429px;
  height: 100vh;
  position: relative;

  .modal-box {
    width: 410px;
    height: 490px;
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -48%);
    border-radius: 15px;
    background: #fff;
    overflow: auto;
    box-shadow: rgba(255, 98, 111, 0.3) 0px 7px 29px 0px;
    -webkit-overflow-scrolling: "touch";
    outline: none;
    padding: 20px;
    text-align: center;
    z-index: 50;

    @media screen and (max-width: 376px) {
      width: 350px;
      height: 550px;
    }

    @media screen and (max-width: 321px) {
      width: 300px;
      height: 550px;
    }
  }
`;
const ExtraIcon = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  .noneicon {
    cursor: pointer;
  }
  .icon {
    border: 3px solid var(--main-color);
    cursor: pointer;
    animation: 0.6s ease-in-out loadEffect3;
  }
  @keyframes loadEffect3 {
    0% {
      opacity: 0;
      transform: scale(0.7);
    }
    65% {
      opacity: 0.65;
      transform: scale(1.01);
    }
    85% {
      opacity: 0.85;
      transform: scale(0.97);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media screen and (max-width: 376px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 321px) {
    grid-template-columns: repeat(4, 1fr);
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

  @media screen and (max-width: 321px) {
    width: 100%;
  }
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

  @media screen and (max-width: 376px) {
    .inputform {
      width: 80%;
    }

    .btnck {
      width: 20%;
    }
  }

  @media screen and (max-width: 321px) {
    .inputform {
      width: 75%;
    }

    .btnck {
      width: 25%;
    }
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
