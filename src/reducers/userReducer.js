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
	UPDATE_PROFILE_ERROR,

	USER_LOG_OUT,
	LOG_OUT_SUCCESS,
	LOG_OUT_ERROR,

	CLEAR_REGISTER_FORM,

	GET_MYITEMS_SUCCESS,
	GET_MYITEMS_START,
	GET_MYITEMS_ERROR,

	UPLOAD_FILE_START,
	UPLOAD_FILE_SUCCESS,
	UPLOAD_FILE_ERROR
} from '../actions/userActions'

// sets state 
const initialState = {
	user: {
		username: '',
		password: '',
		department: '',
		//		bio: '',
		profile_picture: '',
		location: '',
		id: ''
	},
	errorMessages: '',
	isLoading: false,
	isUserLoggedIn: false,
	token: '',
	myItems: []
}

//reducer function
const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case START_ADD_USER:
			return {
				...state,
				isLoading: true,
				errorMessages: []
			}
		case ADD_USER_SUCCESS:
			return {
				...state,
				user: action.payload,
				isLoading: false,
				errorsMessages: [],
				newUser: {
					username: '',
					password: '',
					department: ''
				},
			}
		case ADD_USER_ERROR:
			return {
				...state,
				isLoading: false,
				errorMessages: action.payload,
			}
		case SET_ERROR:
			return {
				...state,
				errorMessages: [...state.errorMessages, action.payload],
			}
		case LOGIN_USER:
			console.log('userReducer says: starting call to login user')
			return {
				...state,
				isLoading: true,
				errorMessages: []
			}
		case LOGIN_SUCCESS:
			console.log('userReducer says: login success. setting state')
			return {
				...state,
				user: {
					username: action.payload.username,
					department: action.payload.department,
					id: action.payload.id,
					password: action.payload.password
				},
				isLoading: false,
				errorMessages: [],
				isUserLoggedIn: true,
				token: localStorage.getItem('token'),
			}
		case LOGIN_ERROR:
			console.log('userReducer says: login error')
			return {
				...state,
				isLoading: false,
				errorMessages: [...state.errorMessages, action.payload],
			}
		case START_USER_FETCH:
			console.log('userReducer says: attempting to fetch user profile', action.payload)
			return {
				...state,
				isLoading: true,
				errorMessages: []
			}
		case USER_FETCH_SUCCESS:
			console.log('userReducer says: user fetch successful', action.payload)
			return {
				...state,
				user: action.payload,
				isLoading: false,
				errorMessages: []
			}
		case USER_FETCH_ERROR:
			return {
				...state,
				isLoading: false,
				errorMessages: [...state.errorMessages, action.payload],
			}
		case START_UPDATE_PROFILE:
			return {
				...state,
				isLoading: true,
				errorMessages: []
			}
		case UPDATE_PROFILE_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action.payload,
				errorMessages: [],
			}
		case UPDATE_PROFILE_ERROR:
			return {
				...state,
				isLoading: false,
				errorMessages: [...state.errorMessages, action.payload],
			}
		case USER_LOG_OUT:
			return {
				...state,
				isLoading: true,
			}
		case LOG_OUT_SUCCESS:
			return {
				...state,
				isLoading: false,
				isUserLoggedIn: false,
				token: '',
				user: {
					username: '',
					password: '',
					department: '',
				},

			}
		case LOG_OUT_ERROR:
			return {
				...state,
				isLoading: false,
				errorMessages: [...state.errorMessages, action.payload],
			}
		case CLEAR_REGISTER_FORM:
			return {
				...state,
				newUser: {
					username: '',
					department: '',
					password: '',
					bio: '',
					profile_pic: '',
					location: ''
				}
			}

		case GET_MYITEMS_START:
			return {
				...state,
				isLoading: true,
				errorMessages: []
			}
		case GET_MYITEMS_SUCCESS:
			return {
				...state,
				myItems: action.payload,
				isLoading: false,
				errorMessages: []
			}
		case GET_MYITEMS_ERROR:
		case UPLOAD_FILE_START:
			return {
				isLoading: true,
				errorMessages: ''
			}

		case UPLOAD_FILE_SUCCESS:
			return {
				...state,
				user: [...state.user.profile_pic, action.payload],
				isLoading: false,
				errorMessages: ''
			}
		case UPLOAD_FILE_ERROR:
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