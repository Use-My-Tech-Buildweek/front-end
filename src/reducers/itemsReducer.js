//import action calls
import {
	GET_ITEMS_START,
	GET_ITEMS_SUCCESS,
	GET_ITEMS_ERROR,

	DELETE_ITEM_START,
	DELETE_ITEM_SUCCESS,
	DELETE_ITEM_ERROR,

	ADD_TO_CART,
}
	from '../actions/itemsActions'

//sets state for store initialization
export const initialState = {
	errorMessages: '',
	isLoading: false,
	items: [],
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
			}
		case DELETE_ITEM_SUCCESS:
			return {
				...state
			}
		case DELETE_ITEM_ERROR:
			return {
				...state,
			}
		case ADD_TO_CART:
			return {
				...state,
				cart: [...state.cart, action.payload],
				item: {
					availability: state.item.availability - 1,
				}
			}
		default:
			return state
	}
}

export default reducer