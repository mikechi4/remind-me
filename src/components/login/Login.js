import React from "react";
import Axios from "axios";

import "./Login.scss"

const initialState = {
    username: "",
    password: "",
    error: ""
};


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [`${name}`]: value
        })
    };

    onSubmit = e => {
        e.preventDefault();
        const { username, password } = this.state
        Axios({
            method: 'POST',
            url: "/api/login",
            data: { username, password }
        }).then((res) => {
            this.setState(initialState);
            this.props.history.push('/home');
        }).catch((error) => {
            console.log(error.message)
            this.setState({ error: error.response.data.message })
            console.log(error.response.data.message)

        })
    };

    render() {
        return (
            <div className="signup-form" >
                <form onSubmit={this.onSubmit}>
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
                    <div className="form-text text-danger">{this.state.error}</div>
                    <div className="submit-btn">
                        <button className="btn btn-primary" disabled={!this.state.username || !this.state.password}> Submit </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;