import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { axiosInstance } from "../shared/api";
import ScaleLoader from "react-spinners/ScaleLoader";
import PuffLoader from "react-spinners/PuffLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./PostCard";
import { history } from "../redux/configureStore";

import { Grid } from "../elements/index";
import styled from "styled-components";

const PostList = ({ location, category }) => {
  //redux 가져오기
  const dispatch = useDispatch();
  const post_data = useSelector((state) => state.post);
  console.log("리덕스 저장되서 받아온 값(useSelector) ", post_data);
  //지역, 카테고리 값 state로 관리
  const [page, setpage] = useState(post_data.page);
  const [area, setarea] = useState(location);
  const [cate, setcate] = useState(category);
  //무한 스크롤 동작을 감지 하기 위한 상태값 관리
  const [hasMore, sethasMore] = useState(true);
  const [items, setItems] = useState([]);
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

  useEffect(() => {
    curLocation();
  }, []);

  useEffect(() => {
    // let _post_data = { area, cate };
    console.log("미들웨어로 넘기는 값", area, cate, page);
    //로딩시 불러오는 데이터
    dispatch(postActions.getPostAction(area, cate, page));
  }, [area, cate, page]);

  //scroll event
  //스크롤시 다음페이지를 보여주는 것
  const getData = () => {
    let data;
    let count = page + 1;

    axiosInstance
      .post(`api/category?page=${count}`, {
        categoryName: [area],
        address: [cate],
      })
      .then((res) => {
        data = res.data.data;
        console.log("무한 스크롤 동작해서 받아 온 값", data, count);

        // //데이터가 사이즈보다 작을 경우
        if (data.length === 0 || data.length < 6) {
          console.log("사이즈가 작나?");
          sethasMore(false);
          setItems([...items, ...data]);
        } else {
          //데이터가 사이즈만큼 넘어왔을 때
          console.log("사이즈가 큰가?");
          setItems([...items, ...data]);
        }

        setpage(count);
        console.log("무한스크롤 뒤의 페이지값", page);
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
              <Spin>
                <PuffLoader
                  size="100"
                  color="var(--main-color)"
                />
              </Spin>
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

const Spin = styled.div`
  height: 65vh;

  display: flex;
  justify-content: center;
  align-items: center; ;
`;
export default PostList;
