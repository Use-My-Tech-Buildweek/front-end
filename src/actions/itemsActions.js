import axios from 'axios'
import { axiosWithAuth } from '../utils/axiosWithAuth'


export const DELETE_ITEM_START = 'DELETE_ITEM_START'
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS'
export const DELETE_ITEM_ERROR = 'DELETE_ITEM_ERROR'

export const GET_ITEMS_START = 'GET_ITEM_LIST_START'
export const GET_ITEMS_SUCCESS = 'GET_ITEM_LIST_SUCCESS'
export const GET_ITEMS_ERROR = 'GET_ITEM_LIST_ERROR'

export const deleteItem = item => dispatch => {

	dispatch({ type: DELETE_ITEM_START, payload: item })
	console.log('deleting item...', item)
	axiosWithAuth().delete(`https://ptpt-use-my-tech5.herokuapp.com/api/item/${item.id}`)
		.then(res => {
			dispatch({ type: DELETE_ITEM_SUCCESS, payload: res })
		}).catch(err => {
			dispatch({ type: DELETE_ITEM_ERROR, payload: err })
		})
}

export const getItems = () => dispatch => {
	dispatch({ type: GET_ITEMS_START })
	axios.get('https://ptpt-use-my-tech5.herokuapp.com/api/items')
		.then(response => {
			dispatch({ type: GET_ITEMS_SUCCESS, payload: response.data })
		})
		.catch(err => {
			dispatch({ type: GET_ITEMS_ERROR, payload: err })
		})
}