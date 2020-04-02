import React from "react";

const initialState = {
  username: "",
  email: "",
  password: "",
  usernameError: "",
  emailError: "",
  passwordError: ""
};

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleInputChange = e => {
    this.setState({ [`${e.target.name}`]: e.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const isValid = this.validateField();
    if (isValid) {
      console.log(this.state);
      // clear form if valid
      this.setState(initialState);
    }
  };

  validateField = () => {
    let usernameError = "";
    let passwordError = "";
    let emailError = "";
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
          <div>{this.state.usernameError}</div>
          <div className="input-field">
            <label htmlFor="email">Enter an email address</label>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
            <div>{this.state.emailError}</div>
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
          <div>{this.state.passwordError}</div>
          <div className="submit-btn">
            <button onClick={this.createUser}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;
