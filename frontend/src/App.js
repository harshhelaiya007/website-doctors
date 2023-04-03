import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Signup">
            <Signup />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
