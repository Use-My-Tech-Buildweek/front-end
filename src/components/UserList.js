import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams
} from 'react-router-dom'

import User from './User'
import Profile from './Profile'
import PrivateRoute from './PrivateRoute'
import { fetchUsers } from '../actions/userActions'

const UserList = props => {
	useEffect(() => {
		fetchUsers();
	}, [])

	if (props.isLoading) {
		return (
			<h2>Loading....</h2>
		)
	}

	return (
		<div className='listContainer'>
			{props.users.map((user) => (
				<User key={user.id} user={user} />
			))}
		/</div>
	)
}

const mapStateToProps = state => {
	return {
		users: state.users,
		isLoading: state.isLoading,
		errorMessages: state.errorMessages
	}
}
export default connect(mapStateToProps, { fetchUsers })(UserList)