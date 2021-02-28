import "./app.less";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ChooseLine from "./pages/ChooseLine";
import Detail from "./pages/Detail";
import EditOrCreate from "./pages/EditOrCreate";

function App() {
  return (
    <div className="root-app">
      <Router>
        <nav className="nav-area">
          <ul>
            <li>
              <Link to="/">首页</Link>
            </li>
            {/* <li>
              <Link to="/edit">新建/编辑数据</Link>
            </li>
            <li>
              <Link to="/detail">数据详情页面</Link>
            </li> */}
          </ul>
        </nav>
        <div className="switch-area">
          <Switch>
            <Route path="/" exact component={ChooseLine}></Route>
            <Route path="/edit" component={EditOrCreate}></Route>
            <Route path="/create" component={EditOrCreate}></Route>
            <Route path="/detail" component={Detail}></Route>
            <Route component={ChooseLine}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
