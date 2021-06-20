import React from 'react'
import { connect } from 'react-redux'

import { addUser, setError } from '../actions'

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: {
                username: '',
                password: '',
                email: '',
                bio: '',
                profileImg: '',
                department: '',
            },
            error: '',
            isFilePicked: false
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log('submit add new user button clicked, calling addUser', this.state.newUser)
        this.props.addUser(this.state.newUser)
    }

    handleChanges = e => {
        this.setState({
            newUser: {
                ...this.state.newUser,
                [e.target.name]: e.target.value
            }
        })
    }

    handleSelectFile = e => {
        this.setState({
            ...this.state.user,
            profileImg: e.target.files[0],
        })
        this.setState({
            ...this.state,
            isFilePicked: true,
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Role
            <select name="department" onChange={this.handleChanges}>
                        <option value="" disabled>== option ==</option>
                        <option value="Renter">nRenter</option>
                        <option value="Owner">Owner</option>
                    </select>
                </label>
                <label>
                    Username
            <input
                        name="username"
                        type="text"
                        placeholder="choose your username"
                        onChange={this.handleChanges}
                        value={this.state.newUser.username}
                        id='username'
                    />
                </label>
                <label>
                    Email
            <input
                        name="email"
                        type="text"
                        placeholder="contact email"
                        value={this.state.newUser.email}
                        id='email'
                        onChange={this.handleChanges}
                    />
                </label>
                <label>
                    Password
            <input
                        name="password"
                        type="password"
                        placeholder="enter your password"
                        value={this.state.newUser.password}
                        id='password'
                        onChange={this.handleChanges}
                    />
                </label>
                <label>
                    Confirm your Password
            <input
                        name="passwordConfirmation"
                        type="password"
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
                        value={this.state.newUser.bio}
                        onChange={this.handleChanges}
                    />
                </label>
                <label>
                    Profile picture
            <input
                        name="profileImg"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        placeholder="Avatar"
                        value={this.state.newUser.profileImg}
                        onChange={this.handleSelectFile}
                    />
                </label>
                <button type="submit">Sign up</button>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        newUser: state.newUser,
        error: state.error,
        sendApiCall: state.sendApiCall,
    }
}
export default connect(mapStateToProps, { setError, addUser })(SignupForm)