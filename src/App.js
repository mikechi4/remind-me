import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import SignupForm from "./components/signupform/SignupForm";
import Login from './components/login/Login';
import Home from './components/home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/signup" component={SignupForm} />
          <Route path="/login" component={Login} />
          <Route path="/home" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
