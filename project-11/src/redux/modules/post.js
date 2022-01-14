// *** 패키지 import
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { axiosInstance } from "../../shared/api";
import { getCookie } from "../../shared/Cookie";
import { IoNewspaperOutline } from "react-icons/io5";

// *** 액션 타입
const GET_POST = "GET_POST";
const GET_CATE = "GET_CATE";
const GET_DETAIL = "GET_DETAIL";
const DEL_DETAIL = "DEL_DETAIL";
const ADD_COMMENT = "ADD_COMMENT";
const ADD_CHILDCOMMENT = "ADD_CHILDCOMMENT";
const DEL_COMMENT = "DEL_COMMENT";
const DEL_CHILDCOMMENT = "DEL_CHILDCOMMENT";
const GET_COMMENT_CNT = "GET_COMMENT_CNT";
const EXCHAGE_STATE = "EXCHAGE_STATE";
const EDIT_PROFILE = "EDIT_PROFILE";
const GET_PROFILE = "GET_PROFILE";
const EDIT_STAR = "EDIT_STAR";

// *** 액션 생성 함수
//메인 데이터 관련
const getPosts = createAction(GET_POST, (_post_data) => ({ _post_data }));
const getCate = createAction(GET_CATE, (_post_data) => ({ _post_data }));
//게시글 데이터 관련
const getDetail = createAction(GET_DETAIL, (data) => ({ data }));
const delDetail = createAction(DEL_DETAIL, (dataid) => ({ dataid }));
//댓글 관련
// const getOnePost = createAction(GET_COMMENTS, (data) => ({ data }));
const getCommentcnt = createAction(GET_COMMENT_CNT, (num, postid) => ({
  num,
  postid,
}));
const addComment = createAction(ADD_COMMENT, (comment) => ({
  comment,
}));
const addchildcomment = createAction(ADD_CHILDCOMMENT, (comment, id) => ({
  comment,
  id,
}));
const delComment = createAction(DEL_COMMENT, (commentid) => ({ commentid }));
const delchildcomment = createAction(DEL_CHILDCOMMENT, (commentid, id) => ({
  commentid,
  id,
}));
const exchangeState = createAction(EXCHAGE_STATE, (postid, curState) => ({
  postid,
  curState,
}));
// 프로필 수정
const getProfile = createAction(GET_PROFILE, (profile) => ({ profile }));
const editProfile = createAction(EDIT_PROFILE, (edit) => ({ edit }));
// 즐겨찾기
const editStar = createAction(EDIT_STAR, (star) => ({ star }));

// *** 초기값
const initialState = {
  post: [],
  posts: [],
  page: 0,
  has_next: false,
  commentCnt: "",
  profile: [],
};

//token가져오기
const token = getCookie("Token");

// *** 미들웨어

//마이페이지 - 프로필 수정부분 프로필 데이터 가져오기
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

