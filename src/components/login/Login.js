import React from "react";
import Axios from "axios";

import "./Login.scss"

const initialState = {
    username: "",
    password: "",
    errors: ""
};


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleInputChange = e => { };

    onSubmit = event => {
        Axios.post("/login")
    };

    render() {
        return (
            <div className="signup-form" >
                <form onSubmit={this.onSubmit} className="ui form">
                    <div className="form-group">
                        <label htmlFor="username">Enter your username</label>
                        <input
                            className="form-control"
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="submit-btn">
                        <button className="btn btn-primary" disabled={!this.state.username || !this.state.password}> Submit </button>
                    </div>
                </form>
            </div>
        );
    }
}
export default Login;