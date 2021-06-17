import { useState } from 'react'

// custom hook for form control
export const useForm = (initialValues) => {
	//create generalized state object
	const [state, setState] = useState(initialValues);

	// onChange handler for form inputs
	const handleChanges = e => {
		setState({
			...state,
			[e.target.name]: e.target.value
		})
	}

	// onSubmit handler for form
	const handleSubmit = e => {
		//prevent page from re-rendering
		e.preventDefault();
		// set form data to state and send to api
		setState({ ...state })
	}
	return [state, handleChanges, handleSubmit];

}
