//import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux'

import FileUploadService from '../utils/FileUploadService'

class ImageUpload extends Component {
	constructor(props) {
		super(props)

		this.state = {
			currentFile: undefined,
			previewImage: undefined,
			progress: 0,
			message: '',

			imageInfos: []
		}
	}


	selectFile = (evt) => {
		this.setState({
			currentFile: evt.target.files[0],
			previewImage: URL.createObjectURL(evt.target.files[0]),
			progress: 0,
			message: ''
		})
	}

	upload() {
		this.setState({
			progress: 0,
		})
		FileUploadService.upload(this.state.currentFile, (evt) => {

			this.setState({
				progress: Math.round((100 * evt.loaded) / evt.total),
			});
		})
			.then((response) => {
				this.setState({
					message: response.data.message,
				})
				return FileUploadService.getFiles();
			})
			.then((files) => {
				this.setState({
					imageInfos: files.data,
				})
			})
			.catch((err) => {
				this.setState({
					progress: 0,
					message: 'Counld not upload image',
					currentFile: undefined,
				})
			})
	}

	componentDidMount() {
		FileUploadService.getFiles().then((response) => {
			this.setState({
				imageInfos: response.data,
			})
		})
	}
	render() {
		const {
			currentFile,
			previewImage,
			progress,
			message,
			imageInfos,
		} = this.state;

		return (
			<div>
				<div className="row">
					<div className="col-8">
						<label className="btn btn-default p-0">
							<input type="file" accept="image/*" onChange={this.selectFile} />
						</label>
					</div>

					<div className="col-4">
						<button
							className="btn btn-success btn-sm"
							disabled={!currentFile}
							onClick={this.upload}
						>
							Upload
						</button>
					</div>
				</div>
				{/* ************************ ATTENTION GREG: THIS IS THE BOOTSTRAP VERSION OF STYLING FOR PROGRESS BAR, PLEASE UPDATE*********/}
				{currentFile && (
					<div className="progress my-3">
						<div
							className="progress-bar progress-bar-info progress-bar-striped"
							role="progressbar"
							aria-valuenow={progress}
							aria-valuemin="0"
							aria-valuemax="100"
							style={{ width: progress + "%" }}
						>
							{progress}%
						</div>
					</div>
				)}

				{previewImage && (
					<div>
						<img className="preview" src={previewImage} alt="" />
					</div>
				)}

				{message && (
					<div className="alert alert-secondary mt-3" role="alert">
						{message}
					</div>
				)}

			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isUserLoggedIn: state.isUserLoggedIn
	}
}
export default connect(mapStateToProps, {})(ImageUpload)
