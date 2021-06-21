import axios from 'axios'

//import useCallAPI from "../hooks/useCallAPI"
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { history } from '../utils/history'

export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS'
export const START_ADD_USER = 'START_ADD_USER'
export const ADD_USER_ERROR = 'ADD_USER_ERROR'
export const SET_ERROR = 'SET_ERROR'
export const START_USERS_FETCH = 'START_USER_FETCH'
export const FETCH_USERS_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_USERS_ERROR = 'FETCH_ERROR'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const EDIT_PROFILE = 'EDIT_PROFILE'
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS'
export const START_USER_FETCH = 'START_USER_FETCH'
export const USER_FETCH_ERROR = 'USER_FETCH_ERROR'
export const START_UPDATE_PROFILE = 'START_UPDATE_PROFILE'
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS'
export const UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR'

// action call to call api for list of users 
export const fetchUsers = () => dispatch => {
	dispatch({ type: START_USERS_FETCH })
	console.log('attempting to fetch all users')
	axios.get('https://ptpt-use-my-tech5.herokuapp.com/api/users')
		.then(resp => {
			dispatch({ type: FETCH_USERS_SUCCESS, payload: resp.data })
			console.log('successfully fetched users')
		})
		.catch(err => dispatch({ type: FETCH_USERS_ERROR, payload: err }))
}

//try {
// 	const { response, loading } = useCallAPI({
// 		method: 'get',
// 		url: 'https://ptpt-use-my-tech5.herokuapp.com/api/users',
// 		headers: {
// 			accept: '*/*'
// 		},
// 	})
// 	dispatch({ type: FETCH_SUCCESS, payload: response.data, loading })

// } catch (error) {
// 	dispatch({ type: FETCH_ERROR, payload: error })
// }


// action call to add user to database
export const addUser = (newUser) => dispatch => {
	dispatch({ type: START_ADD_USER, payload: newUser })
	console.log('userActions says: attempting to register user', newUser)
	try {
		axios.post('https://ptpt-use-my-tech5.herokuapp.com/api/register', newUser)
			.then(resp => {
				dispatch({ type: ADD_USER_SUCCESS, payload: resp.data })
			}).catch(err => dispatch({ type: ADD_USER_ERROR, payload: err })
			)
	} catch (error) {
		dispatch({ type: ADD_USER_ERROR, payload: error })
	}
}

// action call to set error messages
export const setError = errorMessage => {
	return { type: SET_ERROR, payload: errorMessage }
}

// action call to log in
export const loginUser = (credentials) => dispatch => {
	console.log('actions says: dispatching LOGIN_USER', credentials)
	dispatch({ type: LOGIN_USER, payload: credentials })

	try {
		console.log('actions says: attempting api.post login', credentials)
		axiosWithAuth().post('https://ptpt-use-my-tech5.herokuapp.com/api/login', credentials)
			.then(resp => {
				console.log('actions says: post call success', resp)
				console.log(history)
				localStorage.setItem('token', resp.data.token)
				dispatch({ type: LOGIN_SUCCESS, payload: resp.data.user })
				history.push(`/profile/:id`)
			}).catch(err => {
				setError(err)
				console.log('actions says: error in post call to login', err)
				dispatch({ type: LOGIN_ERROR, payload: err })
			}
			)
	} catch (error) {
		console.log('actions says: dispatching LOGIN_ERROR')
		dispatch({ type: LOGIN_ERROR, payload: error })
	}
}

// action call to get a particular profile
export const getProfile = userId => dispatch => {
	console.log('actions says: calling getProfile', userId)
	dispatch({ type: START_USER_FETCH, payload: userId })
	try {
		axiosWithAuth().get(`https://ptpt-use-my-tech5.herokuapp.com/api/user/${userId}`)
			.then(resp => {
				console.log('actions says: success user fetch', userId)
				dispatch({ type: USER_FETCH_SUCCESS, payload: resp.data })
			})
			.catch(err => {
				console.log('actions says: error fetching user', err)
				dispatch({ type: USER_FETCH_ERROR, payload: err })
			})

	} catch (error) {
		console.log('actions says: error fetching user')
		dispatch({ type: USER_FETCH_ERROR, payload: error })
	}
}

// action call to update user's profile
export const updateProfile = user => dispatch => {
	console.log('actions says: calling updateProfile')
	dispatch({ type: START_UPDATE_PROFILE, payload: user })
	try {
		axiosWithAuth().put(`https://ptpt-use-my-tech5.herokuapp.com/api/user/${user}`, user)
			.then(resp => {
				console.log('updated profile', resp)
				dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: resp.data })
			}).catch(err => {
				console.log('error updating profile', err)
				dispatch({ type: UPDATE_PROFILE_ERROR, payload: err })
			})
	} catch (error) {
		dispatch({ type: UPDATE_PROFILE_ERROR, payload: error })

	}

}