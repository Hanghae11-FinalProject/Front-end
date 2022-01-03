import React, { useEffect } from "react";
import styled from "styled-components";

import { getCookie } from "../shared/Cookie";
import { axiosInstance } from "../shared/api";
import { CgChevronLeft } from "react-icons/cg";
import { Grid } from "../elements";
import Nav from "../shared/Nav";
import MyPostCard from "../components/MyPostCard";

const MyPost = () => {
  const token = getCookie("Token");

  const [my_List, setMy_List] = React.useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/api/myposts`, {
        headers: {
          AUthorization: token,
        },
      })
      .then((res) => {
        console.log("성공쓰~", res);
        console.log(res.data);
        setMy_List(res.data);
      })
      .catch((err) => {
        console.log("에러네용", err);
      });
  }, []);
  useEffect(() => {
    console.log(my_List);
  }, [my_List]);

  return (
    <>
      <MyPostBox>
        <Grid is_container _className="border">
          <MainTop>
            <CgChevronLeft size="30" className="icon" />
            <TopText style={{ marginLeft: "6px" }}>내가 작성한 글</TopText>
          </MainTop>
          {my_List &&
            my_List.map((my_List, idx) => {
              return <MyPostCard key={idx} my_List={my_List} />;
            })}
        </Grid>
      </MyPostBox>
      <Nav />
    </>
  );
};

const MyPostBox = styled.div`
  .border {
    height: 100vh;
    border-right: 1px solid var(--help-color);
    border-left: 1px solid var(--help-color);
    text-align: center;
  }
`;

const MainTop = styled.div`
  height: 44px;
  margin: 0 8px;
  border-bottom: 2px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .icon {
    position: absolute;
    left: 0;
    cursor: pointer;
  }
`;

const TopText = styled.p`
  font-size: 20px;
`;

export default MyPost;
