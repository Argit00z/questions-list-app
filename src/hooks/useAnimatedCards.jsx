import { useEffect, useRef, useState } from 'react'

export const useAnimatedCards = (questions, currentPage) => {
	const [openIds, setOpenIds] = useState([])
	const [heights, setHeights] = useState({})
	const cardRefs = useRef({})

	useEffect(() => {
		if (questions.length === 0) return

		const newHeights = {}
		questions.forEach(question => {
			const element = cardRefs.current[question.id]
			if (element) {
				newHeights[question.id] = element.scrollHeight
			}
		})

		setHeights(prev => {
			const isChanged = Object.keys(newHeights).some(
				key => prev[key] !== newHeights[key]
			)
			return isChanged ? newHeights : prev
		})
	}, [questions])

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setOpenIds([])
	}, [currentPage])

	const handleOpenDetails = id => {
		setOpenIds(prevOpenIds => {
			if (prevOpenIds.includes(id)) {
				return prevOpenIds.filter(itemId => itemId !== id)
			} else {
				return [...prevOpenIds, id]
			}
		})
	}

	const onCardRef = (id, el) => {
		cardRefs.current[id] = el
	}

	return {
		openIds,
		heights,
		handleOpenDetails,
		onCardRef
	}
}
