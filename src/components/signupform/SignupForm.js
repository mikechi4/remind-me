import React from "react";
import Axios from "axios";

import "./SignupForm.scss"

const initialState = {
  username: "",
  email: "",
  password: "",
  errors: {
    usernameError: "",
    emailError: "",
    passwordError: ""
  }
};

const pwRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/);
const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const usernameRegex = new RegExp(/^[a-zA-Z0-9.-_$@*!]{3,30}$/);

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case "username":
        errors.usernameError = usernameRegex.test(value)
          ? ""
          : "Please enter a valid username.";
        break;
      case "email":
        errors.emailError = emailRegex.test(value)
          ? ""
          : "Please enter a valid email address";
        break;
      case "password":
        errors.passwordError = pwRegex.test(value)
          ? ""
          : "Password must be greater than 8 characters, contain an uppercase, contain a lowercase, and a number";
        break;
      default:
        break;
    }
    this.setState({ errors, [`${name}`]: value });
  };

  onSubmit = event => {
    event.preventDefault();
    const { username, email, password } = this.state;

    Axios.post("/api/create", {
      username,
      email,
      password
    }).then(res => {
      console.log(res);
      this.setState(initialState);
      this.props.history.push('/login');
      // send user back to log in

    }).catch(error => {
      // handle errors
      console.log(error);
      this.setState({
        errors: {
          ...this.state.errors,
          usernameError: "Username already exists."
        }
      })
    });;
  };

  render() {
    return (
      <div className="signup-form" >
        <form onSubmit={this.onSubmit} className="ui form">
          <div className="form-group">
            <label htmlFor="username">Enter a username</label>
            <input
              className="form-control"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-text text-danger">{this.state.errors.usernameError}</div>
          <div className="form-group">
            <label htmlFor="email">Enter an email address</label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
            <div className="form-text text-danger">{this.state.errors.emailError}</div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Enter password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-text text-danger">{this.state.errors.passwordError}</div>
          <div className="submit-btn">
            <button
              className="btn btn-primary"
              disabled={
                !this.state.username ||
                !this.state.email ||
                !this.state.password
              }
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;
