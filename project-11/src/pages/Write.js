import React, { useCallback } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper";
import { TiDelete } from "react-icons/ti";
import Nav from "../shared/Nav";
// style
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

SwiperCore.use([Pagination, Navigation]);

const Write = () => {
  const [title, setTitle] = React.useState(""); // 제목
  const [content, setContent] = React.useState(""); // 내용
  const [category, setCategory] = React.useState(""); // 카테고리
  const [tagName, setHashtag] = React.useState(""); // 해쉬태그 onChange로 관리할 문자열
  const [hashArr, setHashArr] = React.useState([]); // 해시태그 담을 배열
  const [images, setImages] = React.useState([]); // 이미지 aixos 통신용
  const [preImg, setPreImg] = React.useState([]); // preview용 이미지
  const [active, setActive] = React.useState(true); // 버튼 액티브

  const cateOption = [
    { value: "Category", name: "Category" },
    { value: "생활용품", name: "생활용품" },
    { value: "의류", name: "의류" },
    { value: "식품", name: "식품" },
    { value: "기타", name: "기타" },
  ];

  // 제목 onChange 함수
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  // 내용 onChange 함수
  const changeContent = (e) => {
    setContent(e.target.value);
  };

  // 카테고리 onChange 함수
  const changeCate = (e) => {
    setCategory(e.target.value);
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
        console.log(HashWrapInner.innerHTML);
        setHashArr(hashArr.filter((tagName) => tagName)); // filter()는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환
      });

      // input에서 enter로 태그 생성 enter의 키 코드는 13 이다!
      if (e.keyCode === 13 && e.target.value.trim() !== "") {
        // trim()은 문자열 좌우에서 공백을 제거하는 함수
        console.log("엔터로 된거닝?", e.target.value);
        HashWrapInner.innerHTML = "#" + e.target.value;
        GetHashContent?.appendChild(HashWrapInner); // 옵셔널체이닝 Tip. 존재하지 않아도 괜찮은 대상(?.의 앞부분)에만 사용해야한다!
        setHashArr((hashArr) => [...hashArr, tagName]);
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
    setImages(e.target.files); // axios통신용으로 따로 한번 저장 해주고!

    const nowImgURLList = [...preImg]; // 현재의 preImg 복사
    for (let i = 0; i < nowSelectImgList.length; i++) {
      const nowImgURL = URL.createObjectURL(nowSelectImgList[i]); // 미리보기 가능하도록 변수화
      //URL.createObjectURL() 이 친구는 상대경로를 만들어 주는 친구이다.
      nowImgURLList.push(nowImgURL); // 복사해놓은 preImg에 추가해주고
    }
    setPreImg(nowImgURLList); // 반복문이 끝난뒤 preImg 원본에 넣어준다.
  };

  // preview 이미지 삭제
  const deletePreImg = (x) => {
    const test = preImg.filter((item) => {
      // preImg를 요소 하나씩 filter를 돌려 만약 내가 누른 사진의 url이면 반환되지 못하도록 함수 설계
      if (item !== x) {
        return item;
      }
    });
    setPreImg(test);
  };

  // Upload 버튼 active 함수
  const checkActive = () => {
    title !== "" && content !== "" ? setActive(false) : setActive(true);
  };

  return (
    <React.Fragment>
      <Container>
        <TitleArea>
          <TitleInput
            defaultValue={title}
            type="text"
            maxLength={10}
            placeholder="제목을 입력하세요!"
            onChange={changeTitle}
            onKeyUp={checkActive}
          ></TitleInput>
        </TitleArea>
        <CateArea>
          <CateText>품목 카테고리</CateText>
          <CateSelect defaultValue={category} onChange={changeCate}>
            {cateOption.map((p) => (
              <option
                key={p.value}
                defaultValue={p.value}
                hidden={p.value === "Category" ? true : false}
              >
                {p.name}
              </option>
            ))}
          </CateSelect>
        </CateArea>
        <HashTagArea className="HashWrap">
          <CateText>#해시태그</CateText>
          <HashInputOuter className="HashInputOuter">
            {/* 동적으로 생성되는 태그를 담을 div */}
            <HashInput
              className="HashInput"
              type="text"
              Value={tagName}
              // onChange={onChangeHashtag}
              onKeyUp={createTag}
              placeholder="태그 추가하기!"
            />
          </HashInputOuter>
        </HashTagArea>
        <ImgArea>
          {images.length === 0 ? (
            <NoImgBox>
              <NoImg src="/static/noimage2.gif" />
            </NoImgBox>
          ) : (
            // 빈 배열인 경우
            <Slider>
              <Swiper
                className="Img-Preview"
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation
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
          )}

          <label htmlFor="input-file" className="input-Btn-Css">
            Add your photo
            <input
              type="file"
              onChange={addImage}
              encType="multipart/form-data"
              multiple="multiple" // multiple을 통해 여러개의 파일을 올릴 수 있다
              id="input-file" // 커스텀 디자인을 위한 라벨링
              className="input-Btn"
            />
          </label>
        </ImgArea>
        <ContentArea>
          <ContentInput
            defaultValue={content}
            placeholder="내용을 작성하세요!"
            onChange={changeContent}
            onKeyUp={checkActive}
            rows={10}
          ></ContentInput>
        </ContentArea>
        <UploadBtn
          className={!active ? "activeBtn" : "unActiveBtn"}
          disabled={active}
          onClick={() => {
            console.log("버튼활성화댐");
            console.log(preImg);
          }}
        >
          업로드
        </UploadBtn>
      </Container>
      <Nav />
    </React.Fragment>
  );
};

