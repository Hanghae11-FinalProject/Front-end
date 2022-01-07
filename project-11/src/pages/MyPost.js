import React, { useEffect } from "react";

import styled from "styled-components";

import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie";
import { axiosInstance } from "../shared/api";
import { IoIosArrowBack } from "react-icons/io";
import { Grid } from "../elements";
import Nav from "../shared/Nav";
import MyPostCard from "../components/MyPostCard";
import MpLoginCk from "../components/MpLoginCk";

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
            <IoIosArrowBack
              size="30"
              className="icon"
              onClick={() => history.goBack()}
            />
            <TopText
              style={{
                marginLeft: "6px",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              내가 작성한 글
            </TopText>
          </MainTop>
          <div className="post-box">
            {my_List.length === 0 ? (
              <MpLoginCk />
            ) : (
              my_List.map((my_List, idx) => {
                return <MyPostCard key={idx} my_List={my_List} />;
              })
            )}
          </div>
          <Nav mypage={"mypage"} />
        </Grid>
      </MyPostBox>
    </>
  );
};

const MyPostBox = styled.div`
  .border {
    height: 100vh;
    /* border-right: 1px solid var(--help-color);
    border-left: 1px solid var(--help-color); */
    background: #fff;
    text-align: center;
  }
  .post-box {
    height: 833px;
    overflow-y: auto;
    -ms-overflow-style: none; // IE and Edge
    scrollbar-width: none; // Firefox
    ::-webkit-scrollbar {
      display: none; // Chrome, Safari, Opera
    }
  }
`;

const MainTop = styled.div`
  height: 50px;

  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1);
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
