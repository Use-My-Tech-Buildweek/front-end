import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'

import { useForm } from '../hooks/useForm'
import useCallAPI from '../hooks/useCallAPI'


const initialValues = {
    credentials: {
        username: '',
        password: ''
    },
    error: '',
}

const Login = props => {
    const [state, handleChanges, handleSubmit] = useForm(initialValues)

    const { response, error, loading } = useCallAPI({
        method: 'post',
        url: '/login',
        headers: { accept: '*/*' },
        data: state.credentials,
    })

    const { push } = useHistory();

    const errorStyle = {
        color: 'red',
        fontWeight: 'bold',
        fontSize: '36px'
    }

    /*  useEffect(() => {
         if (response.statusCode === '200') {
             push('/profile')
         }
     }, [response, push]) */

    return (
        <form onSubmit={handleSubmit}>

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

            {loading ? (<p>Loading...</p>) : (<div>
                {error && (<div><p style={errorStyle}>{error.message}</p></div>)}</div>)
            }
            {response ? (<p>Successfully logged in!</p>) : ''}


        </form >
    )


}

export default Login