import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { axiosInstance } from "../shared/api";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./PostCard";

import { Grid } from "../elements/index";
import styled from "styled-components";
import { PostData } from "../shared/PostTest";


const PostList = ({ location, category }) => {
  console.log(location, category);
  //api로 받아올 값들
  const _post_data = { location, category };

  //redux 가져오기
  const dispatch = useDispatch();
  const post_data = useSelector((state) => state.post);
  console.log("리덕스 저장 값 ", post_data);
  //무한 스크롤을 위한 페이지 값
  const [page, setpage] = useState(post_data.page);
  //무한 스크롤 동작을 감지 하기 위한 상태값 관리
  const [hasMore, sethasMore] = useState(true);
  const [items, setItems] = useState([]);

  //첫 로딩시 불러오는 데이터
  useEffect(() => {
    dispatch(postActions.getPostAction(_post_data, page));
  }, [page]);

  //scroll event
  //스크롤시 다음페이지를 보여주는 것
  const getData = () => {
    let data;
    let count = page + 1;
    axios
      .post(`http://15.164.222.25/api/category?page=${count}`, {
        categoryName: [category],
        address: [location],
      })
      .then((res) => {
        data = res.data;
        console.log("무한 스크롤 동작해서 받아 온 값", res);
        //데이터가 사이즈보다 작을 경우
        if (data.length === 0 || data.length < 5) {
          sethasMore(false);
          setItems([...items, ...data]);
        } else {
          //데이터가 사이즈만큼 넘어왔을 때
          setItems([...items, ...data]);
          setpage(count + 1);
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
          <Grid _className="post-list">
            {PostData.map((item, idx) => {
              return <PostCard key={idx} item={item} />;
            })}
          </Grid>
        </InfiniteScroll>
      </MainContainer>
    </React.Fragment>
  );
};

const MainContainer = styled.div`
  padding: 0 0px 60px 0px;

  .post-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
`;

export default PostList;
