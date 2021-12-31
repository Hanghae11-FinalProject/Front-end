import React from "react";
import styled from "styled-components";

import { axiosInstance } from "../shared/api";
import { Grid } from "../elements";
import { CgChevronLeft } from "react-icons/cg";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useHistory } from "react-router-dom";

const InputAdd = () => {
  const history = useHistory();
  const modalClose = React.useRef();

  const [is_Open, setIs_Open] = React.useState(false);
  const [is_city, setIs_city] = React.useState("시/도");
  const cities = ["서울시"];

  const ModalControl = () => {
    if (is_Open) {
      setIs_Open(false);
    } else {
      setIs_Open(true);
    }
  };

  const [is_open, setIs_open] = React.useState(false);
  const [is_location, setIs_Location] = React.useState("시/군/구");
  const locations = ["성북구", "서대문구", "마포구", "동대문구"];

  const modalControl = () => {
    if (is_open) {
      setIs_open(false);
    } else {
      setIs_open(true);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", clickCloseModal);
    return () => {
      document.removeEventListener("click", clickCloseModal);
    }; // 여기서 click을 쓴 이유는 mousedown은 클릭하는 순간 이벤트 발생,
  }); // click은 클릭이 끝나는 순간 이벤트가 동작 또한 클릭을 떼는 경우도 이벤트 동작 x

  // 모달 바깥 클릭 했을 시에 발생시킬 이벤트
  const clickCloseModal = (e) => {
    if (is_open && !modalClose.current.contains(e.target)) {
      //contains 함수는 요소가 current 안에 있는지 검사하여 Boolean값을 리턴
      // 현재 이벤트를 실행한 부분이 modalClose.current에 포함이 되지 않으면 false, 포함되거나 동일하다면 true입니다.
      setIs_open(false);
    } else if (is_Open && !modalClose.current.contains(e.target)) {
      setIs_Open(false);
    } else return;
  };

  // 주소 입력 완료!
  const signUp = () => {
    axiosInstance
      .post("user/address", {})
      .then((res) => {
        console.log("주소입력 완료", res);

        history.push("/");
      })
      .catch((err) => {
        console.log("주소입력 실패", err);
      });
  };

  return (
    <>
      <InputAddWrap>
        <Grid is_container _className="border">
          <MainTop>
            <CgChevronLeft size="30" className="icon" />
            <TopText style={{ marginLeft: "6px" }}>추가 정보 입력</TopText>
          </MainTop>
          <div className="text-box">
            <span>주소</span>
          </div>
          <AddressBox>
            {/* <div className="select-box-wrap"> */}
            <LocationWrap>
              <Grid _className={is_Open ? "active" : "default"}>
                <div
                  className="select-wrap"
                  ref={modalClose}
                  onClick={ModalControl}
                >
                  {is_city}
                  {is_Open ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </div>
              </Grid>

              {is_Open && (
                <>
                  <Grid _className="drop-city">
                    {cities.map((op, i) => {
                      return (
                        <p
                          className="loc-wrap"
                          key={i}
                          onClick={() => {
                            setIs_Open(false);
                            setIs_city(op);
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

            <LocationWrap>
              <Grid _className={is_open ? "active" : "default"}>
                <div
                  className="select-wrap"
                  ref={modalClose}
                  onClick={modalControl}
                >
                  {is_location}
                  {is_open ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
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
            {/* </div> */}
          </AddressBox>
          <button className="sign-btn" onClick={signUp}>
            가입하기
          </button>
        </Grid>
      </InputAddWrap>
    </>
  );
};

const InputAddWrap = styled.div`
  .border {
    height: 100vh;
    border-right: 1px solid var(--help-color);
    border-left: 1px solid var(--help-color);
    text-align: center;
  }
  .text-box {
    margin-top: 28.5vh;
    display: flex;
    margin-left: 16px;
    margin-bottom: 8px;
  }
  .sign-btn {
    background-color: var(--main-color);
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
    :disabled {
      cursor: not-allowed;
      pointer-events: none;
      background-color: var(--disabled-color);
    }
    &:hover {
      opacity: 1;
    }
  }
`;

const MainTop = styled.div`
  height: 44px;
  margin: 8px;
  border-bottom: 2px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .icon {
    position: absolute;
    left: 0;
    cursor: pointer;
  }
`;

const TopText = styled.p`
  font-size: 20px;
`;

const AddressBox = styled.div`
  display: flex;
  justify-content: space-evenly;

  .select-wrap {
    width: 12rem;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    cursor: pointer;
  }

  .drop-city {
    width: 12rem;
    height: 37.5px;
    border: 1px solid var(--help-color);
    border-radius: 5px;
    position: absolute;
    top: -75%;
    background-color: #fff;
    cursor: pointer;

    .loc-wrap {
      padding: 8px 8px;
      display: flex;
      &:hover {
        background-color: rgba(255, 98, 111, 0.05);
      }
    }
  }

  .drop-location {
    width: 12rem;
    height: 144px;
    border: 1px solid var(--help-color);
    border-radius: 5px;
    position: absolute;
    top: -18vh;
    background-color: #fff;
    cursor: pointer;

    .loc-wrap {
      padding: 8px 8px;
      display: flex;
      &:hover {
        background-color: rgba(255, 98, 111, 0.05);
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

export default InputAdd;
