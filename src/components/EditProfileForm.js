import React, { Component } from 'react'
import { getProfile, updateProfile } from '../actions/userActions'
import { connect } from 'react-redux'

class EditProfileForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {
				username: '',
				password: '',
				email: '',
				bio: '',
				profileImg: '',
				accountType: '',
			},
			selectedFile: null,
		}
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
            <input
						name="username"
						type="text"
						placeholder="choose your username"
						onChange={this.handleChanges}
						value={this.state.user.username}
						id='username'
					/>
				</label>
				<label>
					Email
            <input
						name="email"
						type="text"
						placeholder="contact email"
						value={this.state.user.email}
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
						value={this.state.user.password}
						id='password'
						onChange={this.handleChanges}
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
						value={this.state.user.bio}
						onChange={this.handleChanges}
					/>
				</label>
				<label>
					Profile picture
            <input
						name="profilePicture"
						type="file"
						accept=".jpg,.jpeg,.png"
						placeholder="Avatar"
						value={this.state.user.profileImg}
						onChange={this.fileChange}
					/>
				</label>
				<button type="submit">Sign up</button>
			</form>
		)
	}
}


const mapStateToProps = state => {
	return {
		user: state.user
	}
}
export default connect(mapStateToProps, { getProfile, updateProfile })(EditProfileForm)