import React from 'react'
import { connect } from 'react-redux'

import { useForm } from '../hooks/useForm'
import { addUser, setError } from '../actions'


const initialValues = {
    newUser: {
        username: '',
        password: '',
        email: '',
        bio: '',
        profileImg: '',
    }
}

const SignupForm = (props) => {
    const [state, handleChanges, handleSubmit] = useForm(initialValues)


    return (
        // pass a prop to specify if the submit must create a new user or update one .. (see if user id not undefined)
        <form onSubmit={handleSubmit}>
            <label>
                Username
            <input
                    name="username"
                    type="text"
                    placeholder="choose your username"
                    onChange={handleChanges}
                    value={state.newUser.username}
                    id='username'
                />
            </label>
            <label>
                Email
            <input
                    name="email"
                    type="text"
                    placeholder="contact email"
                    value={state.newUser.email}
                    id='email'
                    onChange={handleChanges}
                />
            </label>
            <label>
                Password
            <input
                    name="password"
                    type="text"
                    placeholder="enter your password"
                    value={state.newUser.password}
                    id='password'
                    onChange={handleChanges}
                />
            </label>
            <label>
                Confirm your Password
            <input
                    name="passwordConfirmation"
                    type="text"
                    placeholder="confirm your password"
                />
            </label>
            <label>
                Tell everyone a little about yourself:
            <textarea
                    name="bio"
                    type="text"
                    placeholder="About me..."
                    id='bio'
                    value={state.newUser.bio}
                    onChange={handleChanges}
                />
            </label>
            <label>
                Profile picture
            <input
                    name="profilePicture"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    placeholder="Avatar"
                    value={state.newUser.profileImg}
                />
            </label>
            <button type="submit">Sign up</button>
        </form>
    )
}

const mapStateToProps = state => {
    return {
        users: state.users,
        newUser: state.newUser,
    }
}
export default connect(mapStateToProps, { setError, addUser })(SignupForm)