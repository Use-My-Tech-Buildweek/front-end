import { connect } from 'react-redux'

const User = props => {

	return (<div></div>)

}

const mapStateToProps = state => {
	return {
		user: state.user,
	}
}

export default connect(mapStateToProps, {})(User)