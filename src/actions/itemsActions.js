//import axios from 'axios'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useHistory } from 'react-router-dom'

export const DELETE_ITEM_START = 'DELETE_ITEM_START'
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS'
export const DELETE_ITEM_ERROR = 'DELETE_ITEM_ERROR'


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

