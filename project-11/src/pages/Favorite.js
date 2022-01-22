import React, { useState, useEffect } from "react";
import { history } from "../redux/configureStore";
import { axiosInstance } from "../shared/api";
import Nav from "../shared/Nav";
import FavoriteItem from "../components/FavoriteItem";
import { getCookie } from "../shared/Cookie";
import FvLoginCk from "../components/FvLoginCk";

import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { Grid } from "../elements";
import Spinner from "../components/Spinner";

const Favorite = () => {
  const token = getCookie("Token");
  const [is_loading, setIs_loading] = React.useState(false);

  const [favorite_list, setFavoriteList] = useState([]);

  const getFavorite = () => {
    axiosInstance
      .get("/api/bookmark", { headers: { Authorization: token } })
      .then((response) => {
        console.log(response);
        setFavoriteList(response.data.data);
        setIs_loading(true);
      });
  };
  useEffect(() => {
    getFavorite();
  }, []);

  return (
    <FavoriteWrap>
      <Grid is_container="is_container" _className="grid-border background">
        {is_loading === false && <Spinner/>}

        <div className="Favorite-wrap">
          <div className="Favorite-header-wrap">
            <IoIosArrowBack
              style={{
                width: "30px",
                height: "30px",
                cursor: "pointer",
              }}
              onClick={() => history.goBack()}
            />
            <span className="header-title">즐겨찾기</span>
          </div>

          {favorite_list.length === 0 ? (
            <>
              <FvLoginCk />
            </>
          ) : (
            favorite_list.map((fv, idx) => {
              return <FavoriteItem key={fv.postId} {...fv} />;
            })
          )}
        </div>
        <Nav mypage={"mypage"} />
      </Grid>
    </FavoriteWrap>
  );
};

export default Favorite;

const FavoriteWrap = styled.div`
  .grid-border {
    width: 100%;
    height: 100vh;
    background-color: #fff;
    padding-bottom: 50px;

    overflow-y: auto;
    -ms-overflow-style: none; // IE and Edge
    scrollbar-width: none; // Firefox
    ::-webkit-scrollbar {
      display: none; // Chrome, Safari, Opera
    }

    .Favorite-wrap {
      .Favorite-header-wrap {
        height: 50px;

        display: flex;
        align-items: center;

        position: relative;
        box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1);
        .header-title {
          position: absolute;
          left: 42.5%;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }
`;
