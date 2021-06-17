import { useState, useEffect } from 'react'
import axios from 'axios'

//custom hook for fetch calls
export const useFetch = ({ method, url, data, config }) => {

	const [response, setResponse] = useState(null)
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)


	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				axios[method.toLowerCase()](url, JSON.parse(config), JSON.parse(data))
					.then((res) => {
						setResponse(res.data)
					})
					.finally(() => {
						setIsLoading(false)
					})
			} catch (err) {
				setError(err)
			}
		};
		fetchData()
	}, [config, data, method, url])
	return { response, error, isLoading }
}
