import { ADD_USER, SET_ERROR, LOGIN_USER } from '../actions'


const initialState = {
	users: [],
	// user: {
	// 	username: '',
	// 	email: '',
	// 	password: '',
	// 	bio: '',
	// 	profileImg: '',
	// },
	errorMessages: '',
	isLoading: false,
	sendApiCall: false,
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_USER:
			return {
				...state,
				users: [...state.users, action.payload]
			}
		case SET_ERROR:
			return {
				...state,
				errorMessages: action.payload
			}
		case LOGIN_USER:
			console.log('userReducer says: LOGIN_USER: updating state(isLoading, sendApiCall:true)')
			return {
				...state,
				isLoading: true,
				sendApiCall: true,
				errorMessages: ''
			}
		default:
			return state
	}
}

export default userReducer