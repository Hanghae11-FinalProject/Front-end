// *** 패키지 import
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
// *** 액션 타입
const GET_POST = "GET_POST";
const LOADING = "LOADING";

// *** 액션 생성 함수
const getPost = createAction(GET_POST, (postList) => ({ postList }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
// *** 초기값
const initialState = {
  postId: null,
  nickname: null,
  title: null,
  content: null,
  address: null,
  images: null,
  currentState: null,
  createAt: null,
  paging: { start: null, next: null, size: 4 },
  is_loading: false,
};
// *** 미들웨어

// 게시글 작성
const addPostDB = (title, content, category, tagName, images) => {
  return function (dispatch, getState, { history }) {
    const token = document.cookie; // 쿠키에서 토큰 어케가져옴?ㅋ

    axios
      .post(
        "http://15.164.222.25/api/posts",
        { title, content, category, tag: [{ tagName }], images: [{ images }] },
        {
          headers: { AUthorization: token },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log("에러에용", err);
      });
  };
};

// 서울 페이지 PostList
const getPostListDB = () => {
  return function (dispatch, getState, { history }) {
    const token = document.cookie.getItem("user_token");

    dispatch(loading(true));

    axios
      .get("/api/posts", {
        headers: { AUthorization: token },
      })
      .then((response) => {
        if (response.data === "") {
          window.alert("게시물이 없습니다.");
          return;
        }

        console.log("게시물 조회 성공");
        dispatch(getPost(response.data));
        history.replace("/");
      })
      .catch((err) => {
        console.log("게시물 조회 실패", err);
      });
  };
};
// *** 리듀서
export default handleActions(
  {
    [GET_POST]: (state, action) => {
      return produce(state, (draft) => {
        draft.postId = action.payload.postId;
        draft.nickname = action.payload.nickname;
        draft.title = action.payload.title;
        draft.content = action.payload.content;
        draft.address = action.payload.address;
        draft.images = action.payload.images;
        draft.currentState = action.payload.currentState;
        draft.createAt = action.payload.createAt;
      });
    },
    [LOADING]: (state, action) => {
      return produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      });
    },
  },
  initialState
);
// *** 액션 생성 함수 export
const actionCreators = {
  getPostListDB,
  addPostDB,
};
export { actionCreators };
