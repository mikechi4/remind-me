import React from "react";
import Axios from "axios";
import { Form, Button } from 'react-bootstrap'
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
                <Form onSubmit={this.onSubmit}>
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="username">Enter your username</Form.Label>
                        <Form.Control
                            className="form-control"
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control
                            className="form-control"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>
                    <div className="form-text text-danger">{this.state.error}</div>
                    <Form.Group className="submit-btn">
                        <Button className="btn btn-success" disabled={!this.state.username || !this.state.password} type="submit"> Log In </Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default Login;