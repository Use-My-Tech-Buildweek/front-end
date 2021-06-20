import React from 'react'
import { Route, Redirect } from 'react-router-dom'


const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route {...rest} render={
			(props) => {
				if (localStorage.getItem('token')) {
					return <Component {...props} />
				} else {
					return (<><p>You must log in to view this page</p>
						<Redirect to='/login' /></>)

				}
			}
		} />)

}
export default PrivateRoute