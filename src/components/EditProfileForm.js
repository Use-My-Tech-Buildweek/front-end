import React, { Component } from 'react'
import { getProfile, updateProfile, deleteAccount } from '../actions/userActions'
import { connect } from 'react-redux'
import * as yup from 'yup'
import signupSchema from '../schemas/signupSchema'

import Modal from './Modal'

class EditProfileForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {
				username: this.props.user.username,
				password: this.props.user.password,
				profile_pic: this.props.user.profile_pic,
				department: this.props.user.department,
				location: this.props.user.location,
			},
			updatedUser: {
				username: '',
				password: '',
				//confirmPassword: '',
				// email: '',
				// bio: '',
				profile_pic: '',
				department: '',
				location: '',
			},
			errors: {
				username: '',
				password: '',
				//confirmPassword: '',
				// email: '',
				//bio,
				profile_pic: '',
				department: '',
				location: '',
			},
			error: '',
			selectedFile: null,
			validation: true,
			id: 'editProfile'
		}

	}

	handleSubmit = e => {
		e.preventDefault()
		console.log('submit update user button clicked, calling update user', this.state.updatedUser);
		this.props.updateProfile(this.state.updatedUser);
		this.props.history.push(`/profile/:${this.props.user.id}`);
	}

	handleChanges = e => {
		this.setState({
			...this.state,
			updatedUser: {
				...this.state.updatedUser,
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

	componentDidMount = () => {
		this.props.getProfile(this.props.user.id)
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


	render() {
		return (
			<>
				{/*<Modal actionToConfirm={this.props.deleteAccount} textButton="delete my account" id="deleteProfileModal" />*/}
				<form onSubmit={this.handleSubmit}>
					<label>
						Role
						<select value={this.state.user.department}>
							<option value="" disabled>== option ==</option>
							<option value='Renter'>Renter</option>
							<option value="Owner">Owner</option>
						</select>
					</label>
					<label>
						Username
						<p>{this.state.errors.username}</p>

						<input
							name="username"
							type="text"
							placeholder="choose your username"
							onChange={this.handleChanges}
							value={this.state.user.username}
							id='username'
						/>
					</label>
					{/* <label>
					Email
            <input
						name="email"
						type="text"
						placeholder="contact email"
						value={this.state.user.email}
						id='email'
						onChange={this.handleChanges}
					/>
				</label> */}
					<label>
						Password
						<p>{this.state.errors.password}</p>

						<input
							name="password"
							type="password"
							placeholder="enter your password"
							value={this.state.user.password}
							id='password'
							onChange={this.handleChanges}
						/>
					</label>
					<label>
						Confirm your Password
						<p>{this.state.errors.confirmPassword}</p>
						<input
							name="confirmPassword"
							type="text"
							placeholder="confirm your password"
						/>
					</label>
					{/* <label>
					Tell everyone a little about yourself:
            <textarea
						name="bio"
						type="text"
						placeholder="About me..."
						id='bio'
						value={this.state.user.bio}
						onChange={this.handleChanges}
					/>
				</label> */}
					<label>
						Profile picture
						<input
							name="profilePicture"
							type="file"
							accept=".jpg,.jpeg,.png"
							placeholder="Avatar"
							value={this.state.user.profile_pic}
							onChange={this.fileChange}
						/>
					</label>
					<div>
						<button type="submit" disabled={this.state.validation}>Save changes</button>
						{//<button type="button" onClick={() => { this.props.triggerModal(this.state.id) }}>Delete my profile</button>
						}
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