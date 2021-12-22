import React, { useCallback } from "react";
import styled from "styled-components";
import Nav from "../shared/Nav";

const Write = () => {
  const [title, setTitle] = React.useState(""); // 제목
  const [content, setContent] = React.useState(""); // 내용
  const [category, setCategory] = React.useState(""); // 카테고리
  const [tagName, setHashtag] = React.useState(""); // 해쉬태그 onChange로 관리할 문자열
  const [hashArr, setHashArr] = React.useState([]); // 해시태그 담을 배열
  const [images, setImages] = React.useState([]); // 이미지
  const [active, setActive] = React.useState(true); // 버튼 액티브

  const cateOption = [
    { value: "Category", name: "Category" },
    { value: "생활용품", name: "생활용품" },
    { value: "의류", name: "의류" },
    { value: "식재료", name: "식재료" },
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

  // Upload 버튼 active 함수
  const checkActive = () => {
    title !== "" && content !== "" && hashArr !== []
      ? setActive(false)
      : setActive(true);
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
          <CateText>#해쉬태그</CateText>
          <HashInputOuter className="HashInputOuter">
            {" "}
            {/* 동적으로 생성되는 태그를 담을 div */}
            <HashInput
              className="HashInput"
              type="text"
              defaultValue={tagName}
              // onChange={onChangeHashtag}
              onKeyUp={createTag}
              placeholder="태그 추가하기!"
            />
          </HashInputOuter>
        </HashTagArea>
        <ImgArea>이미지ㅋ</ImgArea>
        <ContentArea>
          <ContentInput
            defaultValue={content}
            placeholder="내용을 작성하세요!"
            onChange={changeContent}
            onKeyUp={checkActive}
            rows={10}
          ></ContentInput>
        </ContentArea>
        <UploadBtn>업로드</UploadBtn>
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
  background-color: white;
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
      border: 1px solid #FEDBBE;
      height: 50px;
      border-radius: 10px;
      background-color: #FEDBBE;
      margin-left: 14px;
      margin-top: 8px;
      cursor: pointer;
      &:hover{
      background-color: #fc6d3a;
`;

export default Write;
