// *** 패키지 import
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { axiosInstance } from "../../shared/api";
import { getCookie, deleteCookie, setCookie } from "../../shared/Cookie";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

// let sockjs = new SockJS("https://whereshallwemeet.shop/webSocket");
// let stompClient = Stomp.over(sockjs);

// 액션 타입
const GET_CHAT = "GET_CHAT";
const SET_STOMP = "SET_STOMP";

// 액션 생성 함수
const getChat = createAction(GET_CHAT, (data) => ({ data }));
const setStomp = createAction(SET_STOMP, (data) => ({ data }));

// 초기값
const initialState = {
  notReadingMessageCount: 0,
  stompClient: [],
};

// 토큰
const token = getCookie("Token");

//
// const getChatCnt = () => {
//   return (dispatch, getState, { history }) => {
//     axiosInstance
//       .get("/api/messageCount", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res);
//         dispatch(getChat(res));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

// 리듀서
export default handleActions(
  {
    [GET_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.notReadingMessageCount = action.payload.data;
      }),
    [SET_STOMP]: (state, action) =>
      produce(state, (draft) => {
        draft.stompClient = action.payload.data;
      }),
  },
  initialState
);

const actionCreators = {
  // getChatCnt,
  getChat,
  setStomp,
};

export { actionCreators };
