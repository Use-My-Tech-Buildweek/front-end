
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { uploadFile } from '../actions/itemsActions.js'

const FileUploader = props => {
	const [selectedFile, setSelectedFile] = useState()
	const [isFilePicked, setIsFilePicked] = useState(false)

	const changeHandler = evt => {
		setSelectedFile(evt.target.files[0])
		setIsFilePicked(true)
	}

	const handleSubmission = () => {
		const formData = new FormData()
		formData.append('File', selectedFile)
		uploadFile(formData)
	}

	return (
		<div>
			<div className="row">
				<div className="col-8">
					<input type="file" name='profile_image' accept="image/*" onChange={changeHandler} />
					{isFilePicked ? (<div>
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
			</div>

			<div className="col-4">
				<button
					className="btn btn-success btn-sm"

					onClick={handleSubmission}
				>
					Upload
				</button>
			</div>
		</div>

	);
}

const mapStateToProps = state => {
	return {
		isUserLoggedIn: state.users.isUserLoggedIn,
		newItem: state.items.newItem,
		user: state.users.user

	}
}
export default connect(mapStateToProps, { uploadFile })(FileUploader)
