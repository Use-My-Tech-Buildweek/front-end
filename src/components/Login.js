import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { connect } from 'react-redux'
import axios from 'axios'


//import { useForm } from '../hooks/useForm'
//import useCallAPI from '../hooks/useCallAPI'
import { loginUser, setError } from '../actions'

const initialValues = {
    credentials: {
        username: '',
        password: ''
    }
    ,
    error: '',
}

const Login = props => {
    const [localState, setLocalState] = useState(initialValues)

    const handleChanges = e => {
        setLocalState({
            ...localState,
            [e.target.name]: e.target.value
        })
    }
    const { push } = useHistory();

    let credObj = {
        username: localState.username,
        password: localState.password
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Login says: calling loginUser', credObj)
        axios.post('our-api-url', credObj)
            .then(resp => {
                localStorage.setItem('token', resp.data.payload)
                loginUser(credObj)
                push('/profile')
            }).catch(err => setError(err))
    }


    const errorStyle = {
        color: 'red',
        fontWeight: 'bold',
        fontSize: '36px'
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChanges}
            />

            <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChanges} />

            <button type="submit">Login</button>

            {/* add a keep me logged in checkbox? */}
            <p>Don't have an account?</p>
            <Link to="/myprofile">Sign up!</Link>
            <p>Forgot your password?</p>
            {/* handle password forgotten */}

            {props.loading ? (<p>Loading...</p>) : (<div>
                {props.errorMessages && (<div><p style={errorStyle}>{props.errorMessages}</p></div>)}</div>)
            }


        </form >
    )
}

const mapStateToProps = state => {
    return {
        credentials: state.credentials,
        errorMessages: state.errorMessages,
        loading: state.loading,

    }
}
export default connect(mapStateToProps, { loginUser })(Login)