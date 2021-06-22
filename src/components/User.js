import { connect } from 'react-redux'

const User = props => {
	const { user } = props

	return (<div>
		<div className='card'>
			<div id='userCard' className='card-body'>
				<h3 className='card-title'>{user.username}</h3>
				<hr />
				<p className='card-text'><b>Role: </b> {user.department}</p>
			</div>
		</div>
	</div>)

}

const mapStateToProps = state => {
	return {
		isLoading: state.isLoading,
	}
}

export default connect(mapStateToProps, {})(User)