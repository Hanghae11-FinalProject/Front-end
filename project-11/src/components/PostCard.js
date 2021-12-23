import React from "react";
import styled from "styled-components";
import { Grid } from "../elements";

import { PostData } from "../shared/PostTest";

const PostCard = () => {
  return (
    <React.Fragment>
      <PostArea>
        {PostData.map((p, idx) => {
          return (
            <Grid is_flex margin={"12px 9px"}>
              <Post>
                <ChipDiv>
                  <CurrentChip>{p.currentState}</CurrentChip>
                </ChipDiv>
                <PostImg src={p.images} alt="PostImg" />
                <PostTitle>{p.title}</PostTitle>
                <PostContent>{p.content}</PostContent>
              </Post>
            </Grid>
          );
        })}
      </PostArea>
    </React.Fragment>
  );
};

const PostArea = styled.div`
  width: 380px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-left: -8px; // 이거 말고는 가운데로 정렬 할 방법이 없나?
`;

const Post = styled.div`
  width: 172px;
  height: 280px;
  margin: 5px auto;
  border-radius: 16px;
  border: 1px solid #888888;
  background-color: #f9f1f1;
  /* box-shadow: "5px 5px 5px rgba(255, 138, 61, 0.25)"; */
`;

const ChipDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 3px;
  margin-right: 3px;
`;

const CurrentChip = styled.div`
  width: 56px;
  height: 22px;
  border-radius: 6px;
  text-align: center;
  font-size: 16px;
  background-color: var(--point-color);
`;

const PostImg = styled.img`
  width: 170px;
  height: 130px;
  object-fit: cover;
`;

const PostTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 4px 4px;
`;
const NickAndDate = styled.p`
  font-size: 16px;
  display: flex;
  justify-content: flex-end;
`;

const PostContent = styled.p`
  width: 168px;
  height: 70px;
  margin: 0px 4px;
  overflow: hidden;
  /* text-overflow: ellipsis; 
  white-space: nowrap; */ // overflow ... 으로 표시할까 말까
`;

export default PostCard;
