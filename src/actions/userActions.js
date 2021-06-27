import axios from 'axios'

//import useCallAPI from "../hooks/useCallAPI"
import { axiosWithAuth } from '../utils/axiosWithAuth'
//import { history } from '../utils/history'

export const CLEAR_REGISTER_FORM = 'CLEAR_REGISTER_FORM'
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS'
export const START_ADD_USER = 'START_ADD_USER'
export const ADD_USER_ERROR = 'ADD_USER_ERROR'
export const SET_ERROR = 'SET_ERROR'
export const START_USERLIST_FETCH = 'START_USER_FETCH'
export const FETCH_USERLIST_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_USERLIST_ERROR = 'FETCH_ERROR'
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
export const USER_LOG_OUT = 'USER_LOG_OUT'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_ERROR = 'LOG_OUT_ERROR'
export const GET_MYITEMS_START = 'GET_MYITEMS_START'
export const GET_MYITEMS_SUCCESS = 'GET_MYITEMS_SUCCESS'
export const GET_MYITEMS_ERROR = 'GET_MYITEMS_ERROR'

// action call to call api for list of users 
export const fetchUserList = () => dispatch => {
	dispatch({ type: START_USERLIST_FETCH })
	console.log('attempting to fetch all users')
	axios.get('https://ptpt-use-my-tech5.herokuapp.com/api/users')
		.then(resp => {
			dispatch({ type: FETCH_USERLIST_SUCCESS, payload: resp.data })
			console.log('successfully fetched users')
		})
		.catch(err => dispatch({ type: FETCH_USERLIST_ERROR, payload: err }))
}

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
export const loginUser = (credentials) => async dispatch => {
	console.log('actions says: dispatching LOGIN_USER', credentials)
	dispatch({ type: LOGIN_USER, payload: credentials })
	console.log('actions says: attempting api.post login', credentials)
	try {
		const resp = await axiosWithAuth().post('https://ptpt-use-my-tech5.herokuapp.com/api/login', credentials)
		console.log('actions says: post call success', resp)
		localStorage.setItem('token', resp.data.token)
		dispatch({ type: LOGIN_SUCCESS, payload: resp.data.user })
	} catch (err) {
		setError(err)
		console.log('actions says: error in post call to login', err)
		dispatch({ type: LOGIN_ERROR, payload: err })
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

export const userLogOut = () => async dispatch => {
	dispatch({ type: USER_LOG_OUT })
	try {
		const response = await axiosWithAuth().delete('https://ptpt-use-my-tech5.herokuapp.com/api/logout')
		dispatch({ type: LOG_OUT_SUCCESS, payload: response })
		console.log('actions says: successfully logged out', response)
	} catch (err) {
		dispatch({ type: LOG_OUT_ERROR, payload: err })
		console.log(err)
	}
}
export const clearRegisterForm = () => dispatch => {
	dispatch({ type: CLEAR_REGISTER_FORM })

}

export const getMyItems = id => async dispatch => {
	dispatch({ type: GET_MYITEMS_START })
	try {
		const resp = await axiosWithAuth().get(`https://ptpt-use-my-tech5.herokuapp.com/api/users/${id}/items`)
		dispatch({ type: GET_MYITEMS_SUCCESS, payload: resp.data })
	} catch (err) {
		dispatch({ type: GET_MYITEMS_ERROR, payload: err })
	}

}