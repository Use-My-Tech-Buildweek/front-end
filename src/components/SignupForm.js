import React from 'react'
import { connect } from 'react-redux'
import M from "materialize-css";
import { withRouter } from 'react-router-dom'
import { addUser, setError, clearRegisterForm } from '../actions/userActions'

import * as yup from 'yup'
import signupSchema from '../schemas/signupSchema'

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: {
                username: '',
                password: '',
                confirmPassword:'',
                // email: '',
                //bio,
                //profileImg: '',
                department: '',
            },
            errors: {
                username: '',
                password: '',
                confirmPassword:'',
                // email: '',
                //bio,
                //profileImg: '',
                department: '',
            },
            error: '',
            isFilePicked: false,
            validation: true,
        }
    }

    componentDidMount() {
        const elems = document.querySelectorAll("select");
        M.FormSelect.init(elems);
    }




//     handleSubmit = e => {
//         e.preventDefault()
//         console.log('submit add new user button clicked, calling addUser', this.state.newUser)
//         this.props.addUser(this.state.newUser)
//         if (!this.props.errorMessages) {
//             this.props.history.push('/login')
//         } else {
//             clearRegisterForm();
//         }
//     }
    componentDidUpdate() {
        signupSchema.isValid(this.state.newUser)
        .then(valid => {
            if(this.state.validation === valid){
                this.setState({...this.state, validation: !valid})}
        })

    }

    handleSubmit = e => {
        e.preventDefault()
        console.log('submit add new user button clicked, calling addUser', this.state.newUser);
        this.props.addUser(this.state.newUser);
         if (!this.props.errorMessages) {
              this.props.history.push('/login')
          } else {
              clearRegisterForm();
        this.props.history.push(`/profile/:${this.props.user.id}`);
        }
    }



    handleChanges = e => {
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
            this.setState({...this.state, errors: {...this.state.errors, [e.target.name]: ""}})})
            .catch(err => this.setState({...this.state, errors: {...this.state.errors, [e.target.name]: err.message}}))       
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
                                <option name="department" value="default" selected hidden>
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
                    <p>{this.state.newUser.confirmPassword !== this.state.newUser.password?this.state.errors.confirmPassword:null}</p>
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                autoComplete='current-password'
                                onChange={this.handleChanges}
                                value={this.state.newUser.confirmPassword}
                            />
                            <label htmlFor="confirmPassword">Confirm Password</label>
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
                                <button type="submit" className="btn btn-waves-effect" disabled={this.state.validation}>
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