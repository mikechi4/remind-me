import React from "react";
import Axios from "axios";
import { Form, Button } from 'react-bootstrap'
import "./Login.scss"
import { Redirect } from 'react-router-dom';
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
            // definitely not the best way to protect routes, but didn't have time to fix. ideally would want to get this from the server and save to a redux store 
            window.localStorage.setItem('isAuthenticated', true);
            this.props.history.push('/home');
        }).catch((error) => {
            console.log(error.message)
            this.setState({ error: error.response.data.message })
            console.log(error.response.data.message)

        })
    };

    render() {
        const isAuthenticated = window.localStorage.getItem('isAuthenticated');

        if (isAuthenticated) {
            return <Redirect to="/home" />
        }
        return (
            <div className="signup-form" >
                <h1 className="text-center">Remind Me</h1>
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
                    <Form.Group className="submit-btn">
                        <a href="#" className="text-primary" onClick={() => this.props.history.push('/signup')}>Sign Up</a>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default Login;