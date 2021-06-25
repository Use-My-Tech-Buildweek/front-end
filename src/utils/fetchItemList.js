import axios from "axios"

const initialState = {
	itemList: []
}

export default function fetchReducer(state = initialState, action) {
	switch (action.type) {
		case 'itemListLoaded': {
			return {
				...state,
				itemList: action.payload
			}
		}
		default:
			return state;
	}
}

// Thunk function
export async function fetchItemList(dispatch, getState) {
	const response = await axios.get('https://ptpt-use-my-tech5.herokuapp.com/api/items')

	const stateBefore = getState()
	console.log('items before dispatch:', stateBefore)

	dispatch({ type: 'itemListLoaded', payload: response.data })

	const stateAfter = getState()
	console.log('item list after dispatch:', stateAfter)
}