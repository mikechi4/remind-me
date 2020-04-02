import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
// TODO: add created components here
import SignupForm from "./components/signupform/SignupForm";

const PageOne = () => {
  return (
    <div>
      Page One
      <Link to="/pagetwo">Hey there</Link>
    </div>
  );
};
const PageTwo = () => {
  return (
    <div>
      Page Two
      <Link to="/">Click Me</Link>
    </div>
  );
};
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" exact component={SignupForm} />
        <Route path="/login" component={PageTwo} />
        {/* <Route path="/signup" component={Signup}/> */}
        {/* <Route path="/edit" component={EditTask}/> */}
        {/* <Route path="/add" component={AddTask}/> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
