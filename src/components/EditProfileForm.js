import React, { Component } from 'react'
import M from "materialize-css"
import { connect } from 'react-redux'
import * as yup from 'yup'
import { Link } from 'react-router-dom'

import signupSchema from '../schemas/signupSchema'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { getUserUrl } from '../utils/apiUrls'
import { getProfile, updateProfile, deleteAccount } from '../actions/userActions'
import SingleFileAutoSubmit from './SingleFileAutoSubmit'
import DropzoneWithPreview from './DropzoneWithPreview'
class EditProfileForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {
				username: '',
				password: '',
				profile_pic: '',
				department: '',
				location: '',
				id: ''
			},
			errors: {
				username: '',
				password: '',
				profile_pic: '',
				department: '',
				location: '',
			},
			error: '',
			selectedFile: null,
			validation: true,
			id: 'editProfile',
			isFilePicked: false
		}

	}

	handleSubmit = e => {
		e.preventDefault()
		console.log('submit update user button clicked, calling update user', this.state.updatedUser);
		this.props.updateProfile(this.state.updatedUser);
		this.props.history.push(`/profile/:${this.props.user.id}`);
	}

	handleChanges = e => {
		e.persist();
		this.setState(prevState => ({
			user: {
				...prevState.user,
				[e.target.name]: e.target.value
			}
		}))
		yup.reach(signupSchema, e.target.name)
			.validate(e.target.value)
			.then(() => {
				this.setState({ ...this.state, errors: { ...this.state.errors, [e.target.name]: "" } })
			})
			.catch(err => this.setState({ ...this.state, errors: { ...this.state.errors, [e.target.name]: err.message } }))
	}

	componentDidMount = () => {
		axiosWithAuth().get(getUserUrl + `${this.props.user.id}`)
			.then(res => {
				this.setState({ user: res.data })
			})
			.catch(error => console.log(error))

		const elems = document.querySelectorAll("select");
		M.FormSelect.init(elems);
	}

	handleSubmit = e => {
		e.persist()
		this.props.updateProfile(this.state.updatedUser)
	}

	fileChange = e => {
		this.setState({ selectedFile: e.target.files[0] })
	}

	onFileUpload = () => {
		const formData = new FormData();
		formData.append('file', this.state.selectedFile, this.state.selectedFile.name);
		this.props.uploadFile(this.state.selectedFile)
	}

	componentDidUpdate() {
		signupSchema.isValid(this.state.user)
			.then(valid => {
				if (this.state.validation === valid) {
					this.setState({ ...this.state, validation: !valid })
				}
			})

	}

	goToFileUploader = () => {
		this.props.history.push(`/user/${this.props.user.id}/avatar`)
	}

	render() {
		return (
			<>
				<form onSubmit={this.handleSubmit} className='col s8'>
					<div className='row'>
						<div className='input-field col s6'>
							<input
								name="username"
								type="text"
								id='username'
								autoComplete='username'
								onChange={this.handleChanges}
								value={this.state.user.username}
							/>
							<label htmlFor="username">Username</label>
						</div>
					</div>
					<p>{this.state.errors.username}</p>
					<p>{this.state.errors.password}</p>
					<div className="row">
						<div className="input-field col s6">
							<input
								type="password"
								name="password"
								id="password"
								autoComplete='current-password'
								onChange={this.handleChanges}
								value={this.state.user.password}
							/>
							<label htmlFor="password">Password</label>
						</div>
					</div>

					<p>{this.state.errors.department}</p>
					<div className="row">
						<div className="input-field col s12">
							<select
								name="department"
								id="department"
								onChange={this.handleChanges}
								value={this.state.user.department}
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
					<div className='row'>
						<div className='col s6'>
							<DropzoneWithPreview />
						</div>
						<div className='col s6'>

							<SingleFileAutoSubmit />
							{/*}<Link to={`/user/${this.props.user.id}/avatar`} type='button' href={'/'} onClick={this.goToFileUploader}>Click to add or change your avatar</Link>*/}
						</div>
						<div className="row">
							<div className="col s6">
								<button type="submit" className="btn btn-waves-effect" >

									Save changes</button>
							</div>
						</div>
					</div>
				</form>
			</>
		)
	}
}


const mapStateToProps = state => {
	return {
		user: state.users.user,
		errorMessages: state.users.error,
		isUserLoggedIn: state.users.isUserLoggedIn,
		userList: state.lists.userList

	}
}
export default connect(mapStateToProps, { getProfile, updateProfile, deleteAccount })(EditProfileForm)


