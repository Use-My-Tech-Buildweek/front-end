
import useCallAPI from "../hooks/useCallAPI"

export const ADD_USER = 'ADD_USER'
export const SET_ERROR = 'SET_ERROR'
export const START_USER_FETCH = 'START_USER_FETCH'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_ERROR = 'FETCH_ERROR'

export const fetchUsers = () => dispatch => {
	dispatch({ type: START_USER_FETCH })
	try {
		const { response, error, loading } = useCallAPI({
			method: 'get',
			url: '/users',
			headers: {
				accept: '*/*'
			},
		})
		response(
			dispatch({ type: FETCH_SUCCESS, payload: response.data }))


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