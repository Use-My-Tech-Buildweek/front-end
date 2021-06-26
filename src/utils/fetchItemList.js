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
export async function fetchItemList(dispatch) {
	await axios.get('https://ptpt-use-my-tech5.herokuapp.com/api/items')
		.then(response => {
			dispatch({ type: 'itemListLoaded', payload: response.data })
			return response.data;
		})
}

