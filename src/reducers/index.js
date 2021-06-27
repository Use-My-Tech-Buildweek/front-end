import userReducer from './userReducer'
import itemsReducer from './itemsReducer'
import FetchReducer from '../utils/fetchItemList'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	users: userReducer,
	items: itemsReducer,
	itemList: FetchReducer
})

export default rootReducer