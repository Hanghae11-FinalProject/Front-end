import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { axiosInstance } from "../shared/api";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./PostCard";

import { Grid } from "../elements/index";
import styled from "styled-components";

const PostList = ({ location, category }) => {
  const _post_data = { location, category };
  console.log(_post_data);
  //redux 가져오기
  const dispatch = useDispatch();
  const post_data = useSelector((state) => state.post);
  console.log("리덕스 저장되서 받아온 값(useSelector) ", post_data);
  //무한 스크롤을 위한 페이지 값
  const [page, setpage] = useState(post_data.page);
  //무한 스크롤 동작을 감지 하기 위한 상태값 관리
  const [hasMore, sethasMore] = useState(true);
  const [items, setItems] = useState([]);
  //api로 넘겨줘야 할 값들
  //동네 설정을 했을 때, 전체보기를 하기 위해 null 혹은 빈 값을 보내야하기때문에
  //따로 조건문을 써서 값을 정해주었습니다.
  const curLocation = () => {
    if (location === "위치 설정하기" || location === "전체") {
      return (location = "");
    } else {
      return location;
    }
  };

  useEffect(() => {
    curLocation();
    let _post_data = { location, category };
    console.log("미들웨어로 넘기는 값", _post_data, page);
    //로딩시 불러오는 데이터

    dispatch(postActions.getPostAction(_post_data, page));
  }, [location, category, page]);

  //scroll event
  //스크롤시 다음페이지를 보여주는 것
  const getData = () => {
    let data;
    let count = page + 1;

    axiosInstance
      .post(`api/category?page=${count}`, {
        categoryName: [_post_data.category],
        address: [_post_data.location],
      })
      .then((res) => {
        data = res.data.data;
        console.log("무한 스크롤 동작해서 받아 온 값", data, count);

        //데이터가 사이즈보다 작을 경우
        if (data.length === 0) {
          sethasMore(false);
          setItems([...items, ...data]);
        } else {
          //데이터가 사이즈만큼 넘어왔을 때
          setItems([...items, ...data]);
          setpage(count);
        }
      });
  };
  return (
    <React.Fragment>
      <MainContainer>
        <InfiniteScroll
          dataLength={post_data.posts.length} //This is important field to render the next data
          next={getData}
          hasMore={hasMore}
        >
          {post_data.posts.length === 0 ? (
            <>
              <div className="empty">상품이 없답니다</div>
            </>
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

  .post-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin-bottom: 10px;
  }

  .empty {
    height: 100vh;
  }
`;

export default PostList;
