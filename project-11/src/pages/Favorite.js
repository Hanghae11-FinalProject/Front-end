import React, { useState, useEffect } from "react";
import { history } from "../redux/configureStore";
import { axiosInstance } from "../shared/api";
import Nav from "../shared/Nav";
import FavoriteItem from "../components/FavoriteItem";
import {getCookie} from '../shared/Cookie'
import FvLoginCk from '../components/FvLoginCk'

import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { Grid } from "../elements";


const Favorite = () => {
  
  const token = getCookie('Token')
  const userid = getCookie('Name')
  console.log(userid)

  const [favorite_list,setFavoriteList] = useState([])

  const getFavorite = () => {
    axiosInstance.get('/api/bookmark',{headers:{Authorization: token}}).then((response)=>{
        console.log(response.data.data)
        setFavoriteList(response.data.data)
    })
  }
  useEffect(()=>{
    getFavorite()
  },[])

  return (
    <FavoriteWrap>
      <Grid is_container="is_container" _className="grid-border">
        <div className="Favorite-wrap">
          <div className="Favorite-header-wrap">
            <IoIosArrowBack
              style={{
                width: "30px",
                height: "30px",
              }}
            />
            <span className="header-title">즐겨찾기</span>
          </div>
          
          {
            favorite_list.length == 0 ? 
          <FvLoginCk/>
          :
            favorite_list.map((fv, idx)=>{
              return(
              <FavoriteItem key={fv.postId} {...fv}/>
              )
            })
            
          }
          
        </div>
      </Grid>
      <Nav/>
    </FavoriteWrap>
  );
};

export default Favorite;

const FavoriteWrap = styled.div`
  .grid-border {
    width: 100%;
    border: 1px solid var(--help-color);
    .Favorite-wrap {
      .Favorite-header-wrap {
        height: 50px;

        display: flex;
        align-items: center;

        position: relative;
        border-bottom: 1px solid var(--help-color);
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