const Container = styled.div`
  max-width: 429px;
  min-height: 926px;
  background-color: #eee;
  padding: 16px;
  margin: auto;
  border-radius: 50px;
  border: 1px solid #ddd;
  .activeBtn {
    background-color: #fc6d3a;
  }
  .unActiveBtn {
    background-color: #fedbbe;
  }
`;

const TitleArea = styled.div`
  height: 50px;
  margin: 15px;
  margin-top: 40px;
  /* background-color: green; */
`;

const TitleInput = styled.input`
  width: 365px;
  height: 50px;
  font-size: 22px;
  border-radius: 8px;
  border: 1px solid #fedbbe;
`;

const CateArea = styled.div`
  height: 25px;
  margin: 15px;
  display: flex;
  /* background-color: yellow; */
`;

const CateText = styled.p`
  font-size: 20px;
`;

const CateSelect = styled.select`
  width: 110px;
  height: 30px;
  font-size: 18px;
  border-radius: 6px;
  margin-left: 10px;
  margin-top: -5px;
  cursor: pointer;
`;

const HashTagArea = styled.div`
  height: 75px;
  margin: 15px;
  /* background-color: blue; */
`;

const HashInputOuter = styled.div`
  display: flex;
  flex-wrap: wrap;
  .HashWrapInner {
    margin-top: 5px;
    background: #fedbbe;
    border-radius: 10px;
    padding: 4px 6px;
    color: #ff6e35;
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
  font-size: 18px;
  border-radius: 8px;
  border: 1px solid #fedbbe;
`;

const ImgArea = styled.div`
  height: 210px;
  margin: 50px 15px 15px 15px;
  /* background-color: white; */

  .input-Btn-Css {
    margin-left: 115px;
    padding: 6px 15px;
    background-color: var(--point-color);
    border-radius: 20px;
    color: black;
    cursor: pointer;
  }

  .input-Btn {
    display: none;
  }
`;

const NoImgBox = styled.div`
  width: 300px;
  height: 170px;
  margin: auto;
  margin-bottom: 10px;
  /* background-color: green; */
`;

const NoImg = styled.img`
  width: 220px;
  height: 160px;
  margin-left: 40px;
  margin-bottom: 20px;
  border: 1px solid black;
  border-radius: 10px;
  object-fit: fill;
`;

const Slider = styled.div`
  width: 300px;
  height: 170px;
  margin: auto;
  margin-bottom: 10px;
  .swiper-pagination-bullet-active {
    background-color: #ff8a3d !important;
    width: 16px !important;
    border-radius: 4px !important;
  }
  .slide {
    position: relative;
  }
  .swiper-button-prev {
    //사이즈 바꾸고 싶은디..ㅠ
  }
  .swiper-button-next {
    //사이즈 바꾸고 싶은디..ㅠ
  }
  .deleteBtn {
    position: absolute;
    margin-left: 240px;
    cursor: pointer;
  }
`;

const Preview = styled.img`
  width: 220px;
  height: 160px;
  margin-left: 40px;
  margin-bottom: 20px;
  object-fit: fill;
`;

const ContentArea = styled.div`
  height: 250px;
  margin: 15px;
`;

const ContentInput = styled.textarea`
  width: 365px;
  font-size: 22px;
  resize: none;
  border-radius: 8px;
  border: 1px solid #fedbbe;
`;

const UploadBtn = styled.button`
  color: black;
  font-size: 22px;
  width: 365px;
  border: 1px solid #fedbbe;
  height: 50px;
  border-radius: 10px;
  margin-left: 14px;
  margin-top: 8px;
  cursor: pointer;
`;

export default Write;
