//import axios from 'axios';
import React from 'react'
import { connect } from 'react-redux'

import { uploadFile } from '../actions/userActions'

class FileUpload extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedFile: null,
			isFileSelected: false
		}
	}
	changeHandler = evt => {
		this.setState({
			selectedFile: evt.target.files[0],
			isFileSelected: true
		})
	}
	uploadFile = (e) => {
		e.persist()

		const formData = new FormData();
		formData.append('File', this.state.selectedFile)
		fetch(`https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5`, {
			method: 'POST',
			body: formData,
		}).then((response) => response.json())
			.then((result) => {
				console.log('success:', result)
			}).catch((error) => {
				console.error('error:', error)
			})
	}
	//figureLastModifiedDate = (selectedFile) => {
	//if (this.state.selectedFile) {
	//		const lastModified = this.state.isFileSelected ? this.state.selectedFile.lastModifiedDate.toDateString() : ""
	//return lastModified;
	//	}

	render() {
		return (
			<>
				<div className="file-field input-field col s12">
					<div>
						<input type="file" onChange={this.changeHandler} />
						<button onClick={this.props.uploadFile}>
							Upload!
                </button>
					</div>

				</div>



				{/* <div className="btn">
				<span>Profile Picture</span>
				<input
					type="file"
					name="file"
					onChange={changeHandler}
	/> */}
				{this.state.isFileSelected ? (
					<div>
						<p>Filename: {this.state.selectedFile.name}</p>
						<p>Filetype: {this.state.selectedFile.type}</p>
						<p>Size in bytes: {this.state.selectedFile.size}</p>
						<p>lastModifiedDate:{this.figureLastModifiedDate}
						</p>
					</div>
				) : (
					<p>Select a file to show details:</p>
				)}
				<div >

				</div>

			</>)
	}
}

const mapStateToProps = state => {
	return {
		users: state.users,
		newUser: state.newUser,
		error: state.error,
	}
}
export default connect(mapStateToProps, { uploadFile })(FileUpload)