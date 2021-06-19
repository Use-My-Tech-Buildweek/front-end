import { rentalItems } from '../components/RentalItems'

export const initialState = {
	rentalItems: rentalItems,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state
	}
}

export default reducer