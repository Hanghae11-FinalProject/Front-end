// *** 패키지 import
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
// *** 액션 타입
const GET_POST = "GET_POST";
// *** 액션 생성 함수
const getPost = createAction(GET_POST, (postList) => ({ postList }));
// *** 초기값
const initialState = {
  postId: null,
  userId: null,
  locationId: null,
  locationName: null,
  accomoName: null,
  commentId: null,
  comment: null,
  date: null,
  rate: null,
};
// *** 미들웨어
// 서울 페이지 PostList
const getPostListDB = (postId) => {
  return function (dispatch, getState, { history }) {};
};
// *** 리듀서
export default handleActions(
  {
    [GET_POST]: (state, action) => {
      return produce(state, (draft) => {
        draft.locationId = action.payload.locationId;
        draft.locationName = action.payload.locationName;
        console.log(action.payload.locationId);
      });
    },
  },
  initialState
);
// *** 액션 생성 함수 export
const actionCreators = {
  getPostListDB,
};
export { actionCreators };
