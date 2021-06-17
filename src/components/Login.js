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
    url: '/login',
    method: 'post',
    body: '',
    headers: ''

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

    /*   useEffect(() => {
          if (response !== null) {
              localStorage.setItem('token', response)
              push('/profile')
          }
      }, [response, push])
   */
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
                {error && (<div><p>{error.message}</p></div>)}</div>)
            }


        </form >
    )

}

export default Login