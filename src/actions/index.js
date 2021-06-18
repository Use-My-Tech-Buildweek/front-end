export const ADD_USER = 'ADD_USER'
export const SET_ERROR = 'SET_ERROR'


export const addUser = newUser => {
	return { type: ADD_USER, payload: newUser }
}

export const setError = errorMessage => {
	return { type: SET_ERROR, payload: errorMessage }
}