//마이페이지 - 프로필 수정부분 수정된 데이터 보내기
const editProfileDB = (img, nickname) => {
  return async (dispatch, getState, { history }) => {
    const token = getCookie("Token");
    await axiosInstance
      .put(
        "/api/userInfos",
        { nickname: nickname, profileImg: img.icons },
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
const getPostAction = (area, cate, count, is_select) => {
  console.log(area, cate, count, is_select);
  if (is_select) {
    count = 0;
  }
  return async (dispatch, getState, { history }) => {
    console.log("미들웨어에 넘어온 값 (장소,카테,페이지) ", count);

    axiosInstance
      .post(`api/category?page=${count}`, {
        categoryName: [cate],
        address: [area],
      })
      .then((res) => {
        console.log("통신 후 리듀스 저장 전 목록", res.data, count);
        let is_next = null;

        if (res.data.data.length < 6) {
          is_next = false;
        } else {
          is_next = true;
        }
        if (is_select || count === 0) {
          console.log(res.data);
          let _post_data = {
            posts: res.data.data,
            page: count + 1,
            next: is_next,
          };
          console.log("겟카테액션");
          dispatch(getCate(_post_data));
        } else {
          let _post_data = {
            posts: res.data.data,
            page: count + 1,
            next: is_next,
          };
          console.log("원래액션");
          dispatch(getPosts(_post_data));
        }
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

//게시글 삭제
const del_onepost = (postid) => {
  return (dispatch, getState, { history }) => {
    axiosInstance
      .delete(`api/posts/${postid}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log("post delete", res);
        dispatch(delDetail(postid));
        window.location.replace("/");
      })
      .catch((err) => console.log(err));
  };
};

//게시글 댓글만 가져오기 (마지막에 다 되면 삭제)
// const get_Comment = (postid) => {
//   return (dispatch, getState, { history }) => {
//     axiosInstance
//       .get(`/api/posts/${postid}`)
//       .then((res) => {
//         console.log("redux detail ", res.data.comments);
//         const _data = res.data.comments;
//         dispatch(getOnePost(_data));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//};

//게시글 상세 페이지 댓글 쓰기
const add_comment = (id, replyId, Newcomment, comcnt) => {
  return function (dispatch, getState, { history }) {
    const token = getCookie("Token");

    axiosInstance
      .post(
        `/api/comments/`,
        {
          postId: id,
          parentId: "",
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
        let newNum = comcnt + 1;
        dispatch(getCommentcnt(newNum, id));
      })
      .catch((err) => {
        console.log("댓글 쓰기 실패", err);
      });
  };
};

//게시글 상세 페이지 대댓글 쓰기
const add_childcomment = (id, replyId, Newcomment, comcnt) => {
  return function (dispatch, getState, { history }) {
    const token = getCookie("Token");
    let parentid = replyId;

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
        console.log(parentid);
        dispatch(addchildcomment(res, parentid));
        let newNum = comcnt + 1;
        dispatch(getCommentcnt(newNum, id));
      })
      .catch((err) => {
        console.log("댓글 쓰기 실패", err);
      });
  };
};

//게시글 상세 페이지 댓글 삭제
const del_comment = (commentid, postid, comcnt) => {
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
        let newNum = comcnt - 1;
        dispatch(getCommentcnt(newNum, postid));
      })
      .catch((err) => console.log("delete fail", err));
  };
};

//게시글 상세 페이지 대댓글 삭제
const del_childcomment = (commentid, postid, id, comcnt) => {
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
        dispatch(delchildcomment(res.data, postid));
        let newNum = comcnt - 1;
        dispatch(getCommentcnt(newNum, id));
      })
      .catch((err) => console.log("delete fail", err));
  };
};

//게시글 상세 거래상태 변경해주기
const exchange_state = (postid) => {
  return function (dispatch, getState, { history }) {
    axiosInstance
      .put(
        `api/currentstate/${postid}`,
        { currentState: "Complete" },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        let curState = "Complete";
        console.log("거래완료 버튼 성공", res);
        dispatch(exchangeState(postid, curState));
      })
      .catch((err) => console.log(err));
  };
};

// *** 리듀서
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        //카테고리를 셀렉해주기 위해서 push대신에 하지만 무한스크롤을 위해push해야함
        console.log("hello");
        draft.posts.push(...action.payload._post_data.posts);

        // draft.posts = draft.posts.reduce((acc, cur) => {
        //   if (acc.findIndex((a) => a.postId === cur.postId) === -1) {
        //     return [...acc, cur];
        //   } else {
        //     acc[acc.findIndex((a) => a.postId === cur.postId)] = cur;
        //     return acc;
        //   }
        // }, []);

        if (action.payload._post_data.page) {
          draft.page = action.payload._post_data.page;
        }

        draft.has_next = action.payload._post_data.next;
      }),
    [GET_CATE]: (state, action) =>
      produce(state, (draft) => {
        draft.posts = [...action.payload._post_data.posts];
        // draft.posts.push(...action.payload._post_data.posts);
        if (action.payload._post_data.page) {
          draft.page = action.payload._post_data.page;
        }
        draft.has_next = action.payload._post_data.next;
      }),

    [GET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload.data;
      }),

    [DEL_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.dataid);
        const arr = draft.posts.findIndex(
          (p, idx) => p.postId === action.payload.dataid
        );
        console.log(arr, "arr");
        draft.posts = draft.posts.splice(arr);
      }),
    //댓글 개수 관리해주는 부분
    [GET_COMMENT_CNT]: (state, action) =>
      produce(state, (draft) => {
        const idxNum = draft.posts.findIndex(
          (p, idx) => p.postId === Number(action.payload.postid)
        );
        const CNT = "commentCnt";

        draft.posts[idxNum][CNT] = action.payload.num;
      }),

    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        //post 안에 comments!!!
        draft.post.comments.push(action.payload.comment.data);
      }),

    [ADD_CHILDCOMMENT]: (state, action) =>
      produce(state, (draft) => {
        //넘겨주는 값 중에 parentid를 받아오기 때문에 parentid를 payload값으로 받아와서 기존에 들어가있는 댓글 아이디값이랑 비교해서 인덱스 값을 찾아내서 그 인덱스값의 칠드런에 새로운 대댓글을 더해준다
        let indexNum = draft.post.comments.findIndex(
          (com, idx) => com.id === action.payload.id
        );

        draft.post.comments[indexNum].children.push(
          action.payload.comment.data
        );
      }),

    [DEL_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const newComment = draft.post.comments.filter(
          (co, id) => co.id !== action.payload.commentid
        );
        console.log(newComment, "newcomment");
        draft.post.comments = [...newComment];
      }),

    [DEL_CHILDCOMMENT]: (state, action) =>
      produce(state, (draft) => {
        //post안의 댓글리스트에서 해당 부모 댓글 아이디 인덱스 위치를 찾아낸다
        const indexNum = draft.post.comments.findIndex(
          (com, idx) => com.id === action.payload.id
        );
        //찾아낸 인덱스로 해당 대댓글 리스트를 찾아내고 거기서 삭제하는 대댓글 아이디를 비교해서 일치하지 않은 리스트만 뽑아내서 새로 넣어준다
        const newReply = draft.post.comments[indexNum].children.filter(
          (reply, idx) => reply.id !== action.payload.commentid
        );
        draft.post.comments[indexNum].children = [...newReply];
      }),

    //거래완료부분 변경해주는
    [EXCHAGE_STATE]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.postid);
        console.log(action.payload.curState);

        const idxNum = draft.posts.findIndex(
          (p, idx) => p.postId === Number(action.payload.postid)
        );
        const CUR = "currentState";

        draft.posts[idxNum][CUR] = action.payload.curState;
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
    [EDIT_STAR]: (state, action) =>
      produce(state, (draft) => {
        // draft.posts = action.payload.star.productId;
        console.log(action.payload.star);
        const idx = draft.posts.findIndex(
          (p) => p.postId === action.payload.star.postId
        );
        // draft.posts[idx] = { ...draft.posts[idx], ...action.payload.star };
        draft.posts[idx] = action.payload.star;
      }),
  },
  initialState
);

const actionCreators = {
  getPostAction,
  getPosts,
  get_onepost,
  del_onepost,
  add_comment,
  del_comment,
  add_childcomment,
  del_childcomment,
  exchange_state,
  getProfileDB,
  editProfileDB,
  editStar,
};

export { actionCreators };
