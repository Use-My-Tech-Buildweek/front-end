import { ADD_USER, SET_ERROR } from '../actions'

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
		default:
			return state
	}
}

export default userReducer