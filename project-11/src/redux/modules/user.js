// *** 패키지 import
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";



// *** 액션 타입
const LOGIN = "user/LOGIN";
// *** 액션 생성 함수
const setLogin = createAction(LOGIN, (user) => ({ user }));
// *** 초기값
const initialState = {
  user: null,
  userId: null,
  email: null,
  is_login: false,
};
//회원가입//
const registerDB = (userId, pw, pw_check, email) => {
  return;
  // function (dispatch, getState,{history}){
  // // apis.signup(userId, pw, pw_check, email);
  // alert(
  //   "회원가입을 축하합니다.",
  //   "로그인페이지로 이동합니다.",
  //   "success"
  // ).then(history.push("pages/Login"))
  // }
};
// *** 미들웨어


// *** 리듀서
export default handleActions(
  {
    [LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = false;
      }),
  },
  initialState
);
// *** 액션 생성 함수 export
const actionCreators = {
  registerDB,
};
export { actionCreators };
