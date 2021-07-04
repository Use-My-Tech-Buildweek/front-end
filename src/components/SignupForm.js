import React from 'react'
import { connect } from 'react-redux'
import M from "materialize-css";
import { withRouter } from 'react-router-dom'
import { addUser, setError, clearRegisterForm } from '../actions/userActions'
import { fetchUserList } from '../actions/fetchActions'

import * as yup from 'yup'
import signupSchema from '../schemas/signupSchema'


class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: {
                username: '',
                password: '',
                profile_pic: '',
                department: '',
                location: ''
            },
            errors: {
                username: '',
                password: '',
                profile_pic: '',
                department: '',
            },
            error: '',
            isFilePicked: false,
            validation: true,
            selectedFile: '',
            formValues: []
        }
    }

    componentDidMount() {
        // Styling
        const elems = document.querySelectorAll("select");
        M.FormSelect.init(elems);
    }

    componentDidUpdate() {
        // Error validation
        signupSchema.isValid(this.state.newUser)
            .then(valid => {
                if (this.state.validation === valid) {
                    this.setState({ ...this.state, validation: !valid })
                }
            })

    }

    // Change handler for file uploads
    fileChange = e => {
        this.setState({ selectedFile: e.target.files[0] })
        this.setState({ isFilePicked: true })
    }
    onFileUpload = () => {
        const formData = new FormData();
        formData.append('file', this.state.selectedFile, this.state.selectedFile.name);
        this.props.uploadFile(this.state.selectedFile)
    }

    // handles form submisson for registration
    handleSubmit = e => {
        e.preventDefault()
        console.log('submit add new user button clicked, calling addUser', this.state.newUser);
        // calls action creator to add new user
        this.props.addUser(this.state.newUser);
        // updates user list
        this.props.fetchUserList();
        // If no errors from action, redirect to login page
        if (!this.props.errorMessages) {
            this.props.history.push('/login')
        } else {
            // If errors, clear form
            clearRegisterForm();
        }
    }

    // Change handler for registration form
    handleChanges = e => {
        // profile picture file size checking
        if (e.target.id === "profilePicture") {
            const maxSize = 2000000
            const size = e.target.files[0].size
            if (size > maxSize) {
                this.setState({ ...this.state, errors: { ...this.state.errors, } })
            }
        }
        this.setState({
            ...this.state,
            newUser: {
                ...this.state.newUser,
                [e.target.name]: e.target.value
            }
        })
        yup.reach(signupSchema, e.target.name)
            .validate(e.target.value)
            .then(() => {
                this.setState({ ...this.state, errors: { ...this.state.errors, [e.target.name]: "" } })
            })
            .catch(err => this.setState({ ...this.state, errors: { ...this.state.errors, [e.target.name]: err.message } }))
    }

    render() {
        return (
            <div className='row'>
                <form action='submit' className='col s12' onSubmit={this.handleSubmit}>
                    <p>{this.state.errors.username}</p>
                    <div className='row'>
                        <div className='input-field col s6'>
                            <input
                                name="username"
                                type="text"
                                id='username'
                                autoComplete='username'
                                onChange={this.handleChanges}
                                value={this.state.newUser.username}
                            />
                            <label htmlFor="username">Username</label>
                        </div>
                    </div>
                    <p>{this.state.errors.department}</p>
                    <div className="row">
                        <div className="input-field col s12">
                            <select
                                name="department"
                                id="department"
                                onChange={this.handleChanges}
                                value={this.state.newUser.department}
                            >
                                <option name="department" value="default" hidden>
                                    Choose your role
                                </option>
                                <option name="department" value="renter">
                                    Renter
                                </option>
                                <option name="department" value="owner">
                                    Owner
                                </option>
                            </select>
                            <label htmlFor="department">Account Type</label>
                        </div>
                    </div>

                    <p>{this.state.errors.password}</p>
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                autoComplete='current-password'
                                onChange={this.handleChanges}
                                value={this.state.newUser.password}
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="file-field input-field col s12">
                            {/*<FileUploader uploadFile={uploadFile} image_name='profile_pic' />*/}
                            <div className="col-8">
                                <input type="file" name='profile_image' accept="image/*" onChange={this.fileChange} />
                                {this.state.isFilePicked ? (<div>
                                    <p>Filename: {this.state.selectedFile.name}</p>
                                    <p>Filetype: {this.state.selectedFile.type}</p>
                                    <p>Size in bytes: {this.state.selectedFile.size}</p>
                                    <p>
                                        lastModifiedDate:{' '}
                                        {this.state.selectedFile.lastModifiedDate.toLocaleDateString()}
                                    </p>
                                </div>
                                ) : (
                                    <p>Select a file to show details</p>
                                )}
                                <div>
                                    <button onClick={this.onFileUpload}>Submit</button>
                                </div>
                            </div>
}
                            <div className="btn">
                                <span>Profile Picture</span>
                                <input
                                    id="profilePicture"
                                    type="file"
                                    name="profile_picture"
                                    onChange={this.handleChanges}
                                    accept="image/png, image/jpeg"
                                    value={this.state.formValues.profile_picture}
                                />
                            </div>
                            <p>{this.state.errors.profile_pic}</p>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <button type="submit" className="btn btn-waves-effect" >
                                    Submit
                                </button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        users: state.users,
        newUser: state.newUser,
        error: state.error,
        isUserLoggedIn: state.isUserLoggedIn
    }
}
export default withRouter(connect(mapStateToProps, { setError, addUser, clearRegisterForm, fetchUserList })(SignupForm))