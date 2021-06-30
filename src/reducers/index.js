import userReducer from './userReducer'
import itemsReducer from './itemsReducer'
import fetchReducer from './fetchReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	users: userReducer,
	items: itemsReducer,
	lists: fetchReducer,
})

export default rootReducer