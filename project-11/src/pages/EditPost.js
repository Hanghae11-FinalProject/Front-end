import React, { useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper";
import { useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { Grid } from "../elements/index";

import { getCookie } from "../shared/Cookie";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { MdOutlineCameraAlt } from "react-icons/md";
import { CgChevronLeft } from "react-icons/cg";
import { TiDelete } from "react-icons/ti";
import Nav from "../shared/Nav";
import Spinner from "../components/Spinner";
// style
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";

SwiperCore.use([Pagination, Navigation]);

const EditPost = (items) => {
  const dispatch = useDispatch();
  const token = getCookie("Token"); // 토큰 가져오기
  const inputRef = useRef(null); //해시태그 input
  const editItems = items.location.state.items; // 수정하기 용 Data
  const postId = editItems.postId;
  const is_edit = postId ? true : false;

  const [loading, setLoading] = React.useState(false); //글작성 완료시 스피너걸기 위한
  const [title, setTitle] = React.useState(""); // 제목
  const [content, setContent] = React.useState(""); // 내용
  const [myItem, setMyItem] = React.useState(""); // 교환할 물품
  const [exchangeItem, setExchangeItem] = React.useState(""); // 교환받을 물품
  const [category, setCategory] = React.useState("품목 선택"); // 카테고리
  const [tagName, setHashtag] = React.useState(""); // 해쉬태그 onChange로 관리할 문자열
  const [hashArr, setHashArr] = React.useState([]); // 해시태그 담을 배열
  const [images, setImages] = React.useState([]); // 이미지 aixos 통신용
  const [preImg, setPreImg] = React.useState([]); // preview용 이미지
  const [deleteEditImg, setDeleteEditImg] = React.useState([]); // 따로 수정하기할때 보내줄 url 저장소
  const [compare, setCompare] = React.useState([]); // 이미지, preview 두개 state 위치 비교를 위한 state
  const [active, setActive] = React.useState(true); // 버튼 액티브
  const [currentState, setCurrentState] = React.useState("Proceeding"); // currentState 기본값 넘겨주기
  const [is_open, setIs_open] = React.useState(false); // 모달창 활성화/비활성화 여부
  const modalClose = React.useRef(); // 모달 바깥 눌렀을 때 닫아줄 용도
  // useRef 함수는 current 속성을 가지고 있는 객체를 반환하는데,
  // 인자로 넘어온 초기값을 current속성에 할당한다. (여기선 e.target 값을 가져오는 용도)

  const cateOption = [
    "식품",
    "도서",
    "의류",
    "가구",
    "가전",
    "생활용품",
    "취미",
    "재능교환",
    "기타",
  ];

  // 모달 바깥을 click 했을 때 클릭 이벤트 발생 시키기 위한 useEffect
  useEffect(() => {
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
    } else return;
  };

  // select box 클릭시 모달창 open / 한번 더 자기자신 클릭시 close
  const modalControl = () => {
    if (is_open) {
      setIs_open(false);
    } else {
      setIs_open(true);
    }
  };

  // 제목 onChange 함수
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  // 내용 onChange 함수
  const changeContent = (e) => {
    setContent(e.target.value);
  };

  // 교환할 물품 onChange 함수
  const changeMyItem = (e) => {
    setMyItem(e.target.value);
  };

  // 교환받을 물품 onChange 함수
  const changeYourItem = (e) => {
    setExchangeItem(e.target.value);
  };

  // 해시태그 onChange 함수
  const onChangeHashtag = (e) => {
    setHashtag(e.target.value);
  };

  // 수정하기 image preview 및 데이터 불러오기
  useEffect(() => {
    let editPre = [];
    for (let i = 0; i < editItems.images.length; i++) {
      editPre.push(editItems.images[i].imageUrl);
    }
    setPreImg(editPre); // preview에 저장
    setCompare(editPre); // 비교용 배열에도 저장
    setTitle(editItems.title);
    setContent(editItems.content);
    setMyItem(editItems.myItem);
    setExchangeItem(editItems.exchangeItem);
    setCategory(editItems.categoryName);
  }, []);

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
        setHashArr(hashArr.filter((tagName) => tagName)); // filter()는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환
      });

      // input에서 enter로 태그 생성 enter의 키 코드는 13 이다!
      if (e.keyCode === 13 && e.target.value.trim() !== "") {
        // trim()은 문자열 좌우에서 공백을 제거하는 함수
        if (hashArr.length === 5) {
          return; // 갯수 제한은 되지만 다시 하나를 지웠다가 추가하면 또 5개를 쓸 수 있음..ㅠ
        }

        HashWrapInner.innerHTML = "#" + e.target.value;
        GetHashContent?.appendChild(HashWrapInner); // 옵셔널체이닝 Tip. 존재하지 않아도 괜찮은 대상(?.의 앞부분)에만 사용해야한다!
        const tag = { tagName: tagName };
        setHashArr((hashArr) => [...hashArr, tag]);
        setHashtag(""); // 태그를 추가한 뒤 새로운 태그를 추가하기 위해 tagName을 다시 빈 값으로 만들어준다.
      }
      inputRef.current.value = "";
    },
    [tagName, hashArr]
  );

  const addTag = () => {
    const GetHashContent = document.querySelector(".HashInputOuter");
    const HashWrapInner = document.createElement("div");
    HashWrapInner.className = "HashWrapInner";

    HashWrapInner.addEventListener("click", () => {
      GetHashContent?.removeChild(HashWrapInner);
      setHashArr(hashArr.filter((tagName) => tagName)); // filter()는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환
    });

    // input에서 enter로 태그 생성 enter의 키 코드는 13 이다!
    if (tagName.trim() !== "") {
      // trim()은 문자열 좌우에서 공백을 제거하는 함수
      if (hashArr.length === 5) {
        return; // 갯수 제한은 되지만 다시 하나를 지웠다가 추가하면 또 5개를 쓸 수 있음..ㅠ
      }

      HashWrapInner.innerHTML = "#" + tagName;
      GetHashContent?.appendChild(HashWrapInner); // 옵셔널체이닝 Tip. 존재하지 않아도 괜찮은 대상(?.의 앞부분)에만 사용해야한다!
      const tag = { tagName: tagName };
      setHashArr((hashArr) => [...hashArr, tag]);
      setHashtag(""); // 태그를 추가한 뒤 새로운 태그를 추가하기 위해 tagName을 다시 빈 값으로 만들어준다.
      inputRef.current.value = "";
    }
  };

  // 이미지, preview이미지 추가
  const addImage = (e) => {
    const nowSelectImgList = e.target.files; // 이미지파일 리스트 (object)

    if (images.length !== 0) {
      setImages([...images, e.target.files]);
    } else {
      // !!!*** 이미지를 추가한 뒤 중간에 또 추가하면 갯수가 리셋되는거
      setImages(e.target.files); // axios통신용으로 따로 한번 저장 해주고!
    }

    const nowImgURLList = [...preImg]; // 현재의 preImg 복사

    for (let i = 0; i < nowSelectImgList.length; i++) {
      const nowImgURL = URL.createObjectURL(nowSelectImgList[i]); // 미리보기 가능하도록 변수화
      //URL.createObjectURL() 이 친구는 상대경로를 만들어 주는 친구이다.
      nowImgURLList.push(nowImgURL); // 복사해놓은 preImg에 추가해주고
    }
    setPreImg([...nowImgURLList]); // 반복문이 끝난뒤 preImg 원본에 넣어준다.
  };

  // 이미지 파일, 기존 이미지url 추출 및 preview 이미지 삭제
  let deletedUrl = []; // 백에 보내줄 url을 담아줄 빈 배열
  let forImages = [...images];
  const deleteImages = (x) => {
    const deletePreImg = preImg.filter((item) => {
      // preImg를 요소 하나씩 filter를 돌려 만약 내가 누른 사진의 url이면 반환되지 못하도록 함수 설계
      if (item !== x) {
        return item;
      }
    });
    setPreImg(deletePreImg); // preview에서 빼주기

    // 수정전의 이미지 파일을 제외하고
    let idxLocation = ""; // 지우는 미리보기 이미지의 위치를 저장해주기 위한 변수
    for (let i = 0; i < preImg.length; i++) {
      if (preImg[i] === x) {
        idxLocation = i;
      }
    }
    // console.log(idxLocation - compare.length); // 위치 비교를 위한 배열의 길이만큼 빼준다
    let imgLocation = forImages[idxLocation - compare.length]; // 복사한 images배열에서의 지울 파일 위치 지정
    const deleteImg = forImages.filter((y) => {
      if (y !== imgLocation) {
        return y;
      }
    });
    // filter함수로 지울 파일만 제외하여 배열 재생성 후 setimages

    // 기존 이미지는 뺄 Url만 따로 담아서 DB에 보내주자 (이렇게 보내기로 함)
    if (x.indexOf("pingpong-bucket") !== -1) {
      deletedUrl.push(...deletedUrl, x);
      const Img = { imageUrl: deletedUrl[0] };
      setDeleteEditImg([...deleteEditImg, Img]);
      const deleteCompare = compare.filter((z) => {
        if (z !== x) {
          return z;
        }
      });
      setCompare(deleteCompare); // 프리뷰 사진을 먼저 지우고 다시 추가한 사진을 지울 경우 compare의 길이가 그대로 남아있으면 안되니 같이 빼준다.
    } else {
      setImages(deleteImg);
    }
  };

  // Upload 버튼 active 함수
  const checkActive = () => {
    title !== "" &&
    content !== "" &&
    myItem !== "" &&
    exchangeItem !== "" &&
    category !== "품목 선택"
      ? setActive(false)
      : setActive(true);
  };

  // 카테고리 액티브
  useEffect(() => {
    checkActive();
  }, [category]);

  // 수정 페이지 처음 들어올때 액티브 함수 실행
  useEffect(() => {
    checkActive();
  }, []);

  // 수정하기
  const editPost = async () => {
    setLoading(true);
    const formData = new FormData();
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
        myItem: myItem,
        exchangeItem: exchangeItem,
        tag: hashArr,
        images: deleteEditImg,
      })
    );
    for (let value of formData.values()) {
      // console.log(value);
    }
    await axios({
      method: "put",
      url: `https://whereshallwemeet.shop/api/posts/${postId}`,
      data: formData,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        // console.log("수정 완료", response);
        history.push(`/detail/${postId}`);
      })
      .catch((err) => {
        // console.log(err, "에러났니~");
      });
  };

  return (
    <React.Fragment>
      <Container>
        <Grid is_container _className="border background">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <MainTop>
                <CgChevronLeft
                  cursor={"pointer"}
                  size="30"
                  onClick={() => {
                    history.goBack();
                  }}
                />
                <TopText style={{ marginLeft: "6px" }}>글 수정하기</TopText>
                <TopText
                  style={{ padding: "6px" }}
                  className="activeBtn"
                  disabled={active}
                  onClick={editPost}
                >
                  완료
                </TopText>
              </MainTop>
              <TitleArea>
                <TitleInput
                  defaultValue={editItems.title}
                  type="text"
                  maxLength={20}
                  placeholder="제목 (20자 이하)"
                  onChange={changeTitle}
                  onKeyUp={checkActive}
                ></TitleInput>
              </TitleArea>

              <CateArea>
                <Catediv
                  onClick={modalControl}
                  ref={modalClose}
                  value={editItems.categoryName}
                  className={is_edit && is_open ? "active" : "selected"}
                >
                  <div>{category}</div>
                  {is_open ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </Catediv>
                {is_open && (
                  <>
                    <Grid _className="category-option">
                      {cateOption.map((options, idx) => {
                        return (
                          <p
                            key={idx}
                            onClick={() => {
                              setCategory(options);
                              setIs_open(false);
                            }}
                          >
                            {options}
                          </p>
                        );
                      })}
                    </Grid>
                  </>
                )}
              </CateArea>

              <TradeDiv>
                <TradeInput
                  defaultValue={editItems.myItem}
                  onChange={changeMyItem}
                  maxLength="10"
                  placeholder="교환할 물품 (1개 입력)"
                ></TradeInput>
                <CenterLine />
                <TradeInput
                  defaultValue={editItems.exchangeItem}
                  onChange={changeYourItem}
                  maxLength="10"
                  placeholder="교환받을 물품 (1개 입력)"
                ></TradeInput>
              </TradeDiv>

              <ImgArea>
                <label htmlFor="input-file" className="input-Btn-Css">
                  <MdOutlineCameraAlt size={30} />
                  {preImg.length} / 10
                  <input
                    type="file"
                    onChange={addImage}
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
                              deleteImages(x);
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
                  defaultValue={editItems.content}
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
                  <div className="input-btn">
                    <HashInput
                      className="HashInput"
                      type="text"
                      defaultValue={tagName}
                      onChange={onChangeHashtag}
                      onKeyUp={createTag}
                      placeholder="# 태그 입력"
                      ref={inputRef}
                    />
                    <button className="add-tag" onClick={addTag}>
                      추가
                    </button>
                  </div>
                </HashInputOuter>
              </HashTagArea>
              <Nav write={"write"} />
            </>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  margin: 0 auto;
  .border {
    height: 100vh;
    /* border: 1px solid var(--help-color); */
    background-color: #fff;
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
  height: 50px;

  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1);

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
  border-bottom: 1px solid var(--help-color);
  :focus {
    outline: none;
  }
  ::placeholder {
    color: var(--help-color);
  }
`;

const CateArea = styled.div`
  position: relative;
  z-index: 2;
  color: var(--inactive-text-color);
  margin: 8px 16px;

  border-bottom: 1px solid #eee;
  .category-option {
    width: 25.2rem;
    height: 398px;
    margin-top: 2px;
    position: absolute;
    background-color: #ffffff;
    border: 1px solid var(--disabled-color);
    border-radius: 6px;
    cursor: pointer;
    p {
      padding: 10px;
      &:hover {
        background-color: rgba(255, 98, 111, 0.05);
      }
    }
  }
  .default {
    outline: 1px solid var(--disabled-color);
    color: var(--disabled-color);
  }
  .active {
    outline: 3px solid var(--main-color);
  }
  .selected {
    color: var(--inactive-text-color);
    border: 2px solid var(--inactive-text-color);
  }
`;

const Catediv = styled.div`
  width: 25.2rem;
  height: 48px;
  padding: 0px 6px;
  font-size: 16px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--sub-font-color);
  cursor: pointer;
`;

const TradeDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 8px 16px;
  height: 55px;
  color: var(--help-color);
  border-bottom: 1px solid var(--help-color);
`;

const CenterLine = styled.div`
  width: 0px;
  height: 48px;
  border-right: 1px solid var(--help-color);
  margin-bottom: 8px;
`;

const TradeInput = styled.input`
  width: 50%;
  height: 40px;
  padding-left: 10px;
  margin-bottom: 8px;
  border: none;
  font-size: 16px;
  ::placeholder {
    color: var(--help-color);
  }
  :focus {
    outline: none;
  }
`;

const ImgArea = styled.div`
  height: 100px;
  display: flex;
  margin: 16px;
  border-bottom: 1px solid var(--help-color);

  .input-Btn-Css {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 5rem;
    height: 5rem;
    border: 1px solid var(--help-color);
    border-radius: 4px;
    cursor: pointer;
  }

  .input-Btn {
    display: none;
  }
`;

const Slider = styled.div`
  width: 20rem;

  .swiper-pagination-bullet-active {
    background-color: var(--main-color) !important;
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
  z-index: 2;
`;

const ContentArea = styled.div`
  height: 320px;
  max-height: 320px;
  margin: 16px;
`;

const ContentInput = styled.textarea`
  /* width: 24.6rem; */
  width: 100%;
  height: 280px;
  font-size: 16px;
  resize: none;
  font-family: "NanumSquareRound";
  border: none;
  outline: none;
  ::placeholder {
    color: var(--help-color);
  }
  :focus {
    outline: none;
  }
`;

const HashTagArea = styled.div`
  height: 150px;
  margin: 15px;
  margin-top: 50px;
  border-top: 1px solid var(--help-color);
`;

const HashInputOuter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .input-btn {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--help-color);
  }
  .HashWrapInner {
    margin-top: 5px;
    border-radius: 12px;
    border: 1px solid var(--main-color);
    padding: 4px 6px;
    color: var(--main-color);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
    line-height: 14px;
    margin-right: 5px;
    cursor: pointer;
  }
  .add-tag {
    padding: 5px 28px;
    width: 87px;
    height: 32px;
    border-radius: 4px;
    background-color: #fff;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
`;

const HashInput = styled.input`
  width: 310px;
  height: 55px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: var(--help-color);
  }
`;

export default EditPost;
