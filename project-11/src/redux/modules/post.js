// *** 패키지 import
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { axiosInstance } from "../../shared/api";
import { getCookie } from "../../shared/Cookie";

// *** 액션 타입
const GET_POST = "GET_POST";
const GET_ONEPOST = "GET_ONEPOST";
const GET_DETAIL = "GET_DETAIL";
const ADD_COMMENT = "ADD_COMMENT";
const ADD_CHILDCOMMENT = "ADD_CHILDCOMMENT";
const DEL_COMMENT = "DEL_COMMENT";
const EDIT_PROFILE = "EDIT_PROFILE";
const GET_PROFILE = "GET_PROFILE";

// *** 액션 생성 함수
const getPosts = createAction(GET_POST, (_post_data) => ({ _post_data }));
const getOnePost = createAction(GET_ONEPOST, (data) => ({ data }));
const getDetail = createAction(GET_DETAIL, (data) => ({ data }));
const addComment = createAction(ADD_COMMENT, (comment) => ({ comment }));
const addChildComment = createAction(ADD_CHILDCOMMENT, (comment) => ({
  comment,
}));
const delComment = createAction(DEL_COMMENT, (commentid) => ({ commentid }));
// 프로필 수정
const getProfile = createAction(GET_PROFILE, (profile) => ({ profile }));
const editProfile = createAction(EDIT_PROFILE, (edit) => ({ edit }));

// *** 초기값
const initialState = {
  post: [],
  posts: [],
  page: 0,
  has_next: false,
  comments: [],
  children: [],
  commentCnt: "",
  location: "",
  category: "",

  profile: [],
};

// *** 미들웨어

//프로필 수정
const getProfileDB = () => {
  return async (dispatch, getState, { history }) => {
    const token = getCookie("Token");
    await axiosInstance
      .get("/api/userInfos", { headers: { Authorization: token } })
      .then((response) => {
        console.log(response);
        dispatch(getProfile(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// axiosInstance.put('/api/userInfos',
//     {nickname:editName,profileImg:img},
//     {headers:{Authorization: token }})
//     .then((response)=>{
//       console.log('프로필 수정',response)
//     })

// 프로필 수정2
const editProfileDB = (img, nickname, username) => {
  return async (dispatch, getState, { history }) => {
    const token = getCookie("Token");
    await axiosInstance
      .put(
        "/api/userInfos",
        { nickname: nickname, profileImg: img, username: username },
        { headers: { Authorization: token } }
      )
      .then((response) => {
        console.log(response);
        dispatch(editProfile(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
// get 형식 그대로 백에다가 수정된 데이터 요청하기

//메인 게시글 조회
const getPostAction = (area, cate, count) => {
  return async (dispatch, getState, { history }) => {
    console.log("미들웨어에 넘어온 값 (장소,카테,페이지) ", area, cate, count);
    axiosInstance
      .post(`api/category?page=${count}`, {
        categoryName: [cate],
        address: [area],
      })
      .then((res) => {
        console.log("통신 후 리듀스 저장 전 목록", res.data, count);
        let is_next = null;

        if (res.data.data.length < 5) {
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

//게시글 가져오기
const get_onepost = (postid) => {
  return (dispatch, getState, { history }) => {
    axiosInstance
      .get(`/api/posts/${postid}`)
      .then((res) => {
        console.log("redux detail post", res.data);
        const _data = res.data;
        dispatch(getDetail(_data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//게시글 댓글만 가져오기
const get_Comment = (postid) => {
  return (dispatch, getState, { history }) => {
    axiosInstance
      .get(`/api/posts/${postid}`)
      .then((res) => {
        console.log("redux detail ", res.data.comments);
        const _data = res.data.comments;
        dispatch(getOnePost(_data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//게시글 상세 페이지 댓글 쓰기
const add_comment = (id, replyId, Newcomment) => {
  return function (dispatch, getState, { history }) {
    const token = getCookie("Token");

    axiosInstance
      .post(
        `/api/comments/`,
        {
          postId: id,
          parentId: replyId,
          content: Newcomment,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log("댓글 쓰기 성공", res);
        dispatch(addComment(res));
      })
      .catch((err) => {
        console.log("댓글 쓰기 실패", err);
      });
  };
};

//게시글 상세 페이지 대댓글 쓰기
const add_childcomment = (id, replyId, Newcomment) => {
  return function (dispatch, getState, { history }) {
    const token = getCookie("Token");

    axiosInstance
      .post(
        `/api/comments/`,
        {
          postId: id,
          parentId: replyId,
          content: Newcomment,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log("댓글 쓰기 성공", res);
        dispatch(addChildComment(res));
      })
      .catch((err) => {
        console.log("댓글 쓰기 실패", err);
      });
  };
};

//게시글 상세 페이지 댓글 삭제
const del_comment = (commentid) => {
  return function (dispatch, getState, { history }) {
    const token = getCookie("Token");

    axiosInstance
      .delete(`/api/comments/${commentid}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        //삭제되는 댓글 정보를 받는다.
        console.log("delete sucess", res);
        //받아오는 정보중 id값만을 이용한다
        dispatch(delComment(res.data));
      })
      .catch((err) => console.log("delete fail", err));
  };
};

// *** 리듀서
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        //카테고리를 셀렉해주기 위해서 push대신에 하지만 무한스크롤을 위해push해야함
        draft.posts.push(...action.payload._post_data.posts);

        //새 값을 받아서 기존의 값에 더해서 중복된 아이들 지워내고 배열에 넣어주기

        // let arrStr = JSON.stringify(action.payload._post_data.posts);
        // const newArr = draft.posts.filter((el, idx) => {
        //   return arrStr.includes(JSON.stringify(el));
        // });
        // console.log("걸러진 배열", newArr);

        // draft.posts.push(...newArr);

        if (action.payload._post_data.page) {
          draft.page = action.payload._post_data.page;
        }

        draft.has_next = action.payload._post_data.next;
      }),

    [GET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload.data;
      }),

    // [GET_ONEPOST]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.posts.comments = action.payload.data;
    // draft.children = action.payload.data[0].children;
    // draft.commentCnt = action.payload.data.length;
    // }),

    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        //post 안에 comments!!!
        draft.post.comments.push(action.payload.comment.data);
      }),

    [ADD_CHILDCOMMENT]: (state, action) =>
      produce(state, (draft) => {
        console.log(draft.children, "children");
        draft.post.comments[0].children.push(action.payload.comment.data);
      }),

    [DEL_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const newComment = draft.post.comments.filter(
          (co, id) => co.id !== action.payload.commentid
        );
        console.log(newComment, "newcomment");
        draft.post.comments = [...newComment];
      }),
    [GET_PROFILE]: (state, action) =>
      // draft는 initailstate 저장소 위치 지정
      produce(state, (draft) => {
        // action.payload는 위에서 전달하는 데이터가 들어있다. dispatch 부분
        draft.profile = action.payload.profile;
        console.log(action.payload.profile);
      }),

    [EDIT_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.profile = action.payload.edit;
      }),
  },
  initialState
);

const actionCreators = {
  getPostAction,
  getPosts,
  get_Comment,
  add_comment,
  del_comment,
  add_childcomment,
  get_onepost,
  getProfileDB,
  editProfileDB,
};

export { actionCreators };
