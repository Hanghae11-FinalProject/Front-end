import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { axiosInstance } from "../shared/api";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./PostCard";
import Spinner from "./Spinner";
import NoPost from "./NoPost";

import { Grid } from "../elements/index";
import styled from "styled-components";

const PostList = ({ location, category, selected }) => {
  //redux 가져오기
  const dispatch = useDispatch();
  const post_data = useSelector((state) => state.post);

  // console.log("리덕스 저장되서 받아온 값(useSelector) ", post_data);
  //지역, 카테고리 값 state로 관리
  const [page, setpage] = useState(post_data.page);
  const [area, setarea] = useState(location);
  const [cate, setcate] = useState(category);
  let is_select = selected;

  //무한 스크롤 동작을 감지 하기 위한 상태값 관리
  const [hasMore, sethasMore] = useState(true);
  const [items, setItems] = useState([]);

  const [is_loading, setIs_Loading] = useState(false);
  //api로 넘겨줘야 할 값들
  //동네 설정을 했을 때, 전체보기를 하기 위해 null 혹은 빈 값을 보내야하기때문에
  //따로 조건문을 써서 값을 정해주었습니다.
  const curLocation = () => {
    if (location === "위치 설정하기" || location === "전체") {
      return setarea("");
    } else {
      return setarea(location);
    }
  };

  //지역구 설정, 카테고리 변경시 페이지 0으로 초기화
  useEffect(() => {
    curLocation();
    setpage(0);
  }, [location, category]);

  useEffect(() => {
    setIs_Loading(true);
    if (page !== 0) {
      is_select = false;
    }
    dispatch(postActions.getPostAction(area, category, page, is_select));
    setIs_Loading(false);
  }, [area, category, page]);

  //scroll event
  //스크롤시 다음페이지를 보여주는 것
  const getData = () => {
    let data;
    let count = page + 1;

    axiosInstance
      .post(`api/category?page=${count}`, {
        categoryName: [cate],
        address: [area],
      })
      .then((res) => {
        data = res.data.data;

        //다음 페이지 데이터가 사이즈보다 작을 경우
        if (data.length === 0 || data.length < 6) {
          sethasMore(false);
          setItems([...items, ...data]);
        } else {
          //다음 페이지 데이터가 사이즈만큼 넘어왔을 때
          setItems([...items, ...data]);
        }
        setpage(count);
      });
  };

  return (
    <React.Fragment>
      <MainContainer>
        {is_loading === true && post_data.posts.length === 0 && <Spinner />}
        <InfiniteScroll
          dataLength={post_data.posts.length} //This is important field to render the next data
          next={getData}
          hasMore={hasMore}
        >
          {post_data.posts.length === 0 && is_loading === false ? (
            <div className="no-post">
              <NoPost />
            </div>
          ) : (
            <>
              <Grid _className="post-list">
                {post_data.posts.map((item, idx) => {
                  return <PostCard key={item.id} item={item} />;
                })}
              </Grid>
            </>
          )}
        </InfiniteScroll>
      </MainContainer>
    </React.Fragment>
  );
};

const MainContainer = styled.div`
  padding: 0 16px 60px 16px;
  .spinner {
    margin-top: -160px;
  }

  .post-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin-bottom: 10px;
  }

  .empty {
    height: 100vh;
  }

  .no-post {
    margin-top: -100px;
  }
`;

export default PostList;
