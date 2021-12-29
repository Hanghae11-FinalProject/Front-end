import React, { useCallback } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { actionCreators as postActions } from "../redux/modules/post";

import { MdOutlineCameraAlt } from "react-icons/md";
import { CgChevronLeft } from "react-icons/cg";
import { TiDelete } from "react-icons/ti";
import Nav from "../shared/Nav";
// style
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";

SwiperCore.use([Pagination, Navigation]);

const Write = (props) => {
  const dispatch = useDispatch();

  const [title, setTitle] = React.useState(""); // 제목
  const [content, setContent] = React.useState(""); // 내용
  const [myItem, setMyItem] = React.useState(""); // 교환할 물품
  const [exchangeItem, setExchangeItem] = React.useState(""); // 교환받을 물품
  const [category, setCategory] = React.useState(""); // 카테고리
  const [tagName, setHashtag] = React.useState(""); // 해쉬태그 onChange로 관리할 문자열
  const [hashArr, setHashArr] = React.useState([]); // 해시태그 담을 배열
  const [images, setImages] = React.useState([]); // 이미지 aixos 통신용
  const [preImg, setPreImg] = React.useState([]); // preview용 이미지
  const [active, setActive] = React.useState(true); // 버튼 액티브
  const [currentState, setCurrentState] = React.useState("Proceeding");
  const [postFiles, setPostFiles] = React.useState({
    file: [],
    previewURL: "",
  });

  const cateOption = [
    { value: "품목 선택", name: "품목 선택" },
    { value: "식품", name: "식품" },
    { value: "도서", name: "도서" },
    { value: "의류", name: "의류" },
    { value: "가구", name: "가구" },
    { value: "가전", name: "가전" },
    { value: "생활용품", name: "생활용품" },
    { value: "취미", name: "취미" },
    { value: "재능교환", name: "재능교환" },
  ];

  // 제목 onChange 함수
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  // 내용 onChange 함수
  const changeContent = (e) => {
    setContent(e.target.value);
    console.log(images.length);
    // console.log(preImg);
    console.log(hashArr);
  };

  // 교환할 물품 onChange 함수
  const changeMyItem = (e) => {
    setMyItem(e.target.value);
  };

  // 교환받을 물품 onChange 함수
  const changeYourItem = (e) => {
    setExchangeItem(e.target.value);
  };

  // 카테고리 onChange 함수
  const changeCate = (e) => {
    setCategory(e.target.value);
  };

  // 해시태그 onChange 함수
  const onChangeHashtag = (e) => {
    setHashtag(e.target.value);
  };

  // 해시태그 onKeyup 함수
  const createTag = useCallback(
    (e) => {
      // if (process.browser) { process is not defined 에러 발생!! 그래서 주석처리함
      const GetHashContent = document.querySelector(".HashInputOuter"); //HashInputOuter클라스에서 입력하는 요소를 불러온다!
      const HashWrapInner = document.createElement("div"); // div 만들기
      HashWrapInner.className = "HashWrapInner";

      // 태그 클릭 시 태그 삭제
      HashWrapInner.addEventListener("click", () => {
        GetHashContent?.removeChild(HashWrapInner);
        // console.log(HashWrapInner.innerHTML);
        setHashArr(hashArr.filter((tagName) => tagName)); // filter()는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환
      });

      // input에서 enter로 태그 생성 enter의 키 코드는 13 이다!
      if (e.keyCode === 13 && e.target.value.trim() !== "") {
        // trim()은 문자열 좌우에서 공백을 제거하는 함수
        if (hashArr.length === 5) {
          return; // 갯수 제한은 되지만 다시 하나를 지웠다가 추가하면 또 5개를 쓸 수 있음..ㅠ
        }
        console.log("엔터로 된거닝?", e.target.value);
        HashWrapInner.innerHTML = "#" + e.target.value;
        GetHashContent?.appendChild(HashWrapInner); // 옵셔널체이닝 Tip. 존재하지 않아도 괜찮은 대상(?.의 앞부분)에만 사용해야한다!
        const tag = { tagName: tagName };
        setHashArr((hashArr) => [...hashArr, tag]);
        setHashtag(""); // 태그를 추가한 뒤 새로운 태그를 추가하기 위해 tagName을 다시 빈 값으로 만들어준다.
      }
    },
    // },
    [tagName, hashArr]
  );

  // 이미지, preview이미지
  const addImage = (e) => {
    console.log(e.target.files);
    const nowSelectImgList = e.target.files; // 이미지파일 리스트 (object)
    const MAX_LENGTH = 3;

    if (images.length !== 0) {
      setImages([...images, e.target.files]);
    } else {
      // !!!*** 이미지를 추가한 뒤 중간에 또 추가하면 갯수가 리셋되는거
      setImages(e.target.files); // axios통신용으로 따로 한번 저장 해주고!
    }
    console.log(images);
    const nowImgURLList = [...preImg]; // 현재의 preImg 복사
    for (let i = 0; i < nowSelectImgList.length; i++) {
      const nowImgURL = URL.createObjectURL(nowSelectImgList[i]); // 미리보기 가능하도록 변수화
      //URL.createObjectURL() 이 친구는 상대경로를 만들어 주는 친구이다.
      nowImgURLList.push(nowImgURL); // 복사해놓은 preImg에 추가해주고
    }
    // if (Array.from(nowSelectImgList).length > MAX_LENGTH) {
    //   e.preventDefault();
    //   console.log("3개 끝");
    //   return;
    // }
    setPreImg([...nowImgURLList]); // 반복문이 끝난뒤 preImg 원본에 넣어준다.
  };

  // preview 이미지 삭제
  const deletePreImg = (x) => {
    const deleteImg = preImg.filter((item) => {
      // preImg를 요소 하나씩 filter를 돌려 만약 내가 누른 사진의 url이면 반환되지 못하도록 함수 설계
      if (item !== x) {
        return item;
      }
    });
    setPreImg(deleteImg);
  };

  // Upload 버튼 active 함수
  const checkActive = () => {
    title !== "" &&
    content !== "" &&
    myItem !== "" &&
    exchangeItem !== "" &&
    category !== "" // 만약 카테고리를 맨 마지막에 선택하면 다른 인풋에서 값을 입력해야지만 활성화가 된다.
      ? setActive(false)
      : setActive(true);
  };

  // 게시글 작성
  const postWrite = async () => {
    const formData = new FormData();
    // console.log(images);
    for (let i = 0; i < images.length; i++) {
      formData.append("image", images[i]);
    }
    formData.append(
      "data",
      JSON.stringify({
        title: title,
        content: content,
        category: category,
        currentState: currentState,
        // tag: [{ tagName: "아이고" }, { tagName: "이것" }],
        tag: hashArr,
        myItem: myItem,
        exchangeItem: exchangeItem,
      })
    );
    for (let value of formData.values()) {
      console.log(value);
    }
    await axios({
      method: "post",
      url: "http://15.164.222.25/api/posts",
      data: formData,
      headers: {
        "Content-type": "multipart/form-data",
        Authorization:
          "BEARER eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFWFBJUkVEX0RBVEUiOjE2NDEwMDQxNDAsImlzcyI6InNwYXJ0YSIsIlVTRVJfTkFNRSI6Imp5YmluMTIzOTZAbmF2ZXIuY29tIn0.jrvXPzZOuljjmYbGno4RRUyejV6Oowlw0AkheU5pskg",
      },
    })
      .then((response) => {
        console.log("작성성공이니~", response);
      })
      .catch((err) => {
        console.log(err, "에러났니~");
      });
  };

  return (
    <React.Fragment>
      <Container>

        <Grid is_container _className="border">
          <MainTop>
            <CgChevronLeft size="30" />
            <TopText style={{ marginLeft: "6px" }}>글 작성하기</TopText>
            <TopText
       style={{ padding: "6px" }}
            className={!active ? "activeBtn" : "unActiveBtn"}
            disabled={active}
            onClick={postWrite}
              }}

          >
            완료
          </TopText>
        </MainTop>
        <TitleArea>
          <TitleInput
            Value={title}
            type="text"
            maxLength={15}
            placeholder="제목 (15자 이하)"
            onChange={changeTitle}
            onKeyUp={checkActive}
          ></TitleInput>
        </TitleArea>

        <CateArea>
          <CateSelect defaultValue={category} onChange={changeCate}>
            {cateOption.map((p) => (
              <option
                key={p.value}
                value={p.value}
                hidden={p.value === "품목 선택" ? true : false}
                // className={p.value === "품목 선택" ? "basic" : "notBasic"}
              >
                {p.name}
              </option>
            ))}
          </CateSelect>
        </CateArea>

        <TradeDiv>
          <TradeInput
            // value={myItem}
            onChange={changeMyItem}
            maxLength="6"
            placeholder="교환할 물품 (1개 입력)"
          ></TradeInput>
          <CenterLine />
          <TradeInput
            // value={yourItem}
            onChange={changeYourItem}
            maxLength="6"
            placeholder="교환받을 물품 (1개 입력)"
          ></TradeInput>
        </TradeDiv>

        <ImgArea>
          <label htmlFor="input-file" className="input-Btn-Css">
            <MdOutlineCameraAlt size={30} />
            {images.length} / 10
            <input
              type="file"
              onChange={addImage}
              // max={5}
              encType="multipart/form-data"
              multiple="multiple" // multiple을 통해 여러개의 파일을 올릴 수 있다
              id="input-file" // 커스텀 디자인을 위한 라벨링
              className="input-Btn"
            />
          </label>
          <Slider>
            <Swiper
              className="Img-Preview"
              spaceBetween={0}
              slidesPerView={3}
              pagination={{ clickable: true }}

            >
              {preImg.map((x, index) => {
                return (
                  <SwiperSlide key={index} className="slide">
                    <TiDelete
                      size="25px"
                      className="deleteBtn"
                      onClick={() => {
                        deletePreImg(x);
                      }}
                    />
                    <Preview src={x} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Slider>
        </ImgArea>

        <ContentArea>
          <ContentInput
            defaultValue={content}
            placeholder="게시글 내용을 작성해주세요. 허위품목 및 판매금지품목은 게시가 제한될 수 있어요."
            onChange={changeContent}
            onKeyUp={checkActive}
            rows={19}
            maxLength="300"
          ></ContentInput>
        </ContentArea>

        <HashTagArea className="HashWrap">
          <HashInputOuter className="HashInputOuter">
            {/* 동적으로 생성되는 태그를 담을 div */}
            <HashInput
              className="HashInput"
              type="text"
              defaultValue={tagName}
              onChange={onChangeHashtag}
              onKeyUp={createTag}
              placeholder="# 태그 입력 (최대 5개)"
            />
          </HashInputOuter>
        </HashTagArea>

        </Grid>
      </Container>
      <Nav />
    </React.Fragment>
  );
};

const Container = styled.div`

  margin: 0 auto;
  .border {
    height: 100vh;
    border: 1px solid var(--help-color);
    .activeBtn {
      color: var(--main-color);
      cursor: pointer;
    }
    .unActiveBtn {
      color: var(--disabled-color);
      cursor: pointer;
    }

  }
`;

const MainTop = styled.div`
  height: 44px;
  margin: 8px;
  /* margin-top: 49px !important; */
  border-bottom: 2px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TopText = styled.p`
  font-size: 20px;
`;

const TitleArea = styled.div`
  height: 50px;
  margin: 8px 16px;
`;

const TitleInput = styled.input`
  width: 99.9%;
  height: 50px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #eee;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: var(--sub-font-color);
  }
`;

const CateArea = styled.div`
  display: flex;
  margin: 8px 16px;
  border-bottom: 2px solid #eee;
`;

const Catediv = styled.div`
  width: 25.2rem;
  font-size: 16px;
  border-radius: 6px;
  height: 48px;
  border: 1px solid var(--sub-font-color);
  color: var(--sub-font-color);
`;

const CateSelect = styled.select`
  width: 25.2rem;
  height: 48px;
  font-size: 16px;
  border-radius: 6px;
  margin-top: 8px;
  margin-bottom: 16px;
  color: var(--sub-font-color);
  border: 1px solid var(--sub-font-color);
  cursor: pointer;
  :focus {
    outline: none;
  }
  /* .basic {
    border: 1px solid #eee;
  }
  .notBasic {
    border: 1px solid black;
  } */ // 선택했을땐 검정색으로 어케하징
`;

const TradeDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 8px 16px;
  height: 55px;
  border-bottom: 2px solid #eee;
`;

const CenterLine = styled.div`
  width: 0px;
  height: 48px;
  border-right: 1px solid #eee;
  margin-bottom: 8px;
`;

const TradeInput = styled.input`

  width: 50%;
  height: 40px;
  padding-left: 10px;

  margin-bottom: 8px;
  border: none;
  font-size: 16px;
  color: var(--sub-font-color);
  :focus {
    outline: none;
  }
`;

const ImgArea = styled.div`
  height: 100px;
  display: flex;
  margin: 16px;
  border-bottom: 2px solid #eee;

  .input-Btn-Css {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 5rem;
    height: 5rem;
    padding: 15px;
    border: 1px solid var(--sub-font-color);
    border-radius: 4px;
    color: black;
    cursor: pointer;
  }

  .input-Btn {
    display: none;
  }
`;

const Slider = styled.div`
  width: 20rem;

  .swiper-pagination-bullet-active {
    background-color: #ff8a3d !important;
    width: 16px !important;
    border-radius: 4px !important;
  }
  .slide {
    position: relative;
  }
  .deleteBtn {
    position: absolute;
    margin-left: 5.3rem;
    margin-top: -0.2rem;
    cursor: pointer;
  }
`;

const Preview = styled.img`
  width: 5rem;
  height: 5rem;
  margin-left: 1.5rem;
  object-fit: fill;
`;

const ContentArea = styled.div`
  height: 330px;
  margin: 16px;
`;

const ContentInput = styled.textarea`
  width: 24.6rem;
  font-size: 16px;
  resize: none;
  border: none;
  :focus {
    outline: none;
  }
`;

const HashTagArea = styled.div`
  height: 75px;
  margin: 15px;
  border-top: 2px solid #eee;
`;

const HashInputOuter = styled.div`
  display: flex;
  flex-wrap: wrap;
  .HashWrapInner {
    margin-top: 5px;
    border-radius: 10px;
    border: 1px solid #ff626f;
    padding: 4px 6px;
    color: #ff626f;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
    line-height: 14px;
    margin-right: 5px;
    cursor: pointer;
  }
`;

const HashInput = styled.input`
  width: 365px;
  height: 40px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  :focus {
    outline: none;
  }
`;

export default Write;
