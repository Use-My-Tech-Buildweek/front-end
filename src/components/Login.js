import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { loginUser, setError } from '../actions'

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            credentials: {
                username: '',
                password: ''
            }
        }
        this.handleChanges = e => {
            this.setState({
                credentials: {
                    ...this.state.credentials,
                    [e.target.id]: e.target.value

                }
            })
        }

        this.login = e => {
            e.preventDefault();
            console.log('Login says: submit button clicked, calling loginUser', this.state.credentials)
            this.props.loginUser(this.state.credentials)
        }

        this.errorStyle = {
            color: 'red',
            fontWeight: 'bold',
            fontSize: '36px'
        }
    }
    render() {
        return (
            <form onSubmit={this.login}>
                <input
                    name="username"
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={this.state.credentials.username}
                    onChange={this.handleChanges}
                />

                <input
                    name="credentials[password]"
                    type="password"
                    id='password'
                    placeholder="Password"
                    onChange={e => this.setState({ [e.target.name]: e.target.value })}
                />
                <button type="submit">Login</button>

                {/* add a keep me logged in checkbox? */}
                <p>Don't have an account?</p>
                <Link to="/myprofile">Sign up!</Link>
                <p>Forgot your password?</p>
                {/* handle password forgotten */}

                {this.props.loading ? (<p>Loading...</p>) : (<div>
                    {this.props.errorMessages && (<div><p style={this.errorStyle}>{this.props.errorMessages}</p></div>)}</div>)
                }


            </form >
        )
    }
}

const mapStateToProps = state => {
    return {
        credentials: state.credentials,
        errorMessages: state.errorMessages,
        loading: state.loading,


    }
}
export default connect(mapStateToProps, { loginUser, setError })(Login)