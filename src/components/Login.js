import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { generatePath } from 'react-router'
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
            },
        }
    }


    // change handler
    handleChanges = e => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.id]: e.target.value

            }
        })
    }

    // onSubmit handler
    login = async e => {
        e.preventDefault();
        console.log('Login says: submit button clicked, calling loginUser', this.state.credentials)
        await this.props.loginUser(this.state.credentials)
            .then(response => {
                console.log(response)
                this.props.history.push(`/welcome`)
            })
    }

    //error message styling
    errorStyle = {
        color: 'red',
        fontWeight: 'bold',
        fontSize: '36px'
    }

    render() {
        return (
            <form onSubmit={this.login} >
                <input
                    name="username"
                    id="username"
                    type="text"
                    placeholder="Username"
                    autoComplete='username'
                    value={this.state.credentials.username}
                    onChange={this.handleChanges}
                />

                <input
                    name="password"
                    type="password"
                    id='password'
                    autoComplete='current-password'
                    placeholder="Password"
                    onChange={this.handleChanges}
                    value={this.state.credentials.password}
                />
                <button type="submit">Login</button>

                {/* add a keep me logged in checkbox? */}
                <p> Don't have an account?</p>
                <Link to="/register"> Sign up!</Link>
                <p>Forgot your password?</p>
                {/* handle password forgotten */}

                {
                    this.props.loading ? (<p>Loading...</p>) : (<div>
                        {this.props.errorMessages && (<div><p style={this.errorStyle}>{this.props.errorMessages}</p></div>)}</div>)
                }
                )
            </form>
        )
    }
}
//connecting global state to props
const mapStateToProps = state => {
    return {
        credentials: state.credentials,
        errorMessages: state.errorMessages,
        isLoading: state.isLoading,
        user: state.user
    }
}
export default withRouter(connect(mapStateToProps, { loginUser, setError })(Login))