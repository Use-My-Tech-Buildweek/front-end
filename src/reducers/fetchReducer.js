import { ITEM_LIST_LOADED, USER_LIST_LOADED } from '../actions/fetchActions'
import { ADJUST_AVAILABILITY_SUCCESS } from '../actions/itemsActions';

const initialState = {
	itemList: [],
	userList: []
}

export default function fetchReducer(state = initialState, action) {
	switch (action.type) {
		case ITEM_LIST_LOADED: {
			return {
				...state,
				itemList: action.payload
			}
		}
		case ADJUST_AVAILABILITY_SUCCESS:
			return {
				...state,
				itemList: action.payload
			}
		case USER_LIST_LOADED:
			return {
				...state,
				userList: action.payload
			}

		default:
			return state;
	}
}
