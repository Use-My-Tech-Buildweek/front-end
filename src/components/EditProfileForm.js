import React, { Component } from 'react'
import { getProfile, updateProfile } from '../actions/userActions'
import { connect } from 'react-redux'
import * as yup from 'yup'
import signupSchema from '../schemas/signupSchema'

import Modal from './Modal'

class EditProfileForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {
				username: '',
				password: '',
				confirmPassword: '',
				// email: '',
				// bio: '',
				// profileImg: '',
				department: '',
			},
			errors: {
				username: '',
				password: '',
				confirmPassword: '',
				// email: '',
				//bio,
				//profileImg: '',
				department: '',
			},
			error: '',
			selectedFile: null,
			validation: true
		}
	}

	handleSubmit = e => {
		e.preventDefault()
		console.log('submit add new user button clicked, calling addUser', this.state.newUser);
		this.props.addUser(this.state.newUser);
		this.props.history.push(`/profile/:${this.props.user.id}`);
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
				this.setState({ ...this.state, errors: { ...this.state.errors, [e.target.name]: "" } })
			})
			.catch(err => this.setState({ ...this.state, errors: { ...this.state.errors, [e.target.name]: err.message } }))
	}

	componentDidMount = () => {
		this.props.getProfile(this.props.match.params.id)
	}

	handleSubmit = e => {
		e.persist()
		this.props.updateProfile(this.state.user)
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
				<Modal actionToConfirm={this.props.deleteAccount} textButton="delete my account" id="deleteProfileModal" />
				<form onSubmit={this.handleSubmit}>
					<label>
						Role
						<select name="role" onChange={this.handleChanges}>
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
					{/* <label>
					Profile picture
            <input
						name="profilePicture"
						type="file"
						accept=".jpg,.jpeg,.png"
						placeholder="Avatar"
						value={this.state.user.profileImg}
						onChange={this.fileChange}
					/>
				</label> */}
					<div>
						<button type="submit" disabled={this.state.validation}>Save changes</button>
						<button type="button" onClick={() => { this.props.triggerModal() }}>Delete my profile</button>
					</div>
				</form>
			</>
		)
	}
}


const mapStateToProps = state => {
	return {
		user: state.user,
		error: state.error,
		isUserLoggedIn: state.isUserLoggedIn

	}
}
export default connect(mapStateToProps, { getProfile, updateProfile })(EditProfileForm)