
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import { uploadFile } from '../actions/itemsActions.js'



const FileUploader = props => {
	console.log('fileUploader started')
	const [selectedFile, setSelectedFile] = useState({})
	const [selectedFileURL, setSelectedFileURL] = useState()
	const [isSelected, setIsSelected] = useState(false)

	let img = ''
	const changeHandler = evt => {
		if (evt.target.files && evt.target.files[0]) {
			img = evt.target.files[0]
			let image = URL.createObjectURL(img)
			setSelectedFileURL(image)
			setSelectedFile(evt.target.files[0])
			setIsSelected(true)
			console.log('file chosen for upload', selectedFile)
		}
	}
	const handleSubmission = () => {
		const formData = new FormData()

		formData.append('file', selectedFile, selectedFile.name)
		console.log('submitting file for upload', selectedFile)
		uploadFile(formData)
		props.history.push(`/profile/user/${props.user.id}/`)
	}

	return (

		<div>
			<input type="file" name="file" onChange={changeHandler} accept='image/*' />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
	)
}
const mapStateToProps = state => {
	return {
		isUserLoggedIn: state.users.isUserLoggedIn,
		newItem: state.items.newItem,
		user: state.users.user

	}
}
export default connect(mapStateToProps, { uploadFile })(FileUploader)
