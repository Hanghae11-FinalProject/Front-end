// *** 패키지 import
import React from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { Grid, Button, Input, Text, Span } from "../elements";
import { useHistory } from "react-router";
import axios from "axios";
const test = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = localStorage.getItem("user_token");
  // // 모달창 열렸는지 여부
  // const [modalIsOpen, setModalIsOpen] = React.useState(
  //   props.modal ? true : false
  // );
  // 아이디, 비밀번호, 비밀번호 확인
  const [username, setId] = React.useState(""); // 아이디
  const [password, setPwd] = React.useState(""); // 비밀번호
  const [passwordCheck, setPwdCheck] = React.useState(""); // 비밀번호
  // 오류 메세지 상태 저장
  const [idMessage, setIdMessage] = React.useState("");
  const [pwdMessage, setPwdMessage] = React.useState("");
  const [pwdCheckMessage, setPwdCheckMessage] = React.useState("");
  // 아이디 중복 체크
  const [overlap, setOverlap] = React.useState(false);
  const [idCurrent, setIdCurrent] = React.useState();
  const [pwdCurrent, setPwdCurrent] = React.useState();
  // 유효성 검사
  const [isId, setIsId] = React.useState("");
  const [isPwd, setIsPwd] = React.useState("");
  const [isPwdCheck, setIsPwdCheck] = React.useState("");
  // disabled 활성화 여부
  const [active, setActive] = React.useState(true);
  // // 모달창을 닫으면 header의 state도 false로 바꾸기
  // const modalOff = () => {
  //   setModalIsOpen(false);
  //   if (props.setLoginModal) {
  //     // setLoginModal이 있을 경우에 false로 바꿉니다.
  //     props.setLoginModal(false);
  //   }
  //   props.setSignUpModal(false);
  // };
  // disabled 체크
  const checkActive = () => {
    const regPwd = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{3,20}$/;
    overlap === true &&
    username !== "" &&
    password !== "" &&
    passwordCheck !== "" &&
    password === passwordCheck &&
    regPwd.test(password)
      ? setActive(false)
      : setActive(true);
  };
  // id 중복 검사
  const overlapCheck = () => {
    axios
      .post(
        "http://3.37.36.119/api/idCheck",
        { username: username },
        { headers: { Authorization: token } }
      )
      .then((response) => {
        // 아이디가 중복되지 않은 경우 true 반환
        // 아이디가 중복인 경우 false 반환
        console.log("중복 검사 성공");
        const regId = /^[a-zA-Z0-9]+([-_]|[a-zA-Z0-9]){2,19}$/g;
        const regPwd = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{3,20}$/;
        // 사용 가능한 아이디일 경우
        if (response.data.result && regId.test(idCurrent) && idCurrent) {
          setIsId(true); // 유효성 검사 true
          setOverlap(response.data.result); // 중복 검사 true
          setIdMessage("사용 가능한 아이디입니다."); // span 태그
          // 비밀번호를 입력 안했을 경우 회원가입 버튼 비활성화
          if (password === passwordCheck && regPwd.test(pwdCurrent)) {
            setActive(false);
          }
        } else if (!regId.test(idCurrent)) {
          // 정규식 검사에 맞지 않는 아이디일 경우
          setIsId(false);
          setIdMessage("영문, 숫자, -_를 조합하여 3~20자로 만들어주세요!");
          setActive(true);
        } else {
          // 사용 할 수 없는 아이디일 경우
          setIsId(false); // 유효성 검사 false
          setOverlap(response.data.result); // 중복 검사 false
          setIdMessage("중복된 아이디입니다."); // span 태그
          setActive(true); // 사용 할 수 없는 아이디일 경우 회원가입 버튼 비활성화
        }
      })
      .catch((err) => {
        console.log("중복 검사 실패");
      });
  };
  // 아이디 유효성 검사
  const idCheck = (e) => {
    setId(e.target.value);
    // 아이디 정규식이 너무 헷갈림 특수기호 -_ 나중에 한번더 확인할 것 !
    const regId = /^[a-zA-Z0-9]+([-_]|[a-zA-Z0-9]){2,19}$/g;
    const idCurrnet = e.target.value;
    setIdCurrent(idCurrnet);
    if (!regId.test(idCurrent)) {
      setIdMessage("영문, 숫자, -_를 조합하여 3~20자로 만들어주세요!");
      setIsId(false);
    } else {
      setIdMessage("올바른 아이디 형식이에요 :)");
      setIsId(true);
    }
  };
  // 비밀번호 유효성 검사
  const pwdCheck = (e) => {
    setPwd(e.target.value);
    const regPwd = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{3,20}$/;
    const pwdCurrent = e.target.value;
    setPwdCurrent(pwdCurrent);
    if (!regPwd.test(pwdCurrent)) {
      setPwdMessage("영문, 숫자를 조합하여 3~20자로 만들어주세요!");
      setIsPwd(false);
    } else {
      setPwdMessage("올바른 비밀번호에요 :)");
      setIsPwd(true);
    }
  };
  // 비밀번호 일치 여부
  const isSamePwd = (e) => {
    setPwdCheck(e.target.value);
    const regPwd = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{3,20}$/;
    const SamePwdCurrent = e.target.value;
    if (!regPwd.test(SamePwdCurrent)) {
      setPwdCheckMessage(
        "형식에 맞지 않는 비밀번호입니다.. 다시 확인 해주세요!"
      );
      setIsPwdCheck(false);
    } else if (
      password !== "" &&
      passwordCheck !== "" &&
      password === SamePwdCurrent
    ) {
      setPwdCheckMessage("비밀번호가 같아요 :)");
      setIsPwdCheck(true);
    } else {
      setPwdCheckMessage("비밀번호가 틀려요... 다시 확인 해주세요!");
      setIsPwdCheck(false);
    }
  };
  // signUpDB 실행!
  //  -> 보통은 다른 함수 안에서 실행하고 onClick에 넣어줬는데 그렇게 안해서 400이 뜨나?
  const signUpCheck = () => {
    dispatch(userActions.signUpDB(username, password, passwordCheck));
    setModalIsOpen(false);
    props.setSignUpModal(false);
    props.setLoginModal(true); // 회원가입 성공 시 로그인 모달창 띄움
  };
  // 뷰
  return (
    <React.Fragment>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={modalOff}
        style={{
          // inLine Styles
          content: {
            left: "32.5%",
            right: "32.5%",
            botton: "10%",
          },
        }}
      >
        <Grid padding="16px" center>
          <Text size="3vw" bold>
            회원가입
          </Text>
          <Grid padding="0px 0px" height="20%">
            <Input
              placeholder="아이디를 입력하세요."
              type="text"
              value={username}
              _onChange={idCheck}
              _onKeyUp={checkActive}
            />
            {username.length > 0 && (
              <>
                <br />
                <Span size="3px" className={`${isId ? "success" : "error"}`}>
                  {idMessage}
                </Span>
              </>
            )}
            <br />
            <Button
              text="중복검사"
              width="18vw"
              margin="3% 0px 3% 0px"
              _onClick={overlapCheck}
            ></Button>
            <br />
            <Grid margin="1% 0px 0px 0px">
              <Input
                placeholder="비밀번호를 입력하세요."
                type="password"
                value={password}
                _onChange={pwdCheck}
                _onKeyUp={checkActive}
              />
              {password.length > 0 && (
                <>
                  <br />
                  <Span size="3px" className={`${isPwd ? "success" : "error"}`}>
                    {pwdMessage}
                  </Span>
                </>
              )}
            </Grid>
            <br />
            <Grid>
              <Input
                placeholder="비밀번호를 다시 입력하세요."
                type="password"
                value={passwordCheck}
                _onChange={isSamePwd}
                _onKeyUp={checkActive}
              />
              {passwordCheck.length > 0 && (
                <>
                  <br />
                  <Span
                    size="3px"
                    className={`${isPwdCheck ? "success" : "error"}`}
                  >
                    {pwdCheckMessage}
                  </Span>
                </>
              )}
            </Grid>
            <br />
            <Button
              text="회원가입하기"
              className={!active ? "activeBtn" : "unActiveBtn"}
              width="18vw"
              margin="3% 0px 3% 0px"
              _onClick={signUpCheck}
              disabled={active}
            ></Button>
          </Grid>
        </Grid>
      </Modal>
    </React.Fragment>
  );
};
export default test;