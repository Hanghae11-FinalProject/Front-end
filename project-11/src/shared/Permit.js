import React from "react";
import { getCookie } from "./Cookie";
import LoginCheck from "../components/LoginCheck";

const Permit = (props) => {
  const { children } = props;
  const user = getCookie("Name");
  //safari에서 한글깨짐을 방지하기 위한 decodeURI
  const name = decodeURIComponent(user);

  const token = getCookie("Token");

  if (name && token) {
    return <div>{children}</div>;
  }

  return <LoginCheck />;
};

export default Permit;
