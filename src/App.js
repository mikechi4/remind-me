import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import SignupForm from "./components/signupform/SignupForm";
import Login from './components/login/Login';
import Home from './components/home/Home';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route path="/signup" component={SignupForm} />
        <Route path="/login" component={Login} />
        <Route path="/home" exact component={Home} />
        {/* <Route path="/edit" component={EditTask}/> */}
        {/* <Route path="/add" component={AddTask}/> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
