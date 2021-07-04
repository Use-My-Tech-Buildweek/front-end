// This reducer is for fetching global lists (items and users)

import { ITEM_LIST_LOADED, USER_LIST_LOADED } from '../actions/fetchActions'
import { ADJUST_AVAILABILITY_SUCCESS } from '../actions/itemsActions';

// Set initial state of store
const initialState = {
	itemList: [],
	userList: []
}

export default function fetchReducer(state = initialState, action) {
	switch (action.type) {
		// Set state after successful fetching of item list
		case ITEM_LIST_LOADED: {
			return {
				...state,
				itemList: action.payload
			}
		}
		// Adjust available quantity when user puts item in cart
		case ADJUST_AVAILABILITY_SUCCESS:
			return {
				...state,
				itemList: [...state.itemList, action.payload]
			}
		// Set state after successful fetching of user list
		case USER_LIST_LOADED:
			return {
				...state,
				userList: action.payload
			}
		default:
			return state;
	}
}
