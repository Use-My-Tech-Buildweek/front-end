//import action calls
import {
	GET_ITEMS_START,
	GET_ITEMS_SUCCESS,
	GET_ITEMS_ERROR,

	DELETE_ITEM_START,
	DELETE_ITEM_SUCCESS,
	DELETE_ITEM_ERROR,

}
	from '../actions/itemsActions'

//sets state for store initialization
export const initialState = {
	errorMessages: '',
	isLoading: false,
	items: [],
	item: {
		pictures: [],
		description: '',
		price: '',
		user: '',
		title: '',
		name: '',
		id: ''
	},
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
		default:
			return state
	}
}

export default reducer