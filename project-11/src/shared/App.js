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
import chatting from "../pages/chatting";
import chattingitem from "../components/chattingitem";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main}></Route>
        <Route path="/intro" exact component={Landing}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/mypage" exact component={Mypage}></Route>
        <Route path="/write" exact component={Write}></Route>
        <Route path="/detail" exact component={Detail}></Route>
        <Route path="/search" exact component={Search}></Route>
        <Route path="/chatting" exact component={chatting}></Route>
        <Route path="/chattingitem" exact component={chattingitem}></Route>
      </ConnectedRouter>
    </div>
  );
}

export default App;
