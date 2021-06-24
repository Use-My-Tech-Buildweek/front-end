//import axios from 'axios'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useHistory } from 'react-router-dom'

export const DELETE_ITEM_START = 'DELETE_ITEM_START'
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS'
export const DELETE_ITEM_ERROR = 'DELETE_ITEM_ERROR'
export const GET_ITEMS_START = 'GET_ITEMS_START'
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS'
export const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR'

export const deleteItem = item => dispatch => {
	const history = useHistory();
	dispatch({ type: DELETE_ITEM_START, payload: item })
	console.log('deleting item...', item)
	axiosWithAuth().delete(`https://ptpt-use-my-tech5.herokuapp.com/api/item/${item.id}`)
		.then(res => {
			dispatch({ type: DELETE_ITEM_SUCCESS, payload: res })
		}).catch(err => {
			dispatch({ type: DELETE_ITEM_ERROR, payload: err })
		}).finally(() => history.push('/myItems'))
}

export const getItems = () => dispatch => {
	dispatch({ type: GET_ITEMS_START })
	console.log('itemsActions says: attempting to get items')
	axiosWithAuth().get('https://ptpt-use-my-tech5.herokuapp.com/api/items')
		.then(resp => {
			console.log('itemsActions says: successfully fetched all items', resp)
			dispatch({ type: GET_ITEMS_SUCCESS, payload: resp.data })
		})
		.catch(err => {
			console.log('itemsActions says: error fetching all items', err)
			dispatch({ type: GET_ITEMS_ERROR, payload: err })
		})
}
