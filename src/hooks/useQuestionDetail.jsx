import { useEffect, useState } from 'react'
import { getQuestionById } from '../api'

export const useQuestionDetail = id => {
	const [question, setQuestion] = useState(null)
	const [isQuestionLoading, setIsQuestionLoading] = useState(true)

	useEffect(() => {
		if (!id) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setIsQuestionLoading(false)
			return
		}

		const fetchQuestionData = async () => {
			try {
				setIsQuestionLoading(true)
				const data = await getQuestionById(id)
				setQuestion(data)
			} catch (error) {
				console.error(`Ошибка при загрузке вопроса с id ${id}:`, error)
			} finally {
				setIsQuestionLoading(false)
			}
		}

		fetchQuestionData()
	}, [id])

	return { question, isQuestionLoading }
}
