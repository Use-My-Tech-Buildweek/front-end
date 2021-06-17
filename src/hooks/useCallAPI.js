import { useState, useEffect } from 'react'
import axios from 'axios'

axios.defaults.baseUrl = 'http://our-app-url' 		// waiting on url

//custom hook for fetch calls
const useCallAPI = (axiosParams) => {
	const [response, setResponse] = useState(undefined)
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(true)

	const fetchData = async (params) => {
		try {
			const result = await axios.request(params);
			setResponse(result.data)
		} catch (err) {
			setError(err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData(axiosParams);
	}, [axiosParams])
	return { response, error, loading }
}

export default useCallAPI