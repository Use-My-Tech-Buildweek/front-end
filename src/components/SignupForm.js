import React from 'react'
import { connect } from 'react-redux'
import M from "materialize-css";
import { withRouter } from 'react-router-dom'
import { addUser, setError, clearRegisterForm } from '../actions/userActions'


class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: {
                username: '',
                password: '',
                // email: '',
                //bio,
                //profileImg: '',
                department: '',
            },
            error: '',
            isFilePicked: false
        }
    }
    componentDidMount() {
        const elems = document.querySelectorAll("select");
        M.FormSelect.init(elems);
    }



    handleSubmit = e => {
        e.preventDefault()
        console.log('submit add new user button clicked, calling addUser', this.state.newUser)
        this.props.addUser(this.state.newUser)
        if (!this.props.errorMessages) {
            this.props.history.push('/login')
        } else {
            clearRegisterForm();
        }
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
            <div className='row'>
                <form action='submit' className='col s12' onSubmit={this.handleSubmit}>
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
                    <div className="row">
                        <div className="input-field col s12">
                            <select
                                name="department"
                                id="department"
                                onChange={this.handleChanges}
                                value={this.state.newUser.department}
                            >
                                <option name="department" value="default" >
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
                    {/*  <div className="row">
                        <div className="input-field col s6">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={this.handleChanges}
                                value={this.state.newUser.email}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
        */}
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
                            <label htmlFor="password"></label>
                        </div>
                        {/*<div className="input-field col s6">
                            <input
                                type="password"
                                name="pw_validate"
                                id="pw_validate"
                                onChange={this.handleChanges}
                                value={this.state.pw_validate}
                            />
                            <label htmlFor="pw_verify"></label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea
                                name="bio"
                                id="bio"
                                cols="30"
                                rows="10"
                                className="materialize-textarea"
                                onChange={this.handleChanges}
                                value={this.state.newUser.bio}
                            />
                            <label htmlFor="bio">Introduce Yourself</label>
                        </div>
                    </div>
                    <div className="row">
                        {/*    <div className="file-field input-field col s12">
                               <div className="btn">
                              <span>Profile Picture</span>
                                <input
                                 type="file"
                                name="profile_picture"
                          onChange={handlechange}
                             value={formValues.profile_picture}
                                 />
                                   </div>
                            </div>*/}
                        <div className="row">
                            <div className="col s6">
                                <button type="submit" className="btn btn-waves-effect">
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
    }
}
export default withRouter(connect(mapStateToProps, { setError, addUser, clearRegisterForm })(SignupForm))