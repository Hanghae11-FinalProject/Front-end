// *** 패키지 import
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { axiosInstance } from "../../shared/api";
import { getCookie } from "../../shared/Cookie";



// *** 액션 타입
const GET_POST = "GET_POST";
const GET_ONEPOST = "GET_ONEPOST";
const ADD_COMMENT = "ADD_COMMENT";
const ADD_CHILDCOMMENT = "ADD_CHILDCOMMENT";
const DEL_COMMENT = "DEL_COMMENT";
const EDIT_PROFILE = "EDIT_PROFILE";
const GET_PROFILE = "GET_PROFILE";

// *** 액션 생성 함수
const getPosts = createAction(GET_POST, (_post_data) => ({ _post_data }));
const getOnePost = createAction(GET_ONEPOST, (data) => ({ data }));
const addComment = createAction(ADD_COMMENT, (comment) => ({ comment }));
const addChildComment = createAction(ADD_CHILDCOMMENT, (comment) => ({
  comment,
}));
const delComment = createAction(DEL_COMMENT, (commentid) => ({ commentid }));
// 프로필 수정
const getProfile = createAction(GET_PROFILE, (profile)=>({ profile }))
const editProfile = createAction(EDIT_PROFILE, (edit)=>({ edit }));

// *** 초기값
const initialState = {
  posts: [],
  page: 0,
  has_next: false,
  comments: [],
  children: [],
  commentCnt: "",
  profile:[],
};

// *** 미들웨어

//프로필 수정
const getProfileDB= () =>{
  return async(dispatch, getState,{history})=>{
    const token = getCookie("Token")
    await axiosInstance.get('/api/userInfos',{headers:{Authorization: token }})
    .then((response)=>{
      console.log(response)
      dispatch(getProfile(response.data))
    }).catch((err)=>{
      console.log(err)
    })
  }
}

// axiosInstance.put('/api/userInfos',
//     {nickname:editName,profileImg:img},
//     {headers:{Authorization: token }})
//     .then((response)=>{
//       console.log('프로필 수정',response)
//     })

// 프로필 수정2
const editProfileDB = (img, nickname, username) => {
  return async(dispatch, getState, {history})=>{
    const token = getCookie("Token")
    await axiosInstance.put('/api/userInfos',
        {nickname:nickname,profileImg:img, username:username},
        {headers:{Authorization: token }})
        .then((response)=>{
          console.log(response)
          dispatch(editProfile({nickname:nickname, profileImg:img, username:username}))
        }).catch((err)=>{
          console.log(err);
        })
  }
}
// get 형식 그대로 백에다가 수정된 데이터 요청하기 




//메인 게시글 조회
const getPostAction = (area, cate, count) => {
  return async (dispatch, getState, { history }) => {
    // console.log("미들웨어에 넘어온 지역 ", post_data);
    axiosInstance
      .post(`api/category?page=${count}`, {
        categoryName: [cate],
        address: [area],
      })
      .then((res) => {
        console.log("리듀스 저장 전 목록", res.data, count);
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

//게시글 하나만 가져오기
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

        console.log("리듀서 페이지 값 저장", action.payload._post_data.page);

        //한개만 가져오는 것과 중복된 리스트내용 지워주기
        draft.posts = draft.posts.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.postId === cur.postId) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.postId === cur.postId)] = cur;
            return acc;
          }
        }, []);

        if (action.payload._post_data.page) {
          draft.page = action.payload._post_data.page;
        }

        draft.has_next = action.payload._post_data.next;
      }),

    [GET_ONEPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.comments = action.payload.data;
        draft.children = action.payload.data[0].children;
        draft.commentCnt = action.payload.data.length;
      }),

    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comments.push(action.payload.comment.data);
      }),

    [ADD_CHILDCOMMENT]: (state, action) =>
      produce(state, (draft) => {
        console.log(draft.children, "children");
        draft.children.push(action.payload.comment.data);
      }),

    [DEL_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        console.log("action payload", action.payload.commentid);
        console.log("draft.comments", draft.comments);

        const newComment = draft.comments.filter(
          (co, id) => co.id !== action.payload.commentid
        );
        console.log(newComment, "newcomment");
        draft.comments = [...newComment];
      }),
    [GET_PROFILE]: (state, action) =>
    // draft는 initailstate 저장소 위치 지정 
    produce(state,(draft)=>{
    // action.payload는 위에서 전달하는 데이터가 들어있다. dispatch 부분
      draft.profile = action.payload.profile
      console.log(action.payload.profile)
    }),  

    [EDIT_PROFILE]: (state, action) =>
    produce(state,(draft)=>{
      draft.profile = action.payload.edit
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
  getProfileDB,
  editProfileDB,
};

export { actionCreators };
