import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { loginUser, setError } from '../actions/userActions'

class Login extends React.Component {
    constructor(props) {
        super(props);

        // set initial form values
        this.state = {
            credentials: {
                username: '',
                password: ''
            }
        }

        // change handler
        this.handleChanges = e => {
            this.setState({
                credentials: {
                    ...this.state.credentials,
                    [e.target.id]: e.target.value

                }
            })
        }

        // onSubmit handler
        this.login = e => {
            e.preventDefault();
            console.log('Login says: submit button clicked, calling loginUser', this.state.credentials)
            this.props.loginUser(this.state.credentials)
        }

        //error message styling
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
                    name="password"
                    type="password"
                    id='password'
                    placeholder="Password"
                    onChange={this.handleChanges}
                    value={this.state.credentials.password}
                />
                <button type="submit">Login</button>

                {/* add a keep me logged in checkbox? */}
                <p>Don't have an account?</p>
                <Link to="/register">Sign up!</Link>
                <p>Forgot your password?</p>
                {/* handle password forgotten */}

                {this.props.loading ? (<p>Loading...</p>) : (<div>
                    {this.props.errorMessages && (<div><p style={this.errorStyle}>{this.props.errorMessages}</p></div>)}</div>)
                }


            </form >
        )
    }
}
//connecting global state to props
const mapStateToProps = state => {
    return {
        credentials: state.credentials,
        errorMessages: state.errorMessages,
        loading: state.loading,


    }
}

export default connect(mapStateToProps, { loginUser, setError })(Login)