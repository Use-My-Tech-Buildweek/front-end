import axios from 'axios'

import useCallAPI from "../hooks/useCallAPI"
import { axiosWithAuth } from '../utils/axiosWithAuth'


export const ADD_USER = 'ADD_USER'
export const SET_ERROR = 'SET_ERROR'
export const START_USERS_FETCH = 'START_USER_FETCH'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_ERROR = 'FETCH_ERROR'
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
	try {
		const { response, loading } = useCallAPI({
			method: 'get',
			url: '/users',
			headers: {
				accept: '*/*'
			},
		})
		dispatch({ type: FETCH_SUCCESS, payload: response.data, loading })

	} catch (error) {
		dispatch({ type: FETCH_ERROR, payload: error })
	}
};

// action call to add user to database
export const addUser = newUser => {
	return { type: ADD_USER, payload: newUser }
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
		axiosWithAuth().post('our-api-url', credentials)
			.then(resp => {
				console.log('actions says: post call success', resp)
				localStorage.setItem('token', resp.data.payload)
				dispatch({ type: LOGIN_SUCCESS, payload: resp })
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
		axiosWithAuth().get(`our-app-url/profile/${userId}`)
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
		axiosWithAuth().put('our-app-url', user)
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