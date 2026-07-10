import { useEffect, useRef, useState } from 'react'
import QuestionCard from '../QuestionList/QuestionCard/QuestionCard'
import styles from '../QuestionList/QuestionList.module.css'
import Pagination from '../ui/Pagination/Pagination'
import Skeleton from '../ui/Skeleton/Skeleton'

function QuestionList({
	questions,
	isLoading,
	currentPage,
	totalPages,
	onNextPage,
	onPrevPage,
	onPageClick,
	filters,
	specializations
}) {
	const [openIds, setOpenIds] = useState([])
	const [heights, setHeights] = useState({})
	const cardRefs = useRef({})

	const currentSpecialization = specializations.find(
		spec => spec.id === filters.specializationId
	)

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

	return (
		<div className={styles.questionList}>
			<h1 className={styles.title}>
				{!isLoading ? currentSpecialization?.title : <Skeleton type={'item'} />}
			</h1>

			{questions.map(question => {
				const isOpen = openIds.includes(question.id)
				const targetHeight = heights[question.id] || 0

				return !isLoading ? (
					<QuestionCard
						key={question.id}
						question={question}
						onOpenDetails={handleOpenDetails}
						onCardRef={onCardRef}
						isOpen={isOpen}
						isLoading={isLoading}
						targetHeight={targetHeight}
					/>
				) : (
					<Skeleton type={'item'} />
				)
			})}
			<Pagination
				totalPages={totalPages}
				currentPage={currentPage}
				handleNextPage={onNextPage}
				handlePrevPage={onPrevPage}
				handlePageClick={onPageClick}
			/>
		</div>
	)
}

export default QuestionList
