//import action calls
import {
	GET_ITEMS_START,
	GET_ITEMS_SUCCESS,
	GET_ITEMS_ERROR,

	DELETE_ITEM_START,
	DELETE_ITEM_SUCCESS,
	DELETE_ITEM_ERROR,

	ADD_TO_CART,
	ADJUST_AVAILABILITY_SUCCESS,
	ADJUST_ERROR,

	ADD_NEW_ITEM_START,
	ADD_NEW_ITEM_SUCCESS,
	ADD_NEW_ITEM_ERROR,

	UPLOAD_FILE_START,
	UPLOAD_FILE_SUCCESS,
	UPLOAD_FILE_ERROR
}
	from '../actions/itemsActions'

//sets state for store initialization
export const initialState = {
	errorMessages: '',
	isLoading: false,
	item: {
		availability: 0,
		condition: '',
		created_at: '',
		daily_rate: '',
		description: '',
		id: '',
		imgs: '',
		item_name: '',
		location: '',
		updated_at: '',
		user_id: '',
	},
	newItem: {
		availability: 0,
		condition: '',
		created_at: '',
		daily_rate: '',
		description: '',
		id: '',
		imgs: '',
		item_name: '',
		location: '',
		updated_at: '',
		user_id: '',
	},
	cart: [],
}

// itemsReducer functions
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ITEMS_START:
			return {
				...state,
				isItemsLoading: true,
				errorMessages: ''
			}
		case GET_ITEMS_SUCCESS:
			return {
				...state,
				isItemsLoading: false,
				errorMessages: '',
				items: [...state.items, action.payload]
			}
		case GET_ITEMS_ERROR:
			return {
				...state,
				isItemsLoading: false,
				errorMessages: action.payload
			}

		case DELETE_ITEM_START:
			return {
				...state,
				isLoading: true
			}
		case DELETE_ITEM_SUCCESS:
			return {
				...state,
				items: state.items.filter((item, index) => item.item_id !== action.payload),
				isLoading: false
			}
		case DELETE_ITEM_ERROR:
			return {
				...state,
				errorMessages: action.payload
			}
		case ADD_TO_CART:
			return {
				...state,
				cart: [...state.cart, action.payload],
				isLoading: true,
			}
		case ADJUST_AVAILABILITY_SUCCESS:
			return {
				...state
			}
		case ADD_NEW_ITEM_START:
			return {
				...state,
				isLoading: true,
				errorMessages: ''
			}
		case ADD_NEW_ITEM_SUCCESS:
			return {
				...state,
				isLoading: false,
				errorMessages: '',
				newItem: [...state.newItem, action.payload],
				items: [...state.items, state.newItem],
			}
		case ADD_NEW_ITEM_ERROR:
			return {
				...state,
				isLoading: false,
				errorMessages: action.payload,
			}
		case UPLOAD_FILE_START:
			return {
				isLoading: true,
				errorMessages: ''
			}
		case UPLOAD_FILE_SUCCESS:
			return {
				...state,
				newItem: [...state.newItem.imgs, action.payload],
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

export default reducer