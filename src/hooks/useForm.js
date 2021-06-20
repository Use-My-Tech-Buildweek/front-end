import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

// custom hook for form control
export const useForm = (key, initialValues, cb) => {
	//create generalized state object
	//const [state, setState] = useState(initialValues);
	const [state, setState] = useLocalStorage(key, initialValues)
	// onChange handler for form inputs
	const handleChanges = e => {
		setState({
			...state,
			[e.target.name]: e.target.value
		})
	}

	const clearForm = e => {
		e.preventDefault()
		setState(initialValues)
	}

	// onSubmit handler for form
	const handleSubmit = e => {
		//prevent page from re-rendering
		e.preventDefault();
		// set form data to state and send to api
		cb()
	}

}

return [state, clear handleChanges, handleSubmit];

}
