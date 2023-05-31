import { React, useState } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Admin from "./components/Admin/Admin";
import Loader from "./components/Loader/Loader";

function App() {
  const [loading, setLoading] = useState(true);
  var userInfo = localStorage.getItem("userData");
  var adminFlag;
  const history = useHistory();

  if (userInfo && !userInfo == "") {
    userInfo = JSON.parse(localStorage.getItem("userData"));
    adminFlag = userInfo.admin;
  }
  let adminAccess = adminFlag ? <Admin /> : history.push('/Home');

  return (
    <Router>
      <div className="App">
        {loading && <Loader />}
        <Header />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          {userInfo ? <Route path="/Home">
            <Home />
          </Route>
            : history.push('/Login')}
          {userInfo ? (adminAccess) : <Route path="/Login">
            <Login />
          </Route>}
          <Route path="/Signup">
            <Signup />
          </Route>
          {adminFlag ? <Route path="/Admin">
            <Admin />
          </Route> : ''}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
