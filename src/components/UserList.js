import React, { useEffect, useState } from 'react' // 
import { connect } from 'react-redux'
// import {
// 	BrowserRouter as Router,
// 	Switch,
// 	Route,
// 	Link,
// 	useParams
// } from 'react-router-dom'

import User from './User'
// import Profile from './Profile'
// import PrivateRoute from './PrivateRoute'
import { fetchUserList } from '../actions/userActions'

const UserList = props => {

	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetch('/users').then(res => setUsers(res.data))
	})

	return (
		<div div className='listContainer' >
			{users.map((user) => (
				<User key={user.id} user={user} />
			))}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		userList: state.userList,
		isLoading: state.isLoading,
		errorMessages: state.errorMessages
	}
}
export default connect(mapStateToProps, { fetchUserList })(UserList)