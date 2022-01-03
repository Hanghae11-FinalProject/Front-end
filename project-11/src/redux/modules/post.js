// *** 패키지 import
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { axiosInstance } from "../../shared/api";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";
// *** 액션 타입
const GET_POST = "GET_POST";

// *** 액션 생성 함수
const getPosts = createAction(GET_POST, (_post_data) => ({ _post_data }));

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
    const token = getCookie("Token");

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

//메인 게시글 조회
const getPostAction = (post_data, count) => {
  return async (dispatch, getState, { history }) => {
    console.log("미들웨어에 넘어온 지역 ", post_data);
    axiosInstance
      .post(`api/category?page=${count}`, {
        categoryName: [post_data.category],
        address: [post_data.location],
      })
      .then((res) => {
        console.log("리덕스 저장 전 목록", res.data.data, count);
        let is_next = null;

        if (res.data.data.length < 6) {
          is_next = false;
        } else {
          is_next = true;
        }

        let _post_data = {
          posts: res.data.data,
          page: count + 1,
          next: is_next,
        };
        dispatch(getPosts(_post_data));
      });
  };
};

// *** 리듀서
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        //카테고리를 셀렉해주기 위해서 push대신에 하지만 무한스크롤을 위해push해야함
        draft.posts = action.payload._post_data.posts;

        console.log("리듀서 페이지 값 저장", action.payload._post_data.page);

        //paging 값이 있다면~ 새로운 값으로
        if (action.payload._post_data.page) {
          draft.page = action.payload._post_data.page;
        }
        draft.has_next = action.payload._post_data.next;
      }),
  },
  initialState
);

const actionCreators = {
  addPostDB,
  getPostAction,
  getPosts,
};

export { actionCreators };
