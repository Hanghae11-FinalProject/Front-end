// *** 패키지 import
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { axiosInstance } from "../../shared/api";
import { getCookie, deleteCookie, setCookie } from "../../shared/Cookie";

// 액션 타입
const GET_CHAT = "SET_CHAT";

// 액션 생성 함수
const getChat = createAction(GET_CHAT, (data) => ({ data }));

// 초기값
const initialState = {
  chat_cnt: [],
};

// 토큰
const token = getCookie("Token");

//
const getChatCnt = () => {
  return (dispatch, getState, { history }) => {
    axiosInstance
      .get("/api/messageCount", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(getChat(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 리듀서
export default handleActions({
  [GET_CHAT]: (state, action) =>
    produce(state, (draft) => {
      draft.data.push(action.payload.data);
    }),
});

const actionCreators = {
  getChatCnt,
  getChat,
};

export { actionCreators };
