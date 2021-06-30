import axios from 'axios'
import { axiosWithAuth } from '../utils/axiosWithAuth'


export const DELETE_ITEM_START = 'DELETE_ITEM_START'
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS'
export const DELETE_ITEM_ERROR = 'DELETE_ITEM_ERROR'

export const GET_ITEMS_START = 'GET_ITEMS_START'
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS'
export const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR'

export const ADD_TO_CART = 'ADD_TO_CART'

export const ADD_NEW_ITEM_START = 'ADD_NEW_ITEM'
export const ADD_NEW_ITEM_SUCCESS = 'ADD_NEW_ITEM_SUCCESS'
export const ADD_NEW_ITEM_ERROR = 'ADD_NEW_ITEM_ERROR'

export const UPLOAD_FILE_START = 'UPLOAD_FILE_START'
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS'
export const UPLOAD_FILE_ERROR = 'UPLOAD_FILE_ERROR'

export const ADJUST_AVAILABILITY_SUCCESS = 'ADJUST_AVAILABILITY_SUCCESS'
export const ADJUST_ERROR = 'ADJUST_ERROR'

export const deleteItem = item_id => dispatch => {

	dispatch({ type: DELETE_ITEM_START, payload: item_id })
	console.log('deleting item...', item_id)
	axiosWithAuth().delete(`https://ptpt-use-my-tech5.herokuapp.com/api/item/${item_id}`)
		.then(res => {
			dispatch({ type: DELETE_ITEM_SUCCESS, payload: res.data })
		}).catch(err => {
			dispatch({ type: DELETE_ITEM_ERROR, payload: err.message })
		})
}
export const fetchItems = () => dispatch => {
	return async dispatch => {
		try {
			dispatch({ type: GET_ITEMS_START })
			let items = await axios.get('https://ptpt-use-my-tech5.herokuapp.com/api/items')
			dispatch({ type: GET_ITEMS_SUCCESS, payload: items.data })
		} catch (err) {
			dispatch({ type: GET_ITEMS_ERROR, payload: err })
		}
	}
}

export const addNewItem = (user_id, newItem) => dispatch => {
	dispatch({ type: ADD_NEW_ITEM_START, payload: newItem })
	console.log('itemsActions says: attempting to add new item', newItem)
	try {
		axiosWithAuth().post(`https://ptpt-use-my-tech5.herokuapp.com/api/users/${user_id}/items`, newItem)
			.then(resp => {
				dispatch({ type: ADD_NEW_ITEM_SUCCESS, payload: resp.data })
			}).catch(err => {
				dispatch({ type: ADD_NEW_ITEM_ERROR, payload: err.message })
				console.log(err)
			})
	} catch (error) {
		console.log(error.message)
	}
}

export const uploadFile = formData => dispatch => {
	dispatch({ type: UPLOAD_FILE_START, payload: formData })
	console.log('attempting file upload')
	try {
		axios.post('https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5', formData)
			.then(response => {
				dispatch({ type: UPLOAD_FILE_SUCCESS, payload: response.data })
			}).catch(err => {
				dispatch({ type: UPLOAD_FILE_ERROR, payload: err.message })
			})
	} catch (err) {
		console.log(err)
	}
}

export const addToCart = (updatedItem, id) => dispatch => {
	return (dispatch) => {
		console.log('adding item to cart', updatedItem.id)
		dispatch({ type: ADD_TO_CART, payload: updatedItem.id })
		console.log('adjusting item availability')
		axiosWithAuth().put(`https://ptpt-use-my-tech5.herokuapp.com/api/item/${id}`, updatedItem)
			.then(response => {
				dispatch({ type: ADJUST_AVAILABILITY_SUCCESS, payload: response.data })
				console.log('successfully adjusted availability', response)
			}).catch(err => dispatch({ type: ADJUST_ERROR, payload: err.message }))
	}
}