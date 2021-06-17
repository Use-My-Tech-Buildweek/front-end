import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

//import { useFetch } from '../hooks/useFetch'

const Login = props => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })
    /*  const res = useFetch({
         method: 'post',
         url: 'http://pokeapi.co/api/v2/ability/stench',
         data: credentials,
         config: '',
     }) */
    const handleChanges = e => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const login = e => {
        e.preventDefault()
        console.log('Logging in')
        axios.post('#', credentials)                //waiting on url
            .then(res => {
                localStorage.setItem('token', res.data.payload)
                props.history.push('/protected')
            })
            .catch(err => {
                console.log(err)
            })
    };

    // if (!res.response) {
    //     return <div>Loading...</div>
    // }


    return (
        <form onSubmit={login}>

            <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChanges} />


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
        </form>
    )

}

export default Login