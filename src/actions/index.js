
import useCallAPI from "../hooks/useCallAPI"

export const ADD_USER = 'ADD_USER'
export const SET_ERROR = 'SET_ERROR'
export const START_USER_FETCH = 'START_USER_FETCH'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_ERROR = 'FETCH_ERROR'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const fetchUsers = () => dispatch => {
	dispatch({ type: START_USER_FETCH })
	try {
		const { response, loading } = useCallAPI({
			method: 'get',
			url: '/users',
			headers: {
				accept: '*/*'
			},
		})

		// 	if (error) {
		// 	dispatch({ type: FETCH_ERROR, payload: error, loading })
		// } else {
		dispatch({ type: FETCH_SUCCESS, payload: response.data, loading })

	} catch (error) {
		dispatch({ type: FETCH_ERROR, payload: error })
	}
};


export const addUser = newUser => {
	return { type: ADD_USER, payload: newUser }
}

export const setError = errorMessage => {
	return { type: SET_ERROR, payload: errorMessage }
}

export const loginUser = (credentials) => dispatch => {
	console.log('actions says: dispatching LOGIN_USER', credentials)
	dispatch({ type: LOGIN_USER, payload: credentials })

	try {
		console.log('actions says: attempting api.post login', credentials)
		const { response, error } = useCallAPI({
			method: 'post',
			url: '/login',
			headers: { accept: '*/*' },
			data: credentials,
		})
		if (!error) {
			dispatch({ type: LOGIN_SUCCESS, payload: response })
		}
	} catch (error) {
		console.log('actions says: dispatching LOGIN_ERROR')
		dispatch({ type: LOGIN_ERROR, payload: error })
	}
}