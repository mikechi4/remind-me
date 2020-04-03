import React from "react";
import Axios from "axios";

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
    this.setState(initialState);
    Axios.get("/api/test").then(res => {
      console.log(res);
    });
  };

  render() {
    return (
      <div className="signup-form">
        <form onSubmit={this.onSubmit} className="ui form">
          <div className="input-field">
            <label htmlFor="username">Enter a username</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </div>
          <div>{this.state.errors.usernameError}</div>
          <div className="input-field">
            <label htmlFor="email">Enter an email address</label>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
            <div>{this.state.errors.emailError}</div>
          </div>
          <div className="input-field">
            <label htmlFor="password">Enter password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <div>{this.state.errors.passwordError}</div>
          <div className="submit-btn">
            <button
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
