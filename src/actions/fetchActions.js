import axios from "axios"
import { axiosWithAuth } from "../utils/axiosWithAuth";

export const ITEM_LIST_LOADED = 'ITEM_LIST_LOADED'
export const USER_LIST_LOADED = 'USER_LIST_LOADED'

// Thunk function
export async function fetchItemList(dispatch) {
	await axios.get('https://ptpt-use-my-tech5.herokuapp.com/api/items')
		.then(response => {
			dispatch({ type: 'ITEM_LIST_LOADED', payload: response.data })
			return response.data;
		})
}

export async function fetchUserList(dispatch) {
	await axiosWithAuth().get(`http://ptpt-use-my-tech5.herokuapp.com/api/users`)
		.then(response => {
			dispatch({ type: USER_LIST_LOADED, payload: response.data })
			return response.data
		})
}