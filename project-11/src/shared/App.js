import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import "swiper/css/bundle";

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

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main}></Route>
        <Route path="/intro" exact component={Landing}></Route>
        <Route path="/address" exact component={InputAdd}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/mypage" exact component={Mypage}></Route>
        <Route path="/favorite" exact component={Favorite}></Route>
        <Route path="/mypost" exact component={MyPost}></Route>
        <Route path="/write" exact component={Write}></Route>
        <Route path="/write/:id" exact component={Write} />
        <Route path="/detail/:id" exact component={Detail}></Route>
        <Route path="/search" exact component={Search}></Route>
        <Route path="/chatting" exact component={Chatting}></Route>
        <Route path="/chat" exact component={Chat}></Route>
      </ConnectedRouter>
    </div>
  );
}

export default App;
