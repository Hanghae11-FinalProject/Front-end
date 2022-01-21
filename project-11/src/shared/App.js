import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Switch } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import { getCookie } from "../shared/Cookie";
import "swiper/css/bundle";
// import { useSelector } from "react-redux";
// import { axiosInstance } from "./api";

import GlobalStyles from "./GlobalStyle";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Mypage from "../pages/Mypage";
import Write from "../pages/Write";
import Detail from "../pages/Detail";
import Search from "../pages/Search";
import Landing from "../pages/Landing";
import InputAdd from "../pages/InputAdd";
import Chatting from "../pages/Chatting";
import Chat from "../pages/Chat";
import Favorite from "../pages/Favorite";
import MyPost from "../pages/MyPost";
import EditPost from "../pages/EditPost";
import OAuthRedirect from "../components/OAuthRedirect";
import NotFound from "../pages/NotFound";
import Spinner2 from "../components/Spinner2";
import Spinner3 from "../components/Spinner3";

function App() {
  // const myUserId = getCookie("Id");
  // const token = getCookie("Token");
  // const [newMsgData, setNewMsgData] = React.useState("");
  // const stompClient = useSelector((state) => state.chat.stompClient);
  // const cnt = useSelector((state) => state.chat);
  // console.log(cnt);
  const currentUrl = window.location.href;
  const pollUrl = "https://forms.gle/EpUzumV4FEQ7g47w7";
  const Clickpoll = () => {
    window.open(pollUrl);
  };

  // React.useEffect(() => {
  //   if (token) {
  //     console.log("hi");
  //     stompClient.connect({}, () => {
  //       stompClient.send("/pub/join", {}, JSON.stringify(`${myUserId}`));
  //       stompClient.subscribe(`/sub/${myUserId}`, (data) => {
  //         const onMessage = JSON.parse(data.body);
  //         setNewMsgData(onMessage);
  //         console.log(onMessage);
  //         axiosInstance
  //           .post(
  //             `/api/roomcount`,
  //             { roomName: onMessage.roomName, userId: myUserId },
  //             { headers: { Authorization: token } }
  //           )
  //           .then((res) => {
  //             console.log(res, "성공");
  //           })
  //           .catch((err) => {
  //             console.log(err, "에러");
  //           });
  //       });
  //     });
  //   }
  // }, []);

  return (
    <div className="App">
      <GlobalStyles />
      <div className="wrap">
        <div className="landing-logo">
          <img
            src="/static/pingpong_logo_symbol-01.svg"
            alt="logoSymbol"
            className="symbol"
          />
          <img src="/static/pingpong.png" alt="logo" />
        </div>
        <div className="landing-btn-box">
          <p>
            현대인을 위한 <span>교환 플랫폼 - 핑퐁!</span>
          </p>
          <button onClick={Clickpoll}>핑퐁팀에게 피드백 남기기</button>
          <CopyToClipboard text={currentUrl}>
            <button onClick={() => alert("링크가 복사되었어요!")}>
              좋은 서비스 널리 알리기
            </button>
          </CopyToClipboard>
        </div>
        <div className="page-container">
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/" exact component={Landing}></Route>
              <Route path="/main" exact component={Main}></Route>
              <Route path="/address" exact component={InputAdd}></Route>
              <Route path="/login" exact component={Login}></Route>
              <Route path="/signup" exact component={Signup}></Route>
              <Route path="/mypage" exact component={Mypage}></Route>
              <Route path="/favorite" exact component={Favorite}></Route>
              <Route path="/mypost" exact component={MyPost}></Route>
              <Route path="/write" exact component={Write}></Route>
              <Route path="/write/:id" exact component={EditPost} />
              <Route path="/detail/:id" exact component={Detail}></Route>
              <Route path="/search" exact component={Search}></Route>
              <Route path="/chatting" exact component={Chatting}></Route>
              <Route path="/chat" exact component={Chat}></Route>
              <Route path="/spinner2" exact component={Spinner2}></Route> 
              <Route path="/spinner3" exact component={Spinner3}></Route> 


              <Route
                path="/oauth/callback/kakao"
                exact
                component={OAuthRedirect}
              ></Route>
              <Route component={NotFound}></Route>
            </Switch>
          </ConnectedRouter>
        </div>
      </div>
      <div className="bg"></div>
    </div>
  );
}

export default App;
