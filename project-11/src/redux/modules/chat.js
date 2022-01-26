// *** 패키지 import
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

let sockjs = new SockJS("https://whereshallwemeet.shop/webSocket");
let stompClient = Stomp.over(sockjs);
stompClient.debug = null;
// 액션 타입
const SET_STOMP = "SET_STOMP";

// 액션 생성 함수
const setStomp = createAction(SET_STOMP, (data) => ({ data }));

// 초기값
const initialState = {
  stompClient: stompClient,
};

// 리듀서
export default handleActions(
  {
    [SET_STOMP]: (state, action) =>
      produce(state, (draft) => {
        draft.stompClient = action.payload.data;
      }),
  },
  initialState
);

const actionCreators = {
  setStomp,
};

export { actionCreators };
