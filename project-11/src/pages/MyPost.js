import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie";
import { axiosInstance } from "../shared/api";
import { IoIosArrowBack } from "react-icons/io";
import { Grid } from "../elements";
import Nav from "../shared/Nav";
import MyPostCard from "../components/MyPostCard";
import MpLoginCk from "../components/MpLoginCk";
import Spinner from "../components/Spinner";

const MyPost = () => {
  const token = getCookie("Token");
  const [my_List, setMy_List] = useState([]);
  const [is_loading, setIs_loading] = useState(false);
  useEffect(() => {
    axiosInstance
      .get(`/api/myposts`, {
        headers: {
          AUthorization: token,
        },
      })
      .then((res) => {
        // console.log("성공쓰~", res);
        setMy_List(res.data);
        setIs_loading(true);
      })
      .catch((err) => {
        // console.log("에러네용", err);
      });
  }, []);

  return (
    <>
      <MyPostBox>
        <Grid is_container _className="background">
          {is_loading === false && <Spinner />}
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
  .background {
    height: 100vh;
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
    left: 6px;
    cursor: pointer;
  }
`;

const TopText = styled.p`
  font-size: 20px;
`;

export default MyPost;
