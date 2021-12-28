// *** 패키지 import
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { axiosInstance } from "../../shared/api";
// *** 액션 타입
const GET_POST = "GET_POST";

// *** 액션 생성 함수
const getPosts = createAction(GET_POST, (post_data) => ({ post_data }));

// *** 초기값
const initialState = {
  posts: [],
  page: 0,
  has_next: false,
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

const getPostAction = (post_data, count) => {
  return async (dispatch, getState, { history }) => {
    axiosInstance
      .post(`/api/category/${count}`, {
        categoryName: post_data.category,
        address: post_data.location,
      })
      .then((res) => {
        let is_next = null;
        if (res.data.length < 6) {
          is_next = false;
        } else {
          is_next = true;
        }
        let post_data = {
          posts: res.data,
          page: count + 1,
          next: is_next,
        };
        dispatch(getPosts(post_data));
      });
  };
};
// *** 리듀서
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.posts.push(...action.payload.post_data.posts);
        draft.has_next = action.payload.post_data.next;
        draft.page = action.payload.post_data.page;
      }),
  },
  initialState
);

const actionCreators = {

  addPostDB,
  getPostAction,
};

export { actionCreators };
