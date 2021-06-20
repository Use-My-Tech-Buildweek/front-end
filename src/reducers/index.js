import userReducer from './userReducer'
import rentalItemsReducer from './rentalItemsReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	userReducer,
	rentalItemsReducer
})

export default rootReducer