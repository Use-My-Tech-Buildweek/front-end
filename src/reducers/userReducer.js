// import action calls
import {
	START_ADD_USER,
	ADD_USER_SUCCESS,
	ADD_USER_ERROR,
	SET_ERROR,
	LOGIN_USER,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	START_USER_FETCH,
	USER_FETCH_SUCCESS,
	USER_FETCH_ERROR,
	START_UPDATE_PROFILE,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_ERROR
} from '../actions/userActions'

// sets state 
const initialState = {
	users: [],
	user: {
		username: '',
		//email:'',
		password: '',
		department: '',
		//bio: '',
		//profileImg: '',
		userId: ''
	},
	errorMessages: '',
	isLoading: false,
}

//reducer function
const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case START_ADD_USER:
			return {
				...state,
				isLoading: true,
				errorMessages: ''
			}
		case ADD_USER_SUCCESS:
			return {
				...state,
				user: action.payload,
				users: [...state.users, action.payload],
				isLoading: false,
				errorsMessages: '',
				newUser: {
					username: '',
					password: '',
					department: ''
				}
			}
		case ADD_USER_ERROR:
			return {
				...state,
				isLoading: false,
				errorMessages: action.payload
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
		case START_USER_FETCH:
			console.log('userReducer says: attempting to fetch user profile', action.payload)
			return {
				...state,
				isLoading: true,
				errorMessages: ''
			}
		case USER_FETCH_SUCCESS:
			console.log('userReducer says: user fetch successful', action.payload)
			return {
				...state,
				user: action.payload,
				isLoading: false,
				errorMessages: ''
			}
		case USER_FETCH_ERROR:
			return {
				...state,
				isLoading: false,
				errorMessages: action.payload
			}
		case START_UPDATE_PROFILE:
			return {
				...state,
				isLoading: true,
				errorMessages: ''
			}
		case UPDATE_PROFILE_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action.payload,
				errorMessages: ''
			}
		case UPDATE_PROFILE_ERROR:
			return {
				...state,
				isLoading: false,
				errorMessages: action.payload
			}

		default:
			return state

	}

}

export default userReducer