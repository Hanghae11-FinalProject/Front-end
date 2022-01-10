import React from "react";
import { useDispatch } from "react-redux";
import Spinner from "./Spinner";
import { history } from "../redux/configureStore";
import { axiosInstance } from "../shared/api";
import {setCookie} from "../shared/Cookie";

const OAuthRedirect = () => {

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  console.log(code)

  React.useEffect(() => {
    axiosInstance
    .get(`/oauth/callback/kakao?code=${code}`)
    .then((response)=>{
      console.log(response)
      const loginInfo = `userId=${response.data.userId}userImg=${response.data.profileImg}userName=${response.data.nickName}userToken=${response.data.token}`;
        setCookie("OK", loginInfo);
        history.push("/address")
    })
    .catch((err) => {
      console.log('에러발생', err)
    })
  }, []);

  return <Spinner/>;
};

export default OAuthRedirect;