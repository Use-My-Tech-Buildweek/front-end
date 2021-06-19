import { ADD_USER, SET_ERROR, LOGIN_USER, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions'


const initialState = {
	users: [],
	user: {
		username: '',
		//	email: '',
		password: '',
		// 	bio: '',
		// 	profileImg: '',
	},
	errorMessages: '',
	isLoading: false,
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_USER:
			return {
				...state,
				users: [...state.users, action.payload],
				user: [...state.user, action.payload]
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
		case LOGIN_SUCCESS:
			console.log('userReducer says: login success. setting state')
			return {
				...state.user,
				username: action.payload.username,
				password: action.payload.password
			}
		case LOGIN_ERROR:
			console.log('userReducer says: login error')
			return {
				...state,
				errorMessages: action.payload
			}
		default:
			return state
	}
}

export default userReducer