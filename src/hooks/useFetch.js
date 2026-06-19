import { useEffect, useState } from 'react'

export default function useFetch(fetchFunction, params = {}) {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const paramsKey = JSON.stringify(params)

	useEffect(() => {
		const loadData = async () => {
			setLoading(true)
			setError(null)
			try {
				const result = await fetchFunction(params)

				setData(result)
			} catch (error) {
				console.error('Ошибка загрузки:', error)
				setError(error.message || 'Ошибка загрузки данных')
			} finally {
				setLoading(false)
			}
		}
		loadData()
	}, [fetchFunction, paramsKey])

	return { data, loading, error }
}
