import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { connect } from 'react-redux';

import { getFileToUpload } from '../actions/userActions'

const thumbsContainer = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	marginTop: 16
};

const thumbStyle = {
	display: 'inline-flex',
	borderRadius: 2,
	border: '1px solid #eaeaea',
	marginBottom: 8,
	marginRight: 8,
	width: 100,
	height: 100,
	padding: 4,
	boxSizing: 'border-box'
};

const thumbInner = {
	display: 'flex',
	minWidth: 0,
	overflow: 'hidden'
};

const img = {
	display: 'block',
	width: 'auto',
	height: '100%'
};


function ProfileDropzone(props) {
	const [file, setFile] = useState();
	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*', maxFiles: 1,
		onDrop: acceptedFile => {
			setFile(acceptedFile);
			Object.assign({
				preview: URL.createObjectURL(file)
			})
		}
	})

	const thumb = file => (
		<div style={thumbStyle} key={file.name}>
			<div style={thumbInner}>
				<img
					src={file.preview}
					style={img}
					alt='upload preview'
				/>
			</div>
		</div>
	)

	useEffect(() => {
		getFileToUpload(file)
	}, [file])

	useEffect(() => {
		// Make sure to revoke the data uris to avoid memory leaks
		if (file) {
			URL.revokeObjectURL(file.preview);
		}
	}, [file])

	return (
		<section className="container">
			<div {...getRootProps({ className: 'dropzone' })}>
				<input {...getInputProps()} />
				<p>Drag 'n' drop some files here, or click to select files</p>
			</div>
			<aside style={thumbsContainer}>
				{thumb}
			</aside>
		</section>
	);
}
const mapStateToProps = state => {
	return {

	}
}
export default connect(mapStateToProps, { getFileToUpload })(ProfileDropzone)