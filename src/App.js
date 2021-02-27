import "./app.less";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";
function App() {
  return (
    <div className="root-app">
      <Router history={hashHistory}>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about" render={() => <div>about</div>}></Route>
            <Route path="/users" render={() => <div>users</div>}></Route>
            <Route path="/" render={() => <div>Home</div>}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
